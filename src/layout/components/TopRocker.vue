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
					<img src="https://dzfullstack.com/assets/images/logo-img.png" class="user-img" alt="user avatar">
					<div class="user-info ps-3">
						<p class="user-name mb-0">{{ user.name }}</p>
						<p class="designattion mb-0">{{ user.email }}</p>
					</div>
				</a>
				<ul class="dropdown-menu dropdown-menu-end">
					<li>
						<a class="dropdown-item" href="/"><i class="bx bx-user"></i><span>Profile</span></a>
					</li>
					<li><a class="dropdown-item" href="javascript:;"><i
								class='bx bx-log-out-circle'></i><span>Logout</span></a>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</template>
<script>
export default {
	data() {
		return {
			user: {}
		}
	},
	mounted() {
		this.user = {
			name  : localStorage.getItem('name'),
			email : localStorage.getItem('email'),
		}
	},
}
</script>
<style></style>