<template>

	<div class="topbar d-flex align-items-center" >
		<nav class="navbar navbar-expand">
			<div class="topbar-logo-header">
				<div class="">
					<img style="width: 70px;" src="https://lh3.googleusercontent.com/BqM2bF7Hr-IRcUS8vGgGTsjLZvb1qCiPVf0EO4-HZLJDMtj-slOCmx_FDY8HMHuUJDI" class="logo-icon" alt="logo icon">
				</div>
				<div class="mt-4">
					<h4 class="logo-text text-danger">PHIM TỔNG HỢP</h4>
                    <p class="text-center">Xem phim chất lượng cao</p>
				</div>
			</div>
			<div class="mobile-toggle-menu"><i class='bx bx-menu'></i></div>
			
			<div class="top-menu ms-auto">
				
			</div>
			<div class="user-box dropdown">
				<a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
					role="button" data-bs-toggle="dropdown" aria-expanded="false">
					<img src="https://i.pinimg.com/736x/e3/90/23/e390232d11ed660f47a1002d9bbdbbcd.jpg" class="user-img" alt="user avatar">
					<div class="user-info ps-3">
						<p class="user-name mb-0">{{ user.name }}</p>
						<p class="designattion mb-0">{{ user.email }}</p>
					</div>
				</a>
				<ul class="dropdown-menu dropdown-menu-end">
					<li>
						<a class="dropdown-item" href="/admin/profile"><i class="bx bx-user"></i><span>Profile</span></a>
					</li>
					<li><a  v-on:click="logout()" class="dropdown-item" href="javascript:;"><i
								class='bx bx-log-out-circle'></i><span>Đăng Xuất</span></a>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</template>
<script>
import axios from 'axios';

export default {
	data() {
		return {
			user: {}
		}
	},
	methods: {
		logout(){
			axios
			.get('http://127.0.0.1:8000/api/admin/dang-xuat', {
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem("key_admin")
				}
			})
			.then((res)=>{
					if(res.data.status){
						localStorage.removeItem('key_admin');
						localStorage.removeItem("name");
						localStorage.removeItem("email");
						localStorage.removeItem("status");
						this.$toast.success(res.data.message);
						this.$router.push('/admin/dang-nhap')
					}else{
						this.$toast.error('Có lỗi xảy ra')
					}
				})
			.catch((err) => {
				this.$toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
			})
		},
	},
	mounted() {
		this.user = {
			name  : localStorage.getItem('name'),
			email : localStorage.getItem('email'),
			status: localStorage.getItem('status'),
		}
		
	},
}
</script>
<style></style>