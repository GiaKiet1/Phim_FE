<template>
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h4 class="mt-2">Thêm Chức Năng Mới</h4>
                </div>
                <div class="card-body">
                    <label>Tên Chức Năng</label>
                    <input v-model="create.ten_chuc_nang" type="text" class="form-control mt-1 mb-2" placeholder="Nhập tên chức năng"  />
                    <label>Trạng Thái</label>
                    <select v-model="create.trang_thai" class="form-control mt-1 mb-2">
                        <option value="0">Hiển Thị</option>
                        <option value="1">Tạm Tắt</option>
                    </select>
                </div>
                <div class="card-footer text-end">
                    <button class="btn btn-primary" v-on:click="themMoiChucNang()">Thêm Mới</button>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card">
                <div class="card-header">
                    <h4 class="mt-2">Danh Sách Chức Năng</h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <div class="input-group mt-3 mb-2 w-100">
                <input v-on:keyup.enter="timKiem()" v-model="search.noi_dung" type="text"
                  class="form-control search-control border border-1 border-secondary" placeholder="Search..." />
                <span class="position-absolute top-50 search-show translate-middle-y" style="left: 15px"><i
                    class="bx bx-search"></i></span>
                <button v-on:click="timKiem()" class="btn btn-outline-secondary" type="button">
                  Tìm Kiếm
                </button>
              </div>
                        <table class="table table-bordered table-striped table-hover">
                            <thead>
                                <tr class="text-center">
                                    <th>STT</th>
                                    <th>Tên Chức Năng</th>
                                    <th>Trạng Thái</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v,i) in listChucNang" :key="i">
                                    <tr class="text-center align-middle">
                                        <th class="text-center">{{ i+1 }}</th>
                                        <td class="text-start">{{ v.ten_chuc_nang }}</td>
                                        <td class="text-center">
                                            <button v-on:click="doiTrangThai(v)" class="btn btn-success" v-if="v.trang_thai==0">Hiển Thị</button>
                                            <button v-on:click="doiTrangThai(v)" class="btn btn-secondary" v-else>Tạm Tắt</button>
                                        </td>
                                        <td class="text-center">
                                            <button v-on:click="Object.assign(edit,v)" class="btn btn-primary me-2" data-bs-toggle="modal"
                                            data-bs-target="#sua">Sửa</button>
                                            <button v-on:click="Object.assign(del,v)" class="btn btn-danger " data-bs-toggle="modal"
                                            data-bs-target="#xoa">Xóa</button>
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
    <!-- Modal Xóa -->
    <div class="modal fade" id="xoa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Xóa Chức Năng</h5>
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
                    Bạn chắc chắc xóa chức năng
                    <b>{{ del.ten_chuc_nang }}</b> này chứ !!!
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
            <button v-on:click="xoaChucNang()" type="button" class="btn btn-danger" data-bs-dismiss="modal">
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Sửa -->
    <div class="modal fade" id="sua" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Cập Nhật Nhân Viên</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label>Tên Chức Năng</label>
                    <input v-model="edit.ten_chuc_nang" type="text" class="form-control mt-1 mb-2" placeholder="Nhập tên chức năng"  />
                    <label>Trạng Thái</label>
                    <select v-model="edit.trang_thai" class="form-control mt-1 mb-2">
                        <option value="0">Hiển Thị</option>
                        <option value="1">Tạm Tắt</option>
                    </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Đóng
            </button>
            <button v-on:click="suaChucNang()" type="button" class="btn btn-primary" data-bs-dismiss="modal">
              Xác Nhận
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
            create: {},
            edit: {},
            del: {},
            listChucNang: [],
            search: {},
        };
    },
    methods: {
        timKiem() {
        axios
          .post(
            "http://127.0.0.1:8000/api/admin/chuc-nang/tim-kiem",
            this.search,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("key_admin"),
              },
            }
          )
          .then((res) => {
            this.listChucNang = res.data.data;
          })
          .catch((res) => {
            const listChucNang = Object.values(res.response.data.errors);
            listChucNang.forEach((v, i) => {
              this.$toast.error(v[0]);
            });
          });
      },
        xoaChucNang() {
        axios
          .post("http://127.0.0.1:8000/api/admin/chuc-nang/delete", this.del, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("key_admin"),
            },
          })
          .then((res) => {
            if (res.data.status) {
              this.loadChucNang();
              this.$toast.success(res.data.message);
            }else {
              this.$toast.error(res.data.message);
            }
          })
          .catch((res) => {
            const list = Object.values(res.response.data.errors);
            list.forEach((v, i) => {
              this.$toast.error(v[0]);
            });
          });
      },
      suaChucNang() {
        axios
          .post("http://127.0.0.1:8000/api/admin/chuc-nang/update", this.edit, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("key_admin"),
            },
          })
          .then((res) => {
            if (res.data.status) {
              this.loadChucNang();
              this.$toast.success(res.data.message);
            }else {
              this.$toast.error(res.data.message);
            }
          })
          .catch((res) => {
            const list = Object.values(res.response.data.errors);
            list.forEach((v, i) => {
              this.$toast.error(v[0]);
            });
          });
      },
        themMoiChucNang(){
            axios
          .post("http://127.0.0.1:8000/api/admin/chuc-nang/create", this.create, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("key_admin"),
            },
          })
          .then((res) => {
            if (res.data.status) {
              this.$toast.success(res.data.message);
                this.create = {};
              this.loadChucNang();
            }else {
              this.$toast.error(res.data.message);
            }
          })
          .catch((res) => {
            const list = Object.values(res.response.data.errors);
            list.forEach((v, i) => {
              this.$toast.error(v[0]);
            });
          });
        },
        loadChucNang(){
            axios
          .get("http://127.0.0.1:8000/api/admin/chuc-nang/data", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("key_admin"),
            },
          })
          .then((res) => {
            this.listChucNang = res.data.data;
          });
        },
        doiTrangThai(value) {
        axios
          .post(
            "http://127.0.0.1:8000/api/admin/chuc-nang/change-status",
            value,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("key_admin"),
              },
            }
          )
          .then((res) => {
            if (res.data.status) {
              this.loadChucNang();
              this.$toast.success(res.data.message);
            }else {
              this.$toast.error(res.data.message);
            }
          })
          .catch((res) => {
            const list = Object.values(res.response.data.errors);
            list.forEach((v, i) => {
              this.$toast.error(v[0]);
            });
          });
      },
    },
    mounted() {
        this.loadChucNang();
    },
}
</script>
<style>
    
</style>