import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Default from './layout/wrapper/index.vue'
import ClientView from './layout/wrapper/client.vue'
import Toaster from "@meforma/vue-toaster";
import DangnhapView from './layout/wrapper/dangnhap.vue';
import vue3GoogleLogin from 'vue3-google-login'
const app = createApp(App)



app.use(router)
app.use(Toaster, {
    position: "top-right",
  });
app.component("default-layout", Default);
app.component("client-view-layout", ClientView);
app.component("dangnhap-view-layout", DangnhapView);
app.use(vue3GoogleLogin, {
  clientId: '264563988007-qke74sb5oumb5jr033mvggrnfhbl1sgu.apps.googleusercontent.com'
})
app.mount("#app")