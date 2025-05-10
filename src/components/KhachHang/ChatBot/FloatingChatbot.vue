<template>
    <div class="floating-chatbot">
        <!-- Chat bubble button -->
        <button @click="toggleChat" class="chat-bubble" :class="{ 'expanded': isOpen }">
            <i v-if="!isOpen" class="bx bxs-message-rounded-dots"></i>
            <i v-else class="bx bx-x"></i>
            <span class="notification-badge" v-if="!isOpen && hasNewMessage">1</span>
        </button>

        <!-- Chat window -->
        <Transition name="slide-fade">
            <div v-if="isOpen" class="chat-window">
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
                        <div class="message-time" v-if="message.time">{{ message.time }}</div>
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
                        <button @click="checkDepositHistory" class="quick-btn">
                            <i class="bx bx-history"></i>
                            <span>Xem lịch sử nạp tiền</span>
                        </button>
                        <button @click="checkPurchaseHistory" class="quick-btn">
                            <i class="bx bx-purchase-tag"></i>
                            <span>Xem lịch sử mua phim</span>
                        </button>
                    </div>
                </div>

                <div class="chat-input">
                    <input type="text" v-model="userInput" @keyup.enter="sendMessage"
                        placeholder="Hỏi về phim, lịch chiếu, đặt vé..." :disabled="isLoading" />
                    <button @click="sendMessage" :disabled="!userInput.trim() || isLoading" class="send-btn">
                        <i class="bx bx-send"></i>
                    </button>
                </div>
            </div>
        </Transition>
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
                    text: 'Xin chào! Tôi là trợ lý ảo. Tôi có thể giúp bạn tìm hiểu về phim, thể loại...',
                    sender: 'bot',
                    time: this.getCurrentTime()
                }
            ],
            userInput: '',
            isLoading: false,
            userId: null,
            apiBaseUrl: 'http://127.0.0.1:8000/api'
        };
    },

    mounted() {
        // Lấy id_khach_hang từ localStorage
        const id_khach_hang = localStorage.getItem('id_khach_hang');
        if (id_khach_hang) {
            this.userId = id_khach_hang;
        } else {
            // Nếu chưa đăng nhập, tạo guest id
            this.userId = 'guest_' + Math.random().toString(36).substr(2, 9);
        }

        setTimeout(() => {
            this.getMovieSuggestions();
        }, 2000);
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
                sender: 'user',
                time: this.getCurrentTime()
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
                        sender: 'bot',
                        time: this.getCurrentTime()
                    });
                } else {
                    throw new Error(response.data.message || 'Có lỗi xảy ra');
                }
            } catch (error) {
                console.error('Chatbot error:', error);
                this.messages.push({
                    text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
                    sender: 'bot',
                    time: this.getCurrentTime()
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
                        sender: 'bot',
                        time: this.getCurrentTime()
                    });
                    this.hasNewMessage = !this.isOpen;
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

        getCurrentTime() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        },

        async checkBalance() {
            this.isLoading = true;
            
            try {
                const response = await axios.get(`${this.apiBaseUrl}/chatbot/check-balance`, {
                    params: { userId: this.userId }
                });
                
                this.messages.push({
                    text: response.data.message,
                    sender: 'bot',
                    time: this.getCurrentTime()
                });

                if (!response.data.status && response.data.message.includes('đăng nhập')) {
                    // Thêm nút đăng nhập nếu chưa đăng nhập
                    setTimeout(() => {
                        this.messages.push({
                            text: 'Bạn có thể <a href="/dang-nhap" class="login-link">đăng nhập tại đây</a> để kiểm tra số dư.',
                            sender: 'bot',
                            time: this.getCurrentTime()
                        });
                    }, 1000);
                }
            } catch (error) {
                console.error('Balance check error:', error);
                this.messages.push({
                    text: 'Xin lỗi, không thể kiểm tra số dư lúc này. Vui lòng thử lại sau.',
                    sender: 'bot',
                    time: this.getCurrentTime()
                });
            } finally {
                this.isLoading = false;
                this.scrollToBottom();
            }
        },

        async checkDepositHistory() {
            this.isLoading = true;
            
            try {
                const response = await axios.get(`${this.apiBaseUrl}/chatbot/deposit-history`, {
                    params: { userId: this.userId }
                });
                
                this.messages.push({
                    text: response.data.message,
                    sender: 'bot',
                    time: this.getCurrentTime()
                });

                if (!response.data.status && response.data.message.includes('đăng nhập')) {
                    // Thêm nút đăng nhập nếu chưa đăng nhập
                    setTimeout(() => {
                        this.messages.push({
                            text: 'Bạn có thể <a href="/dang-nhap" class="login-link">đăng nhập tại đây</a> để xem lịch sử nạp tiền.',
                            sender: 'bot',
                            time: this.getCurrentTime()
                        });
                    }, 1000);
                }
            } catch (error) {
                console.error('Deposit history error:', error);
                this.messages.push({
                    text: 'Xin lỗi, không thể lấy lịch sử nạp tiền lúc này. Vui lòng thử lại sau hoặc kiểm tra trực tiếp trên website.',
                    sender: 'bot',
                    time: this.getCurrentTime()
                });
            } finally {
                this.isLoading = false;
                this.scrollToBottom();
            }
        },

        async checkPurchaseHistory() {
            this.isLoading = true;
            
            try {
                const response = await axios.get(`${this.apiBaseUrl}/chatbot/purchase-history`, {
                    params: { userId: this.userId }
                });
                
                this.messages.push({
                    text: response.data.message,
                    sender: 'bot',
                    time: this.getCurrentTime()
                });

                if (!response.data.status && response.data.message.includes('đăng nhập')) {
                    // Thêm nút đăng nhập nếu chưa đăng nhập
                    setTimeout(() => {
                        this.messages.push({
                            text: 'Bạn có thể <a href="/dang-nhap" class="login-link">đăng nhập tại đây</a> để xem lịch sử mua phim.',
                            sender: 'bot',
                            time: this.getCurrentTime()
                        });
                    }, 1000);
                }
            } catch (error) {
                console.error('Purchase history error:', error);
                this.messages.push({
                    text: 'Xin lỗi, không thể lấy lịch sử mua phim lúc này. Vui lòng thử lại sau hoặc kiểm tra trực tiếp trên website.',
                    sender: 'bot',
                    time: this.getCurrentTime()
                });
            } finally {
                this.isLoading = false;
                this.scrollToBottom();
            }
        }
    }
};
</script>

