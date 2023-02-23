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

export default defineComponent({
  name: "MainLayout",

  components: {
    'IndexPage': () => import("pages/IndexPage.vue")
  },

  setup() {
       return { };
  },
});
</script>
