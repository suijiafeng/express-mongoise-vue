<template>
  <div>
    <head-nav />
    <aside-menu @isCollage="toCollage" />
    <router-view  :isCollage="isCollage" />
  </div>
</template>

<script>
import headNav from "@/components/headNav";
import asideMenu from "@/components/asideMenu";
export default {
  components: {
    headNav,
    asideMenu
  },
  data() {
    return {
      isCollage: true
    };
  },
  methods: {
    toCollage(e) {
      this.isCollage = e;
    }
  }
};
</script>

<style>
</style>
