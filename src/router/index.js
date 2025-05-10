import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save
import checkLoginKhachHang from "./checkLoginKhachHang";
import checkLoginNhanVien from "./checkLoginNhanVien";
const routes = [
    {
        path: '/',
        component: () => import('../components/KhachHang/TrangChu/index.vue'),
        meta: { layout: "client-view" },
    },
    {
      path: '/trang-chu',
      component: () => import('../components/KhachHang/TrangChu/index.vue'),
      meta: { layout: "client-view" },
      beforeEnter: checkLoginKhachHang,
  },
    {
      path: '/dang-nhap',
      component: () => import('../components/KhachHang/DangNhap/index.vue'),
      meta: { layout: "dangnhap-view" },
    },
    {
      path: '/kich-hoat/:id_khach_hang',
      component: () => import('../components/KhachHang/KichHoat/index.vue'),
      meta: { layout: "dangnhap-view" },
      props: true,
    },
    {
      path: '/quen-mat-khau',
      component: () => import('../components/KhachHang/QuenMatKhau/index.vue'),
      meta: { layout: "dangnhap-view" },
    },
    {
      path: '/quen-mat-khau/:hash_reset',
      component: () => import('../components/KhachHang/DoiMatKhau/index.vue'),
      meta: { layout: "dangnhap-view" },
      props: true,
    },
    {
      path: '/dang-ky',
      component: () => import('../components/KhachHang/DangKy/index.vue'),
      meta: { layout: "dangnhap-view" },
    },

    {
      path: '/chi-tiet-phim/:id_phim-:slug_phim',
      component: () => import('../components/KhachHang/ChiTietPhim/index.vue'),
      meta: { layout: "client-view" },
      props: true,
    },

    {
      path: '/tim-kiem/:tu_khoa',
      component: () => import('../components/KhachHang/TimKiem/index.vue'),
      meta: { layout: "client-view" },
      props: true,
    },

    {
      path: '/phim-rap',
      component: () => import('../components/KhachHang/PhimChieuRap/index.vue'),
      meta: { layout: "client-view" },
    },
    {
      path: '/phim-bo',
      component: () => import('../components/KhachHang/PhimBo/index.vue'),
      meta: { layout: "client-view" },
    },
    {
      path: '/profile',
      component: () => import('../components/KhachHang/Profile/index.vue'),
      meta: { layout: "client-view" },
      beforeEnter: checkLoginKhachHang,
    },
    {
      path: '/danh-sach-phim-da-mua',
      component: () => import('../components/KhachHang/DanhSachMuaPhim/index.vue'),
      meta: { layout: "client-view" },
      beforeEnter: checkLoginKhachHang,
    },


    {
      path: '/the-loai/kinh-di',
      component: () => import('../components/TheLoai/KinhDi/index.vue'),
      meta: { layout: "client-view" },
      
    },
    {
      path: '/the-loai/lang-man',
      component: () => import('../components/TheLoai/LangMan/index.vue'),
      meta: { layout: "client-view" },
      
    },
    {
      path: '/the-loai/hai-huoc',
      component: () => import('../components/TheLoai/HaiHuoc/index.vue'),
      meta: { layout: "client-view" },
      
    },
    {
      path: '/the-loai/phieu-luu',
      component: () => import('../components/TheLoai/PhieuLuu/index.vue'),
      meta: { layout: "client-view" },
      
    },
    {
      path: '/the-loai/vien-tuong',
      component: () => import('../components/TheLoai/VienTuong/index.vue'),
      meta: { layout: "client-view" },
      
    },
    {
      path: '/the-loai/lich-su',
      component: () => import('../components/TheLoai/LichSu/index.vue'),
      meta: { layout: "client-view" },
      
    },
    {
      path: '/the-loai/tam-ly',
      component: () => import('../components/TheLoai/TamLy/index.vue'),
      meta: { layout: "client-view" },
      
    },
    {
      path: '/the-loai/gia-tuong',
      component: () => import('../components/TheLoai/GiaTuong/index.vue'),
      meta: { layout: "client-view" },
      
    },
    {
      path: '/the-loai/hanh-dong',
      component: () => import('../components/TheLoai/HanhDong/index.vue'),
      meta: { layout: "client-view" },
      
    },
    {
      path: '/the-loai/than-thoai',
      component: () => import('../components/TheLoai/ThanThoai/index.vue'),
      meta: { layout: "client-view" },
      
    },
  
    //ADMIN
    {
      path: '/admin/dang-nhap',
      component: () => import('../components/Admin/DangNhap/index.vue'),
      meta: { layout: "dangnhap-view" },

    },
    {
      path: '/admin/khach-hang',
      component: () => import('../components/Admin/KhachHang/index.vue'),
      beforeEnter: checkLoginNhanVien,
    },
    {
      path: '/admin/nhan-vien',
      component: () => import('../components/Admin/NhanVien/index.vue'),
      beforeEnter: checkLoginNhanVien,
    },
    {
      path: '/admin/the-loai',
      component: () => import('../components/Admin/TheLoai/index.vue'),
      beforeEnter: checkLoginNhanVien,
    },
    {
      path: '/admin/phim',
      component: () => import('../components/Admin/Phim/index.vue'),
      beforeEnter: checkLoginNhanVien,
    },
    {
      path: '/admin/lich-su-giao-dich',
      component: () => import('../components/Admin/LichSuGiaoDich/index.vue'),
      beforeEnter: checkLoginNhanVien,
    },
    {
      path: '/admin/duyet-thanh-toan',
      component: () => import('../components/Admin/DuyetThanhToan/index.vue'),
      beforeEnter: checkLoginNhanVien,
    },
    {
      path: '/admin/chuc-nang',
      component: () => import('../components/Admin/ChucNang/index.vue'),
      beforeEnter: checkLoginNhanVien,
    },
    {
      path: '/admin/phan-quyen',
      component: () => import('../components/Admin/PhanQuyen/index.vue'),
      beforeEnter: checkLoginNhanVien,
    },
    {
      path: '/admin/chart-tien',
      component: () => import('../components/Admin/ChartTien/index.vue'),
      beforeEnter: checkLoginNhanVien,
    },
    {
      path: '/admin/chart-khach-hang',
      component: () => import('../components/Admin/ChartKhachHang/index.vue'),
      beforeEnter: checkLoginNhanVien,
    },
    {
      path: '/admin/chart-phim',
      component: () => import('../components/Admin/ChartPhim/index.vue'),
      beforeEnter: checkLoginNhanVien,
    },
    {
      path: '/admin/chart-the-loai',
      component: () => import('../components/Admin/ChartTheLoai/index.vue'),
      beforeEnter: checkLoginNhanVien,
    },
    {
      path: '/admin/thong-ke',
      component: () => import('../components/Admin/ThongKe/index.vue'),
      beforeEnter: checkLoginNhanVien,
    },
    {
      path: '/admin/duyet-phim',
      component: () => import('../components/Admin/DuyetPhim/index.vue'),
      beforeEnter: checkLoginNhanVien,
    },
    {
      path: '/admin/ds-phim-tu-choi',
      component: () => import('../components/Admin/DanhSachPhimDaBiTuChoi/index.vue'),
      beforeEnter: checkLoginNhanVien,
    },
    {
      path: '/admin/profile',
      component: () => import('../components/Admin/Profile/index.vue'),
      beforeEnter: checkLoginNhanVien,
    },
    

]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router