<template>
    <div>
        <div class="content">
            <p class="commonTxt">
                <span>评论</span>
                <span>({{dataLength}})</span>
            </p>
            <div class="userIpt">
                <img :src="myuser.user_img" alt="" v-if="myuser">
                <img src="@/assets/header.png" alt="" v-else>
                <input type="text" ref="PostInput" placeholder="请说些什么" v-model="content">
                <button @click="commnetPulish">发表</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['dataLength'],
    data() {
        return {
            myuser:null,
            content:''
        }
    },
    methods:{
        async myUser(){
            const res =await this.$http.get('/user/'+localStorage.getItem('id'))
            this.myuser = res.data[0]
        },
        commnetPulish(){
            if(!this.myuser&&!localStorage.getItem('id')&&!localStorage.getItem('token')){
                this.$msg.fail('请先登录')
                return
            }
            this.$emit('Postcomment',this.content)
            this.content = ''
        },
        focusIpt(){
            this.$refs.PostInput.focus()
        }
    },
    created(){
        if(localStorage.getItem('token')){
            this.myUser()
        }
    }
}
</script>

<style lang="less">
.content{
    padding: 2.778vw;
    .commonTxt{
        margin-left:2.778vw;
        span:nth-child(2){
                color: #ccc;
            }
        
    }
}
.userIpt{
    display: flex;
    margin: 2.778vw;
    img{
        width: 9.444vw;
        height: 9.444vw;
        border-radius: 50%;
    }
    input{
        margin-top: 1.111vw;
        margin-left: 1.389vw;
        width: 40%;
        border: none;
        border-radius: 4.444vw;
        height: 25px;
        background-color: #f4f4f4;
    }
    button{
        background-color: #fb7299;
        color: #fff;
        border: none;
        outline: none;
        border-radius: 5vw;
        font-size: 1.944vw;
        padding: 0 5.556vw;
        margin:1.111vw 0 0 0.556vw;
        height: 7.778vw;
    }
}
</style>
