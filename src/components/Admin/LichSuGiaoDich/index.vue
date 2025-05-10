<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="mt-2">LỊCH SỬ GIAO DỊCH</h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead class="text-center">
                                <tr>
                                    <th>#</th>
                                    <th>Họ Tên Khách Hàng</th>
                                    <th>Email Khách Hàng</th>
                                    <th>Số Tiền Nạp</th>
                                    <th>Lý Do Nạp</th>
                                    <th>Kiểu Nạp</th>
                                    <th>Nhân Viên Xử Lý</th>
                                    <th>Thời Gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value,index) in list" :key="index">
                                    <tr class="align-middle">
                                        <th class="text-center">{{ index + 1 }}</th>
                                        <td>{{ value.hoten_kh }}</td>
                                        <td>{{ value.email }}</td>
                                        <td>
                                            <button class="btn btn-secondary w-100 text-end">{{ formatVND(value.so_tien_nap) }}</button>
                                        </td>
                                        <td>{{ value.noi_dung }}</td>
                                        <td class="text-center">
                                            <button v-if="value.kieu_nap == 1" class="btn btn-primary w-80">Nạp Bằng Tay</button>
                                            <button v-else class="btn btn-success w-80">Nạp Tự Động</button>
                                        </td>
                                        <td>{{ value.hoten_nv }}</td>
                                        <td class="text-center">{{ formatdate(value.created_at) }}</td>
                                        
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
            list:[]
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        formatVND(number){
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number);
        },
        formatdate(thoi_gian) {
            const date = new Date(thoi_gian);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        },
        loadData(){
            axios
            .get('http://127.0.0.1:8000/api/admin/nap-tien/data', {
                    headers : {
                        Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                    }
                })
                .then((res) => {
                    this.list = res.data.data;
                })
                
        }
    },
}
</script>
<style>
    
</style>