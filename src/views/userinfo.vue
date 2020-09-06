<template>
    <div>
        <NavBar></NavBar>
        <div class="bgc_img"><img src="@/assets/bannerTop_new.png" alt=""></div>
        <UserDetail :userInfo ="model"></UserDetail>
    </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue'
import UserDetail from '@/components/userComponents/userDetail.vue'
export default {
    data() {
        return {
            model:{}
        }
    },
    components:{
        NavBar,
        UserDetail
    },
    methods: {
        async UserinfoData(){
            const res =  await this.$http.get('/user/'+localStorage.getItem('id'));
            this.model = res.data[0]
        }
    },
    created() {
        this.UserinfoData()
    },
}
</script>

<style lang="less">
.bgc_img{
    img{
        height: 30.556vw;
        width: 100%;
    }
}
</style>
