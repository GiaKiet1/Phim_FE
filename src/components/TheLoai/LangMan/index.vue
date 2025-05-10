<template>
    <div class="d-flex justify-content-between">
                <h4 style="color: #e0b010">DANH SÁCH THỂ LOẠI LÃNG MẠN</h4>
    </div>
    <hr class="border border-warning border-2 opacity-50" />
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-5 row-cols-xl-5 row-cols-xxl-5">                  
            <template v-for="(v,i) in listLangMan" :key="i">
                <router-link :to="'/chi-tiet-phim/' + v.id + '-' + v.slug_phim">
                    <div class="col">               
                    <a href="">
                        <div class="col-12 d-flex justify-content-center mb-3">
                            <div class="card bg-dark" style="height: 400px; width: 300px;">
                                <img :src="v.hinh_anh"
                                    class="card-img-top" style="height: 330px;" alt="..." />
                                <div class="position-absolute top-0 end-0 m-3 product-discount text-white rounded-pill text-center"
                                
                                    style="background-color: red; width: 70px">
                                    <span class="">
                                        <div v-if="v.loai_phim == 1">Phim Rạp</div>
                                        <div v-else>Phim Bộ</div>
                                    </span>
                                </div>
                                <div class="card-body text-white">
                                    <h6 class="card-title text-info">{{ v.ten_phim }}</h6>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                </router-link>
            </template>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            listLangMan: [],
        }
    },
    methods: {
        loadLangMan(){
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/phim/data-langman")
                .then((res) => {
                    this.listLangMan = res.data.data;
                });
        }
    },
    mounted() {
        this.loadLangMan();
    }
}
</script>
<style>
    
</style>