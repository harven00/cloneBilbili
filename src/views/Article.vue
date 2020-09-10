<template>
  <div v-if="model">
    <nav-bar></nav-bar>
    <div class="detailInfo">
      <div class="vieo">
        <video :src="model.content" controls></video>
      </div>
      <div class="detailInfotext">
        <div>
          <div>{{model.category.title}}</div>
          <div>{{model.name}}</div>
        </div>
        <div>
          <p>蜡笔</p>
          <p>146.6万次观看</p>
          <p>5281弹幕</p>
          <p class="date">{{model.date}}</p>
        </div>
        <div>
          <span class="iconfont icon-shoucang" @click="collectionClick" :class="{activeCl:collectionActive}">收藏</span>
          <span class="iconfont icon-xiazai">缓存</span>
          <span class="iconfont icon-fenxiang">分享</span>
        </div>
      </div>
    </div>
    <div class="detailparent">
      <cover v-for="(item,index) in commnedList" :key="index" :detailItme="item" class="detailitem"></cover>
    </div>
    <div class="content">
      <common :dataLength="lens" @Postcomment="PostSuccess" ref="commentIpt"></common>
    </div>
    <div class="commend">
      <commend @lengthselect="len => lens=len" ref="commentPublish" @publishClick="PostchildClick"></commend>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
import cover from "./cover.vue";
import common from "@/components/article/common.vue";
import commend from "@/components/article/commend.vue";
export default {
  data() {
    return {
      model: null,
      commnedList: null,
      lens: null,
      Postcom: {
        comment_content: "",
        comment_date: "",
        parent_id: null,
        article_id: null
      },
      collectionActive:null
    };
  },
  components: {
    NavBar,
    cover,
    common,
    commend
  },
  methods: {
    async getArticleItemData() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
    },
    async commentData() {
      const res = await this.$http.get("/commend");
      this.commnedList = res.data;
    },
    //发送评论
    async PostSuccess(res) {
      const date = new Date();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      let str = `${m}-${d}`;
      this.Postcom.comment_content = res;
      this.Postcom.comment_date = str;
      this.Postcom.article_id = this.$route.params.id;
      const result = await this.$http.post(
        "/comment_post/" + localStorage.getItem("id"),
        this.Postcom
      );
      this.$refs.commentPublish.commentData();
      this.Postcom.parent_id = null
      if(result.status===200){
        this.$msg.fail('发表评论成功')
      }
    },
    PostchildClick(id) {
      this.Postcom.parent_id = id;
      this.$refs.commentIpt.focusIpt();
    },
    //收藏文章
     async collectionClick(){
       const res= await this.$http.post('/collection/'+localStorage.getItem('id'),{article_id:this.$route.params.id})
       if(res.data.msg==="收藏成功"){
         this.collectionActive = true
       }else{
         this.collectionActive = false
       }
    },
    //进入页面看是否收藏文章
    async collectionInit(){
      if(localStorage.getItem('token')){
        const res= await this.$http.get('/collection/'+localStorage.getItem('id'),{
          params:{
            article_id:this.$route.params.id
          }
        })
        this.collectionActive=res.data.success
      }
    }
  },
  created() {
    this.getArticleItemData();
    this.commentData();
    this.collectionInit()
  },
  watch: {
    $route() {
      this.getArticleItemData();
      this.commentData();
      this.collectionInit()
    }
  }
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
.iconfont {
  font-size: 18px;
  padding: 5px;
  color: #000;
}
.detailInfotext {
  padding: 4.167vw;
  div:nth-child(1) {
    display: flex;
    margin-bottom: 2.778vw;
    div:nth-child(1) {
      background-color: #f4f4f4;
      color: #fb7299;
      padding: 0 2.778vw;
      border-radius: 2.778vw;
    }
  }
  div:nth-child(2) {
    display: flex;
    margin-bottom: 2.778vw;
    align-items: center;
    p:nth-child(1) {
      color: #000;
      padding: 0 8px;
      font-size: 16px;
    }
    p {
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
  background-color: #fff;
}
.detailitem {
  margin: 1.389vw 0;
  width: 45%;
}
.content {
  background-color: #fff;
}
.commend {
  background-color: #fff;
}
.activeCl{
  color:#fb7299;
}
</style>

