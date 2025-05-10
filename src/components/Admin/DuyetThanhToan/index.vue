<template>
    <div class="card">
        <div class="card-header">
            <h4 class="card-title mt-2">Danh Sach Thanh Toán Cần Duyệt</h4>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr class="text-center align-middle">
                            <th>STT</th>
                            <th>Tên Khách Hàng</th>
                            <th>Tên Nhân Viên</th>
                            <th>Số Tiền</th>
                            <th>Ngày Thanh Toán</th>
                            <th>Nội Dung</th>
                            <th>Hash</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(v,i) in listNapTien" :key="i">
                            <tr class="text-center align-middle">
                                <th>{{ i+1 }}</th>
                                <td class="text-start">{{ v.hoten_kh }}</td>
                               <td>{{ v.hoten_nv }}</td>
                                <td class="text-end">{{ formatCurrency(v.so_tien_nap) }}</td>
                                <td >{{formatDate(v.created_at)}}</td>
                                <td>
                                    {{ v.noi_dung }}
                                </td>
                                <td>
                                    {{ v.hash }}
                                </td>
                                <td>
                                    <button v-on:click="duyetThanhToan(v)" class="btn btn-primary">Duyệt Thanh Toán</button>
                                </td>
                            </tr>
                        </template>
                    </tbody>

                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            listNapTien: [],
        }
    },
    methods: {
        duyetThanhToan(value){
            axios
                .post('http://127.0.0.1:8000/api/admin/nap-tien/duyet', value, {
                    headers : {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                    }
                })
                .then((res) => {
                    if(res.data.status){
                        this.$toast.success(res.data.message);
                        this.loadDanhSachNapTien();
                    }else{
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    this.$toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
                })
        },
        loadDanhSachNapTien(value){
            axios
                .post('http://127.0.0.1:8000/api/admin/nap-tien/data-duyet', value, {
                    headers : {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                    }
                })
                .then((res) => {
                    this.listNapTien = res.data.data;
                })
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        },
        formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        }
    },
    mounted() {
        this.loadDanhSachNapTien();
    }
}
</script>
<style>
    
</style>