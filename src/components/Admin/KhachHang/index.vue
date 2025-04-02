<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="mt-2">Danh Sách Khách Hàng</h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <div class="input-group mt-3 mb-2 w-100">
                            <input v-on:keyup.enter="timKiem()" v-model="search.noi_dung" type="text"
                                class="form-control search-control border border-1 border-secondary"
                                placeholder="Search...">
                            <span class="position-absolute top-50 search-show translate-middle-y" style="left: 15px;"><i
                                    class="bx bx-search"></i></span>
                            <button v-on:click="timKiem()" class="btn btn-outline-secondary" type="button">Tìm
                                Kiếm</button>
                        </div>
                        <table class="table table-bordered table-hover">

                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Họ và Tên</th>
                                    <th class="text-center">Email</th>
                                    <th class="text-center">Ngày Sinh</th>
                                    <th class="text-center">Số Điện Thoại</th>
                                    <th class="text-center">Số Dư</th>
                                    <th class="text-center">Tình Trạng</th>
                                    <th class="text-center">Kích Hoạt</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, i) in listKhachHang" :key="i">
                                    <tr>
                                        <th class="text-center align-middle">{{ i + 1 }}</th>
                                        <td class="align-middle">{{ v.ho_va_ten }}</td>
                                        <td class="text-center align-middle">{{ v.email }}</td>
                                        <td class="text-center align-middle">{{ v.ngay_sinh }}</td>
                                        <td class="text-center align-middle">{{ v.so_dien_thoai }}</td>
                                        <td class="text-center align-middle">
                                            <button v-on:click="loadLichSu(v)" class="btn btn-secondary w-100" data-bs-toggle="modal" data-bs-target="#lsgiaodich">{{ formatVND(v.so_du) }}</button>
                                        </td>
                                        <td class="text-center align-middle">
                                            <template v-if="v.is_block == 0">
                                                <button v-on:click="doiTrangThai(v)" class="btn btn-success">Hoạt
                                                    Động</button>
                                            </template>
                                            <template v-else>
                                                <button v-on:click="doiTrangThai(v)" class="btn btn-danger">Đã
                                                    Khóa</button>
                                            </template>
                                        </td>
                                        <td class="text-center align-middle">
                                            <template v-if="v.is_active == 1">
                                                <button class="btn btn-success">Đã Kích Hoạt</button>
                                            </template>
                                            <template v-else>
                                                <button class="btn btn-danger">Chưa Kích Hoạt</button>
                                            </template>
                                        </td>
                                        <td class="text-center align-middle">
                                            <button v-on:click="Object.assign(nap_tien, v)" class="btn btn-info me-2"
                                                data-bs-toggle="modal" data-bs-target="#naptien">Nạp Tiền</button>
                                            <button v-on:click="Object.assign(edit, v)" class="btn btn-primary me-2"
                                                data-bs-toggle="modal" data-bs-target="#sua">Sửa</button>
                                            <button v-on:click="Object.assign(del, v)" class="btn btn-danger"
                                                data-bs-toggle="modal" data-bs-target="#xoa">Xóa</button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Sửa -->
    <div class="modal fade" id="sua" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Cập Nhật Khách Hàng</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12 mb-2">
                        <label class="form-label">Họ và Tên</label>
                        <input v-model="edit.ho_va_ten" type="text" class="form-control">
                    </div>
                    <div class="col-md-12 mb-2">
                        <label class="form-label">Email</label>
                        <input v-model="edit.email" type="email" class="form-control">
                    </div>
                    <div class="col-md-12 mb-2">
                        <label class="form-label">Số Điện Thoại</label>
                        <input v-model="edit.so_dien_thoai" type="text" class="form-control">
                    </div>
                    <div class="col-md-12 mb-2">
                        <label class="form-label">Ngày Sinh</label>
                        <input v-model="edit.ngay_sinh" type="date" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="suaKhachHang()" type="button" class="btn btn-primary"
                        data-bs-dismiss="modal">Xác
                        Nhận</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Xóa -->
    <div class="modal fade" id="xoa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Xóa Khách Hàng</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-white"><i class="bx bxs-message-square-x"></i>
                            </div>
                            <div class="ms-1">
                                <h6 class="mb-1 text-white">Bạn chắc chắc xóa tài khoản khách hàng <b>{{ del.ho_va_ten
                                        }}</b> này chứ
                                    !!!</h6>
                                <div class="text-white text-nowrap"><b>LƯU Ý !!!</b> Điều này không thể khôi
                                    phục
                                    khi ấn xác nhận
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="xoaKhachHang()" type="button" class="btn btn-danger"
                        data-bs-dismiss="modal">Xóa</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Nạp Tiền -->
    <div class="modal fade" id="naptien" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Nạp Tiền</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label>Số Tiền</label>
                    <input v-model="nap_tien.so_tien" type="number" class="form-control mt-1 mb-2">
                    <label>Nội Dung</label>
                    <input v-model="nap_tien.noi_dung" type="text" class="form-control mt-1 mb-2">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="napTien()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác
                        Nhận</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Lịch Sử Giao Dịch-->
