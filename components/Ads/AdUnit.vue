<template>
  <ClientOnly>
    <div class="adunit-container" :key="`ad-${adSlot}`">
      <ins
        ref="adElement"
        class="adsbygoogle"
        :style="style"
        v-bind="insAttrs"
      />
    </div>

    <template #fallback>
      <div class="ad-placeholder" :style="style" />
    </template>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  adSlot: { type: String, required: true },
  // 如果通过 GTM 注入/管理，可不传 adClient
  adClient: { type: String, default: '' },
  adFormat: { type: String, default: 'auto' },
  style: { type: String, default: 'display:block;min-height:90px;' },
  responsive: { type: [Boolean, String], default: true }
})

const insAttrs = computed(() => {
  const attrs = {
    'data-ad-slot': props.adSlot,
    'data-ad-format': props.adFormat,
    'data-full-width-responsive': props.responsive.toString()
  }

  if (props.adClient) {
    attrs['data-ad-client'] = props.adClient
  }

  return attrs
})

let adInitTimer = null

onMounted(() => {
  // 触发 GTM 自定义事件（与你的 loadAdsense 规则对齐）
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'loadAdsense' })
  } catch (_) {}

  const pushAd = () => {
    try {
      const adElement = document.querySelector(`[data-ad-slot="${props.adSlot}"]`)
      if (!adElement) return false

      // 已经初始化过则不再 push
      if (adElement.getAttribute('data-adsbygoogle-status')) return true

      if (window.adsbygoogle && typeof window.adsbygoogle.push === 'function') {
        window.adsbygoogle.push({})
        return true
      }
    } catch (_) {
      // 忽略广告初始化异常，避免影响主流程
    }
    return false
  }

  // 先尝试一次；若 GTM 延迟注入脚本，则短轮询重试
  if (pushAd()) return

  let retry = 0
  adInitTimer = setInterval(() => {
    retry += 1
    const done = pushAd()
    if (done || retry >= 30) {
      clearInterval(adInitTimer)
      adInitTimer = null
    }
  }, 500)
})

onBeforeUnmount(() => {
  if (adInitTimer) {
    clearInterval(adInitTimer)
    adInitTimer = null
  }
})
</script>

<style scoped>
.adunit-container {
  width: 100%;
  display: block;
  text-align: center;
  position: relative;
}

.adsbygoogle {
  display: block !important;
  width: 100% !important;
  max-width: 100% !important;
  min-height: 90px;
}

.ad-placeholder {
  width: 100%;
  min-height: 90px;
  background: #f3f4f6;
}
</style>
