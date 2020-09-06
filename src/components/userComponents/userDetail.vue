<template>
    <div class="usercontent">
        <div class="userDetail">
            <div class="userImg">
                <img :src="userInfo.user_img" alt="" v-if="userInfo.user_img">
                <img src="@/assets/header.png" alt v-else/>
            </div>
            <div class="userEdit">
                <div>
                    <p>
                        <span>0</span>
                        <span class="user_text">粉丝</span>
                    </p>
                    <p>
                        <span>54</span>
                        <span class="user_text">关注</span>
                    </p>
                    <p>
                        <span>3</span>
                        <span class="user_text">获赞</span>
                    </p>
                </div>
                <div>
                    <div class="userBtn" @click="$router.push('/edit')">编辑资料</div>
                </div>
            </div>
        </div>
        <div class="userTip">
            <h2>{{userInfo.name}}</h2>
            <p v-if="userInfo.user_desc">{{userInfo.user_desc}}</p>
            <p v-else>这个人很神秘什么都没有写</p>
        </div>
    </div>
</template>

<script>
export default {
  props:['userInfo']
};
</script>

<style lang="less">
.usercontent {
  background-color: #fff;
  height: auto;
  padding: 0 2.778vw;
  .userDetail {
    display: flex;
    .userImg {
      flex: 1;
      margin-right: 3.889vw;
      img {
        width: 22.222vw;
        height: 22.222vw;
        border-radius: 50%;
      }
    }
    .userEdit {
      flex: 5;
      div:nth-child(1) {
        display: flex;
        margin-top: 4.167vw;
        p {
          flex: 1;
          display: flex;
          justify-content: center;
          align-content: center;
          flex-direction: column;
          text-align: center;
          font-size: 3.611vw;
          .user_text {
            color: #aaa;
          }
        }
        p:nth-child(1),
        p:nth-child(2) {
          border-right: 0.278vw solid #ccc;
        }
      }
      div:nth-child(2) {
        width: 55.556vw;
        margin: auto;
        .userBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 0.278vw solid #fb7a9f;
          color: #fb7a9f;
          border-radius: 1.389vw;
          padding: 0.833vw;
        }
      }
    }
  }
  .userTip {
    padding-bottom: 5.556vw;
    h2{
      font-weight: 400;
      font-size: 8.333vw;
    }
    p {
      color: #aaa;
      display: flex;
      align-content: center;
      font-size: 4.444vw;
    }
  }
}
</style>
