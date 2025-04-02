import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save
import checkLoginKhachHang from "./checkLoginKhachHang";
import checkLoginNhanVien from "./checkLoginNhanVien";
const routes = [
    // {
    //     path: '/',
    //     component: () => import('../components/KhachHang/TrangChu/index.vue'),
    //     meta: { layout: "client-view" },
    // },
    {
      path: '/dang-nhap',
      component: () => import('../components/KhachHang/DangNhap/index.vue'),
      meta: { layout: "dangnhap-view" },
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
    
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router