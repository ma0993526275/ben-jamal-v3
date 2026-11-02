<template>
  <div
    :class="[
      isSnapTrack ? 'snap-start shrink-0 w-[75vw] sm:w-[300px] md:w-[350px]' : '',
      'group flex flex-col gap-3 select-none'
    ]"
  >
    <!-- صورة المنتج مع تأثير التبديل عند التمرير (Image Hover Flip like HEEMS) -->
    <div class="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden bg-[#140d12] rounded-2xl border border-white/5 group-hover:border-white/20 transition-all duration-300">
      <!-- الصورة الأساسية -->
      <img
        :src="product.image"
        :alt="product.name"
        loading="lazy"
        class="h-full w-full object-cover object-top transition-opacity duration-300 ease-in-out md:group-hover:opacity-0"
      />

      <!-- الصورة البديلة عند التمرير -->
      <img
        :src="product.alternateImage || product.image"
        :alt="product.name + ' - تفاصيل'"
        loading="lazy"
        class="hidden md:block absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-500 ease-in-out md:group-hover:opacity-100"
      />

      <!-- شارات الزاوية -->
      <div class="absolute inset-x-3 top-3 flex items-center justify-between pointer-events-none z-20">
        <span class="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white/90 backdrop-blur-md border border-white/10">
          {{ product.categoryName }}
        </span>
        <button
          type="button"
          aria-label="المفضلة"
          class="pointer-events-auto grid size-8 place-items-center rounded-full bg-black/50 text-white/70 hover:text-rose-400 hover:bg-black backdrop-blur-md transition cursor-pointer"
          @click.stop="onToggleWishlist"
        >
          <Heart
            class="size-4"
            :class="isFavorite ? 'fill-rose-500 text-rose-500' : ''"
          />
        </button>
      </div>

      <!-- زر الإضافة للسلة المنزلق من الأسفل على الهوفر (HEEMS Slide-up Add to Cart Pill) -->
      <div class="absolute inset-x-4 bottom-4 z-20 translate-y-4 opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 hidden md:flex gap-2">
        <button
          type="button"
          class="w-full bg-white text-black text-xs font-black py-3 rounded-full text-center hover:bg-gold-400 hover:text-black transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
          @click.stop="onAddToCart"
        >
          <ShoppingBag class="size-3.5" />
          <span>أضف للسلة</span>
        </button>
        <button
          type="button"
          class="size-10 shrink-0 bg-black/80 text-white hover:text-gold-400 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md cursor-pointer"
          title="معاينة"
          @click.stop="$emit('open-quick-view', product.id)"
        >
          <Eye class="size-4" />
        </button>
      </div>

      <!-- شارة السعر على الموبايل -->
      <div class="absolute bottom-3 end-3 z-20 md:hidden">
        <span class="bg-gold-500/90 text-black text-[11px] font-black px-2.5 py-1 rounded-full font-mono">
          {{ formatPrice(product.price) }}
        </span>
      </div>
    </div>

    <!-- معلومات المنتج وأسعاره -->
    <div class="flex flex-col gap-1 px-1">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <h3
            class="text-xs sm:text-sm font-bold text-white/90 group-hover:text-gold-400 transition-colors truncate cursor-pointer"
            @click="$emit('open-quick-view', product.id)"
          >
            {{ product.name }}
          </h3>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-[11px] text-white/40">{{ product.categoryName }}</span>
            <span class="text-white/20">•</span>
            <span class="text-[11px] text-emerald-400">قطن 100%</span>
          </div>
        </div>
        <div class="hidden md:flex flex-col items-end shrink-0">
          <span class="text-sm font-black text-gold-400 font-mono">{{ formatPrice(product.price) }}</span>
          <span class="text-[11px] text-white/40 line-through font-mono">{{ formatPrice(product.originalPrice) }}</span>
        </div>
      </div>

      <!-- زر الإضافة للموبايل -->
      <div class="mt-2 flex items-center gap-2 md:hidden">
        <button
          type="button"
          class="flex-1 bg-white/10 hover:bg-gold-400 hover:text-black py-2 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1 transition cursor-pointer"
          @click="onAddToCart"
        >
          <ShoppingBag class="size-3" /> أضف للسلة
        </button>
        <button
          type="button"
          class="size-8 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-white/60 cursor-pointer"
          @click="$emit('open-quick-view', product.id)"
        >
          <Eye class="size-3.5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Heart, ShoppingBag, Eye } from 'lucide-vue-next';
import { useCurrency } from '../composables/useCurrency.js';
import { useWishlist } from '../composables/useWishlist.js';
import { useCart } from '../composables/useCart.js';
import { useToast } from '../composables/useToast.js';

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  isSnapTrack: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['open-quick-view', 'open-cart']);

const { formatPrice } = useCurrency();
const { isInWishlist, toggleWishlist } = useWishlist();
const { addToCart } = useCart();
const { showToast } = useToast();

const isFavorite = computed(() => isInWishlist(props.product.id));

function onToggleWishlist() {
  const added = toggleWishlist(props.product.id);
  showToast(added ? 'تمت الإضافة لقائمة المفضلة' : 'تمت الإزالة من المفضلة');
}

function onAddToCart() {
  const defaultSize = props.product.sizes[0] || 'L';
  const defaultColor = props.product.colors[0] || { name: 'افتراضي', hex: '#162238' };
  addToCart(props.product, defaultSize, defaultColor, 1);
  showToast(
    `تمت إضافة "${props.product.name} (${defaultSize})" للسلة`,
    'عرض السلة',
    () => emit('open-cart')
  );
}
</script>
