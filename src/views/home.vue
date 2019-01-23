<template>
  <div
    class="home"
    :class="{'isCollage':isCollage}"
  >
    <div class="container">
      <h1 class="title">外星服务站</h1>
      <p class="lead"> 专注未知世界探索，传递人类文明火炬! </p>
    </div>
    <foundList />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    isCollage: {
      type: Boolean,
      default: true
    }
  },
  components: {
    foundList: () => import("../components/foundList")
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 180px;
  transition: all 0.5s;
  background-size: 100% 100%;
}
.isCollage {
  padding-left: 55px;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 0;
  margin-top:70px;
  background: url(../assets/showcase.png) no-repeat;
  text-align: center;
  color: white;
}
.title {
  font-size: 30px;
  margin:0;
}
.lead {
  /* margin-top: 50px;
  font-size: 22px; */
}
</style>