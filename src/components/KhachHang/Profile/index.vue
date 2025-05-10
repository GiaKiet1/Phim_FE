<template lang="">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <ul class="nav nav-tabs nav-primary" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-bs-toggle="tab" href="#primaryhome" role="tab"
                                aria-selected="true">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon"><i class="fa-solid fa-user font-18 me-1"></i>
                                    </div>
                                    <div class="tab-title">Profile</div>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="tab" href="#primarycontact" role="tab"
                                aria-selected="false" tabindex="-1">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon"><i class="fa-solid fa-lock font-18 me-1"></i>
                                    </div>
                                    <div class="tab-title">Đổi mật khẩu</div>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="tab" href="#naptienTK" role="tab" aria-selected="false"
                                tabindex="-1">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon me-1"><i class="fa-solid fa-money-check-dollar"></i>
                                    </div>
                                    <div class="tab-title">Nạp Tiền</div>
                                </div>
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="tab" href="#lichsunaptien" role="tab" aria-selected="false"
                                tabindex="-1">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon me-1"><i class="fa-solid fa-money-check-dollar"></i>
                                    </div>
                                    <div class="tab-title">Lịch Sử Nạp Tiền</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content py-3">
                        <div class="tab-pane fade show active" id="primaryhome" role="tabpanel">
                            <div class="row">
                                <div class="col-lg-4 d-flex">
                                    <div class="card flex-fill">
                                        <div class="card-body">
                                            <div class="d-flex flex-column align-items-center text-center position-relative">
                                                <img src="https://anhcute.net/wp-content/uploads/2024/09/Hinh-anh-chibi-sieu-nhan-nhen.jpg"
                                                    style="width: 140px; height: 140px;" class="rounded-circle p-1 bg-primary">
                                                <div class="mt-3">
                                                    <h4>{{ thong_tin.ho_va_ten }}</h4>
                                                    <p class="text-secondary mb-1">{{ thong_tin.email }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8 d-flex">
                                    <div class="card flex-fill">
                                        <div class="card-body">
                                            <div class="row mb-3">
                                                <div class="col-lg-3">
                                                    <h6 class="mb-0">Họ và Tên</h6>
                                                </div>
                                                <div class="col-lg-9 text-secondary">
                                                    <input type="text" v-model="thong_tin.ho_va_ten"
                                                        class="form-control" placeholder="Nhập họ và tên">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-lg-3">
                                                    <h6 class="mb-0">Email</h6>
                                                </div>
                                                <div class="col-lg-9 text-secondary">
                                                    <input disabled v-model="thong_tin.email" type="text"
                                                        class="form-control" placeholder="Nhập email">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-lg-3">
                                                    <h6 class="mb-0">Số Điện Thoại</h6>
                                                </div>
                                                <div class="col-lg-9 text-secondary">
                                                    <input v-model="thong_tin.so_dien_thoai" type="text"
                                                        class="form-control" placeholder="Nhập số điện thoại">
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-lg-3">
                                                    <h6 class="mb-0">Ngày Sinh</h6>
                                                </div>
                                                <div class="col-lg-9 text-secondary">
                                                    <input v-model="thong_tin.ngay_sinh" type="date"
                                                        class="form-control" placeholder="Nhập số điện thoại">
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-3"></div>
                                                <div class="col-lg-9 text-secondary">
                                                    <button type="button" class="btn btn-primary px-4"
                                                        @click="thayDoiThongTin()">Lưu</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        
                        <div class="tab-pane fade" id="primarycontact" role="tabpanel">
                            <div class="col">
                                <h4>Thay đổi mật khẩu</h4>
                            </div>
                            <div class="col">Quản lý mật khẩu để bảo mật tài khoản</div>
                            <hr>
                            <div class="row mb-2">
                                <div class="col-lg-2">
                                    <label for="">Mật khẩu cũ</label>
                                </div>
                                <div class="col-lg-3">
                                    <input v-model="doi_mat_khau.old_password" type="password" placeholder="Nhập mật khẩu cũ" class="form-control">
                                </div>
                            </div>

                            <div class="row mb-2">
                                <div class="col-lg-2">
                                    <label  for="">Mật khẩu mới</label>
                                </div>
                                <div class="col-lg-3">
                                    <input v-model="doi_mat_khau.new_password" type="password" placeholder="Nhập mật khẩu mới" class="form-control">
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-lg-2">
                                    <label for="">Nhập lại Mật khẩu mới </label>
                                </div>
                                <div class="col-lg-3">
                                    <input v-model="doi_mat_khau.re_password" type="password" placeholder="Nhập lại mật khẩu mới" class="form-control">
                                </div>
                            </div>
                            <button class="btn btn-primary" @click="doiMatKhau()">Lưu</button>
                        </div>


                        
                        <div class="tab-pane fade" id="naptienTK" role="tabpanel">
                            <div class="col">
                                <h4>Nạp Tiền Tài Khoản</h4>
                            </div>
                            <div class="col">Nạp Tiền Và Lịch Sử Nạp Tiền</div>
                            <hr>
                            <hr>
                            <div class="row">
                                <div class="col-lg-5 col-md-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <label class="mb-2">Nhập Số Tiền Nạp</label>
                                            <input v-model="so_tien_nap" type="text" class="form-control">
                                            <hr>
                                            <div class="row">
                                                <div class="col-lg-12 text-end">
                                                    <button v-on:click="xacNhanNapTien()" class="btn btn-primary"
                                                        data-bs-toggle="modal" data-bs-target="#xacNhanNap">Nạp
                                                        Tiền</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-lg-7 col-md-6">
                                    <div class="card">
                                        <div class="card-header">
                                           <h6 class="card-title mt-2">Lịch Sử Nạp Tiền Gần Đây </h6>
                                            
                                        </div>
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="table table-bordered table-hover">
                                                    <thead>
                                                        <tr class="table-primary text-center">
                                                            <th>STT</th>
                                                            <th>Số Tiền Nạp</th>
                                                            <th>Ngày Nạp</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <template v-for="(v, i) in listLichSuNap" :key="i">
                                                            <template v-if="i<3">
                                                                <tr class="align-middle">
                                                                    <th class="text-center">{{ i + 1 }}</th>
                                                                    <td class="text-end">{{ formatCurrency(v.so_tien_nap) }}</td>
                                                                    <td class="text-center">{{ formatDateTime(v.created_at) }}</td>
                                                                </tr>
                                                            </template>
                                                        </template>
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="lichsunaptien" role="tabpanel">
                            <div class="col">
                                <h4>Lịch Sử Nạp Tiền</h4>
                            </div>
                            <div class="col"></div>
                            <hr>
                            
                            <div class="card">
                                        
                                        <div class="card-body">
                                            <div class="table-responsive">
                                                <table class="table table-bordered table-hover">
                                                    <thead>
                                                        <tr class="table-primary text-center">
                                                            <th>STT</th>
                                                            <th>Số Tiền Nạp</th>
                                                            <th>Ngày Nạp</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <template v-for="(v, i) in listLichSuNap" :key="i">
                                                                <tr class="align-middle">
                                                                    <th class="text-center">{{ i + 1 }}</th>
                                                                    <td class="text-end">{{ formatCurrency(v.so_tien_nap) }}</td>
                                                                    <td class="text-center">{{ formatDateTime(v.created_at) }}</td>
                                                                </tr>
                                                        </template>
                                                        
                                                    </tbody>
                                                    
                                                </table>
                                                <h6 class="text-end"><b>Tổng tiền đã nạp:</b> {{ formatCurrency(listLichSuNap.reduce((total, item) => total + item.so_tien_nap, 0)) }}</h6>
                                            </div>
                                        </div>
                                    </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal nạp tiền -->
    <div class="modal fade" id="xacNhanNap" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Xác Nhận Nạp Tiền</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-success">
                            Bạn hãy thanh toán số tiền này qua QR này. Số tiền này sẽ được cộng vào tài khoản của bạn sau khi chúng tôi xác nhận!
                            <p>Vui lòng không thay đổi nội dung thanh toán, nếu có sự cố hãy liên hệ với chúng tôi!</p>
                            
                        </div>
                        <div class="row">
                              <div v-if="so_tien_nap > 0" class="col-lg-12 text-center">
                                  <img v-bind:src="link_qr" style="width: 500px;" class="img-fluid" alt="">
                              </div>
                          </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    </div>
                    </div>
                </div>
                </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            thong_tin: {},
            doi_mat_khau: {},
            so_tien_nap: 0,
            link_qr: '',
            listLichSuNap: [],
        }
    },
    methods: {
        loadLichSuNap(){
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/lich-su-nap", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khachhang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.listLichSuNap = res.data.data;
                    } else {
                        this.$toast.error(res.data.message);
                        this.$router.push('/');
                    }
                })
        },
        xacNhanNapTien() {
            var payload = {
                so_tien_nap: this.so_tien_nap
            }
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/nap-tien', payload,  {
                    headers : {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khachhang")
                    }
                })
                .then((res) => {
                    if(res.data.status == 1) {
                        this.$toast.success(res.data.message);
                        var noi_dung_chuyen_khoan = res.data.noi_dung_chuyen_khoan;
                        this.link_qr = "https://img.vietqr.io/image/970436-9357250453-compact2.png?amount=" + this.so_tien_nap + "&addInfo=" + noi_dung_chuyen_khoan + "&accountName=Tran Gia Kiet";
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
        },
        layThongTin(){
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/lay-thong-tin", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khachhang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.thong_tin = res.data.thong_tin;
                    } else {
                        this.$toast.error(res.data.message);
                        this.$router.push('/');
                    }
                })
        },
        thayDoiThongTin() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/cap-nhat-thong-tin", this.thong_tin, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khachhang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.layThongTin();

                    } else {
                        this.$toast.error(res.data.message);
                        this.$router.push('/');
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        doiMatKhau() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/doi-mat-khau-profile", this.doi_mat_khau, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_khachhang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.layThongTin();

                    } else {
                        this.$toast.error(res.data.message);
                        // this.$router.push('/');
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        formatCurrency(value) {
            if (!value) return '0 VNĐ';
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        formatDateTime(dateTime) {
            if (!dateTime) return '';
            const date = new Date(dateTime);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        }
    },
    mounted() {
        this.layThongTin();
        this.loadLichSuNap();
    },
}
</script>
<style lang="">
    
</style>