<template>

    <div class="row">
        <div class="col-lg-3">
            <router-link to="/admin/chart-tien">
                <button class="btn btn-outline-success">Thống Kê Tài Chính</button>
            </router-link>
        </div>
        <div class="col-lg-3">
            <router-link to="/admin/chart-khach-hang">
                <button class="btn btn-outline-primary">Thống Kê Khách Hàng</button>
            </router-link>
        </div>
        <div class="col-lg-3">
            <router-link to="/admin/chart-phim">
                <button class="btn btn-outline-success">Thống Kê Phim</button>

            </router-link>
        </div>
        <div class="col-lg-3">
            <router-link to="/admin/chart-the-loai">
                <button class="btn btn-outline-primary">Thống Kê Thể Loại</button>

            </router-link>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style></style>