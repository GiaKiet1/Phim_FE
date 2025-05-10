<template>

	<div class="topbar d-flex align-items-center">
		<nav class="navbar navbar-expand">
			<div class="topbar-logo-header">
				<div class="">
					<img style="width: 70px;" src="https://lh3.googleusercontent.com/BqM2bF7Hr-IRcUS8vGgGTsjLZvb1qCiPVf0EO4-HZLJDMtj-slOCmx_FDY8HMHuUJDI" class="logo-icon" alt="logo icon">
				</div>
				<div class="mt-4">
					<h4 class="logo-text text-danger">PHIM TỔNG HỢP</h4>
                    <p class="text-center text-white">Xem phim chất lượng cao</p>
				</div>
			</div>
			
			<div class="search-bar flex-grow-1">
                <div class="position-relative search-bar-box"> 
                    <input v-model="search" @keyup.enter="searchPhim()" type="text" class="form-control search-control rounded-pill" placeholder="Tìm Kiếm phim...">
                    <span class="position-absolute top-50 search-show translate-middle-y"><i class='bx bx-search'></i></span>
                    <span class="position-absolute top-50 search-close translate-middle-y"><i class='bx bx-x'></i></span>
                </div>
            </div>
			
			<div class="user-box dropdown">
				<template v-if="user.status == 1">
						<a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
						role="button" data-bs-toggle="dropdown" aria-expanded="false">
						<img src="https://dzfullstack.com/assets/images/logo-img.png" class="user-img" alt="user avatar">
						<div class="user-info ps-3">
							<p class="user-name mb-0 text-white">{{ user.name }}</p>
							<p class="designattion mb-0">{{ user.email }}</p>
							<p class="designattion mb-0">Số dư: {{ formatCurrency(user.so_du) }}</p>
						</div>
						</a>
						<ul class="dropdown-menu dropdown-menu-end">
							<li>
								<a class="dropdown-item" href="/profile"><i class="bx bx-user"></i><span>Profile</span></a>
							</li>
							<li>
								<a class="dropdown-item" href="/danh-sach-phim-da-mua"><i class="fa-solid fa-list-ul"></i><span>Danh Sách Phim Đã Mua</span></a>
							</li>
							<li><a v-on:click="logout()" class="dropdown-item" href="javascript:;"><i
									class='bx bx-log-out-circle'></i><span>Đăng Xuất</span></a>
							</li>
							
						</ul>
				</template>
					
				<template v-else>
					<router-link to="/dang-nhap">
						<button class="btn btn-outline-primary ms-4 me-3 rounded-pill"><i
							class="fa-regular fa-user me-2"></i> Đăng Nhập</button>
					</router-link>
					<router-link to="/dang-ky">
						<button class="btn btn-outline-secondary rounded-pill"><i
							class="fa-solid fa-arrow-right-to-bracket me-2"></i>Đăng Ký</button>
					</router-link>
				</template>
			</div>
			<div>
				
			</div>
		</nav>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	data() {
		return {
			user : {},
			search: ''
		}
	},
	mounted() {
        
		
		this.user = {
			name : localStorage.getItem('name'),
			email : localStorage.getItem('email'),
			so_du : localStorage.getItem('so_du'),
			status : localStorage.getItem('status'),
		}
	},
	methods: {
		searchPhim() {
			if (!this.search) {
				this.$toast.error('Vui lòng nhập từ khóa tìm kiếm');
				return;
			}
			this.$router.push('/tim-kiem/' + this.search);
		
        },
		logout(){
			axios
			.get('http://127.0.0.1:8000/api/khach-hang/dang-xuat', {
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem("key_khachhang")
				}
			})
			.then((res) => {
				if(res.data.status){
					localStorage.removeItem("key_khachhang");
					localStorage.removeItem("id_khach_hang");
					localStorage.removeItem("name");
					localStorage.removeItem("email");
					localStorage.removeItem("so_du");
					localStorage.removeItem("status");
					this.$toast.success(res.data.message);
					this.$router.push('/dang-nhap');
				}
				else{
					this.$toast.error(res.data.message);
				}
			})
			.catch((err) => {
				this.$toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
			})
		},
	
		formatCurrency(value) {
			if (!value) return '0 VND';
			return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
		}
	},
}
</script>
<style>

</style>