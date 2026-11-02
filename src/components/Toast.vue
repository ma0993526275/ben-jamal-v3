<template>
  <div class="fixed bottom-6 end-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
    <transition-group name="toast-fade" tag="div" class="flex flex-col gap-2">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-center justify-between gap-3 rounded-full bg-[#160d14] border border-gold-400/30 px-5 py-3 text-xs font-bold text-white shadow-2xl animate-pop-up"
      >
        <span class="flex items-center gap-2">
          <span class="size-2 rounded-full bg-gold-400"></span>
          {{ toast.message }}
        </span>

        <button
          v-if="toast.actionLabel && toast.onAction"
          type="button"
          class="rounded-full bg-white px-2.5 py-1 text-[11px] font-black text-black transition hover:bg-gold-400 cursor-pointer"
          @click="handleAction(toast)"
        >
          {{ toast.actionLabel }}
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToast } from '../composables/useToast.js';

const { toasts, removeToast } = useToast();

function handleAction(toast) {
  if (toast.onAction) {
    toast.onAction();
  }
  removeToast(toast.id);
}
</script>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}
.toast-fade-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
