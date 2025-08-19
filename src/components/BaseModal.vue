<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800">
      <div class="relative w-80 rounded-lg bg-gray-900 p-6 text-white shadow-lg">
        <button
          v-if="!hiddeCloseButton"
          @click="$emit('close')"
          class="absolute top-2 right-2 cursor-pointer text-lg font-bold text-white transition hover:text-purple-500"
        >
          ×
        </button>
        <h2 v-if="title" class="mb-4 text-center text-xl font-bold">{{ title }}</h2>
        <div class="mb-4">
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    isOpen: boolean
    title?: string
    hiddeCloseButton?: boolean
  }>(),
  {
    hiddeCloseButton: false,
  },
)
</script>
