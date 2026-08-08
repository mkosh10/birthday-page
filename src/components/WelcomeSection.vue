<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  name: { type: String, required: true },
  lines: { type: Array, required: true },
  locale: { type: String, default: 'en' },
})

const visible = ref(false)
onMounted(() => {
  requestAnimationFrame(() => {
    visible.value = true
  })
})

function scrollToDetails() {
  document.getElementById('details')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="welcome" :class="{ 'is-visible': visible }">
    <div class="hero-glow" aria-hidden="true">
      <span class="glow glow-peach"></span>
      <span class="glow glow-lavender"></span>
      <span class="glow glow-blue"></span>
    </div>

    <div class="hero-balloons" aria-hidden="true">
      <svg class="balloon balloon-a" viewBox="0 0 60 84" fill="none">
        <ellipse cx="30" cy="32" rx="28" ry="32" fill="url(#g-gold)" />
        <path d="M30 64 L30 80" stroke="currentColor" stroke-width="1" />
        <path d="M26 80 Q30 84 34 80" stroke="currentColor" stroke-width="1" fill="none" />
      </svg>
      <svg class="balloon balloon-b" viewBox="0 0 60 84" fill="none">
        <ellipse cx="30" cy="32" rx="24" ry="28" fill="url(#g-champagne)" />
        <path d="M30 60 L30 80" stroke="currentColor" stroke-width="1" />
      </svg>
      <svg class="balloon balloon-c" viewBox="0 0 60 84" fill="none">
        <ellipse cx="30" cy="32" rx="20" ry="24" fill="url(#g-gold)" />
        <path d="M30 56 L30 76" stroke="currentColor" stroke-width="1" />
      </svg>
      <svg class="balloon balloon-d" viewBox="0 0 60 84" fill="none">
        <ellipse cx="30" cy="32" rx="18" ry="21" fill="url(#g-blush)" />
        <path d="M30 53 L30 72" stroke="currentColor" stroke-width="1" />
      </svg>
      <svg class="balloon balloon-e" viewBox="0 0 60 84" fill="none">
        <ellipse cx="30" cy="32" rx="16" ry="19" fill="url(#g-lavender)" />
        <path d="M30 51 L30 68" stroke="currentColor" stroke-width="1" />
      </svg>
      <svg class="balloon balloon-f" viewBox="0 0 60 84" fill="none">
        <ellipse cx="30" cy="32" rx="14" ry="17" fill="url(#g-blue)" />
        <path d="M30 49 L30 64" stroke="currentColor" stroke-width="1" />
      </svg>
      <svg class="balloon balloon-g" viewBox="0 0 60 84" fill="none">
        <ellipse cx="30" cy="32" rx="15" ry="18" fill="url(#g-peach)" />
        <path d="M30 50 L30 66" stroke="currentColor" stroke-width="1" />
      </svg>
      <svg width="0" height="0">
        <defs>
          <radialGradient id="g-gold" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stop-color="#e8c581" />
            <stop offset="100%" stop-color="#b8893f" />
          </radialGradient>
          <radialGradient id="g-champagne" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stop-color="#fbf3dc" />
            <stop offset="100%" stop-color="#e3d1a0" />
          </radialGradient>
          <radialGradient id="g-blush" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stop-color="#f4c9cd" />
            <stop offset="100%" stop-color="#df97a0" />
          </radialGradient>
          <radialGradient id="g-lavender" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stop-color="#ddc6ef" />
            <stop offset="100%" stop-color="#b192cd" />
          </radialGradient>
          <radialGradient id="g-blue" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stop-color="#c3e0ec" />
            <stop offset="100%" stop-color="#84aec4" />
          </radialGradient>
          <radialGradient id="g-peach" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stop-color="#faeada" />
            <stop offset="100%" stop-color="#f0c19a" />
          </radialGradient>
        </defs>
      </svg>
    </div>

    <div class="welcome-content">
      <h1 class="welcome-name">{{ name }}</h1>
      <p class="welcome-message">
        <span v-for="(line, i) in lines" :key="i">
          {{ line }}<br v-if="i < lines.length - 1" />
        </span>
      </p>
      <div class="rule">
        <span></span>
      </div>
    </div>

    <button class="scroll-cue" type="button" aria-label="Scroll to party details" @click="scrollToDetails">
      <span class="scroll-cue-circle">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </button>
  </section>
</template>

<style scoped>
.welcome {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  padding: 3.4rem 1.5rem 3.2rem;
  text-align: center;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
}

.welcome.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(46px);
  opacity: 0.35;
}

