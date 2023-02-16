<template>
  <q-item clickable tag="a" target="_blank" :href="link">
    <q-item-section>
      <q-item-label style="font-size: 20px">{{ title }}</q-item-label>
      <q-item-label caption style="font-size: 15px">{{ caption }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-icon v-if="latencyIcon" style="display: inline-block" :color="latencyColor" :name="latencyIcon" />
      <span v-if="latencyText" :style="{'color': latencyColor}"> {{ latencyText }} </span>
    </q-item-section>
  </q-item>
</template>

<script>
import {computed, defineComponent, ref, unref} from "vue";
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
    // 当前已测量的次数
    let count = 0

    // 测量结果
    const latency = ref([])

    // 预热
    testLatency(props.link).then()

    // 定时测量
    const interval = setInterval(() => {
      // 测量次数超过最大值，停止测量
      if (count > props.latencyTestMaxCount) { clearInterval(interval) }
      count++
      testLatency(props.link).then((result) => {
        latency.value.push(result)
      })
    }, 1000)

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

    const latencyColor = computed(() => {
      const result = testResultOption.find((item) => {
        return averageLatency.value >= item.range[0] && averageLatency.value <= item.range[1]
      })
      return result.color
    })

    const latencyIcon = computed(() => {
      const result = testResultOption.find((item) => {
        return averageLatency.value >= item.range[0] && averageLatency.value <= item.range[1]
      })
      return result.icon
    })

    const latencyText = computed(() => {
      const result = testResultOption.find((item) => {
        return averageLatency.value >= item.range[0] && averageLatency.value <= item.range[1]
      })
      return unref(result.text)
    })

    return {
      latency,
      averageLatency,
      latencyColor,
      latencyIcon,
      latencyText
    }
  }
});
</script>

