<script setup lang="ts">
import { useRaffleStore } from '@/stores/raffle'

const store = useRaffleStore()
</script>

<template>
  <div v-if="store.currentWinner" class="modal-overlay">
    <div class="modal-content">
      <h3>We have a winner!</h3>
      <div class="winner-name">{{ store.currentWinner }}</div>

      <div class="actions">
        <button class="btn-secondary" @click="store.setWinner('')">
          Close (Keep)
        </button>
        <button class="btn-primary" @click="store.acceptWinner()">
          Remove & Save
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
  animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  max-width: 90%;
  width: 400px;
}

h3 {
  color: #666;
  margin-top: 0;
}

.winner-name {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 20px 0;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
}

button {
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s;
}

button:active {
  transform: scale(0.95);
}

.btn-primary {
  background: #1a1a1a;
  color: white;
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleUp {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
