import axios from "axios";

export default function(from, to, next){
    axios
    .get('http://127.0.0.1:8000/api/khach-hang/check-login',{
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('key_khachhang')
        }
    })
    .then((res) => {
        if(res.data.status){
            next();
            localStorage.setItem('name', res.data.name);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('so_du', res.data.so_du);
            localStorage.setItem('status', res.data.status);
        }else {
            next('/dang-nhap');
        }
    })
}