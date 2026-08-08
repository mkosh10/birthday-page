<script setup>
import { computed } from 'vue'
import en from '../locales/en.js'
import mk from '../locales/mk.js'
import WelcomeSection from '../components/WelcomeSection.vue'
import WifiCard from '../components/WifiCard.vue'
import PhotoUpload from '../components/PhotoUpload.vue'
import PaintingGallery from '../components/PaintingGallery.vue'

const props = defineProps({
  locale: { type: String, default: 'en' },
})

const dict = computed(() => (props.locale === 'mk' ? mk : en))
</script>

<template>
  <main class="page">
    <WelcomeSection
      :name="dict.welcomeName"
      :lines="dict.welcomeMessageLines"
      :locale="locale"
    />
    <div id="details">
      <WifiCard
        :title="dict.wifiTitle"
        :network-label="dict.wifiNetworkLabel"
        :password-label="dict.wifiPasswordLabel"
      />
      <PhotoUpload :lines="dict.uploadTextLines" :button-label="dict.uploadButton" />
      <PaintingGallery :title="dict.galleryTitle" :download-label="dict.downloadButton" />
    </div>
    <footer class="page-footer">
      <span>✦</span>
      <p class="footer-cheers">{{ dict.footerText }}</p>
      <span>✦</span>
    </footer>
  </main>
</template>

<style scoped>
.page {
  position: relative;
  z-index: 2;
  max-width: 560px;
  margin: 0 auto;
  padding-bottom: 1rem;
}

#details {
  scroll-margin-top: 0.5rem;
}

.page-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  padding: 1.6rem 1rem 2.6rem;
}

.footer-cheers {
  font-family: var(--font-display);
  font-weight: 700;
  font-style: italic;
  font-size: clamp(1.6rem, 7vw, 2.2rem);
  line-height: 1;
  color: var(--gold-deep);
  background: linear-gradient(120deg, var(--gold-deep) 10%, var(--gold-bright) 45%, var(--gold-deep) 80%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.01em;
}

.page-footer span {
  font-size: 0.75rem;
  color: var(--gold);
}

@media (min-width: 900px) {
  .page {
    max-width: 980px;
  }
}
</style>
