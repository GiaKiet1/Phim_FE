import axios from "axios";

export default function(from, to, next){
    axios
    .get('http://127.0.0.1:8000/api/admin/check-login',{
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('key_admin')
        }
    })
    .then((res) => {
        if(res.data.status){
            next();
            localStorage.setItem('name', res.data.name);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('status', res.data.status);
        }else {
            next('/admin/dang-nhap');
        }
    })
}