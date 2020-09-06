<template>
    <div class="detailItem" @click="pushPath">
        <div class="imporant">
            <img :src="detailItme.img" alt="" style="width:100%">
            <div class="bottom">
                <div class="iconfont icon-dingdan">
                    <span class="video">111</span>
                </div>
                <div class="iconfont icon-bofang-tongyong">
                    <span class="comment">22</span>
                </div>
            </div>
        </div>
        <p>{{detailItme.name}}</p>
    </div>
</template>

<script>
export default {
  props: ["detailItme"],
  methods: {
      pushPath(){
          if(this.$route.path!=`/article/${this.detailItme.id}`){ 
            this.$router.push(`/article/${this.detailItme.id}`)
          }
      }
  },
};
</script>

<style lang="less">
.detailItem {
  p {
    font-size: 3.056vw;
  }
  .imporant {
    position: relative;
    .bottom {
      position: absolute;
      padding: 0 10px;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
      display: flex;
      bottom: 8px;
      left: 0;
      right: 0;
      justify-content: space-around;
      div {
        color: #fff;
      }
    }
  }
}
</style>

