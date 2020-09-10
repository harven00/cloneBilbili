<template>
  <div class="commned">
    <div class="contenLine" v-for="(item,index) in commentList" :key="index">
      <div class="commendContent">
        <div class="commendImg">
          <img :src="item.userinfo.user_img" alt="" v-if="item.userinfo.user_img">
          <img src="@/assets/header.png" alt="" v-else>
          <div class="commendText">
            <p>
              <span v-if="item.userinfo">{{item.userinfo.name}}</span>
              <span v-else>匿名</span>
              <span>{{item.comment_date}}</span>
            </p>
            <div>
              {{item.comment_content}}
              <span class="publistF" @click="publistClick(item.comment_id)">回复</span>
            </div>
          </div>
        </div>
      </div>
      <div style="padding-left:20px;">
        <cmitem @PostPublish="publistClick" :commentChild="item.child" ></cmitem>
      </div>
    </div>
  </div>
</template>

<script>
import cmitem from "./cmitem";
export default {
  data() {
    return {
      commentList: null
    };
  },
  components: {
    cmitem
  },
  methods: {
    async commentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      if(res.data){
        this.$emit('lengthselect',res.data.length)
      }
      this.commentList = this.changeCommentData(res.data);
    },
    changeCommentData(data) {
      function fn(temp) {
        let arr1 = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr1.push(data[i]);
            data[i].child = fn(data[i].comment_id);
          }
        }
        return arr1;
      }
      return fn(null);
    },
    publistClick(id){
      this.$emit('publishClick',id)
    }
  },
  created() {
    this.commentData();
  }
};
</script>

<style lang="less">
.commend {
  overflow: hidden;
  .contenLine {
    border-bottom: 1px solid #e7e7e7;
    .commendContent {
      padding: 10px 0;
      .commendImg {
        display: flex;
        margin-right: 2.778vw;
        img {
          width: 11.111vw;
          height: 11.111vw;
          border-radius: 50%;
        }
        .commendText {
          flex: 1;
          p {
            display: flex;
            justify-content: space-between;
            font-size: 4.167vw;
            color: #ccc;
          }
        }
        .publistF{
          position: absolute;
          right: 0;
          color: red;
        }
      }
    }
  }
}
</style>
