<script setup>
defineProps({
  networkName: {
    type: String,
    default: 'Telekom-702692',
  },
  password: {
    type: String,
    default: '657576realBday1860670898today04',
  },
  title: {
    type: String,
    default: 'WiFi',
  },
  networkLabel: {
    type: String,
    default: 'Network',
  },
  passwordLabel: {
    type: String,
    default: 'Password',
  },
})
</script>

<template>
  <section class="wifi-wrap">
    <div class="wifi-card">
      <div class="wifi-icon" aria-hidden="true">
        <svg viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 5.5C7.5 -0.5 16.5 -0.5 23 5.5"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
          />
          <path
            d="M4.5 9.6C9 5.6 15 5.6 19.5 9.6"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
          />
          <path
            d="M8.2 13.6C10.8 11.3 13.2 11.3 15.8 13.6"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
          />
          <circle cx="12" cy="16.6" r="1.25" fill="currentColor" />
        </svg>
      </div>
      <h2 class="wifi-title">{{ title }}</h2>
      <div class="wifi-rows">
        <div class="wifi-row">
          <span class="wifi-label">{{ networkLabel }}</span>
          <span class="wifi-value">{{ networkName }}</span>
        </div>
        <div class="wifi-divider"></div>
        <div class="wifi-row">
          <span class="wifi-label">{{ passwordLabel }}</span>
          <span class="wifi-value">{{ password }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wifi-wrap {
  padding: 0.6rem 1.25rem 0.5rem;
  display: flex;
  justify-content: center;
}

.wifi-card {
  width: 100%;
  max-width: 360px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem 1.5rem 1.4rem;
  text-align: center;
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  box-shadow: var(--shadow-soft);
  position: relative;
  overflow: hidden;
}

.wifi-card::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: linear-gradient(135deg, var(--gold-bright), transparent 35%, transparent 65%, var(--gold));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.7;
  pointer-events: none;
}

.wifi-icon {
  width: 34px;
  height: 26px;
  margin: 0 auto 0.5rem;
  color: var(--gold-deep);
}

.wifi-title {
  font-size: 1.05rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold-deep);
  margin-bottom: 1rem;
  font-weight: 600;
}

.wifi-rows {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.wifi-row {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.wifi-label {
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.wifi-value {
  font-family: var(--font-display);
  font-size: 1.2rem;
  letter-spacing: 0.04em;
  color: var(--ink);
  font-weight: 600;
}

.wifi-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--card-border), transparent);
  margin: 0.15rem 0;
}
</style>
