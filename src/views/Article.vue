<template>
    <div v-if="model">
        <nav-bar></nav-bar>
        <div class="detailInfo">
            <div class="vieo">
                <video :src="model.content" controls></video>
            </div>
            <div class="detailInfotext">
                <div>
                  <div>{{model.category.title}} </div>
                  <div>{{model.name}}</div>
                </div>
                <div>
                  <p>蜡笔</p>
                  <p>146.6万次观看</p>
                  <p>5281弹幕</p>
                  <p class="date">{{model.date}}</p>
                </div>
                <div>
                  <span class="iconfont icon-shoucang">收藏</span>
                  <span class="iconfont icon-xiazai">缓存</span>
                  <span class="iconfont icon-fenxiang">分享</span>
                </div>
            </div>
        </div>
        <div class="detailparent">
          <cover v-for="(item,index) in commnedList" :key="index" :detailItme="item" class="detailitem"></cover>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import cover from "./cover.vue"
export default {
  data() {
    return {
      model:null,
      commnedList:null
    };
  },
  components: {
    NavBar,
    cover
  },
  methods: {
    async getArticleItemData() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
    },
    async commentData(){
      const res = await this.$http.get("/commend")
      this.commnedList = res.data
    }
  },
  created() {
    this.getArticleItemData();
    this.commentData()
  },
  watch: {
    $route(){
      this.getArticleItemData();
      this.commentData()
    }
  },
};
</script>


<style lang="less">
.detailInfo {
    background-color: #fff;
  .vieo {
    width: 100%;
    video {
      width: 100%;
    }
  }
}
.iconfont{
  font-size: 18px;
  padding: 5px;
  color: #000;
}
.detailInfotext{
    padding: 4.167vw;
    div:nth-child(1){
      display: flex;
      margin-bottom: 2.778vw;
      div:nth-child(1){
        background-color: #F4F4F4;
        color:#FB7299;
        padding: 0 2.778vw;
        border-radius: 2.778vw;
      }
    }
    div:nth-child(2){
      display: flex;
      margin-bottom: 2.778vw;
      align-items: center;
      p:nth-child(1){
        color: #000;
        padding: 0 8px;
        font-size: 16px;
      }
      p{
        text-align: center;
        font-size: 15px;
        color: #ccc;
      }
    }
}

.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.detailitem {
  margin: 1.389vw 0;
  width: 45%;
}
</style>

