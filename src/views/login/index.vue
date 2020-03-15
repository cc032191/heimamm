<template>
  <div class="login">
    <div class="login-left">
      <div class="title">
        <img src="../../assets/titlelogo.png" alt />
        <span class="title-heima">黑马面面</span>
        <span class="title-long"></span>
        <span class="title-login">用户登录</span>
      </div>
      
    </div>
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {};
</script>

<style lang='less'>
.login {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  align-items: center;
  justify-content: space-around;
  .login-left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 48px 42px 86px;
    box-sizing: border-box;
    .title {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
      }
      .title-heima {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 17px;
      }
      .title-long {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-left: 14px;
      }
      .title-login {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 12px;
      }
    }
  }
  img {
    width: 633px;
    height: 435px;
  }
}
</style>