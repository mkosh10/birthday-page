<script setup>
defineProps({
  lines: { type: Array, required: true },
  buttonLabel: { type: String, required: true },
})

const DRIVE_URL =
  'https://drive.google.com/drive/folders/1USCWSfZ2YTseSsb_YOogSw3qR4d6Icyh?usp=sharing'

function openDrive() {
  window.open(DRIVE_URL, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <section class="upload-section">
    <div class="icon-divider" aria-hidden="true">
      <svg viewBox="0 0 24 20" fill="none">
        <rect x="1" y="4" width="22" height="15" rx="2.4" stroke="currentColor" stroke-width="1.3" />
        <path d="M8 4L9.6 1.5H14.4L16 4" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" />
        <circle cx="12" cy="11.5" r="4.2" stroke="currentColor" stroke-width="1.3" />
        <circle cx="19" cy="7.3" r="0.9" fill="currentColor" />
      </svg>
    </div>
    <p class="upload-text">
      <span v-for="(line, i) in lines" :key="i">
        {{ line }}<br v-if="i < lines.length - 1" />
      </span>
    </p>
    <button class="upload-btn" type="button" @click="openDrive">
      <span>{{ buttonLabel }}</span>
    </button>
  </section>
</template>

<style scoped>
.upload-section {
  padding: 1.6rem 1.6rem 0.6rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.3rem;
}

.icon-divider {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold);
  opacity: 0.85;
}

.icon-divider svg {
  width: 100%;
  height: 100%;
}

.upload-text {
  font-size: 1.08rem;
  line-height: 1.65;
  color: var(--ink-soft);
  max-width: 30rem;
  font-style: italic;
}

.upload-btn {
  appearance: none;
  border: none;
  cursor: pointer;
  padding: 0.85rem 2.1rem;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--gold-bright), var(--gold) 55%, var(--gold-deep));
  color: #fffaf0;
  font-family: var(--font-body);
  font-size: 1.02rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  box-shadow: 0 8px 22px rgba(143, 106, 44, 0.32);
  transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
}

.upload-btn:hover {
  filter: brightness(1.05);
  box-shadow: 0 10px 26px rgba(143, 106, 44, 0.4);
}

.upload-btn:active {
  transform: scale(0.96);
  box-shadow: 0 4px 14px rgba(143, 106, 44, 0.3);
}
</style>
