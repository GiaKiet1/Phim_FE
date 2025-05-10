<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h4 class="mt-2">Danh Sách Phim Cần Duyệt</h4>
            <router-link to="/admin/ds-phim-tu-choi">
                <button class="btn btn-secondary">Danh Sách Phim Đã Từ Chối</button>
            </router-link>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr class="text-center">
                            <th>STT</th>
                            <th>Thông Tin Phim</th>
                            <th>Ngày Thêm Phim</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(v, i) in list_phim" :key="i">
                            <tr class="text-center align-middle">
                                <th>{{ i + 1 }}</th>
                                <td>
                                    <i v-on:click="Object.assign(thong_tin, v)" class="fa-solid fa-circle-info fa-2x"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                                </td>
                                <td>{{ formatDate(v.created_at) }}</td>
                                <td>
                                    <button v-on:click="duyetPhim(v)" class="btn btn-primary me-2">
                                        Duyệt Phim
                                    </button>
                                    <button v-on:click="Object.assign(del, v)" class="btn btn-danger"
                                        data-bs-toggle="modal" data-bs-target="#tuchoi">
                                        Từ Chối
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Thông Tin Phim
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <img :src="thong_tin.hinh_anh" class="img-fluid rounded shadow"  alt="Poster Phim" />
                        </div>
                        <div class="col-md-8">
                            <div class="card shadow">
                                <div class="card-body">
                                    <h5 class="card-title text-primary">Thông Tin Phim</h5>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">
                                            <strong>Tên Phim:</strong> {{ thong_tin.ten_phim }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Slug:</strong> {{ thong_tin.slug_phim }}
                                        </li>
 
                                        <li class="list-group-item">
                                            <strong>Loại Phim:</strong> 
                                            <span v-if="thong_tin.loai_phim == 1"> Phim Chiếu Rạp</span>
                                            <span v-else> Phim Bộ</span>
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Đạo Diễn:</strong> {{ thong_tin.dao_dien }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Diễn Viên:</strong> {{ thong_tin.dien_vien }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Quốc Gia:</strong> {{ thong_tin.quoc_gia }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Thời Lượng:</strong> {{ thong_tin.thoi_luong }} phút
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Mô Tả:</strong> {{ thong_tin.mo_ta }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Ngày Khởi Chiếu:</strong> {{ formatDate(thong_tin.ngay_khoi_chieu) }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Ngày Kết Thúc:</strong> {{ formatDate(thong_tin.ngay_ket_thuc) }}
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Giá Bán:</strong> {{ thong_tin.gia_ban }} VNĐ
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal tu choi-->
    <div class="modal fade" id="tuchoi" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Từ Chối Phim</h1>
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
                                    Bạn chắc chắc từ chối duyệt phim
                                    <b>{{ del.ten_phim }}</b> này chứ !!!
                                </h6>
                                <label class="text-white">Lý Do</label>
                                <input type="text" class="form-control mt-1 mb-3" v-model="del.ly_do_tu_choi"
                                    placeholder="Nhập lý do từ chối" />
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
                    <button v-on:click="tuChoi()" type="button" class="btn btn-primary" data-bs-dismiss="modal">
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
            list_phim: [],
            list_phim_duyet: [],
            thong_tin: {},
            del: {}
        };
    },
    methods: {
        tuChoi() {
            axios
            .post('http://127.0.0.1:8000/api/admin/phim/tu-choi-phim', this.del,{
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                        }
                    })
                    .then((res) => {
                        
                        this.loadListPhim();
                        this.$toast.success(res.data.message, {
                            position: 'top-right',
                            duration: 2000,
                        });
                    })
                    .catch((err) => {
                        this.$toast.error(err.response.data.message, {
                            position: 'top-right',
                            duration: 2000,
                        });
                    });
        },
        duyetPhim(v){
            axios
                .post('http://127.0.0.1:8000/api/admin/phim/duyet-phim', v,{
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                        }
                    })
                    .then((res) => {
                        this.loadListPhim();
                        this.$toast.success(res.data.message, {
                            position: 'top-right',
                            duration: 2000,
                        });
                    });
        },
        loadListPhim(){
            axios
                .get('http://127.0.0.1:8000/api/admin/phim/data-duyet-phim', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                    }
                })
                .then((res) => {
                    this.list_phim = res.data.data;
                });
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const date = new Date(dateString);
            return date.toLocaleDateString('en-GB', options);
        },
    },
    mounted() {
        this.loadListPhim();
    },
};
</script>
<style lang="">
</style>