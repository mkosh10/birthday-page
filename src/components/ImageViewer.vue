<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  index: { type: Number, required: true },
  total: { type: Number, required: true },
  downloadLabel: { type: String, default: 'Download Image' },
})

const emit = defineEmits(['close', 'prev', 'next'])

function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowLeft') emit('prev')
  if (e.key === 'ArrowRight') emit('next')
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

async function downloadImage() {
  try {
    const res = await fetch(props.src)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const name = props.src.split('/').pop().split('?')[0] || `painting-${props.index + 1}.jpg`
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  } catch (e) {
    window.open(props.src, '_blank', 'noopener,noreferrer')
  }
}

let touchStartX = 0
function onTouchStart(e) {
  touchStartX = e.changedTouches[0].clientX
}
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (dx > 60) emit('prev')
  else if (dx < -60) emit('next')
}
</script>

<template>
  <Teleport to="body">
    <div class="viewer-backdrop" @click.self="$emit('close')">
      <button class="close-btn" type="button" aria-label="Close" @click="$emit('close')">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </button>

      <div class="viewer-stage" @touchstart="onTouchStart" @touchend="onTouchEnd">
        <button
          v-if="total > 1"
          class="nav-btn nav-prev"
          type="button"
          aria-label="Previous image"
          @click.stop="$emit('prev')"
        >
          <svg viewBox="0 0 24 24" fill="none"><path d="M15 5L8 12L15 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>

        <Transition name="fade-scale" mode="out-in">
          <img :key="src" :src="src" class="viewer-image" alt="Painting inspiration" />
        </Transition>

        <button
          v-if="total > 1"
          class="nav-btn nav-next"
          type="button"
          aria-label="Next image"
          @click.stop="$emit('next')"
        >
          <svg viewBox="0 0 24 24" fill="none"><path d="M9 5L16 12L9 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
      </div>

      <div class="viewer-footer">
        <span class="viewer-count">{{ index + 1 }} / {{ total }}</span>
        <button class="download-btn" type="button" @click.stop="downloadImage">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 3V15M12 15L7 10M12 15L17 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4 19H20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          </svg>
          <span>{{ downloadLabel }}</span>
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.viewer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(20, 14, 6, 0.88);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  animation: backdrop-in 0.28s ease;
}

@keyframes backdrop-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.close-btn {
  position: absolute;
  top: max(1rem, env(safe-area-inset-top));
  right: 1rem;
  z-index: 5;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(212, 169, 90, 0.4);
  background: rgba(255, 255, 255, 0.06);
  color: var(--gold-bright);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
}

.close-btn svg {
  width: 18px;
  height: 18px;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.14);
}

.close-btn:active {
  transform: scale(0.9);
}

.viewer-stage {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 4.2rem 0.75rem 1rem;
  min-height: 0;
}

.viewer-image {
  max-width: min(94vw, 900px);
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.94);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.03);
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(212, 169, 90, 0.35);
  background: rgba(255, 255, 255, 0.06);
  color: var(--gold-bright);
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 4;
}

.nav-btn svg {
  width: 20px;
  height: 20px;
}

.nav-prev {
  left: 0.5rem;
}

.nav-next {
  right: 0.5rem;
}

@media (min-width: 640px) {
  .nav-btn {
    display: flex;
  }
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.14);
}

.viewer-footer {
  padding: 0.9rem 1.2rem max(1.1rem, env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
}

.viewer-count {
  color: rgba(247, 239, 224, 0.55);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
}

.download-btn {
  appearance: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.75rem 1.8rem;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--gold-bright), var(--gold) 55%, var(--gold-deep));
  color: #fffaf0;
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.35);
  transition: transform 0.15s ease, filter 0.15s ease;
}

.download-btn svg {
  width: 17px;
  height: 17px;
}

.download-btn:hover {
  filter: brightness(1.08);
}

.download-btn:active {
  transform: scale(0.95);
}
</style>
