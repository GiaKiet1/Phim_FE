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
				<div class="col-lg-4"></div>
				<li class="nav-item">
					<router-link to="/">
						<a class="nav-link" href="/">
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
						<li> <a class="dropdown-item" href="/the-loai/hanh-dong"><i class="bx bx-right-arrow-alt"></i>Hành Động</a>
						</li>
						<li> <a class="dropdown-item" href="/the-loai/vien-tuong"><i class="bx bx-right-arrow-alt"></i>Viễn Tưởng</a>
						</li>
						<li> <a class="dropdown-item" href="/the-loai/kinh-di"><i class="bx bx-right-arrow-alt"></i>Kinh Dị</a>
						</li>
                        <li> <a class="dropdown-item" href="/the-loai/lang-man"><i class="bx bx-right-arrow-alt"></i>Lãng Mạng</a>
						</li>
						<li> <a class="dropdown-item" href="/the-loai/hai-huoc"><i class="bx bx-right-arrow-alt"></i>Hài Hước</a>
						</li>
						<li> <a class="dropdown-item" href="/the-loai/phieu-luu"><i class="bx bx-right-arrow-alt"></i>Phiêu Lưu</a>
						</li>
						<li> <a class="dropdown-item" href="/the-loai/lich-su"><i class="bx bx-right-arrow-alt"></i>Lịch Sử</a>
						</li>
						<li> <a class="dropdown-item" href="/the-loai/tam-ly"><i class="bx bx-right-arrow-alt"></i>Tâm Lý</a>
						</li>
						<li> <a class="dropdown-item" href="/the-loai/gia-tuong"><i class="bx bx-right-arrow-alt"></i>Giả Tưởng</a>
						</li>
						<li> <a class="dropdown-item" href="/the-loai/than-thoai"><i class="bx bx-right-arrow-alt"></i>Thần Thoại</a>
						</li>
					</ul>
				</li>

                <li class="nav-item">
					<router-link to="/phim-rap">
						<a class="nav-link" href="/phim-rap">
							<div class="parent-icon"><i class="bx bx-home-circle"></i>
							</div>
							<div class="menu-title">PHIM CHIẾU RẠP</div>
						</a>
					</router-link>
				</li>

                <li class="nav-item">
					<router-link to="/phim-bo">
						<a class="nav-link" href="/phim-bo">
							<div class="parent-icon"><i class="bx bx-home-circle"></i>
							</div>
							<div class="menu-title">PHIM BỘ</div>
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