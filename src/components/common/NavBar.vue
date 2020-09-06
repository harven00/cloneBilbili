<template>
    <div class="navbar">
        <div class="logoLeft">
            <img src="@/assets/logo.png" alt="">
        </div>
        <div class="search">
            <p>
                请输入内容
                <van-icon name="search" class="v-search" />
            </p>
        </div>
        <div class="me">
            <img :src="imgUrl" alt="" @click="$router.push('/userinfo')">
            <p>下载App</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgUrl:''
        }
    },
    async mounted(){
        const res = await this.$http.get('/user/'+localStorage.getItem('id'))
        this.imgUrl = res.data[0].user_img
    }
}
</script>

<style lang="less">
.navbar{
    height: 12.5vw;
    background-color: #fff;
    display: flex;
    .logoLeft{
        width: 30.556vw;
        position: relative;
        img{
            position: absolute;
            width: 80%;
            top: 50%;
            transform: translate(0,-40%)
        }
    }
    .search{
        flex: 1;
        display:flex;
        align-items: center;
        margin-right: 2.778vw;
        p{  
            font-size: 4.167vw;
            background-color: #f4f4f4;
            padding: 1.389vw 0 1.389vw 9.722vw;
            width: 100%;
            border-radius: 4.167vw;
            position: relative;
            color: #aaa;
        }
        .v-search{  
            position: absolute;
            top: 50%;
            left: 10%;
            transform: translate(0,-50%);
        }
    }
    .me{
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: 8.889vw;
            height: 8.889vw;
            border-radius: 50%;
        }
        p{
            padding: 1.389vw 2.778vw;
            margin: 0 1.111vw;
            background-color: #fb7299;
            color: #fff;
            border-radius: 0.833vw;
            font-size: 3.889vw;
        }
    }
}
</style>
