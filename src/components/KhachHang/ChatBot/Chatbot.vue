<template>
  <div class="chatbot-container" :class="{ 'chatbot-open': isOpen }">
    <!-- Chat button -->
    <button class="chat-toggle-btn" @click="toggleChat">
      <i class="bx" :class="isOpen ? 'bx-x' : 'bx-message-dots'"></i>
      <span class="notification-badge" v-if="!isOpen && hasNewMessage">1</span>
    </button>

    <!-- Chat window -->
    <div class="chat-window" v-if="isOpen">
      <div class="chat-header">
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
        <input type="text" v-model="userInput" @keyup.enter="sendMessage"
          placeholder="Hỏi về phim, lịch chiếu, đặt vé..." :disabled="isLoading" />
        <button @click="sendMessage" :disabled="!userInput.trim() || isLoading">
          <i class="bx bx-send"></i>
        </button>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isOpen: false,
      hasNewMessage: false,
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
    // Tự động đề xuất phim khi mở chatbot lần đầu
    setTimeout(() => {
      this.getMovieSuggestions();
    }, 1000);
  },

  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.hasNewMessage = false;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },

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
          this.hasNewMessage = !this.isOpen;
        }
      } catch (error) {
        console.error('Movie suggestion error:', error);
      }
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
              text: 'Bạn có thể <a href="/dang-nhap" class="login-link">đăng nhập tại đây</a> để kiểm tra số dư.',
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
    },

    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.messagesContainer) {
          this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
        }
      });
    }
  }
};
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
}

.chat-toggle-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e50914 0%, #b20710 100%);
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
  transition: transform 0.3s, background 0.3s;
  animation: pulse 2s infinite alternate;
}

@keyframes pulse {
  0% {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }

  100% {
    box-shadow: 0 4px 20px rgba(229, 9, 20, 0.5);
  }
}

.chat-toggle-btn i {
  font-size: 24px;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
}

.chat-toggle-btn:hover {
  transform: scale(1.05);
  background: linear-gradient(135deg, #f50914 0%, #d20710 100%);
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  font-size: 12px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  border: 2px solid white;
  animation: bounce 1s infinite alternate;
}

.chat-window {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slide-up 0.3s ease;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chat-header {
  padding: 15px;
  background: linear-gradient(135deg, #e50914 0%, #b20710 100%);
  color: white;
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
  transition: border-color 0.2s;
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

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

@media (max-width: 768px) {
  .chat-window {
    position: fixed;
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    margin: 0;
    border-radius: 0;
  }

  .chatbot-container {
    bottom: 15px;
    right: 15px;
  }

  .chat-toggle-btn {
    width: 55px;
    height: 55px;
  }
}
</style>