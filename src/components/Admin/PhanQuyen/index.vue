<template>
    <div class="row">
     <div class="col-lg-4">
         <div class="card">
             <div class="card-header ">
                 <div class="d-flex justify-content-between">
                     <h6 class="mt-2">Danh Sách Quyền</h6>
                     <button class="btn btn-primary" data-bs-toggle="modal"
                     data-bs-target="#themQuyen">Thêm Quyền</button>
                 </div>
                 <div class="col-lg-12">
                      <div class="input-group mt-3 w-100">
                          <input v-on:keyup.enter="timKiem()" v-model="search.noi_dung" type="text" class="form-control search-control border border-2 border-secondary"
                              placeholder="Search...">
                          <span class="position-absolute top-50 search-show translate-middle-y"
                              style="left: 15px;"><i class="bx bx-search"></i></span>
                          <button v-on:click="timKiem()" class="btn btn-outline-secondary" type="button" id="button-addon2">Tìm
                              Kiếm</button>
                      </div>
                 </div>
             </div>
             <div class="card-body">
                 <div class="table-responsive">
                     <table class="table table-hover table-bordered">
                         <thead style="background-color: #3399FF" class="text-white">
                             <tr class="text-center">
                                 <th>STT</th>
                                 <th>Tên Quyền</th>
                                 <th>Cấp Quyền</th>
                                 <th>Action</th>
                             </tr>
                         </thead>
                         <tbody>
                             <template v-for="(v, i) in listQuyen" :key="i">
                                 <tr class="text-center align-middle">
                                     <th>{{ i+1 }}</th>
                                     <td>{{ v.ten_quyen }}</td>
                                     <td><button v-on:click="phanQuyen(v)" class="btn btn-info text-white ">Phân Quyền</button></td>
                                     <td>
                                         <i  v-on:click="Object.assign(update, v)"
                                             class="fa-solid fa-pen-to-square fa-3x text-primary me-2"
                                             data-bs-toggle="modal" data-bs-target="#suaQuyen"></i>
                                             <i v-on:click="Object.assign(del, v)"
                                                 class="fa-solid fa-trash fa-3x text-danger" data-bs-toggle="modal"
                                                 data-bs-target="#xoaQuyen"></i>
                                     </td>
                                 </tr>
                             </template>
                         </tbody>
                     </table>
                 </div>
             </div>
         </div>
 
         <!-- Modal Thêm Quyền -->
         <div class="modal fade" id="themQuyen" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog">
             <div class="modal-content">
             <div class="modal-header">
                 <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Quyền</h1>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div class="modal-body">
                 <label>Tên Quyền</label>
                 <input v-model="create.ten_quyen" type="text" class="form-control mt-1" >
             </div>
             <div class="modal-footer">
                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                 <button v-on:click="themQuyen()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm Mới</button>
             </div>
             </div>
         </div>
         </div>
         <!-- Modal Xóa Quyền -->
         <div class="modal fade" id="xoaQuyen" tabindex="-1" aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                         <div class="modal-dialog">
                             <div class="modal-content">
                                 <div class="modal-header">
                                     <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Quyền</h1>
                                     <button type="button" class="btn-close" data-bs-dismiss="modal"
                                         aria-label="Close"></button>
                                 </div>
                                 <div class="modal-body">
                                     <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                                         <div class="d-flex align-items-center">
                                         <div class="font-35 text-white">
                                             <i class="bx bxs-message-square-x"></i>
                                         </div>
                                         <div class="ms-1">
                                             <h6 class="mb-1 text-white">
                                             Bạn chắc chắc xóa quyền
                                             <b>{{ del.ten_quyen }}</b> này chứ !!!
                                             </h6>
                                             <div class="text-white text-nowrap">
                                             <b>LƯU Ý !!!</b> Điều này không thể khôi phục khi ấn xác nhận
                                             </div>
                                         </div>
                                         </div>
                                     </div>
                                 </div>
                                 <div class="modal-footer">
                                     <button type="button" class="btn btn-secondary"
                                         data-bs-dismiss="modal">Đóng</button>
                                     <button v-on:click="xoaQuyen()" type="button" class="btn btn-danger"
                                         data-bs-dismiss="modal">Xóa</button>
                                 </div>
                             </div>
                         </div>
         </div>
         <!-- Modal Sửa Quyền -->
         <div class="modal fade" id="suaQuyen" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog">
             <div class="modal-content">
             <div class="modal-header">
                 <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Quyền</h1>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div class="modal-body">
                 <label>Tên Quyền</label>
                 <input v-model="update.ten_quyen" type="text" class="form-control mt-1" >
             </div>
             <div class="modal-footer">
                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                 <button v-on:click="suaQuyen()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập Nhật</button>
             </div>
             </div>
         </div>
         </div>
 
     </div>
     <div class="col-lg-4">
         <div class="card">
             <div class="card-header">
                 <h6 class="mt-2">Danh Sách Chức Năng</h6>
             </div>
             <div class="card-body">
                 <div class="table-responsive">
                     <table class="table table-hover table-bordered">
                         <thead class="text-white" style="background-color: #3399FF">
                             <tr class="text-center">
                                 <th>STT</th>
                                 <th>Tên Chức Năng</th>
                                 <th>Action</th>
                             </tr>
                         </thead>
                         <tbody>
                             <template v-for="(v, i) in listChucNang" :key="i">
                                 <tr class="text-center align-middle">
                                     <th>{{ i+1 }}</th>
                                     <td class="text-start">
                                         <span v-if="v.ten_chuc_nang.length > 35">
                                             {{ v.ten_chuc_nang.substring(0, 35) }}...
                                         </span>
                                         <span v-else>
                                             {{ v.ten_chuc_nang }}
                                         </span>
                                     </td>
                                     <td><button v-on:click="capQuyen(v.id)" class="btn btn-success">Cấp Quyền</button></td>
                                 </tr>
                             </template>
                         </tbody>
                     </table>
                 </div>
             </div>
         </div>
     </div>
     <div class="col-lg-4">
         <div class="card">
             <div class="card-header">
                 <h6 class="mt-2">Đang phân quyền cho: <b class="text-danger">{{ chon_quyen.ten_quyen }}</b></h6>
             </div>
             <div class="card-body">
                 <div class="table-responsive">
                     <table class="table table-hover table-bordered">
                         <thead class="text-white" style="background-color: #3399FF">
                             <tr class="text-center">
                                 <th>Tên Chức Năng</th>
                                 <th>Action</th>
                             </tr>
                         </thead>
                         <tbody>
                             <template v-for="(v, i) in listChiTietPhanQuyen" :key="i">
                                 <tr class="text-center align-middle">
                                     <td class="text-start">{{ v.ten_chuc_nang }}</td>
                                     <td>
                                         <i v-on:click="xoaPhanQuyen(v)"
                                             class="fa-solid fa-trash fa-3x text-danger" data-bs-toggle="modal"
                                             data-bs-target="#xoaChucNang"></i>
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
 </template>
 <script>
 import axios from 'axios';
 
 export default {
     data() {
         return {
             create:{},
             del: {},
             update: {},  
             search: {},
             listQuyen: [],
             listChucNang: [],
             listChiTietPhanQuyen: [],
             chon_quyen : {},
         }
     },
     mounted() {
         this.loadQuyen();
         this.loadChucNang();
     },
     methods: {
         xoaPhanQuyen(value){
             axios
                 .post('http://127.0.0.1:8000/api/admin/chi-tiet-phan-quyen/delete', value, {
                     headers: {
                         Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                     }
                 })
                 .then((res) => {
                     if(res.data.status) {
                         this.$toast.success(res.data.message);
                         this.phanQuyen(this.chon_quyen);
                     } else {
                         this.$toast.error(res.data.message);
                     }
                 });
         },
         capQuyen(id_chuc_nang){
             if(!this.chon_quyen.id) {
                 this.$toast.error('Vui lòng chọn quyền trước khi cấp quyền!');
                 return;
             }
             var payload = {
                 id_quyen: this.chon_quyen.id,
                 id_chuc_nang: id_chuc_nang
             }
             axios
                 .post('http://127.0.0.1:8000/api/admin/chi-tiet-phan-quyen/create', payload, {
                     headers: {
                         Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                     }
                 })
                 .then((res) => {
                     if (res.data.status) {
                         this.$toast.success(res.data.message);
                         this.phanQuyen(this.chon_quyen);
                     } else {
                         this.$toast.error(res.data.message)
                     }
                 })
                 .catch((res) => {
                     const list = Object.values(res.response.data.errors);
                     list.forEach((v, i) => {
                         this.$toast.error(v[0]);
                     });
                 });
         },
         phanQuyen(value){
             this.chon_quyen = value;
             axios
                 .post('http://127.0.0.1:8000/api/admin/chi-tiet-phan-quyen/data', this.chon_quyen, {
                     headers: {
                         Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                     }
                 })
                 .then((res) => {
                     this.listChiTietPhanQuyen = res.data.data;
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
             .get('http://127.0.0.1:8000/api/admin/chuc-nang/data-open', {
                     headers: {
                         Authorization: "Bearer " + localStorage.getItem("key_admin"),
                     },
                 })
                 .then((res) => {
                     if (res.data.status == false) {
                         this.$toast.error(res.data.message)
                     }
                     this.listChucNang = res.data.data;
                 })
         },
         loadQuyen(){
             axios
                 .get('http://127.0.0.1:8000/api/admin/phan-quyen/data', {
                     headers: {
                         Authorization: "Bearer " + localStorage.getItem("key_admin"),
                     },
                 })
                 .then((res) => {
                     if (res.data.status == false) {
                         this.$toast.error(res.data.message)
                     }
                     this.listQuyen = res.data.data;
                 })
         },
         themQuyen(){
             axios
                 .post('http://127.0.0.1:8000/api/admin/phan-quyen/create', this.create, {
                     headers: {
                         Authorization: "Bearer " + localStorage.getItem("key_admin"),
                     },
                 })
                 .then((res) => {
                     if (res.data.status == 1) {
                         this.$toast.success(res.data.message);
                         this.loadQuyen();
                         this.create = {}
                     } else {
                         this.$toast.error(res.data.message);
                     }
                 })
         },
         suaQuyen(){
             axios
                 .post('http://127.0.0.1:8000/api/admin/phan-quyen/update', this.update, {
                     headers: {
                         Authorization: "Bearer " + localStorage.getItem("key_admin"),
                     },
                 })
                 .then((res) => {
                     if (res.data.status == 1) {
                         this.$toast.success(res.data.message);
                         this.loadQuyen();
                     } else {
                         this.$toast.error(res.data.message);
                     }
                 })
         },
         xoaQuyen(){
             axios
                 .post('http://127.0.0.1:8000/api/admin/phan-quyen/delete', this.del, {
                     headers: {
                         Authorization: "Bearer " + localStorage.getItem("key_admin"),
                     },
                 })
                 .then((res) => {
                     if (res.data.status == 1) {
                         this.$toast.success(res.data.message);
                         this.loadQuyen();
                     } else {
                         this.$toast.error(res.data.message);
                     }
                 })
         },
         timKiem(){
             axios
                 .post('http://127.0.0.1:8000/api/admin/phan-quyen/search', this.search, {
                     headers: {
                         Authorization: "Bearer " + localStorage.getItem("key_admin"),
                     },
                 })
                 .then((res) => {
                     this.listQuyen = res.data.data;
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
 <style>
     
 </style>