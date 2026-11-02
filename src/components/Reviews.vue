<template>
  <section class="py-20 px-4 sm:px-8 border-t border-white/[0.08]">
    <div class="max-w-[1400px] mx-auto">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="text-xs font-bold uppercase tracking-wider text-gold-400">TESTIMONIALS</span>
        <h2 class="text-3xl sm:text-5xl font-display font-black tracking-tight text-white leading-none mt-1">تجارب وآراء عملائنا</h2>
        <p class="text-xs sm:text-sm text-white/50 mt-2">
          ثقة متبادلة وتجارب حقيقية من عملائنا الكرام في مختلف مدن ومناطق السودان.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="r in reviews"
          :key="r.id"
          class="rounded-3xl bg-white/[0.03] p-6 border border-white/10 flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="flex text-gold-400">
                <Star
                  v-for="i in r.rating"
                  :key="i"
                  class="size-3.5 fill-gold-400"
                />
              </div>
              <span class="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                مشتري موثق ✓
              </span>
            </div>
            <p class="text-xs text-white/70 leading-relaxed">
              "{{ r.comment }}"
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-white/10 text-xs">
            <div class="font-bold text-white">{{ r.name }}</div>
            <div class="text-[10px] text-white/40">{{ r.city }} • {{ r.date }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Star } from 'lucide-vue-next';
import { reviews } from '../data/products.js';
</script>
