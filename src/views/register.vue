<template>
    <div>
        <LoginTop middleTop="注册BiliBli">
          <div slot="right" style="font-size:2.778vw" @click="$router.push('/login')">跳转到登录</div>
        </LoginTop>
        <LoginText
            label="姓名"
            style="margin:4.444vw 0"
            placeholder="请输入姓名"
            rule="^.{6,16}$"
            @inputChange="res=>model.name=res"
        />
        <LoginText
            label="账号"
            placeholder="请输入账号"
            rule="^.{6,16}$"
            @inputChange="res=>model.username=res"
        />
        <LoginText
            label="密码"
            type="password"
            placeholder="请输入密码"
            rule="^.{6,16}$"
            @inputChange="res=>model.password=res"
        />
        <LoginBtn btnText="注册" @registerSubmit="registerSubmit"/>
    </div>
</template>

<script>
import LoginTop from "@/components/common/LoginTop.vue";
import LoginText from "@/components/common/LoginText.vue";
import LoginBtn from "@/components/common/LoginButton.vue";
export default {
  data() {
    return {
      model: {
        name: "",
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async registerSubmit() {
      let relg = /^.{6,16}$/;
      if (
        relg.test(this.model.name) &&
        relg.test(this.model.username) &&
        relg.test(this.model.password)
      ) {
        const res = await this.$http.post("/register", this.model);
        this.$msg.fail(res.data.msg)
        localStorage.setItem('id',res.data.id)
        localStorage.setItem('token',res.data.objtoken)
        setTimeout(() => {
          this.$router.push('/userinfo')
        }, 1000);
      }else{
          this.$msg.fail('格式不正确,请重新输入')
      }
    }
  },
  components: {
    LoginTop,
    LoginText,
    LoginBtn
  }
};
</script>

<style lang="less">
</style>
