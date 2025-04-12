<template>

</template>
<script>
import axios from 'axios';

export default {
    props : ['id_khach_hang'],
    methods: {
        kichHoatTaiKhoan(){
            var payload = {
                id_khach_hang: this.id_khach_hang
            }
            axios 
            .post("http://127.0.0.1:8000/api/khach-hang/kich-hoat-tai-khoan", payload)
            .then((res)=> {
                if(res.data.status == 1){
                    this.$toast.success(res.data.message);
                    this.$router.push('/dang-nhap');
                }
                else if(res.data.status == 2){
                    this.$toast.warning(res.data.message);
                    this.$router.push('/');}
                else{
                    this.$toast.error(res.data.message);
                    this.$router.push('/');
                }
            })
        }
    },
    mounted() {
        this.kichHoatTaiKhoan()
    }
}
</script>
<style>
    
</style>