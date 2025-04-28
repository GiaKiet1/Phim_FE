<template>
    <div class="d-flex justify-content-between">
                <h4 style="color: #e0b010">DANH SÁCH PHIM CẦN TÌM</h4>
            </div>
            <hr class="border border-warning border-2 opacity-50" />
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-5 row-cols-xl-5 row-cols-xxl-5">                  
            <template v-for="(v,i) in listPhim" :key="i">
                <div class="col">               
                    <router-link :to="'/chi-tiet-phim/' + v.id + '-' + v.slug_phim">
                        <div class="col">
                            <div class="card bg-dark" style="height: 400px;width: 300px;">
                                <img :src="v.hinh_anh"
                                    class="card-img-top" style="height: 330px;" alt="..." />
                                <div class="position-absolute top-0 end-0 m-3 product-discount text-white rounded-pill text-center"
                                    style="background-color: red; width: 70px">
                                </div>
                                <div class="card-body text-white">
                                    <h6 class="card-title text-info">{{ v.ten_phim }}</h6>
                                </div>
                            </div>
                        </div>
                    </router-link>
                        
                    
                </div>
            </template>
            
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            listPhim: [],
            search: {
                noi_dung:''
            }
        }
    },
    mounted() {
        this.search.noi_dung= this.$route.params.tu_khoa;
        
        this.loadPhim();
    },

    methods: {
        loadPhim(){
            axios
                    .post('http://127.0.0.1:8000/api/khach-hang/phim/tim-kiem', this.search)
                    .then(res => {
                        this.listPhim = res.data.data;
                    })
                    .catch(error => {
                        const listPhim = Object.values(res.response.data.errors);
                        listPhim.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                    });
        }
    }
}
</script>
<style>
    
</style>