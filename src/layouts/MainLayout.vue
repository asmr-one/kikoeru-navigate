<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
<!--      <router-view />-->
      <IndexPage />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import IndexPage from "pages/IndexPage.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    IndexPage
  },

  setup() {
       return { };
  },
});
</script>
