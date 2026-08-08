<script setup>
import { ref } from 'vue'
import ImageViewer from './ImageViewer.vue'

defineProps({
  title: { type: String, required: true },
  downloadLabel: { type: String, required: true },
})

const modules = import.meta.glob('../assets/paintings/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const images = Object.keys(modules)
  .sort()
  .map((path) => modules[path])

const activeIndex = ref(null)

function openViewer(i) {
  activeIndex.value = i
}
function closeViewer() {
  activeIndex.value = null
}
function nextImage() {
  activeIndex.value = (activeIndex.value + 1) % images.length
}
function prevImage() {
  activeIndex.value = (activeIndex.value - 1 + images.length) % images.length
}
</script>

<template>
  <section class="gallery-section">
    <h2 class="gallery-title">{{ title }}</h2>
    <div class="gallery-grid">
      <button
        v-for="(src, i) in images"
        :key="src"
        class="gallery-cell"
        type="button"
        :aria-label="`Open painting ${i + 1}`"
        @click="openViewer(i)"
      >
        <img :src="src" :alt="`Painting inspiration ${i + 1}`" loading="lazy" decoding="async" />
      </button>
    </div>

    <ImageViewer
      v-if="activeIndex !== null"
      :src="images[activeIndex]"
      :index="activeIndex"
      :total="images.length"
      :download-label="downloadLabel"
      @close="closeViewer"
      @next="nextImage"
      @prev="prevImage"
    />
  </section>
</template>

<style scoped>
.gallery-section {
  padding: 1.8rem 0.6rem 2.5rem;
}

.gallery-title {
  text-align: center;
  font-size: clamp(1.35rem, 5vw, 1.8rem);
  color: var(--gold-deep);
  font-weight: 600;
  margin-bottom: 1rem;
  padding: 0 1rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
}

.gallery-cell {
  appearance: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  background: var(--beige);
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(120, 90, 40, 0.12);
  position: relative;
}

.gallery-cell img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), filter 0.35s ease;
}

.gallery-cell:active img {
  transform: scale(1.08);
}

@media (hover: hover) {
  .gallery-cell:hover img {
    transform: scale(1.08);
  }
}

@media (min-width: 640px) {
  .gallery-grid {
    gap: 6px;
  }
  .gallery-cell {
    border-radius: 10px;
  }
}

@media (min-width: 900px) {
  .gallery-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    max-width: 960px;
    margin: 0 auto;
  }
  .gallery-cell {
    border-radius: 12px;
  }
}
</style>