<div class="modal fade" id="lsgiaodich" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Lịch Sử Nạp Tiền</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="r">
            <div class="col-lg-12">
                <div class="table-responsive">
                    <table class="table table-hover table-bordered">
                        <thead>
                            <tr class="align-middle">
                                <th class="text-center">STT</th>
                                <th class="text-center">Nhân Viên</th>
                                <th class="text-center">Số Tiền</th>
                                <th class="text-center">Nội Dung</th>
                                <th class="text-center">Kiểu Nạp</th>
                                <th class="text-center">Ngày Nạp</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(v, i) in list_lich_su" :key="i">
                                <tr class="align-middle">
                                    <th class="text-center">{{ i + 1 }}</th>
                                    <td>{{ v.ten_nv }}</td>
                                    <td class="text-end">{{ formatVND(v.so_tien) }}</td>
                                    <td class="">{{ v.noi_dung }}</td>
                                    <td>{{ v.kieu_nap }}</td>
                                    <td class="text-center">{{ v.created_at }}</td>
                                </tr>
                            </template>
                        </tbody>

                    </table>
                </div>
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
import axios from 'axios'
export default {
    data() {
        return {
            create: {},
            edit: {},
            del: {},
            listKhachHang: [],
            search: {},
            nap_tien: {},
            list_lich_su: []
        }
    },
    mounted() {
        this.loadKhachHang()
        
    },
    methods: {
        loadLichSu(value){
            axios
                .post('http://127.0.0.1:8000/api/admin/nap-tien/data-one', value, {
                    headers : {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                    }
                })
                .then((res) => {
                    this.list_lich_su = res.data.data;
                })
        },
        formatVND(value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        napTien() {
            axios
                .post("http://127.0.0.1:8000/api/admin/nap-tien/create", this.nap_tien, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if(res.data.status){
                        this.$toast.success(res.data.message);
                        this.nap_tien = {};
                        this.loadKhachHang();
                    }
                })
                .catch((res) => {
                    const listKhachHang = Object.values(res.response.data.errors);
                    listKhachHang.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        doiTrangThai(value) {
            axios
                .post("http://127.0.0.1:8000/api/admin/khach-hang/change-status", value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadKhachHang();
                        this.$toast.success(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        timKiem() {
            axios
                .post("http://127.0.0.1:8000/api/admin/khach-hang/tim-kiem", this.search, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    this.listKhachHang = res.data.data
                })
                .catch((res) => {
                    const listKhachHang = Object.values(res.response.data.errors);
                    listKhachHang.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        loadKhachHang() {
            axios
                .get('http://127.0.0.1:8000/api/admin/khach-hang/data', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    this.listKhachHang = res.data.data;
                })
        },
        xoaKhachHang() {
            axios
                .post('http://127.0.0.1:8000/api/admin/khach-hang/delete', this.del, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadKhachHang();
                        this.$toast.success(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        suaKhachHang() {
            axios
                .post('http://127.0.0.1:8000/api/admin/khach-hang/update', this.edit, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('key_admin')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadKhachHang();
                        this.$toast.success(res.data.message);
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