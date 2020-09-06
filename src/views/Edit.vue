<template>
  <div v-if="model" class="editViews">
    <div style="margin-bottom:4.167vw;">
      <NavBar></NavBar>
    </div>
    <div class="uploader">
      <van-uploader :after-read="afterRead" preview-size="100vw" class="uploaderImg"/>
      <editBanner left="头像">
        <img :src="model.user_img" alt="" slot="right" v-if="model.user_img">
        <img src="@/assets/header.png" slot="right" alt="" v-else>
      </editBanner>
    </div>
    <editBanner left="姓名" @bannerClick="show=true">
      <a href="javascript:;" slot="right">{{model.name}}</a>
    </editBanner>
    <editBanner left="昵称">
      <a href="javascript:;" slot="right">{{model.username}}</a>
    </editBanner>
    <editBanner left="性别" @bannerClick="gendershow=true">
      <a href="javascript:;" slot="right">{{model.gender==1 ? '男':'女'}}</a>
    </editBanner>
    <editBanner left="个性签名" @bannerClick="textshow=true"></editBanner>
    <!-- 修改姓名 -->
    <van-dialog
      v-model="show"
      title="姓名"
      show-cancel-button
      @confirm="confrimClick"
      @cancel="content = ''"
    >
      <van-field v-model="content" placeholder="请输入姓名"/>
    </van-dialog>
    <!-- 修改标签 -->
    <van-dialog
      v-model="textshow"
      title="个性签名"
      show-cancel-button
      @confirm="textareaClick"
      @cancel="content = ''"
    >
      <van-field v-model="content" type="textarea" placeholder="请输入个性签名"/>
    </van-dialog>
    <!-- 修改性别 -->
    <van-action-sheet v-model="gendershow" :actions="actions" @select="onSelect" cancel-text="取消"/>

    <div class="editBack" @click="$router.back()">返回个人中心</div>
  </div>
</template>


<script>
import NavBar from "@/components/common/NavBar.vue";
import editBanner from "@/components/common/editBanner.vue";
export default {
  data() {
    return {
      model: {},
      show: false,
      textshow: false,
      gendershow: false,
      content: "",
      actions: [{ name: "男", val: 1 }, { name: "女", val: 0 }]
    };
  },
  components: {
    NavBar,
    editBanner
  },
  methods: {
    async selectUser() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
    async afterRead(file) {
      const fromdata = new FormData();
      fromdata.append("file", file.file);
      const res = await this.$http.post("/upload", fromdata);
      this.model.user_img = res.data.url;
      this.UserUpdate();
    },
    async UserUpdate() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      if(res.data.code==200){
        this.$msg.fail('修改成功')
      }
    },
    confrimClick() {
      this.model.name = this.content;
      this.UserUpdate();
      this.content = "";
    },
    textareaClick() {
      this.model.user_desc = this.content;
      this.UserUpdate();
      this.content = "";
    },
    onSelect(data){
      this.model.gender = data.val
      this.UserUpdate()
      this.gendershow = false
    }
  },
  created() {
    this.selectUser();
  }
};
</script>

<style lang="less">
.editViews {
  a {
    color: #333;
  }
}
.uploader {
  position: relative;
  overflow: hidden;
  img {
    width: 12.778vw;
    height: 12.778vw;
    border-radius: 50%;
  }
  .uploaderImg {
    opacity: 0;
    position: absolute;
  }
}
.editBack{
  margin-top: 4.167vw;
  background-color: #fff;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.778vw;
}
</style>

