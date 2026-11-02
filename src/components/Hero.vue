<template>
  <section id="hero" class="relative min-h-[95vh] text-white flex flex-col justify-between overflow-hidden heems-ambient-bg -mt-16 pt-24 pb-12">
    <!-- العلامة المائية الطباعية الضخمة في الخلفية (HEEMS Typography Watermark) -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none">
      <h1
        class="text-[28vw] sm:text-[28vw] md:text-[26vw] lg:text-[22vw] leading-[0.72] font-display font-black text-transparent bg-clip-text select-none uppercase tracking-[-0.04em] pb-[0.08em] opacity-90"
        style="background-image: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 25%, #d3a94c 60%, rgba(211,169,76,0) 100%)"
      >
        BEN JAMAL
      </h1>
    </div>

    <!-- أزرار الإجراء السريع في الهيرو -->
    <div class="relative z-20 mx-auto max-w-md px-6 w-full flex flex-row gap-3 items-center justify-center mt-auto pt-16">
      <a
        href="#new-arrivals"
        class="group relative flex-1 min-h-[50px] py-3.5 px-6 rounded-full bg-white text-black font-bold text-xs sm:text-sm text-center overflow-hidden transition-transform active:scale-95 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]"
      >
        <span class="relative z-10">تسوق التشكيلة الملكية</span>
      </a>
      <a
        href="#catalog"
        class="group relative flex-1 min-h-[50px] py-3.5 px-6 rounded-full bg-black/40 border border-white/20 text-white font-bold text-xs sm:text-sm text-center backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition active:scale-95 flex items-center justify-center"
      >
        <span>المتجر الكامل</span>
      </a>
    </div>
  </section>
</template>

<script setup>
</script>