.glow-peach {
  width: 210px;
  height: 210px;
  top: -6%;
  left: -10%;
  background: radial-gradient(circle, var(--peach) 0%, transparent 70%);
}

.glow-lavender {
  width: 220px;
  height: 220px;
  top: 6%;
  right: -14%;
  background: radial-gradient(circle, var(--lavender) 0%, transparent 70%);
}

.glow-blue {
  width: 190px;
  height: 190px;
  bottom: 4%;
  left: 30%;
  background: radial-gradient(circle, var(--blue-muted) 0%, transparent 70%);
  opacity: 0.28;
}

.hero-balloons {
  position: absolute;
  inset: 0;
  pointer-events: none;
  color: rgba(184, 137, 63, 0.35);
  z-index: 0;
}

.balloon {
  position: absolute;
  opacity: 0.4;
  filter: blur(0.3px);
  animation: balloon-float 7s ease-in-out infinite;
}

.balloon-a {
  width: 62px;
  top: 3%;
  left: 4%;
  animation-duration: 7.5s;
  animation-delay: 0s;
}

.balloon-b {
  width: 50px;
  top: 9%;
  right: 6%;
  animation-duration: 8.5s;
  animation-delay: -2.5s;
  opacity: 0.32;
}

.balloon-c {
  width: 40px;
  top: 26%;
  left: 12%;
  animation-duration: 6.5s;
  animation-delay: -4.5s;
  opacity: 0.28;
}

.balloon-d {
  width: 34px;
  top: 18%;
  right: 20%;
  animation-duration: 7.8s;
  animation-delay: -1.2s;
  opacity: 0.58;
}

.balloon-e {
  width: 30px;
  top: 46%;
  left: 6%;
  animation-duration: 9s;
  animation-delay: -3.6s;
  opacity: 0.52;
}

.balloon-f {
  width: 28px;
  top: 40%;
  right: 9%;
  animation-duration: 6.8s;
  animation-delay: -5.2s;
  opacity: 0.52;
}

.balloon-g {
  width: 32px;
  top: 60%;
  right: 30%;
  animation-duration: 8.2s;
  animation-delay: -0.6s;
  opacity: 0.22;
}

@keyframes balloon-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

.welcome-content {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.welcome-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-style: italic;
  font-size: clamp(3.2rem, 16vw, 5rem);
  line-height: 1.05;
  color: var(--gold-deep);
  background: linear-gradient(120deg, var(--gold-deep) 10%, var(--gold-bright) 45%, var(--gold-deep) 80%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.01em;
  margin-bottom: 1.2rem;
}

.welcome-message {
  font-family: var(--font-body);
  font-style: italic;
  font-weight: 600;
  font-size: clamp(1.8rem, 8vw, 2.5rem);
  line-height: 1.45;
  color: var(--ink);
  letter-spacing: 0.015em;
}

.rule {
  position: relative;
  z-index: 1;
  margin: 2.2rem auto 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.rule span {
  width: 74px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  position: relative;
}

.rule span::before {
  content: '✦';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--gold);
  font-size: 0.7rem;
  background: transparent;
}

.scroll-cue {
  position: relative;
  z-index: 1;
  appearance: none;
  border: none;
  background: none;
  cursor: pointer;
  margin: 1.6rem auto 0;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-cue-circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(184, 137, 63, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold-deep);
  animation: cue-float 3s ease-in-out infinite;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.scroll-cue-circle svg {
  width: 18px;
  height: 18px;
}

.scroll-cue:hover .scroll-cue-circle {
  background: rgba(184, 137, 63, 0.1);
  border-color: var(--gold);
}

@keyframes cue-float {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.75;
  }
  50% {
    transform: translateY(30px);
    opacity: 1;
  }
}

@media (min-width: 768px) {
  .welcome {
    padding-top: 4rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .balloon,
  .scroll-cue-circle {
    animation: none;
  }
}
</style>
