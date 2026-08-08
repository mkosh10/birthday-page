<script setup>
import { ref, onMounted } from 'vue'

const particleCount = 22

const particles = ref(
  Array.from({ length: particleCount }, (_, i) => {
    const fromLeft = i % 2 === 0
    const size = 4 + Math.random() * 7
    return {
      id: i,
      left: fromLeft ? Math.random() * 14 : 86 + Math.random() * 14,
      size,
      duration: 14 + Math.random() * 12,
      delay: -(Math.random() * 20),
      drift: (Math.random() - 0.5) * 60,
      rotate: Math.random() * 360,
      opacity: 0.35 + Math.random() * 0.4,
      shape: Math.random() > 0.5 ? 'circle' : 'diamond',
    }
  })
)

const reduceMotion = ref(false)
onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
</script>

<template>
  <div class="confetti-layer" v-if="!reduceMotion" aria-hidden="true">
    <span
      v-for="p in particles"
      :key="p.id"
      class="confetti-piece"
      :class="p.shape"
      :style="{
        left: p.left + '%',
        width: p.size + 'px',
        height: p.size + 'px',
        animationDuration: p.duration + 's',
        animationDelay: p.delay + 's',
        opacity: p.opacity,
        '--drift': p.drift + 'px',
        '--rot': p.rotate + 'deg',
      }"
    />
  </div>
</template>

<style scoped>
.confetti-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.confetti-piece {
  position: absolute;
  top: -5%;
  background: linear-gradient(135deg, var(--gold-bright), var(--gold));
  filter: drop-shadow(0 0 3px rgba(212, 169, 90, 0.5));
  animation-name: fall-drift;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform, opacity;
}

.confetti-piece.circle {
  border-radius: 50%;
}

.confetti-piece.diamond {
  border-radius: 2px;
  transform: rotate(45deg);
}

@keyframes fall-drift {
  0% {
    transform: translate3d(0, -10vh, 0) rotate(var(--rot));
  }
  100% {
    transform: translate3d(var(--drift), 115vh, 0) rotate(calc(var(--rot) + 180deg));
  }
}

@media (max-width: 600px) {
  .confetti-piece {
    filter: none;
  }
}
</style>
