<template>
  <!--  <router-view />-->
  <MainLayout />
</template>

<script>

export default defineComponent({
  name: "App",

  components: {
    MainLayout: () => import("layouts/MainLayout.vue"),
  }
});
</script>
