<template>
  <footer class="relative mt-20 border-t border-white/10 bg-[#070508] pt-16 pb-12 overflow-hidden">
    <!-- خط التوهج اللوني العلوي -->
    <div class="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold-500/50 to-transparent"></div>

    <div class="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        <!-- نبذة عن المتجر -->
        <div class="md:col-span-1 space-y-4">
          <div class="flex items-center gap-2">
            <div class="grid size-9 place-items-center rounded-xl bg-gold-400 text-black">
              <Shirt class="size-5" />
            </div>
            <span class="font-display text-2xl uppercase tracking-wider text-white">BEN JAMAL</span>
          </div>
          <p class="text-xs text-white/50 leading-relaxed">
            دار بن جمال للأزياء الرجالية الفاخرة. نقدم أحدث تصاميم قمصان البولو المصنوعة من أجود خامات القطن الطبيعي 100% لإطلالة متميزة في كل الأوقات.
          </p>
        </div>

        <!-- روابط سريعة -->
        <div>
          <h5 class="text-xs font-black uppercase tracking-wider text-gold-400 mb-4">أقسام المتجر</h5>
          <ul class="space-y-2.5 text-xs text-white/60 font-semibold">
            <li><a href="#hero" class="hover:text-white transition">الرئيسية</a></li>
            <li><a href="#new-arrivals" class="hover:text-white transition">وصل حديثاً</a></li>
            <li><a href="#premium-collection" class="hover:text-white transition">التشكيلة الملكية</a></li>
            <li><a href="#catalog" class="hover:text-white transition">المتجر الكامل</a></li>
          </ul>
        </div>

        <!-- مساعدة وخدمة العملاء -->
        <div>
          <h5 class="text-xs font-black uppercase tracking-wider text-gold-400 mb-4">خدمة العملاء</h5>
          <ul class="space-y-2.5 text-xs text-white/60 font-semibold">
            <li>
              <button
                type="button"
                class="hover:text-white transition cursor-pointer"
                @click="$emit('open-size-guide')"
              >
                دليل المقاسات
              </button>
            </li>
            <li>
              <button
                type="button"
                class="hover:text-white transition cursor-pointer"
                @click="$emit('open-orders')"
              >
                سجل وإدارة الطلبات
              </button>
            </li>
            <li>
              <a href="https://wa.me/249912345678" target="_blank" class="hover:text-white transition">الاستبدال والاسترجاع</a>
            </li>
            <li>
              <a href="https://wa.me/249912345678" target="_blank" class="hover:text-white transition">تواصل مباشر واتساب</a>
            </li>
          </ul>
        </div>

        <!-- طرق الدفع والتوصيل -->
        <div class="space-y-4">
          <h5 class="text-xs font-black uppercase tracking-wider text-gold-400">طرق الدفع والتوصيل</h5>
          <div class="space-y-2 text-xs text-white/50">
            <p>💵 الدفع عند الاستلام نقداً في كافة المدن</p>
            <p>📱 تحويل مباشر عبر تطبيق بنكك (Bankak)</p>
            <p>🚚 شحن سريع لكافة الولايات والمحليات</p>
          </div>
        </div>
      </div>

      <!-- حقوق النشر والشعار السفلي -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
        <p>© 2026 متجر بن جمال للأزياء الرجالية. جميع الحقوق محفوظة.</p>
        <div class="flex items-center gap-4">
          <span class="hover:text-white/70 transition">سياسة الخصوصية</span>
          <span>•</span>
          <span class="hover:text-white/70 transition">الشروط والأحكام</span>
          <span>•</span>
          <span class="hover:text-white/70 transition">صنع بأعلى معايير الإتقان</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Shirt } from 'lucide-vue-next';

defineEmits(['open-size-guide', 'open-orders']);
</script>
