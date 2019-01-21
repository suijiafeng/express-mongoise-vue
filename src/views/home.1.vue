<template>
  <div class="home">
    <div class="tip">
      <p>你已成功登🦌月球管理系统</p>
      <p>正在为您连接基地三级防控网络</p>
      <el-progress
        :text-inside="true"
        :stroke-width="28"
        :percentage="percentage"
      ></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      percentage: 0,
      percentageSetInterval:""
    };
  },
  created() {
    this.percentageSetInterval = setInterval(() => {
      if (this.percentage < 100) {
        // this.percentage += Number((Math.random()*10).toFixed(0))
        this.percentage += Math.round(Math.random());
      } else {
        this.percentage = 0;
      }
    }, 200);
  },
  beforeDestroy() {
    clearInterval(this.percentageSetInterval);
   alert(this.percentageSetInterval)
  }
};
</script>

<style>

body {
  background: black;
}

.home {
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;
}
.home .el-progress-bar__outer{
    background-color: antiquewhite
}
.home .tip{
    color: aliceblue;
}
</style>
