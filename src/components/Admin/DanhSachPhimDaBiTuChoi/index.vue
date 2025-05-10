<template>
    <div class="card">
        <div class="card-header">
            <h4 class="card-title">Danh Sách Phim Đã Bị Từ Chối</h4>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr class="text-center">
                            <th>STT</th>
                            <th>Thông Tin Phim</th>
                            <th>Thời Gian Duyệt</th>
                            <th>Người Duyệt</th>
                            <th>Lý Do Từ Chối</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <template v-for="(v,i) in listPhimTuChoi" :key="i">
                            <tr class="text-center align-middle">
                                <th>{{ i + 1 }}</th>
                                <td><i v-on:click="Object.assign(thong_tin, v)" class="fa-solid fa-circle-info fa-2x"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                                </td>
                                <td>{{ formatDate(v.created_at) }}</td>
                                <td>{{ v.ho_va_ten }}</td>
                                <td class="text-start">{{ v.ly_do_tu_choi }}</td>
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
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            listPhimTuChoi: [],
            thong_tin: {
                
            }
        }
    },
    methods: {
        loadPhimTuChoi() {
            axios
            .get('http://127.0.0.1:8000/api/admin/phim/ds-tu-choi', {
                headers: {
                Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                }
            })
            .then((response) => {
                this.listPhimTuChoi = response.data.data;
            })
            .catch((error) => {
                console.error('Error loading rejected movies:', error);
            });
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const date = new Date(dateString);
            return date.toLocaleDateString('en-GB', options);
        },
    },
    mounted() {
        this.loadPhimTuChoi();
    },
}
</script>
<style>
    
</style>