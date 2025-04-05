<template>
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h4 class="mt-2">Thêm Mới Thể Loại</h4>
                </div>
                <div class="card-body">
                    <label>Tên Thể Loại</label>
                    <input v-model="create.ten_the_loai" type="text" class="form-control mt-1 mb-2">
                    <label>Slug Thể Loại</label>
                    <input v-model="create.slug_the_loai" type="text" class="form-control mt-1 mb-2">
                    <label>Tình Trạng</label>
                    <select v-model="create.tinh_trang" class="form-control mt-1">
                        <option value="0">Hiển Thị</option>
                        <option value="1">Tạm Tắt</option>
                    </select>
                </div>
                <div class="card-footer text-end">
                    <button v-on:click="themTheLoai()" class="btn btn-primary">Thêm Mới</button>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card">
                <div class="card-header">
                    <h4 class="mt-2">Danh Sách Thể Loại</h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover table-bordered">
                            <thead>
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>Tên Thể Loại</th>
                                    <th>Slug Thể Loại</th>
                                    <th>Tình Trạng</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                               <template v-for="(v,i) in listTheLoai" :key="i">
                                    <tr class="text-center align-middle">
                                        <th>{{ i+1 }}</th>
                                        <td>{{ v.ten_the_loai }}</td>
                                        <td>{{ v.slug_the_loai }}</td>
                                        <td>
                                            <button v-on:click="doiTrangThai(v)" v-if="v.tinh_trang==0" class="btn btn-success">Hiển Thị</button>
                                            <button v-on:click="doiTrangThai(v)" v-else class="btn btn-secondary">Tạm Tắt</button>
                                        </td>
                                        <td>
                                            <button
                                                v-on:click="Object.assign(edit, v)"
                                                class="btn btn-primary me-2"
                                                data-bs-toggle="modal"
                                                data-bs-target="#sua"
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                v-on:click="Object.assign(del, v)"
                                                class="btn btn-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#xoa"
                                            >
                                                Xóa
                                            </button>
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
                    <h5 class="modal-title" id="exampleModalLabel">Cập Nhật Thể Loại</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label>Tên Thể Loại</label>
                    <input v-model="edit.ten_the_loai" type="text" class="form-control mt-1 mb-2">
                    <label>Slug Thể Loại</label>
                    <input v-model="edit.slug_the_loai" type="text" class="form-control mt-1 mb-2">
                    <label>Tình Trạng</label>
                    <select v-model="edit.tinh_trang" class="form-control mt-1">
                        <option value="0">Hiển Thị</option>
                        <option value="1">Tạm Tắt</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="suaTheLoai()" type="button" class="btn btn-primary"
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
                    <h5 class="modal-title" id="exampleModalLabel">Xóa Thể Loại</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-white"><i class="bx bxs-message-square-x"></i>
                            </div>
                            <div class="ms-1">
                                <h6 class="mb-1 text-white">Bạn chắc chắc xóa thể loại <b>{{ del.ten_the_loai
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
                    <button v-on:click="xoaTheLoai()" type="button" class="btn btn-danger"
                        data-bs-dismiss="modal">Xóa</button>
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
            del: {},
            edit: {},
            create: {},
            listTheLoai: []
        }
    },
    mounted() {
        this.loadTheLoai();
    },
    methods: {
        doiTrangThai(value){
            axios
                .post(
                "http://127.0.0.1:8000/api/admin/the-loai/change-status",
                value,
                {
                    headers: {
                    Authorization: "Bearer " + localStorage.getItem("key_admin"),
                    },
                }
                )
                .then((res) => {
                if (res.data.status) {
                    this.loadTheLoai();
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
        xoaTheLoai(){
            axios
                .post("http://127.0.0.1:8000/api/admin/the-loai/delete", this.del, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("key_admin"),
                },
                })
                .then((res) => {
                if (res.data.status) {
                    this.loadTheLoai();
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
        suaTheLoai(){
            axios
                .post("http://127.0.0.1:8000/api/admin/the-loai/update", this.edit, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("key_admin"),
                },
                })
                .then((res) => {
                if (res.data.status) {
                    this.loadTheLoai();
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
        themTheLoai(){
            axios
                .post("http://127.0.0.1:8000/api/admin/the-loai/create", this.create, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("key_admin"),
                },
                })
                .then((res) => {
                if (res.data.status) {
                    this.$toast.success(res.data.message);
                    this.loadTheLoai();
                }
                })
                .catch((res) => {
                const list = Object.values(res.response.data.errors);
                list.forEach((v, i) => {
                    this.$toast.error(v[0]);
                });
                });
        },
        loadTheLoai(){
            axios
                .get("http://127.0.0.1:8000/api/admin/the-loai/data", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("key_admin"),
                },
                })
                .then((res) => {
                this.listTheLoai = res.data.data;
                });
        }
    },
}
</script>
<style>
    
</style>