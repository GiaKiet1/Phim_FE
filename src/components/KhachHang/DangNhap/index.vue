<template>
    <div class="container-fluid">
        <div class="row row-cols-lg-2">
            <div class="col mx-auto">
                <div class="mb-2 text-center">
                  <img src="https://lh3.googleusercontent.com/BqM2bF7Hr-IRcUS8vGgGTsjLZvb1qCiPVf0EO4-HZLJDMtj-slOCmx_FDY8HMHuUJDI" style="height: 150; width: 150px;" class="logo-icon" alt="logo icon" width="180" >
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="border p-4 rounded">
                            <div class="text-center">
                                <h3 class="">ĐĂNG NHẬP TÀI KHOẢN</h3>
                            </div>
                            <hr>
                            <div class="form-body">
                                <div class="row g-3">
                                    <div class="col-12">
                                        <label class="mb-2">Email</label>
                                        <div v-on:keyup.enter="dangNhap()" class="input-group"> <span class="input-group-text"><i
                                                    class="fa-solid fa-envelope"></i></span>
                                            <input v-model="tai_Khoan.email" type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                      <label class="mb-2">Password</label>
                                      <div class="input-group">
                                          <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                                          <input v-on:keyup.enter="dangNhap()" v-model="tai_Khoan.password" :type="showPassword ? 'text' : 'password'" class="form-control">
                                          <span class="input-group-text" @click="togglePasswordVisibility">
                                              <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                          </span>
                                      </div>
                                    </div>
                                    <div class="text-end">
                                          <router-link to="/quen-mat-khau">Quên mật khẩu?</router-link>
                                      </div>
                                    <div class="col-12">
                                        <div class="d-grid">
                                            <button v-on:click="dangNhap()" type="button" class="btn btn-primary"><i
                                                    class="fa-solid fa-lock-open"></i>Đăng
                                                Nhập</button>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <router-link to="/dang-ky">
                                            <div class="d-grid">
                                                <button type="submit" class="btn btn-secondary">Đăng Ký Tài
                                                    Khoản<i class="ms-2 fa-solid fa-arrow-right"></i></button>
                                            </div>
                                        </router-link>
                                    </div>
                                    <hr>
                                    
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
    data() {
        return {
          showPassword: false,
            tai_Khoan: {
                'email': "",
                'password': "",
            }
        }
    },
    methods: {
      
      togglePasswordVisibility() {
              this.showPassword = !this.showPassword;
          },
        dangNhap() {
                axios
                    .post("http://127.0.0.1:8000/api/khach-hang/dang-nhap", this.tai_Khoan)
                    .then((res) => {
                        if (res.data.status == 1) {
                            this.$toast.success(res.data.message);
                            this.tai_Khoan = {
                                'email': "",
                                'password': "",
                            };
                            localStorage.setItem('key_khachhang', res.data.token)
                            localStorage.setItem('id_khach_hang', res.data.id)
                            this.$router.push('/trang-chu')
                        }
                        else {
                            this.$toast.error(res.data.message);
                        }
                    })
                    .catch((res) => {
                        const list = Object.values(res.response.data.errors);
                        list.forEach((v, i) => {
                            this.$toast.error(v[0]);
                        });
                    })
            }
  
        },
  }
  </script>
  <style></style>