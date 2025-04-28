<template>
    <div class="container-fluid">
        <div class="row row-cols-lg-2">
            <div class="col mx-auto">
                <div class="mb-4 text-center">
                    <img src="https://lh3.googleusercontent.com/BqM2bF7Hr-IRcUS8vGgGTsjLZvb1qCiPVf0EO4-HZLJDMtj-slOCmx_FDY8HMHuUJDI" width="180" alt="">
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="border p-4 rounded">
                            <div class="text-center">
                                <h3 class="">ĐỔI MẬT KHẨU</h3>
                            </div>
                            <hr>
                            <div class="form-body">
                                <div class="row g-3">
                                    <div class="col-12">
                                        <label class="mb-2">Mật Khẩu Mới</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                                            <input v-on:keyup.enter="thayDoiMatKhau()" v-model="tai_Khoan.password" :type="showPassword ? 'text' : 'password'" class="form-control">
                                            <span class="input-group-text" @click="togglePasswordVisibility">
                                                <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <label class="mb-2">Xác Nhận Mật Khẩu</label>
                                            <div class="input-group">
                                                <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                                                <input v-on:keyup.enter="thayDoiMatKhau()" v-model="tai_Khoan.re_password" :type="showConfirmPassword ? 'text' : 'password'" class="form-control">
                                                <span class="input-group-text" @click="toggleConfirmPasswordVisibility">
                                                    <i :class="showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                                </span>
                                            </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="d-grid">
                                            <button v-on:click="thayDoiMatKhau()" type="submit"
                                                class="btn btn-primary"><i class="fa-solid fa-lock-open"></i>Thay Đổi Mật Khẩu</button>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <router-link to="/dang-nhap">
                                            <div class="d-grid">
                                                <button type="submit" class="btn btn-secondary">Đăng Nhập<i
                                                        class="ms-2 fa-solid fa-arrow-right"></i></button>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props: ['hash_reset'],
    data() {
        return {
            showPassword: false,
            tai_Khoan:{
                hash_reset : this.$route.params.hash_reset
            }
        };
    },
    methods: {
        thayDoiMatKhau(){
            axios
            .post('http://127.0.0.1:8000/api/khach-hang/doi-mat-khau',this.tai_Khoan)
            .then((res)=>{
                if(res.data.status){
                    this.$toast.success(res.data.message);
                    this.$router.push('/dang-nhap')
                }else{
                    this.$toast.error(res.data.message)
                }
                })
            // .catch((err) => {
            //     this.$toast.error("Có lỗi xảy ra!")
            // })
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        }
    }
}
</script>
<style></style>