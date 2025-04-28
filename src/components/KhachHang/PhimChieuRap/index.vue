<template>~
    <div class="d-flex justify-content-between">
                <h4 style="color: #e0b010">DANH SÁCH PHIM CHIẾU RẠP</h4>
            </div>
            <hr class="border border-warning border-2 opacity-50" />

            <div class="mb-3">
                    <div class="filter-movies">
                        <select v-model="filters.sap_xep" class="me-2" style="height: 30px;">
                        <option value="">-- Sắp xếp --</option>
                        <option value="ten_az">Tên A-Z</option>
                        <option value="nam_xuat_ban">Năm xuất bản</option>
                        <option value="ngay_dang">Ngày đăng</option>
                        </select>

                        <select v-model="filters.the_loai" class="me-2" style="height: 30px;">
                            <option value="">-- Thể loại --</option>
                        <template v-for="theLoai in listTheLoai" :key="theLoai.id">
                            <option :value="theLoai.id">{{ theLoai.ten_the_loai }}</option>
                        </template>
                        </select>

                        <select v-model="filters.quoc_gia" class="me-2" style="height: 30px;">
                        <option value="">-- Quốc gia --</option>
                        <option value="Việt Nam">Việt Nam</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Thái Lan">Thái Lan</option>
                        <option value="Trung Quốc">Trung Quốc</option>
                        <option value="Ấn Độ">Ấn Độ</option>
                        <option value="Nhật Bản">Nhật Bản</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Hàn Quốc">Hàn Quốc</option>
                        <option value="Mỹ">Mỹ</option>
                        <option value="Pháp">Pháp</option>
                        </select>

                        <select v-model="filters.nam" class="me-2" style="height: 30px;">
                        <option value="">-- Năm --</option>
                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                        </select>

                        <button  style="height: 30px;" @click="locPhim">Lọc phim</button>
                    </div>
            </div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-5 row-cols-xl-5 row-cols-xxl-5">                  
            <template v-for="(v,i) in listPhimChieuRap" :key="i">
                <router-link :to="'/chi-tiet-phim/' + v.id + '-' + v.slug_phim">
                    <div class="col">               
                    <a href="">
                        <div class="col">
                            <div class="card bg-dark" style="height: 400px; width: 300px;">
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
            listTheLoai: [],
            listPhimChieuRap: [],
            filters: {
            sap_xep: '',
            the_loai: '',
            quoc_gia: '',
            nam: ''
            },
            years: []
        }
    },
    methods: {
        loadTheLoai() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/the-loai/data")
                .then((res) => {
                    this.listTheLoai = res.data.data;
                })
        },
        loadPhimChieuRap() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/phim/data-phim-chieu-rap")
                .then((res) => {
                this.listPhimChieuRap = res.data.data;
                });
        },
        locPhim() {
            axios
                .get('http://127.0.0.1:8000/api/khach-hang/phim/loc-phim-rap', { params: this.filters })
                .then(response => {
                this.listPhimChieuRap = response.data.data;
                })
                .catch(error => {
                console.error(error);
                });
        }
    },
    mounted() {
        this.loadPhimChieuRap();
        this.loadTheLoai();
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 1900; year--) {
        this.years.push(year);
        }
        
    }
}
</script>
<style lang="">

</style>