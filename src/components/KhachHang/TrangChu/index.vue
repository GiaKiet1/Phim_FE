<template>
    <div class="row">
      <h4 style="color: #e0b010">PHIM ĐỀ CỬ</h4>
  
      <hr class="border border-warning border-2 opacity-50" />
      <!-- Phim đề cử -->
      <div class="card d-flex" style="background-color: black; width: auto">
        <div class="card-body mt-3">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-5 row-cols-xl-5 row-cols-xxl-5 product-grid">
            <template v-for="(v, i) in listPhimDeCu" :key="i">
              <template v-if="i < 5">
                <div class="col d-flex">
                  <div class="card">
                    <img :src="v.hinh_anh" style="height: 350px;" class="card-img-top " alt="..." />
                    <div class="">
                      <div style="background-color: brown"
                        class="text-white position-absolute top-0 end-0 m-3 product-discount rounded-2">
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="d-flex justify-content-between">
                        <h4 class="card-title cursor-pointer me-2" style="margin-top: 12px">
                          {{ v.ten_phim.length > 11 ? v.ten_phim.substring(0, 11) + '...' : v.ten_phim }}
                        </h4>
                        <button v-on:click="Object.assign(mo_ta_phim, v)" type="button" class="btn rounded-circle"
                          data-bs-toggle="modal" data-bs-target="#mota">
                          <i class="fa fa-circle-info me-0"></i>
                        </button>
                      </div>
                      
                      <div class="d-flex justify-content-center">
                        <router-link :to="'/chi-tiet-phim/' + v.id + '-' + v.slug_phim">
                          <button class="mt-2 btn btn-outline-danger rounded-pill me-2">
                          Xem Phim
                        </button>
                        </router-link>
  
                        <button v-on:click="Object.assign(trailerPhim, v)"
                          class="mt-2 btn btn-outline-warning rounded-pill" data-bs-toggle="modal"
                          data-bs-target="#trailer">
                          Trailer Phim
                        </button>
                      </div>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </template>
  
            </template>
  
          </div>
        </div>
      </div>
    </div>
    <!-- Modal mota-->
    <div class="modal fade" id="mota" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Mô Tả Phim</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            {{ mo_ta_phim.mo_ta }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal trailer-->
    <div class="modal fade" id="trailer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-body">
            <iframe ref="trailerIframe" width="100%" height="600" :src="trailerUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row mt-4">
      <div class="col-lg-8">
        <div class="d-flex justify-content-between">
          <h4 style="color: #e0b010">PHIM CHIẾU RẠP</h4>
          <div>
            <p><a class="link-opacity-25-hover " href="/phim-rap">Xem tất cả <i class="text-primary fa-solid fa-play"></i></a>
            </p>
          </div>
        </div>
        <hr class="border border-warning border-2 opacity-50" />
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-4 row-cols-xxl-4 ">
        
          <template v-for="(v, i) in listPhimChieuRap" :key="i">
            <template v-if="i < 12">
              <router-link :to="'/chi-tiet-phim/' + v.id + '-' + v.slug_phim">
                <div class="col d-flex ">
                  <div class="card bg-dark" style="height: 340px; width: 240px;">
                  <img :src="v.hinh_anh" class="card-img-top" style="height: 250px;" alt="..." />
                  <div class="position-absolute top-0 end-0 m-3 product-discount text-white rounded-pill text-center"
                    style="background-color: red; width: 70px">
                  </div>
                  <div class="card-body text-white">
                    <h6 class="card-title text-info">{{ v.ten_phim }}</h6>
                  </div>
                </div>
            </div>
              </router-link>
              
            </template>
          </template>
  
        </div>
      </div>
      <div class="col-lg-4">
        <div class="d-flex justify-content-star mt-5">
          <i class="fa-3x fa-solid fa-star fa-beat-fade me-2" style="color: #ffd43b"></i>
          <h2 style="color: #e0b010; margin-top: 5px">TOP PHIM CHIẾU RẠP</h2>
        </div>
        <div class="card" style="background-color: black">
          <div class="container">
            <a href="">
              
            </a>
           <template v-for="(v, i) in listTopPhimChieuRap" :key="i">
            <template v-if="i < 4">
                <div class="card mt-3">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      :src="v.hinh_anh"
                      style="width: 100px; height: 150px" alt="..." class="card-img" />
                  </div>
                  <div class="position-absolute top-0 end-0 m-3 product-discount text-white rounded-pill text-center"
                    style="background-color: gray; width: 100px">
                  </div>
  
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{{ v.ten_phim }}</h5>
                      
                      <p class="card-text">
                        <small class="text-muted">{{ v.luot_xem }} lượt xem</small>
                      </p>
                      <div class="cursor-pointer">
                        <i class="bx bxs-star text-warning"></i>
                        <i class="bx bxs-star text-warning"></i>
                        <i class="bx bxs-star text-warning"></i>
                        <i class="bx bxs-star text-warning"></i>
                        <i class="bx bxs-star text-secondary"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
           </template>
            
              
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-8">
        <div class="d-flex justify-content-between">
          <h4 style="color: #e0b010">PHIM BỘ</h4>
          <div>
            <p><a class="link-opacity-25-hover " href="/phim-bo">Xem tất cả <i class="text-primary fa-solid fa-play"></i></a>
            </p>
          </div>
        </div>
        <hr class="border border-warning border-2 opacity-50" />
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-4 row-cols-xxl-4 ">
  
          <template v-for="(v, i) in listPhimBo" :key="i">
            <template v-if="i < 12">
              <router-link :to="'/chi-tiet-phim/' + v.id + '-' + v.slug_phim">
                <div class="col d-flex ">
                  <div class="card bg-dark  " style="height: 340px; width: 240px;">
                  <img :src="v.hinh_anh" class="card-img-top" style="height: 250px;" alt="..." />
                  <div class="position-absolute top-0 end-0 m-3 product-discount text-white rounded-pill text-center"
                    style="background-color: red; width: 70px">
                  </div>
                  <div class="card-body text-white">
                    <h6 class="card-title text-info">{{ v.ten_phim }}</h6>
                  </div>
                </div>
            </div>
              </router-link>
            </template>
          </template>
  
        </div>
      </div>
      <div class="col-lg-4">
        <div class="d-flex justify-content-star mt-5">
          <i class="fa-3x fa-solid fa-star fa-beat-fade me-2" style="color: #ffd43b"></i>
          <h2 style="color: #e0b010; margin-top: 5px">TOP PHIM BỘ</h2>
        </div>
        <div class="card" style="background-color: black">
          <div class="container">
            <a href="">
              
            </a>
           <template v-for="(v, i) in listTopPhimBo" :key="i">
            <template v-if="i < 4">
                <div class="card mt-3">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      :src="v.hinh_anh"
                      style="width: 100px; height: 150px" alt="..." class="card-img" />
                  </div>
                  <div class="position-absolute top-0 end-0 m-3 product-discount text-white rounded-pill text-center"
                    style="background-color: gray; width: 100px">
                  </div>
  
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{{ v.ten_phim }}</h5>
                      
                      <p class="card-text">
                        <small class="text-muted">{{ v.luot_xem }} lượt xem</small>
                      </p>
                      <div class="cursor-pointer">
                        <i class="bx bxs-star text-warning"></i>
                        <i class="bx bxs-star text-warning"></i>
                        <i class="bx bxs-star text-warning"></i>
                        <i class="bx bxs-star text-warning"></i>
                        <i class="bx bxs-star text-secondary"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
           </template>
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
        mo_ta_phim: {},
        trailerPhim: {},
        listPhimDeCu: [],
        listPhimChieuRap: [],
        listTopPhimChieuRap: [],
        listTopPhimBo: [],
        listPhimBo: [],
        trailerUrl: ''
      }
    },
    methods: {
      loadPhimChieuRap() {
        axios
          .get("http://127.0.0.1:8000/api/khach-hang/phim/data-phim-chieu-rap")
          .then((res) => {
            this.listPhimChieuRap = res.data.data;
          });
      },
      loadPhimBo() {
        axios
          .get("http://127.0.0.1:8000/api/khach-hang/phim/data-phim-bo")
          .then((res) => {
            this.listPhimBo = res.data.data;
          });
      },
      loadPhimDeCu(){
        axios
          .get("http://127.0.0.1:8000/api/khach-hang/phim/data-phim-de-cu")
          .then((res) => {
              this.listPhimDeCu = res.data.data;
          });
      },
      loadTopPhimChieuRap(){
        axios
          .get("http://127.0.0.1:8000/api/khach-hang/phim/data-phim-top/phim-chieu-rap")
          .then((res) => {
              this.listTopPhimChieuRap = res.data.data;
          });
      },
      loadTopPhimBo(){
        axios
          .get("http://127.0.0.1:8000/api/khach-hang/phim/data-phim-top/phim-bo")
          .then((res) => {
              this.listTopPhimBo = res.data.data;
          });
      },
    },
    mounted() {
      this.loadPhimChieuRap();
      this.loadPhimBo();
      this.loadPhimDeCu();
      this.loadTopPhimChieuRap();
      this.loadTopPhimBo();
      const trailerModal = document.getElementById('trailer');
      trailerModal.addEventListener('hidden.bs.modal', () => {
        this.trailerUrl = '';
      });
      trailerModal.addEventListener('shown.bs.modal', () => {
        this.trailerUrl = this.trailerPhim.trailer;
      });
    },
    watch: {
      trailerPhim(newVal) {
        if (newVal.trailer) {
          this.trailerUrl = newVal.trailer;
        }
      }
    }
  };
  </script>
  <style></style>