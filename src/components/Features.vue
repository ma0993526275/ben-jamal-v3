<template>
  <section class="py-16 px-4 sm:px-8 border-t border-white/[0.08] bg-[#0c070c]/50">
    <div class="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- 1. أقمشة قطنية 100% -->
      <div class="flex items-start gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-gold-500/30 transition">
        <div class="grid size-12 shrink-0 place-items-center rounded-2xl bg-gold-400/10 text-gold-400 border border-gold-400/20">
          <Sparkles class="size-6" />
        </div>
        <div>
          <h4 class="font-bold text-white text-base">قطن طبيعي 100%</h4>
          <p class="text-xs text-white/50 mt-1 leading-relaxed">أفضل خامات القطن الفاخر الممشط بنعومة حريرية وملمس بارد على الجسم.</p>
        </div>
      </div>

      <!-- 2. توصيل سريع وموثوق -->
      <div class="flex items-start gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-gold-500/30 transition">
        <div class="grid size-12 shrink-0 place-items-center rounded-2xl bg-gold-400/10 text-gold-400 border border-gold-400/20">
          <Truck class="size-6" />
        </div>
        <div>
          <h4 class="font-bold text-white text-base">شحن سريع ومجاني</h4>
          <p class="text-xs text-white/50 mt-1 leading-relaxed">توصيل آمن لباب منزلك مع إمكانية الشحن المجاني لكافة الطلبات فوق 100 ألف ج.</p>
        </div>
      </div>

      <!-- 3. استبدال فوري وضمان -->
      <div class="flex items-start gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-gold-500/30 transition">
        <div class="grid size-12 shrink-0 place-items-center rounded-2xl bg-gold-400/10 text-gold-400 border border-gold-400/20">
          <RotateCcw class="size-6" />
        </div>
        <div>
          <h4 class="font-bold text-white text-base">ضمان استبدال 14 يوماً</h4>
          <p class="text-xs text-white/50 mt-1 leading-relaxed">إذا لم يطابق المقاس أو توقعاتك، نقوم بالاستبدال فوراً وبكل سهولة ومرونة.</p>
        </div>
      </div>

      <!-- 4. دعم واتساب مباشر -->
      <div class="flex items-start gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-gold-500/30 transition">
        <div class="grid size-12 shrink-0 place-items-center rounded-2xl bg-gold-400/10 text-gold-400 border border-gold-400/20">
          <Phone class="size-6" />
        </div>
        <div>
          <h4 class="font-bold text-white text-base">خدمة عملاء VIP</h4>
          <p class="text-xs text-white/50 mt-1 leading-relaxed">فريقنا متواجد على مدار الساعة عبر واتساب لمساعدتك في اختيار المقاس المناسب.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Sparkles, Truck, RotateCcw, Phone } from 'lucide-vue-next';
</script>
