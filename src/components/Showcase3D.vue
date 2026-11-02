<template>
  <section class="relative z-10 py-16 md:py-28 px-4 sm:px-8 overflow-hidden">
    <div class="max-w-5xl mx-auto text-center">
      <h2 class="text-xl md:text-2xl font-semibold text-white/50">
        أناقة بلا مساومة. <br />
        <span class="text-4xl md:text-7xl font-display font-black mt-2 leading-none text-white uppercase tracking-tight">PREMIUM QUALITY.</span>
      </h2>
    </div>

    <!-- البطاقة المائلة ثلاثية الأبعاد -->
    <div class="showcase-3d-container max-w-5xl mx-auto mt-6 md:mt-10">
      <div class="showcase-3d-card relative mx-auto h-[26rem] md:h-[38rem] w-full border border-white/10 p-2 md:p-6 bg-[#120a10] rounded-[28px] shadow-[0_30px_70px_rgba(0,0,0,0.7)]">
        <div class="h-full w-full overflow-hidden rounded-2xl bg-[#08080c] border border-white/5 relative group">
          <img
            :src="poloNavyImg"
            alt="قميص بولو كحلي رويال فاخر"
            class="h-full w-full object-cover object-center opacity-85 transition-opacity duration-700 group-hover:opacity-100"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end justify-between p-6 md:p-10">
            <div>
              <span class="rounded-full bg-gold-500/20 px-3 py-1 text-xs font-black uppercase text-gold-400 ring-1 ring-gold-500/40">
                الأكثر طلباً هذا الشهر • Best Seller
              </span>
              <h3 class="text-2xl md:text-4xl font-black text-white mt-2">قميص بولو كحلي رويال فاخر</h3>
              <p class="text-lg md:text-xl font-black text-gold-400 mt-1 font-mono">
                {{ formatPrice(52000) }}
              </p>
            </div>
            <button
              type="button"
              class="rounded-full bg-white px-6 py-3 text-xs font-black text-black hover:bg-gold-400 transition-colors shadow-lg active:scale-95 cursor-pointer"
              @click="$emit('open-quick-view', 'polo-navy-royal')"
            >
              معاينة فورية
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import poloNavyImg from '../images/polo-navy.jpg';
import { useCurrency } from '../composables/useCurrency.js';

defineEmits(['open-quick-view']);

const { formatPrice } = useCurrency();
</script>
