<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h4 class="mt-2">Danh Sách Phim</h4>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#themmoi"><i
                            class="fa-solid fa-plus"></i> Thêm Mới</button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <div class="input-group mt-3 mb-2 w-100">
                            <input v-on:keyup.enter="timKiem()" v-model="search.noi_dung" type="text"
                                class="form-control search-control border border-1 border-secondary"
                                placeholder="Search..." />
                            <span class="position-absolute top-50 search-show translate-middle-y" style="left: 15px"><i
                                    class="bx bx-search"></i></span>
                            <button v-on:click="timKiem()" class="btn btn-outline-secondary" type="button">
                                Tìm Kiếm
                            </button>
                        </div>
                        <table class="table table-hover table-bordered">
                            <thead>
                                <tr class="text-center align-middle">
                                    <th>STT</th>
                                    <th>Tên Phim</th>
                                    <th>Slug Phim</th>
                                    <th>Hình Ảnh</th>
                                    <th>Thể Loại</th>
                                    <th>Loại Phim</th>
                                    <th>Đạo Diễn</th>
                                    <th>Diễn Viên</th>
                                    <th>Quốc Gia</th>
                                    <th>Thời Lượng</th>
                                    <th>Mô Tả</th>
                                    <th>Trailer</th>
                                    <th>Link Phim</th>
                                    <th>Ngày Khởi Chiếu</th>
                                    <th>Ngày Kết Thúc</th>
                                    <th>Giá Bán</th>
                                    <th>Trạng Thái</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, i) in listPhim" :key="i">
                                    <tr class="text-center align-middle">
                                        <th>{{ i + 1 }}</th>
                                        <td>{{ v.ten_phim }}</td>
                                        <td>{{ v.slug_phim }}</td>
                                        <td><img :src="v.hinh_anh" style="width: 150px;"></td>
                                        <td>{{ v.ten_the_loai }}</td>
                                        <td>
                                            <button v-if="v.loai_phim == 1" class="btn btn-success">Phim Chiếu
                                                Rạp</button>
                                            <button v-else class="btn btn-warning">Phim Bộ</button>
                                        </td>
                                        <td>{{ v.dao_dien }}</td>
                                        <td>{{ v.dien_vien }}</td>
                                        <td>{{ v.quoc_gia }}</td>
                                        <td>{{ v.thoi_luong }} phút</td>
                                        <td><button v-on:click="Object.assign(mo_ta_phim, v)" class="btn rounded-circle"
                                                data-bs-toggle="modal" data-bs-target="#mota"><i
                                                    class="fa-solid fa-info ms-1"></i></button></td>
                                        <td>
                                            <iframe width="560" height="315" :src="v.trailer"></iframe>
                                        </td>
                                        <td>{{ v.link_phim }}</td>
                                        <td>{{ v.ngay_khoi_chieu }}</td>
                                        <td>{{ v.ngay_ket_thuc }}</td>
                                        <td>{{ formatCurrency(v.gia_ban) }}</td>

                                        <td>
                                            <button v-on:click="doiTrangThai(v)" v-if="v.trang_thai == 0"
                                                class="btn btn-success">Hiển Thị</button>
                                            <button v-on:click="doiTrangThai(v)" v-else class="btn btn-secondary">Tạm
                                                Tắt</button>
                                        </td>
                                        <td>
                                            <button v-on:click="Object.assign(edit, v)" class="btn btn-info me-2"
                                                data-bs-toggle="modal" data-bs-target="#sua"><i
                                                    class="fa-solid fa-edit"></i> Sửa</button>
                                            <button v-on:click="Object.assign(del, v)" class="btn btn-danger"
                                                data-bs-toggle="modal" data-bs-target="#xoa"><i
                                                    class="fa-solid fa-trash"></i> Xóa</button>
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
    <!-- Modal Mô tả-->
    <div class="modal fade" id="mota" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Mô Tả Phim</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>{{ mo_ta_phim.mo_ta }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal thêm mới-->
    <div class="modal fade" id="themmoi" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Phim Chiếu Rạp</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg">
                            <label>Tên Phim</label>
                            <input v-model="create.ten_phim" type="text" class="form-control mt-1 mb-2">
                            <label>Thể Loại</label>
                            <select v-model="create.id_the_loai" class="form-control mt-1 mb-2">
                                <template v-for="(v, i) in listTheLoai" :key="i">
                                    <option :value="v.id">{{ v.ten_the_loai }}</option>
                                </template>
                            </select>
                            <label>Ngày Khởi Chiếu</label>
                            <input v-model="create.ngay_khoi_chieu" type="date" class="form-control mt-1 mb-2">
                            <label>Link Phim</label>
                            <input v-model="create.link_phim" type="text" class="form-control mt-1 mb-2">
                            <label>Trailer</label>
                            <input v-model="create.trailer" type="text" class="form-control mt-1 mb-2">
                        </div>
                        <div class="col-lg">
                            <label>Slug Phim</label>
                            <input v-model="create.slug_phim" type="text" class="form-control mt-1 mb-2">
                            <label>Diễn Viên</label>
                            <input v-model="create.dien_vien" type="text" class="form-control mt-1 mb-2">
                            <label>Ngày Kết Thúc</label>
                            <input v-model="create.ngay_ket_thuc" type="date" class="form-control mt-1 mb-2">
                            <label>Hình Ảnh</label>
                            <input v-model="create.hinh_anh" type="text" class="form-control mt-1 mb-2">    
                            <label>Thời Lượng</label>
                            <input v-model="create.thoi_luong" type="number" class="form-control mt-1 mb-2">                      
                        </div>
                        <div class="col">
                            <label>Đạo Diễn</label>
                            <input v-model="create.dao_dien" type="text" class="form-control mt-1 mb-2">
                            <label>Quốc Gia</label>
                            <input v-model="create.quoc_gia" type="text" class="form-control mt-1 mb-2">
                            
                            <label>Trạng Thái</label>
                            <select v-model="create.trang_thai" class="form-control mt-1 mb-2">
                                <option value="0">Hiển Thị</option>
                                <option value="1">Tạm Tắt</option>
                            </select>
                            <label>Loại Phim</label>
                            <select v-model="create.loai_phim" class="form-control mt-1 mb-2">
                                <option value="1">Phim Chiếu Rạp</option>
                                <option value="2">Phim Bộ</option>
                            </select>
                            <label>Giá Bán</label>
                            <input type="number" class="form-control mt-1 mb-2" v-model="create.gia_ban">    
                        </div>

                        <div class="col-lg-12">
                            <label>Mô Tả</label>
                            <textarea v-model="create.mo_ta" class="form-control mt-1 mb-2" style="height: calc(1em + 200px);"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="themMoiPhim()" type="button" class="btn btn-primary"
                        data-bs-dismiss="modal">Thêm
                        Mới</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Sửa -->
    <div class="modal fade" id="sua" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Cập Nhật Phim</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg">
                            <label>Tên Phim</label>
                            <input v-model="edit.ten_phim" type="text" class="form-control mt-1 mb-2">
                            <label>Thể Loại</label>
                            <select v-model="edit.id_the_loai" class="form-control mt-1 mb-2">
                                <template v-for="(v, i) in listTheLoai" :key="i">
                                    <option :value="v.id">{{ v.ten_the_loai }}</option>
                                </template>
                            </select>
                            <label>Ngày Khởi Chiếu</label>
                            <input v-model="edit.ngay_khoi_chieu" type="date" class="form-control mt-1 mb-2">
                            <label>Link Phim</label>
                            <input v-model="edit.link_phim" type="text" class="form-control mt-1 mb-2">
                            <label>Trailer</label>
                            <input v-model="edit.trailer" type="text" class="form-control mt-1 mb-2">
                        </div>
                        <div class="col-lg">
                            <label>Slug Phim</label>
                            <input v-model="edit.slug_phim" type="text" class="form-control mt-1 mb-2">
                            <label>Diễn Viên</label>
                            <input v-model="edit.dien_vien" type="text" class="form-control mt-1 mb-2">
                            <label>Ngày Kết Thúc</label>
                            <input v-model="edit.ngay_ket_thuc" type="date" class="form-control mt-1 mb-2">
                            <label>Hình Ảnh</label>
                            <input v-model="edit.hinh_anh" type="text" class="form-control mt-1 mb-2">    
                            <label>Thời Lượng</label>
                            <input v-model="edit.thoi_luong" type="number" class="form-control mt-1 mb-2">                      
                        </div>
                        <div class="col">
                            <label>Đạo Diễn</label>
                            <input v-model="edit.dao_dien" type="text" class="form-control mt-1 mb-2">
                            <label>Quốc Gia</label>
                            <input v-model="edit.quoc_gia" type="text" class="form-control mt-1 mb-2">
                            
                            <label>Trạng Thái</label>
                            <select v-model="edit.trang_thai" class="form-control mt-1 mb-2">
                                <option value="0">Hiển Thị</option>
                                <option value="1">Tạm Tắt</option>
                            </select>
                            <label>Loại Phim</label>
                            <select v-model="edit.loai_phim" class="form-control mt-1 mb-2">
                                <option value="1">Phim Chiếu Rạp</option>
                                <option value="2">Phim Bộ</option>
                            </select>
                            <label>Giá Bán</label>
                            <input type="number" class="form-control mt-1 mb-2" v-model="edit.gia_ban">    
                        </div>

                        <div class="col-lg-12">
                            <label>Mô Tả</label>
                            <textarea v-model="edit.mo_ta" class="form-control mt-1 mb-2" style="height: calc(1em + 200px);"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="suaPhim()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác
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
                    <h5 class="modal-title" id="exampleModalLabel">Xóa Phim</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-white">
                                <i class="bx bxs-message-square-x"></i>
                            </div>
                            <div class="ms-1">
                                <h6 class="mb-1 text-white">
                                    Bạn chắc chắc xóa phim
                                    <b>{{ del.ten_phim }}</b> này chứ !!!
                                </h6>
                                <div class="text-white text-nowrap">
                                    <b>LƯU Ý !!!</b> Điều này không thể khôi phục khi ấn xác nhận
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Đóng
                    </button>
                    <button v-on:click="xoaPhim()" type="button" class="btn btn-danger" data-bs-dismiss="modal">
                        Xóa
                    </button>
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
            mo_ta_phim: {},
            edit: {},
            del: {},
            create: {
            },
            listPhim: [],
            search: {},
            listTheLoai: [],
        }
    },
    mounted() {
        this.loadPhim();
        this.loadTheLoai();
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        loadTheLoai() {
            axios
                .get(
                    "http://127.0.0.1:8000/api/admin/the-loai/data-open",
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("key_admin"),
                        },
                    }
                )
                .then((res) => {
                    this.listTheLoai = res.data.data;
                })
        },
        timKiem() {
            axios
                .post(
                    "http://127.0.0.1:8000/api/admin/phim/tim-kiem",
                    this.search,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("key_admin"),
                        },
                    }
                )
                .then((res) => {
                    this.listPhim = res.data.data;
                })
                .catch((res) => {
                    const listPhim = Object.values(res.response.data.errors);
                    listPhim.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        doiTrangThai(value) {
            axios
                .post(
                    "http://127.0.0.1:8000/api/admin/phim/change-status",
                    value,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("key_admin"),
                        },
                    }
                )
                .then((res) => {
                    if (res.data.status) {
                        this.loadPhim();
                        this.$toast.success(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        xoaPhim() {
            axios
                .post("http://127.0.0.1:8000/api/admin/phim/delete", this.del, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("key_admin"),
                    },
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadPhim();
                        this.$toast.success(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        suaPhim() {
            axios
                .post("http://127.0.0.1:8000/api/admin/phim/update", this.edit, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("key_admin"),
                    },
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadPhim();
                        this.$toast.success(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        themMoiPhim() {
            axios
                .post("http://127.0.0.1:8000/api/admin/phim/create", this.create, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("key_admin"),
                    },
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.create = {

                        };
                        this.loadPhim();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.data.errors) {
                        const list = Object.values(error.response.data.errors);
                        list.forEach((v) => {
                            this.$toast.error(v[0]);
                        });
                    } else {
                        this.$toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
                    }
                });
        },
        loadPhim() {
            axios
                .get("http://127.0.0.1:8000/api/admin/phim/data", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("key_admin"),
                    },
                })
                .then((res) => {
                    this.listPhim = res.data.data;
                });
        }
    }
}
</script>
<style></style>