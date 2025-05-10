<template>
    <div class="row">
        <div class="col-lg-3">
            <router-link to="/admin/thong-ke">
                <button class="btn btn-primary"><i class="fa-solid fa-arrow-rotate-left"></i> Quay Trở Lại</button>
            </router-link>
        </div>
        <div class="col-lg-6">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title text-center mt-2">Thống Kê Khách Hàng Đăng Ký Theo Từng Năm</h4>
                </div>
                <div class="card-body">
                    <template v-if="load_chart == true">
                        <Pie :options="chartOptions" :data="chartData" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)
export default {
    name: 'BarChart',
    components: { Pie },
    data() {
        return {
        chartData: {
            labels: [],
            datasets: [{ 
                    data: [],
                    backgroundColor: [
                        '#36A2EB', '#FF6384', '#FFCE56', 
                        '#4BC0C0', '#9966FF', '#FF9F40', 
                        '#FF5733', '#33FF57', '#3357FF', 
                        '#F39C12', '#8E44AD', '#1ABC9C'
                    ],
            }]
        },
        chartOptions: {
            responsive: true
        },

        load_chart: false,
        }
    },
    mounted() {
        this.loadChart();
    },
    methods: {
        loadChart(){
            axios
                 .get('http://127.0.0.1:8000/api/admin/chart-khach-hang', {
                     headers: {
                         Authorization: 'Bearer ' + localStorage.getItem("key_admin")
                     }
                 })
                 .then((res) => {
                    this.chartData.labels = res.data.labels;
                    this.chartData.datasets[0].data = res.data.data_x;
                    this.load_chart = true;
                 });
            
            
        }
    }
}
</script>
<style>
    
</style>