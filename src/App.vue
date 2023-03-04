<template>
  <!--  <router-view />-->
  <MainLayout />
</template>

<script>
import { defineComponent } from "vue";
import { useMeta } from 'quasar';
import MainLayout from "layouts/MainLayout.vue";


function redirectIfNotRoot() {
  if (window.location.pathname === "/" && window.location.search === "")
    return

  // prerender ua 通过 head 通知，不需要重定向
  if (window.navigator.userAgent.startsWith('special-ua-for-prerender-')) {
    useMeta({
      meta: {
        "prerender-status-code": { name: "prerender-status-code", content: "301" },
        "prerender-header": { name: "prerender-header", content: "Location: /" },
      },
    })
  } else {
    window.location.replace("/")
  }
}

export default defineComponent({
  name: "App",
  components: { MainLayout, },
  methods: {
  },
  setup() {
    redirectIfNotRoot()
  }
});
</script>
