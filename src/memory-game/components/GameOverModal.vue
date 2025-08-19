<script setup lang="ts">
import { watch } from 'vue'
import { useGameStore } from '../stores/game'
import BaseModal from '@/components/BaseModal.vue'

const gameStore = useGameStore()

const isOpen = defineModel<boolean>('isOpen', { default: false })

const props = defineProps<{
  moves: number
  time: number
}>()

const emit = defineEmits(['play-again'])

const closeModal = () => {
  isOpen.value = false
}

const playAgain = () => {
  emit('play-again')
  closeModal()
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

watch(isOpen, () => {
  if (isOpen.value) {
    gameStore.deleteLocal()
  }
})
</script>

<template>
  <BaseModal :is-open="isOpen" title="🎉 Congratulations! 🎉" @close="closeModal">
    <div class="relative flex flex-col items-center justify-center overflow-hidden text-center">
      <div class="animate-fade-in-up relative z-10 mb-4 text-2xl font-bold">
        You have completed the Memory Game!
      </div>
      <div class="animate-fade-in-up relative z-10 mb-2 delay-100">
        🏆 Total Moves: {{ props.moves }}
      </div>
      <div class="animate-fade-in-up relative z-10 mb-6 delay-200">
        ⏱ Time Taken: {{ formatTime(props.time) }}
      </div>

      <div class="pointer-events-none absolute inset-0 -bottom-20 z-0 flex w-full items-end">
        <span
          v-for="n in 10"
          :key="n"
          class="animate-balloon text-4xl select-none"
          :style="{
            '--i': n,
            'animation-delay': `${Math.random() * 3}s`,
            left: `${Math.random() * 100}%`,
          }"
          >🎈</span
        >
      </div>

      <button
        @click="playAgain"
        class="relative z-10 w-full cursor-pointer rounded-lg bg-purple-600 px-4 py-2 font-bold transition hover:bg-purple-700"
      >
        Play Again
      </button>
    </div>
  </BaseModal>
</template>

<style scoped>
@keyframes balloonUp {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-350px);
  }
}

.animate-balloon {
  position: absolute;
  bottom: 0;
  animation: balloonUp 4s ease-in-out infinite;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s forwards;
}

.delay-100 {
  animation-delay: 0.1s;
}
.delay-200 {
  animation-delay: 0.2s;
}
.delay-300 {
  animation-delay: 0.3s;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
</style>
