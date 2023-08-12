<template>
  <q-page class="flex flex-center">
    <q-list>
      <q-item-label header style="font-size: 30px">ASMR Online 最新域名</q-item-label>
      <EssentialLink v-for="link in links" :key="link.title" :title="link.title" :caption="link.caption" :link="link.link"/>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const links = [
  {
    title: "asmr-300.com",
    link: "https://asmr-300.com/",
    caption: "移动可直链"
  },
  {
    title: "asmr-200.com",
    link: "https://asmr-200.com/",
    caption: "好像有部分地区无法访问"
  },
  {
    title: "asmr-100.com",
    link: "https://asmr-100.com/",
    caption: "已被墙"
  },
  {
    title: "asmr.one",
    link: "https://asmr.one/",
    caption: ""
  }
]

export default defineComponent({
  name: "IndexPage",
  components: {EssentialLink},
  setup() {
    return {
      links
    }
  }
});
</script>
