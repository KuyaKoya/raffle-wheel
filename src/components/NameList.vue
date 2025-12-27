<script setup lang="ts">
import { ref } from 'vue'
import { useRaffleStore } from '@/stores/raffle'

const store = useRaffleStore()
const newName = ref('')
const showAutoFill = ref(false)
const startNum = ref<number | ''>('')
const endNum = ref<number | ''>('')

const handleAdd = () => {
  store.addName(newName.value)
  newName.value = ''
}

const handleAutoFill = () => {
  if (startNum.value === '' || endNum.value === '') return

  const start = Number(startNum.value)
  const end = Number(endNum.value)

  if (start > end) return

  const nums: string[] = []
  for (let i = start; i <= end; i++) {
    nums.push(i.toString())
  }

  store.addNames(nums)

  // Reset
  startNum.value = ''
  endNum.value = ''
  showAutoFill.value = false
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') handleAdd()
}
</script>

<template>
  <div class="panel">
    <div class="header">
      <h2>Entries ({{ store.names.length }})</h2>
      <div class="header-actions">
        <button
          v-if="store.removedNames.length > 0"
          class="btn-icon"
          @click="store.reset"
          title="Restart / Restore Removed"
        >
          🔄
        </button>
        <button class="btn-icon" @click="store.shuffleNames" title="Shuffle">🔀</button>
        <button class="btn-icon" @click="store.clearAll" title="Clear All">🗑️</button>
      </div>
    </div>

    <div class="input-group">
      <input v-model="newName" @keydown="handleKeydown" placeholder="Enter a name..." type="text" />
      <button @click="handleAdd" class="btn-primary">Add</button>
    </div>

    <div class="tools-section">
      <button class="btn-text" @click="showAutoFill = !showAutoFill">
        {{ showAutoFill ? 'Hide' : 'Show' }} Numeric Auto-Fill
      </button>

      <div v-if="showAutoFill" class="autofill-group">
        <input v-model.number="startNum" type="number" placeholder="Start" class="input-small" />
        <span>to</span>
        <input v-model.number="endNum" type="number" placeholder="End" class="input-small" />
        <button @click="handleAutoFill" class="btn-secondary-small">Generate</button>
      </div>
    </div>

    <div class="list-container">
      <div v-for="(name, index) in store.names" :key="index" class="list-item">
        <span>{{ name }}</span>
        <button @click="store.removeName(index)" class="btn-remove">×</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.input-group {
  display: flex;
  gap: 8px;
}

input {
  flex: 1;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  outline: none;
  transition: border-color 0.2s;
  font-size: 1rem;
}

input:focus {
  border-color: #4ecdc4;
}

.btn-primary {
  background: #1a1a1a;
  color: white;
  border: none;
  padding: 0 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s;
}

.btn-primary:active {
  transform: scale(0.95);
}

.btn-icon {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;
}

.btn-icon:hover {
  background: #f5f5f5;
}

.btn-text {
  background: none;
  border: none;
  color: #666;
  font-size: 0.85rem;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  align-self: flex-start;
}

.tools-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.autofill-group {
  display: flex;
  gap: 8px;
  align-items: center;
  background: #f0f0f0;
  padding: 8px;
  border-radius: 8px;
}

.input-small {
  width: 60px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-secondary-small {
  background: #666;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.list-container {
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  background: #f9f9f9;
  transition:
    transform 0.2s,
    background 0.2s;
}

.list-item:hover {
  background: #f0f0f0;
  transform: translateX(4px);
}

.btn-remove {
  background: none;
  border: none;
  color: #ff6b6b;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 4px;
}
</style>
