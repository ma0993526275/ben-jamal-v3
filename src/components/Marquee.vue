<template>
  <div class="w-full overflow-hidden border-y border-gold-500/30 py-3.5 relative z-20 bg-[#0a0508]">
    <div class="flex animate-marquee whitespace-nowrap">
      <template v-for="loop in 2" :key="loop">
        <span class="inline-flex items-center gap-4 mx-8">
          <span class="text-xs font-bold tracking-wider text-white/80">وصل حديثاً</span>
          <span class="size-1.5 rounded-full bg-gold-400"></span>
        </span>
        <span class="inline-flex items-center gap-4 mx-8">
          <span class="text-xs font-bold tracking-wider text-gold-400">شحن مجاني للطلبات فوق 100 ألف ج</span>
          <span class="size-1.5 rounded-full bg-gold-400"></span>
        </span>
        <span class="inline-flex items-center gap-4 mx-8">
          <span class="text-xs font-bold tracking-wider text-white/80">قطن بيكيه طبيعي 100%</span>
          <span class="size-1.5 rounded-full bg-gold-400"></span>
        </span>
        <span class="inline-flex items-center gap-4 mx-8">
          <span class="text-xs font-bold tracking-wider text-white/80">خامات لا تنكمش وثبات ألوان</span>
          <span class="size-1.5 rounded-full bg-gold-400"></span>
        </span>
        <span class="inline-flex items-center gap-4 mx-8">
          <span class="text-xs font-bold tracking-wider text-gold-400">كود الخصم: JAMAL10</span>
          <span class="size-1.5 rounded-full bg-gold-400"></span>
        </span>
        <span class="inline-flex items-center gap-4 mx-8">
          <span class="text-xs font-bold tracking-wider text-white/80">ضمان استبدال فوري 14 يوماً</span>
          <span class="size-1.5 rounded-full bg-gold-400"></span>
        </span>
      </template>
    </div>
  </div>
</template>

<script setup>
</script>