<style scoped>
.floating-chatbot {
    position: fixed;
    bottom: 25px;
    right: 30px;
    z-index: 99999;
}

/* Chat Bubble Button */
.chat-bubble {
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
    position: relative;
    transition: transform 0.3s, background 0.3s;
    z-index: 99999;
}

@keyframes pulse {
    0% {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    100% {
        box-shadow: 0 4px 20px rgba(229, 9, 20, 0.5);
    }
}

.chat-bubble i {
    font-size: 28px;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
}

.chat-bubble:hover {
    transform: scale(1.05);
    background: linear-gradient(135deg, #f50914 0%, #d20710 100%);
}

.chat-bubble.expanded {
    background: #333;
    transform: scale(1);
    animation: none;
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

@keyframes bounce {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-4px);
    }
}

/* Chat Window */
.chat-window {
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 350px;
    height: 500px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 99999;
}

/* Transition animations */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
}

/* Chat Messages */
.chat-messages {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    background-color: #f8f9fa;
}

.message {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    animation: message-appear 0.3s ease;
    width: 100%;
    box-sizing: border-box;
}

@keyframes message-appear {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.user-message {
    align-items: flex-end;
}

.bot-message {
    align-items: flex-start;
}

.message-content {
    padding: 12px 16px;
    border-radius: 18px;
    max-width: 85%;
    line-height: 1.4;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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

.message-time {
    font-size: 11px;
    color: #888;
    margin-top: 4px;
    padding: 0 4px;
}

/* Typing indicator */
.typing span {
    width: 8px;
    height: 8px;
    background: #aaa;
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

/* Chat Input */
.chat-input {
    display: flex;
    padding: 15px;
    background-color: white;
    border-top: 1px solid #eee;
}

.chat-input input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
    font-size: 14px;
    transition: border-color 0.2s;
}

.chat-input input:focus {
    border-color: #e50914;
}

.send-btn {
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

.send-btn:hover {
    background-color: #c80812;
}

.send-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* Mobile styles */
@media (max-width: 768px) {
    .chat-window {
        position: fixed;
        width: 100%;
        height: 100%;
        bottom: 0;
        right: 0;
        left: 0;
        border-radius: 0;
        box-sizing: border-box;
    }

    .chat-header {
        width: 100%;
        border-radius: 0;
        box-sizing: border-box;
    }

    .chat-messages {
        height: calc(100% - 130px);
        width: 100%;
        box-sizing: border-box;
    }

    .chat-input {
        width: 100%;
        box-sizing: border-box;
    }

    .chat-bubble {
        width: 55px;
        height: 55px;
    }

    .floating-chatbot {
        bottom: 15px;
        right: 15px;
    }
}

/* Quick actions */
.quick-actions {
    margin-top: 10px;
    padding: 10px 0;
    width: 100%;
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
    color: #0078ff;
}

.quick-btn:hover {
    background-color: #f0f0f0;
    border-color: #ccc;
}

/* Additional fix for mobile display */
@media (max-width: 480px) {
    .chat-window {
        width: 100%;
        height: 100%;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        margin: 0;
        border-radius: 0;
        position: fixed;
    }

    .chat-header,
    .chat-messages,
    .chat-input {
        width: 100%;
        box-sizing: border-box;
        border-radius: 0;
    }
}
</style>