<template>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h4 class="mt-2">Danh Sách Nhân Viên</h4>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#themmoi">
              <i class="fa-solid fa-plus"></i> Thêm Mới
            </button>
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
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th class="text-center">STT</th>
                    <th class="text-center">Họ và Tên</th>
                    <th class="text-center">Email</th>
                    <th class="text-center">Ngày Sinh</th>
                    <th class="text-center">Số Điện Thoại</th>
                    <th class="text-center">Quyền</th>
                    <th class="text-center">Tình Trạng</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(v, i) in listNhanVien" :key="i">
                    <tr>
                      <th class="text-center align-middle">{{ i + 1 }}</th>
                      <td class="align-middle">{{ v.ho_va_ten }}</td>
                      <td class="text-center align-middle">{{ v.email }}</td>
                      <td class="text-center align-middle">{{ v.ngay_sinh }}</td>
                      <td class="text-center align-middle">
                        {{ v.so_dien_thoai }}
                      </td>
                      <td class="text-center align-middle">{{ v.ten_quyen }}</td>
                      <td class="text-center align-middle">
                        <button v-on:click="doiTrangThai(v)" v-if="v.tinh_trang == 0" class="btn btn-success">
                          Hoạt Động
                        </button>
                        <button v-on:click="doiTrangThai(v)" v-else class="btn btn-danger">
                          Đã Khóa
                        </button>
                      </td>
                      <td class="text-center align-middle">
                        <button v-on:click="Object.assign(edit, v)" class="btn btn-primary me-2" data-bs-toggle="modal"
                          data-bs-target="#sua">
                          Sửa
                        </button>
                        <button v-on:click="Object.assign(del, v)" class="btn btn-danger" data-bs-toggle="modal"
                          data-bs-target="#xoa">
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
    <!-- Modal thêm mới -->
    <div class="modal fade" id="themmoi" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Thêm Mới Nhân Viên
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label>Họ và Tên</label>
            <input type="text" class="form-control mt-1 mb-2" v-model="create.ho_va_ten" />
            <label>Email</label>
            <input type="text" class="form-control mt-1 mb-2" v-model="create.email" />
            <label>Mật Khẩu</label>
            <input type="text" class="form-control mt-1 mb-2" v-model="create.password" />
            <label>Ngày Sinh</label>
            <input type="date" class="form-control mt-1 mb-2" v-model="create.ngay_sinh" />
            <label>Số Điện Thoại</label>
            <input type="text" class="form-control mt-1 mb-2" v-model="create.so_dien_thoai" />
            <label>Quyền</label>
            <select v-model="create.id_quyen" class="form-control mt-1 mb-2">
                <option value="1">Admin</option>
                <option value="2">Nhân Viên</option>
  
            </select>
            <label>Tình Trạng</label>
            <select v-model="create.tinh_trang" class="form-control mt-1">
              <option value="0">Hoạt Động</option>
              <option value="1">Đã Khóa</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Đóng
            </button>
            <button v-on:click="themMoiNhanVien()" type="button" class="btn btn-primary" data-bs-dismiss="modal">
              Xác Nhận
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
            <label>Họ và Tên</label>
            <input type="text" class="form-control mt-1 mb-2" v-model="edit.ho_va_ten" />
            <label>Email</label>
            <input type="text" class="form-control mt-1 mb-2" v-model="edit.email" />
            <label>Mật Khẩu</label>
            <input type="text" class="form-control mt-1 mb-2" v-model="edit.password" />
            <label>Ngày Sinh</label>
            <input type="date" class="form-control mt-1 mb-2" v-model="edit.ngay_sinh" />
            <label>Số Điện Thoại</label>
            <input type="text" class="form-control mt-1 mb-2" v-model="edit.so_dien_thoai" />
            <label>Quyền</label>
            <select v-model="edit.id_quyen" class="form-control mt-1 mb-2">
              <option value="1">Admin</option>
              <option value="2">Nhân Viên</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Đóng
            </button>
            <button v-on:click="suaNhanVien()" type="button" class="btn btn-primary" data-bs-dismiss="modal">
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Xóa -->
    <div class="modal fade" id="xoa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Xóa Nhân Viên</h5>
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
                    Bạn chắc chắc xóa tài khoản nhân viên
                    <b>{{ del.ho_va_ten }}</b> này chứ !!!
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
            <button v-on:click="xoaNhanVien()" type="button" class="btn btn-danger" data-bs-dismiss="modal">
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        edit: {},
        del: {},
        create: {},
        listNhanVien: [],
        search: {},
        listQuyen: []
      };
    },
    mounted() {
      this.loadNhanVien();
    },
    methods: {
    
      timKiem() {
        axios
          .post(
            "http://127.0.0.1:8000/api/admin/nhan-vien/tim-kiem",
            this.search,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("key_admin"),
              },
            }
          )
          .then((res) => {
            this.listNhanVien = res.data.data;
          })
          .catch((res) => {
            const listNhanVien = Object.values(res.response.data.errors);
            listNhanVien.forEach((v, i) => {
              this.$toast.error(v[0]);
            });
          });
      },
      doiTrangThai(value) {
        axios
          .post(
            "http://127.0.0.1:8000/api/admin/nhan-vien/change-status",
            value,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("key_admin"),
              },
            }
          )
          .then((res) => {
            if (res.data.status) {
              this.loadNhanVien();
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
      loadNhanVien() {
        axios
          .get("http://127.0.0.1:8000/api/admin/nhan-vien/data", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("key_admin"),
            },
          })
          .then((res) => {
            this.listNhanVien = res.data.data;
          });
      },
      themMoiNhanVien() {
        axios
          .post("http://127.0.0.1:8000/api/admin/nhan-vien/create", this.create, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("key_admin"),
            },
          })
          .then((res) => {
            if (res.data.status) {
              this.$toast.success(res.data.message);
              this.loadNhanVien();
            }
          })
          .catch((res) => {
            const list = Object.values(res.response.data.errors);
            list.forEach((v, i) => {
              this.$toast.error(v[0]);
            });
          });
      },
      xoaNhanVien() {
        axios
          .post("http://127.0.0.1:8000/api/admin/nhan-vien/delete", this.del, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("key_admin"),
            },
          })
          .then((res) => {
            if (res.data.status) {
              this.loadNhanVien();
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
      suaNhanVien() {
        axios
          .post("http://127.0.0.1:8000/api/admin/nhan-vien/update", this.edit, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("key_admin"),
            },
          })
          .then((res) => {
            if (res.data.status) {
              this.loadNhanVien();
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
    },
  };
  </script>
  <style></style>