<template>
    <div>
        <div class="editBanner" @click="bannerClick">
            <span>{{left}}</span>
            <span><slot name="right"></slot></span>
        </div>
    </div>
</template>

<script>
export default {
    props:[
        'left'
    ],
    methods:{
        bannerClick() {
            this.$emit('bannerClick')
        }
    }
}
</script>
 
<style lang="less">
.editBanner{
    background-color: #fff;
    font-size: 3.889vw;
    padding: 4.167vw;
    border-bottom:0.278vw solid #fafafa;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
