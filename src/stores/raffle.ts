import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRaffleStore = defineStore('raffle', () => {
  const names = ref<string[]>([
    'Ali',
    'Beatriz',
    'Charles',
    'Diya',
    'Eric',
    'Fatima',
    'Gabriel',
    'Hana',
  ])
  const removedNames = ref<string[]>([])
  const currentWinner = ref<string | null>(null)
  const isSpinning = ref(false)

  const addName = (name: string) => {
    if (name.trim()) {
      names.value.push(name.trim())
    }
  }

  const addNames = (newNames: string[]) => {
    names.value.push(...newNames)
  }

  const removeName = (index: number) => {
    names.value.splice(index, 1)
  }

  const setWinner = (name: string) => {
    currentWinner.value = name
  }

  const acceptWinner = () => {
    if (currentWinner.value) {
      const index = names.value.indexOf(currentWinner.value)
      if (index !== -1) {
        names.value.splice(index, 1)
        removedNames.value.push(currentWinner.value)
      }
      currentWinner.value = null
    }
  }

  const shuffleNames = () => {
    for (let i = names.value.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[names.value[i], names.value[j]] = [names.value[j], names.value[i]]
    }
  }

  const clearAll = () => {
    names.value = []
    removedNames.value = []
    currentWinner.value = null
    isSpinning.value = false
  }

  const reset = () => {
    names.value = [...names.value, ...removedNames.value]
    removedNames.value = []
    currentWinner.value = null
    isSpinning.value = false
  }

  return {
    names,
    removedNames,
    currentWinner,
    isSpinning,
    addName,
    addNames,
    removeName,
    setWinner,
    acceptWinner,
    shuffleNames,
    clearAll,
    reset,
  }
})
