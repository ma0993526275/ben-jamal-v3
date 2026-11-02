<template>
  <div class="fixed bottom-6 start-6 z-40">
    <a
      href="https://wa.me/249912345678"
      target="_blank"
      aria-label="واتساب"
      class="group relative flex items-center gap-2 rounded-full bg-emerald-600 p-3.5 text-white shadow-[0_0_30px_rgba(16,185,129,0.35)] transition hover:bg-emerald-500 hover:scale-105 active:scale-95"
    >
      <span class="absolute -top-1 -end-1 flex size-3">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75"></span>
        <span class="relative inline-flex size-3 rounded-full bg-emerald-400"></span>
      </span>
      <MessageCircle class="size-5" />
      <span class="hidden max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold transition-all duration-300 group-hover:max-w-xs group-hover:ps-1 sm:inline">
        خدمة العملاء
      </span>
    </a>
  </div>
</template>

<script setup>
import { MessageCircle } from 'lucide-vue-next';
</script>
