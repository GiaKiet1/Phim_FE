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
      path: '/dang-ky',
      component: () => import('../components/KhachHang/DangKy/index.vue'),
      meta: { layout: "dangnhap-view" },
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
    
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router