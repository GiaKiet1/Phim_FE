<template>
    <div class="card">
        <div class="card-header">
            <h3 class="mt-2">Danh Sách Phim Đã Mua</h3>
        </div>
        <div class="card-body">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th class="text-center align-middle">STT</th>
                        <th class="text-center align-middle">Tên Phim</th>
                        <th class="text-center align-middle">Ngày Mua</th>
                        <th class="text-center align-middle">Giá</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(v,i) in danhSachPhim" :key="i">
                        <tr>
                            <td class="text-center align-middle">{{ i+1 }}</td>
                            <td>{{ v.ten_phim }}</td>
                            <td class="text-center align-middle">{{  formatdate(v.created_at) }}</td>
                            <td class="text-center align-middle">{{ formatVND(v.so_tien_mua) }}</td>
                        </tr>
                    </template>
                    
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            danhSachPhim: []
        }
    },
    mounted() {
        this.loadDanhSachPhim();
    },
    methods: {
        formatdate(thoi_gian) {
            const date = new Date(thoi_gian);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        },
        formatVND(number){
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number);
        },
        loadDanhSachPhim() {
            axios
            .get("http://127.0.0.1:8000/api/khach-hang/danh-sach-phim-da-mua", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("key_khachhang"),
                    },
                })
            .then((res) => {
                    this.danhSachPhim = res.data.data
            })
        }
    },
}
</script>
<style>
    
</style>