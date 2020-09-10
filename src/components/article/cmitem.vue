<template>
    <div class="commned">
        <div class="contenLine">
            <div class="commendContent" v-for="(item,index) in commentChild" :key="index">
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
                            <div v-if="!temp">{{item.comment_content}} <span class="publish" @click="postItemComment(item.comment_id)">回复</span></div>
                            <div v-else>
                                回复<span style="color:#478ef0">{{item.parent_user_info.name}}</span>:{{item.comment_content}}
                                <span class="publish" @click="postItemComment(item.comment_id)">回复</span>
                            </div>
                        </div>
                    </div>
                </div>
                <commnetItemChild :commentChild="item.child" @postChild="postChild" temp="true"></commnetItemChild>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "commnetItemChild",
  props: ["commentChild",'temp'],
  methods:{
      postItemComment(id){
          this.$emit('postChild',id)
          this.$emit('PostPublish',id)
      },
      postChild(id){
          this.postItemComment(id)
          this.$emit('PostPublish',id)
      }
  }
};
</script>

<style lang="less">
.commned {
  .cmChild {
    border: none;
  }
  .commendContent{
      position: relative;
      .publish{
          position: absolute;
          right: 5.556vw;
          color: red;
      }
  }
}
</style>
