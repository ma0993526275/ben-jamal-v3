<template>
  <section id="catalog" class="w-full max-w-[1500px] mx-auto py-20 px-4 sm:px-8 border-t border-white/[0.08]">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div>
        <span class="text-xs font-bold uppercase tracking-wider text-gold-400">FULL STORE CATALOG</span>
        <h2 class="text-3xl sm:text-5xl font-display font-black tracking-tight text-white leading-none mt-1">المتجر الكامل</h2>
        <p class="text-xs sm:text-sm text-white/50 mt-2">
          اختر قطعتك المفضلة من خامات القطن الطبيعي وتصاميم البولو العصرية.
        </p>
      </div>

      <!-- تصنيف المنتجات والترتيب -->
      <div class="flex flex-wrap items-center gap-3">
        <!-- أزرار الفئات -->
        <div class="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10">
          <button
            v-for="cat in categories"
            :key="cat.id"
            type="button"
            :class="[
              'rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer',
              activeCategory === cat.id
                ? 'bg-white text-black font-black shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            ]"
            @click="activeCategory = cat.id"
          >
            {{ cat.name }}
          </button>
        </div>

        <!-- الترتيب -->
        <div class="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white">
          <SlidersHorizontal class="size-4 text-white/40" />
          <select
            v-model="activeSort"
            aria-label="ترتيب المنتجات"
            class="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
          >
            <option value="featured" class="bg-[#0b0b10] text-white">المقترحة والمميزة</option>
            <option value="price-asc" class="bg-[#0b0b10] text-white">الأقل سعراً أولاً</option>
            <option value="price-desc" class="bg-[#0b0b10] text-white">الأعلى سعراً أولاً</option>
            <option value="rating" class="bg-[#0b0b10] text-white">الأعلى تقييماً</option>
          </select>
        </div>
      </div>
    </div>

    <!-- شبكة المنتجات -->
    <div
      v-if="filteredProducts.length > 0"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        :is-snap-track="false"
        @open-quick-view="$emit('open-quick-view', $event)"
        @open-cart="$emit('open-cart')"
      />
    </div>

    <!-- حالة عدم وجود نتائج -->
    <div v-else class="py-20 text-center space-y-4">
      <div class="mx-auto grid size-16 place-items-center rounded-full bg-white/5 text-white/30">
        <Search class="size-8" />
      </div>
      <h3 class="text-lg font-black text-white">لم نجد أي منتجات تطابق بحثك</h3>
      <p class="text-xs text-white/50 max-w-sm mx-auto">
        جرب البحث بكلمات أخرى أو اختر فئة مختلفة للوصول إلى التصميم المطلوب.
      </p>
      <button
        type="button"
        class="rounded-full bg-white px-6 py-2.5 text-xs font-black text-black hover:bg-gold-400 transition cursor-pointer"
        @click="resetFilters"
      >
        إعادة ضبط الفلاتر
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { SlidersHorizontal, Search } from 'lucide-vue-next';
import ProductCard from './ProductCard.vue';
import { products } from '../data/products.js';

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['open-quick-view', 'open-cart', 'update:searchQuery']);

const activeCategory = ref('all');
const activeSort = ref('featured');

const categories = [
  { id: 'all', name: 'الكل' },
  { id: 'sada', name: 'مجموعة السادة' },
  { id: 'mogalam', name: 'مجموعة المقلّم' },
  { id: 'karuhat', name: 'مجموعة الكاروهات' }
];

const filteredProducts = computed(() => {
  let list = products.filter(p => {
    const matchesCategory = activeCategory.value === 'all' || p.category === activeCategory.value;
    const query = (props.searchQuery || '').trim().toLowerCase();
    const matchesSearch = !query ||
      p.name.toLowerCase().includes(query) ||
      p.categoryName.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  if (activeSort.value === 'price-asc') {
    return list.slice().sort((a, b) => a.price - b.price);
  } else if (activeSort.value === 'price-desc') {
    return list.slice().sort((a, b) => b.price - a.price);
  } else if (activeSort.value === 'rating') {
    return list.slice().sort((a, b) => b.rating - a.rating);
  }

  return list;
});

function resetFilters() {
  activeCategory.value = 'all';
  activeSort.value = 'featured';
  emit('update:searchQuery', '');
}
</script>
