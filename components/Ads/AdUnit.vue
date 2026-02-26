<template>
  <ClientOnly>
    <div v-show="isVisible" class="adunit-container" :key="`ad-${adSlot}`">
      <ins
        ref="adElement"
        class="adsbygoogle"
        :style="style"
        v-bind="insAttrs"
      />
    </div>

    <template #fallback>
      <div v-show="isVisible" class="ad-placeholder" :style="style" />
    </template>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  adSlot: { type: String, required: true },
  // 默认使用你提供的 AdSense Publisher ID
  adClient: { type: String, default: 'ca-pub-4219881902610897' },
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

const adElement = ref(null)
const isVisible = ref(true)
let adInitTimer = null
let adObserver = null
let adFallbackTimer = null

const evaluateAdVisibility = () => {
  const el = adElement.value
  if (!el) return

  const adStatus = el.getAttribute('data-ad-status')
  const adsbygoogleStatus = el.getAttribute('data-adsbygoogle-status')
  const hasIframe = !!el.querySelector('iframe')

  // Google 明确回传无填充：隐藏容器
  if (adStatus === 'unfilled') {
    isVisible.value = false
    return
  }

  // 有 iframe 说明广告已渲染
  if (hasIframe) {
    isVisible.value = true
    return
  }

  // 已处理完成但没有内容，也隐藏
  if (adsbygoogleStatus === 'done' && !hasIframe) {
    isVisible.value = false
  }
}

onMounted(() => {
  // 触发 GTM 自定义事件（与你的 loadAdsense 规则对齐）
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'loadAdsense' })
  } catch (_) {}

  const pushAd = () => {
    try {
      const el = adElement.value
      if (!el) return false

      if (el.getAttribute('data-adsbygoogle-status')) return true

      if (window.adsbygoogle && typeof window.adsbygoogle.push === 'function') {
        window.adsbygoogle.push({})
        return true
      }
    } catch (_) {}
    return false
  }

  // 监听广告节点属性变化，动态判断是否隐藏
  if (adElement.value) {
    adObserver = new MutationObserver(() => evaluateAdVisibility())
    adObserver.observe(adElement.value, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['data-ad-status', 'data-adsbygoogle-status', 'style']
    })
  }

  // 先尝试一次；若 GTM 延迟注入脚本，则短轮询重试
  if (!pushAd()) {
    let retry = 0
    adInitTimer = setInterval(() => {
      retry += 1
      const done = pushAd()
      if (done || retry >= 30) {
        clearInterval(adInitTimer)
        adInitTimer = null
      }
    }, 500)
  }

  // 兜底：20s 仍无渲染内容则隐藏容器
  adFallbackTimer = setTimeout(() => {
    evaluateAdVisibility()
    const el = adElement.value
    if (!el) return
    const hasIframe = !!el.querySelector('iframe')
    const adStatus = el.getAttribute('data-ad-status')
    if (!hasIframe || adStatus === 'unfilled') {
      isVisible.value = false
    }
  }, 20000)
})

onBeforeUnmount(() => {
  if (adInitTimer) {
    clearInterval(adInitTimer)
    adInitTimer = null
  }
  if (adObserver) {
    adObserver.disconnect()
    adObserver = null
  }
  if (adFallbackTimer) {
    clearTimeout(adFallbackTimer)
    adFallbackTimer = null
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
