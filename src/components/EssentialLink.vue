<template>
  <q-item clickable tag="a" target="_blank" :href="link">
    <q-item-section>
      <q-item-label style="font-size: 20px">{{ title }}</q-item-label>
      <q-item-label caption style="font-size: 15px">{{ caption }}</q-item-label>
    </q-item-section>

    <q-item-section side :style="{'color': latencyResult.color}">
      <q-icon v-if="latencyResult.icon" style="display: inline-block" :name="latencyResult.icon" />
      <span v-if="latencyResult.text"> {{ latencyResult.text }} </span>
    </q-item-section>
  </q-item>
</template>

<script>
import {computed, defineComponent, ref, toRef, toRefs, unref} from "vue";
import { testLatency } from "src/utils/latency";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    latencyTestMaxCount: {
      type: Number,
      default: 5,
    }
  },

  setup(props) {
    // 预热
    testLatency(props.link).then()

    // 定时测量
    let count = 0
    const latency = ref([])
    const interval = setInterval(() => {
      // 测量次数超过最大值，停止测量
      if (count > props.latencyTestMaxCount) { clearInterval(interval) }
      count++
      testLatency(props.link).then((result) => {
        latency.value.push(result)
      })
    }, 1000)

    // 计算平均值
    const averageLatency = computed(() => {
      // 如果没有值，返回 -2
      if (latency.value.length === 0) { return -2 }

      // 如果所有结果都是 -1（失败），返回 -1
      if (latency.value.every((item) => item === -1)) { return -1 }

      // 排除所有 -1
      const filtered = latency.value.filter((item) => item !== -1)

      // 求平均值
      return Math.round(filtered.reduce((a, b) => a + b, 0) / filtered.length)
    })

    // 平均值对应的颜色、图标、文字
    const testResultOption = [
      {
        range: [-2, -2],
        color: "grey",
        icon: "",
        text: computed(() => "测量中...")
      },
      {
        range: [-1, -1],
        color: "#f44336",
        icon: "",
        text: computed(() => "连接失败")
      },
      {
        range: [0, 300],
        color: "#4caf50",
        icon: "signal_cellular_alt_3_bar",
        text: computed(() => `${averageLatency.value} ms`)
      },
      {
        range: [301, 700],
        color: "#ff9800",
        icon: "signal_cellular_alt_2_bar",
        text: computed(() => `${averageLatency.value} ms`)
      },
      {
        range: [701, Infinity],
        color: "#f44336",
        icon: "signal_cellular_null",
        text: computed(() => `${averageLatency.value} ms`)
      }
    ]

    const latencyResult = computed(() => {
      const result = testResultOption.find((item) => {
        return averageLatency.value >= item.range[0] && averageLatency.value <= item.range[1]
      })
      result.text = unref(result.text)
      return result
    })

    return {
      latency,
      latencyResult
    }
  }
});
</script>

