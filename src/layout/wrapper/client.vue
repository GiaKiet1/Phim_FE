<template>
    <div class="wrapper">
		<div class="header-wrapper">
            <div >
                <TopClient style="background-image: url(https://i.pinimg.com/originals/d8/09/d8/d809d8c766aa3ff8d5196179ef1cdc19.png);"></TopClient>
            </div>
            <MenuClient></MenuClient>
		</div>
		<div style="background-image: url(https://images.pexels.com/photos/8892/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500);">
            <div class="page-wrapper mb-1">
			<div class="page-content">
                <router-view> </router-view>
            </div>
		</div>
        <BotClient></BotClient>
        </div>
        <ChatbotManager />
	</div>
</template>
<script>
import TopClient from "../components/TopClient.vue";
import MenuClient from "../components/MenuClient.vue";
import BotClient from "../components/BotClient.vue";
import { ChatbotManager } from "../../components/KhachHang/ChatBot";
import "../../assets/js/bootstrap.bundle.min.js";
import "../../assets/js/jquery.min.js";
import "../../assets/plugins/simplebar/js/simplebar.min.js";
import "../../assets/plugins/metismenu/js/metisMenu.min.js";
import "../../assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js";
import "../../assets/js/index.js";
import "../../assets/js/app.js";
import "../../assets/js/pace.min.js";

export default {
    name        :   "app",
    components  :   {
        TopClient, MenuClient, BotClient, ChatbotManager
    }
}
</script>
<style>
@import "../../assets/plugins/simplebar/css/simplebar.css";
@import "../../assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
@import "../../assets/plugins/metismenu/css/metisMenu.min.css";
@import "../../assets/css/pace.min.css";
@import "../../assets/css/bootstrap.min.css";
@import "../../assets/css/bootstrap-extended.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");
@import "../../assets/css/app.css";
@import "../../assets/css/icons.css";
@import "../../assets/css/dark-theme.css";
@import "../../assets/css/semi-dark.css";
@import "../../assets/css/header-colors.css";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css");

/* Ensure chatbot is always visible */
.wrapper {
    position: relative;
    min-height: 100vh;
}

/* Override any conflicting z-index */
.floating-chatbot {
    position: fixed !important;
    z-index: 99999 !important;
}

/* Ensure chat window is above other elements */
.chat-window {
    z-index: 99999 !important;
}
</style>