<template>
  <div class="inline-chatbot">
    <div class="chatbot-header">
      <div class="header-info">
        <i class="bx bx-bot chat-icon"></i>
        <h5>Cinema Assistant</h5>
      </div>
    </div>
    
    <div class="chat-messages" ref="messagesContainer">
      <div v-for="(message, index) in messages" :key="index" 
           :class="['message', message.sender === 'user' ? 'user-message' : 'bot-message']">
        <div class="message-content" v-html="message.text"></div>
      </div>
      <div v-if="isLoading" class="message bot-message">
        <div class="message-content typing">
          <span></span><span></span><span></span>
        </div>
      </div>

      <!-- Quick actions -->
      <div v-if="!messages.some(m => m.sender === 'user')" class="quick-actions">
        <div class="quick-title">Bạn có thể hỏi về:</div>
          <button @click="checkBalance" class="quick-btn">
            <i class="bx bx-wallet"></i>
            <span>Kiểm tra số dư</span>
          </button>
        </div>
      </div>
    </div>
    
    <div class="chat-input">
      <input 
        type="text" 
        v-model="userInput" 
        @keyup.enter="sendMessage" 
        placeholder="Hỏi về phim, lịch chiếu, đặt vé..."
        :disabled="isLoading"
      />
      <button @click="sendMessage" :disabled="!userInput.trim() || isLoading">
        <i class="bx bx-send"></i>
      </button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      messages: [
        { 
          text: 'Xin chào! Tôi là trợ lý ảo của Cinema. Tôi có thể giúp bạn tìm hiểu về phim, lịch chiếu, hoặc hỗ trợ đặt vé.',
          sender: 'bot' 
        }
      ],
      userInput: '',
      isLoading: false,
      userId: null,
      apiBaseUrl: 'http://127.0.0.1:8000/api'
    };
  },
  
  mounted() {
    this.userId = localStorage.getItem('id_khach_hang') || 'guest_' + Math.random().toString(36).substr(2, 9);
    this.getMovieSuggestions();
    this.scrollToBottom();
  },
  
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;
      
      const userMessage = this.userInput.trim();
      this.messages.push({
        text: userMessage,
        sender: 'user'
      });
      
      this.userInput = '';
      this.isLoading = true;
      this.scrollToBottom();
      
      try {
        const response = await axios.post(`${this.apiBaseUrl}/chatbot/query`, {
          message: userMessage,
          userId: this.userId
        });
        
        if (response.data.status) {
          this.messages.push({
            text: response.data.message,
            sender: 'bot'
          });
        } else {
          throw new Error(response.data.message || 'Có lỗi xảy ra');
        }
      } catch (error) {
        console.error('Chatbot error:', error);
        this.messages.push({
          text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
          sender: 'bot'
        });
      } finally {
        this.isLoading = false;
        this.scrollToBottom();
      }
    },

    handleQuickAction(question) {
      this.userInput = question;
      this.sendMessage();
    },

    async getMovieSuggestions() {
      try {
        const response = await axios.get(`${this.apiBaseUrl}/chatbot/suggest-movies`, {
          params: { userId: this.userId }
        });
        
        if (response.data.status) {
          this.messages.push({
            text: response.data.message,
            sender: 'bot'
          });
        }
      } catch (error) {
        console.error('Movie suggestion error:', error);
      }
    },
    
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.messagesContainer) {
          this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
        }
      });
    },

    async checkBalance() {
      try {
        const response = await axios.get(`${this.apiBaseUrl}/chatbot/check-balance`, {
          params: { userId: this.userId }
        });
        
        this.messages.push({
          text: response.data.message,
          sender: 'bot'
        });

        if (!response.data.status && response.data.message.includes('đăng nhập')) {
          // Thêm nút đăng nhập nếu chưa đăng nhập
          setTimeout(() => {
            this.messages.push({
              text: 'Bạn có thể <a href="/login" class="login-link">đăng nhập tại đây</a> để kiểm tra số dư.',
              sender: 'bot'
            });
          }, 1000);
        }
      } catch (error) {
        console.error('Balance check error:', error);
        this.messages.push({
          text: 'Xin lỗi, không thể kiểm tra số dư lúc này. Vui lòng thử lại sau.',
          sender: 'bot'
        });
      }
    }
  }
};
</script>

<style scoped>
.inline-chatbot {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.chatbot-header {
  background: linear-gradient(135deg, #e50914 0%, #b20710 100%);
  color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-info {
  display: flex;
  align-items: center;
}

.chat-icon {
  font-size: 24px;
  margin-right: 10px;
}

.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #f9f9f9;
  min-height: 300px;
  max-height: 400px;
}

.message {
  margin-bottom: 15px;
  display: flex;
}

.user-message {
  justify-content: flex-end;
}

.bot-message {
  justify-content: flex-start;
}

.message-content {
  padding: 10px 15px;
  border-radius: 18px;
  max-width: 80%;
}

.user-message .message-content {
  background-color: #e50914;
  color: white;
  border-bottom-right-radius: 4px;
}

.bot-message .message-content {
  background-color: white;
  color: #333;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.bot-message .message-content a {
  color: #e50914;
  text-decoration: none;
  font-weight: 500;
}

.bot-message .message-content a.login-link {
  color: #e50914;
  text-decoration: none;
  font-weight: 500;
  padding: 4px 8px;
  border: 1px solid #e50914;
  border-radius: 4px;
  display: inline-block;
  margin-top: 8px;
  transition: all 0.2s;
}

.bot-message .message-content a.login-link:hover {
  background-color: #e50914;
  color: white;
}

.chat-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #eee;
  background-color: white;
}

.chat-input input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
}

.chat-input input:focus {
  border-color: #e50914;
}

.chat-input button {
  margin-left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e50914;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.chat-input button:hover {
  background-color: #c80812;
}

.chat-input button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Quick actions */
.quick-actions {
  margin-top: 10px;
  padding: 10px 0;
}

.quick-title {
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
  font-weight: 500;
}

.quick-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quick-btn {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 18px;
  padding: 10px 15px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  text-align: left;
}

.quick-btn i {
  font-size: 17px;
  margin-right: 8px;
  color: #e50914;
}

.quick-btn:hover {
  background-color: #f0f0f0;
  border-color: #ccc;
}

/* Typing animation */
.typing span {
  width: 8px;
  height: 8px;
  background: #666;
  display: inline-block;
  border-radius: 50%;
  margin: 0 2px;
  animation: bounce 1.3s infinite;
}

.typing span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

@media (max-width: 768px) {
  .chat-messages {
    min-height: 250px;
  }
}
</style> 