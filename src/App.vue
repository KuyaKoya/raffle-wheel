<script setup lang="ts">
import { useRaffleStore } from '@/stores/raffle'
import RaffleWheel from '@/components/RaffleWheel.vue'
import NameList from '@/components/NameList.vue'
import WinnerModal from '@/components/WinnerModal.vue'

const store = useRaffleStore()
</script>

<template>
  <div class="app-container">
    <header>
      <h1>Raffle Wheel</h1>
    </header>

    <main>
      <div class="wheel-section">
        <RaffleWheel />
      </div>

      <div class="sidebar">
        <NameList />

        <div v-if="store.removedNames.length > 0" class="removed-panel">
          <h2>Removed Items</h2>
          <ul>
            <li v-for="name in store.removedNames" :key="name">
              {{ name }}
            </li>
          </ul>
        </div>
      </div>
    </main>

    <WinnerModal />
  </div>
</template>

<style>
/* Global Reset */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  color: #333;
  min-height: 100vh;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

* {
  box-sizing: border-box;
}
</style>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  font-size: 3rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin: 0;
  letter-spacing: -1px;
}

main {
  display: flex;
  gap: 40px;
  flex: 1;
  align-items: flex-start;
}

.wheel-section {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
}

.sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 300px;
}

.removed-panel {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.removed-panel h2 {
  font-size: 1.25rem;
  color: #666;
  margin-top: 0;
}

.removed-panel ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.removed-panel li {
  background: #eee;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 0.9rem;
  color: #888;
  text-decoration: line-through;
}

@media (max-width: 768px) {
  main {
    flex-direction: column;
    align-items: center;
  }

  .sidebar {
    width: 100%;
  }
}
</style>
