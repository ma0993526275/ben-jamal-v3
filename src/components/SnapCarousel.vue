<template>
  <section :id="id" class="w-full max-w-[1500px] mx-auto py-16 px-4 sm:px-8 border-t border-white/[0.08]">
    <div class="flex flex-col lg:flex-row gap-6 lg:gap-12">
      <!-- الشريط الجانبي الثابت على الشاشات الكبيرة (Sticky Sidebar) -->
      <div class="lg:w-1/4 lg:sticky top-28 h-fit flex flex-col justify-between shrink-0">
        <div>
          <div class="flex items-center justify-between gap-4 lg:block">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-gold-400">{{ englishTitle }}</span>
              <h2 class="text-3xl sm:text-5xl font-display font-black tracking-tight text-white leading-none mt-1">{{ title }}</h2>
            </div>
            <!-- أزرار التمرير الدائرية للشاشات الصغيرة -->
            <div class="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                aria-label="السابق"
                class="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white hover:text-black transition cursor-pointer"
                @click="scrollTrack('prev')"
              >
                <ArrowRight class="size-4" />
              </button>
              <button
                type="button"
                aria-label="التالي"
                class="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white hover:text-black transition cursor-pointer"
                @click="scrollTrack('next')"
              >
                <ArrowLeft class="size-4" />
              </button>
            </div>
          </div>
          <p class="text-xs sm:text-sm text-white/50 mt-4 leading-relaxed max-w-sm hidden lg:block">
            {{ description }}
          </p>
        </div>

        <!-- أزرار التمرير الدائرية للديسكتوب -->
        <div class="hidden lg:flex items-center gap-3 pt-10">
          <button
            type="button"
            aria-label="السابق"
            class="flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-gold-400 hover:text-black hover:border-gold-400 transition cursor-pointer"
            @click="scrollTrack('prev')"
          >
            <ArrowRight class="size-5" />
          </button>
          <button
            type="button"
            aria-label="التالي"
            class="flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-gold-400 hover:text-black hover:border-gold-400 transition cursor-pointer"
            @click="scrollTrack('next')"
          >
            <ArrowLeft class="size-5" />
          </button>
        </div>
      </div>

      <!-- مسار البطاقات الأفقي (Snap Carousel Track) -->
      <div class="lg:w-3/4 overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0">
        <div
          ref="trackRef"
          class="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scrollbar-none scroll-smooth"
        >
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            :is-snap-track="true"
            @open-quick-view="$emit('open-quick-view', $event)"
            @open-cart="$emit('open-cart')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';
import ProductCard from './ProductCard.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  englishTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  products: {
    type: Array,
    required: true
  }
});

defineEmits(['open-quick-view', 'open-cart']);

const trackRef = ref(null);

function scrollTrack(direction) {
  if (!trackRef.value) return;
  const scrollDistance = 350;
  // In RTL layout, scrolling left (towards next cards) is negative delta
  const delta = direction === 'next' ? -scrollDistance : scrollDistance;
  trackRef.value.scrollBy({ left: delta, behavior: 'smooth' });
}
</script>
