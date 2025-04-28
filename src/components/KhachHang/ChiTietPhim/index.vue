<template>
  <div>
    <div class="row">
      <div class="col-lg-1"></div>
      <div class="col">
        <div class="card" style="background-color: black;">
          <div class="row g-0 mt-3 mb-3 ms-3">
            <div class="col-md-4">
              <img :src="chi_tiet_phim.hinh_anh" style="width: 380px;" alt="..." class="card-img">
              <div class="d-flex justify-content mt-2" style="margin-left: 76px;">
                <button v-on:click="loadPhim()" class="btn btn-success me-2 text-nowarp">Xem Phim</button>
                <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#trailer">Trailer Phim</button>
              </div>
            </div>
            <div class="col-md-8">
              <div class="card-body text-white" style="margin-left: 30px;">
                <h1 class="text-white">{{ chi_tiet_phim.ten_phim }}</h1>
                <div style="margin-top: 50px;">
                  <p>Lượt xem: {{ chi_tiet_phim.luot_xem }}</p>
                  <p>Thời lượng: {{ chi_tiet_phim.thoi_luong }} phút</p>
                  <p>Đạo diễn: {{ chi_tiet_phim.dao_dien }}</p>
                  <p>Diễn viên: {{ chi_tiet_phim.dien_vien }}</p>
                  <p>Quốc gia: {{ chi_tiet_phim.quoc_gia }}</p>
                  <p>Ngày khởi chiếu: {{ chi_tiet_phim.ngay_khoi_chieu }}</p>
                  <p>Ngày kết thúc: {{ chi_tiet_phim.ngay_ket_thuc }}</p>
                  <div class="cursor-pointer">
                    <i class="bx bxs-star text-warning"></i>
                    <i class="bx bxs-star text-warning"></i>
                    <i class="bx bxs-star text-warning"></i>
                    <i class="bx bxs-star text-warning"></i>
                    <i class="bx bxs-star text-warning"></i>
                    <i class="bx bxs-star text-warning"></i>
                    <i class="bx bxs-star text-warning"></i>
                    <i class="bx bxs-star text-secondary"></i>
                    <i class="bx bxs-star text-secondary"></i>
                    <i class="bx bxs-star text-secondary"></i>
                  </div>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                  <div>
                    <b class="me-4">Giá bán: {{ formatCurrency(chi_tiet_phim.gia_ban) }}</b>
                    <button v-on:click="muaPhim()" class="btn btn-secondary">Mua Phim</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-1"></div>
    </div>
    <div class="row">
      <div class="col-lg-8">
        <h2 style="color: #e0b010;">Mô tả phim</h2>
        <hr class="border border-warning border-2 opacity-50" />
        <h5 class="text-white">
          {{ chi_tiet_phim.mo_ta }}
        </h5>
      </div>
      
    </div>


    <div v-if="phim.link_phim" class="row" style="margin-top: 100px;">
      <div class="col-lg-2"></div>
      <div class="col-lg-8">
      <iframe width="100%" height="600" :src="phim.link_phim" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <marquee behavior="scroll" direction="left" scrollamount="15" style="font-size: 20px; margin-top: 20px;">
        <h5 class="text-white">Chúc bạn xem phim vui vẻ!! <i class="fa-regular fa-face-smile-wink fa-bounce"></i></h5>
      </marquee>
      </div>
      <div class="col-lg-2"></div>
    </div>
    



    <!-- Modal -->
    <div class="modal fade" id="trailer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Trailer Phim</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <iframe ref="trailerIframe" width="100%" height="500" :src="trailerUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['id_phim', 'slug_phim'],
  data() {
    return {
      id_phim: this.$route.params.id_phim,
      chi_tiet_phim: {},
      trailerUrl: '',
      phim: {},
      phim_chi_tiet: {
        id_phim: this.$route.params.id_phim,
      },

    };
  },
  mounted() {
    
    
    this.loadchiTietPhim();
    const trailerModal = document.getElementById('trailer');
    trailerModal.addEventListener('hidden.bs.modal', () => {
      this.trailerUrl = '';
    });
    trailerModal.addEventListener('shown.bs.modal', () => {
      this.trailerUrl = this.chi_tiet_phim.trailer;
    });
  },
  methods: {
    loadPhim(){
        axios
        .post('http://127.0.0.1:8000/api/khach-hang/load-phim',this.phim_chi_tiet,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('key_khachhang')}`
        }
        })
        .then(res => {
          if (res.data.status == 1) {
            this.phim = res.data.data;
            console.log(this.phim.link_phim);
          } else {
            this.$toast.error(res.data.message);
          }
        })
    },
    muaPhim() {
      var payload = {
        id_phim: this.id_phim,
        so_tien_mua: this.chi_tiet_phim.gia_ban
      };
      axios
        .post('http://127.0.0.1:8000/api/khach-hang/mua-phim', payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('key_khachhang')}`
          }
        })
        .then(res => {
          if (res.data.status == 1) {
            this.$toast.success(res.data.message);
          } else if (res.data.status == 2) {
            this.$toast.warning(res.data.message);
            this.$router.push('/profile');
          } else {
            this.$toast.error(res.data.message);
          }
        })
        .catch(res => {
          this.$toast.error('Vui lòng đăng nhập để mua phim!');
        });
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },
    loadchiTietPhim() {
      axios
        .get('http://127.0.0.1:8000/api/phim/chi-tiet/' + this.id_phim)
        .then(res => {
          if (res.data.status == 1) {
            this.chi_tiet_phim = res.data.data;
            this.trailerUrl = this.chi_tiet_phim.trailer;
          } else {
            this.$toast.console.error(res.data.message);
            this.$router.push('/');
          }
        });
    }
  }
};
</script>

<style>
/* Add any additional styles here */
</style>