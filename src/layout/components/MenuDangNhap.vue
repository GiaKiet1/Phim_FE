<template>
	<div class="nav-container primary-menu">
		<div class="mobile-topbar-header">
			<div>
				<img src="../../assets/images/logo-icon.png" class="logo-icon" alt="logo icon">
			</div>
			<div>
				<h4 class="logo-text">Rukada</h4>
			</div>
			<div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left'></i>
			</div>
		</div>
		<nav class="navbar navbar-expand-xl w-100">
			<ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
				
				<li class="nav-item dropdown">
					<a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
						<div class="parent-icon"><i class="bx bx-home-circle"></i>
						</div>
						<div class="menu-title">Dashboard</div>
					</a>
					<ul class="dropdown-menu">
						<li> <a class="dropdown-item" href="index.html"><i class="bx bx-right-arrow-alt"></i>Default</a>
						</li>
						<li> <a class="dropdown-item" href="index.html"><i class="bx bx-right-arrow-alt"></i>Alternate</a>
						</li>
						<li> <a class="dropdown-item" href="index.html"><i class="bx bx-right-arrow-alt"></i>Graphical</a>
						</li>
					</ul>
				</li>

				<li class="nav-item">
					<router-link to="/khach-hang/trang-chu">
						<a class="nav-link" href="/khach-hang/trang-chu">
							<div class="parent-icon"><i class="bx bx-home-circle"></i>
							</div>
							<div class="menu-title">TRANG CHỦ</div>
						</a>
					</router-link>
				</li>
				
                <li class="nav-item dropdown">
					<a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
						<div class="parent-icon"><i class="bx bx-home-circle"></i>
						</div>
						<div class="menu-title">THỂ LOẠI</div>
					</a>
					<ul class="dropdown-menu">
						<li> <a class="dropdown-item" href="index.html"><i class="bx bx-right-arrow-alt"></i>Khoa Học</a>
						</li>
						<li> <a class="dropdown-item" href="index.html"><i class="bx bx-right-arrow-alt"></i>Viễn Tưởng</a>
						</li>
						<li> <a class="dropdown-item" href="index.html"><i class="bx bx-right-arrow-alt"></i>Kinh Dị</a>
						</li>
                        <li> <a class="dropdown-item" href="index.html"><i class="bx bx-right-arrow-alt"></i>Tình Cảm</a>
						</li>
					</ul>
				</li>

                <li class="nav-item">
					<router-link to="/">
						<a class="nav-link" href="/">
							<div class="parent-icon"><i class="bx bx-home-circle"></i>
							</div>
							<div class="menu-title">PHIM CHIẾU RẠP</div>
						</a>
					</router-link>
				</li>

                <li class="nav-item">
					<router-link to="/khach-hang/trang-chu">
						<a class="nav-link" href="/khach-hang/trang-chu">
							<div class="parent-icon"><i class="bx bx-home-circle"></i>
							</div>
							<div class="menu-title">PHIM MỚI</div>
						</a>
					</router-link>
				</li>
			</ul>
		</nav>
	</div>
</template>
<script>
export default {

}
</script>
<style></style>