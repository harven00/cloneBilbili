<template>
    <div class="btnBox">
        <div class="loginbtn" @click="registerClick">{{btnText}}</div>
    </div>
</template>

<script>
export default {
    props:['btnText'],
    methods: {
        registerClick(){
            this.$emit('registerSubmit')
        }
    }
}
</script>

<style lang="less">
.loginbtn{
    height: 12.5vw;
    background-color: pink;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.167vw;
    border-radius: 6.25vw;
}
.btnBox{
    padding: 4.167vw 2.778vw;
}
</style>
