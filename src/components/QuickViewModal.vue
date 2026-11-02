<template>
  <div v-if="isOpen && product" class="fixed inset-0 z-50 overflow-hidden">
    <!-- خلفية التعتيم -->
    <div class="fixed inset-0 bg-black/85 backdrop-blur-xs" @click="$emit('close')"></div>

    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-[#120a10] border border-white/10 text-white shadow-2xl animate-pop-up max-h-[90vh] flex flex-col md:flex-row">
        <!-- زر الإغلاق -->
        <button
          type="button"
          class="absolute start-4 top-4 z-10 grid size-9 place-items-center rounded-full bg-black/60 text-white hover:bg-black cursor-pointer"
          @click="$emit('close')"
        >
          <X class="size-5" />
        </button>

        <!-- صورة المنتج -->
        <div class="relative aspect-square md:aspect-auto md:w-1/2 bg-black shrink-0">
          <img :src="product.image" :alt="product.name" class="h-full w-full object-cover" />
          <span class="absolute end-4 top-4 rounded-full bg-gold-400 px-3 py-1 text-xs font-black text-black shadow-sm">
            {{ product.badge || 'الأكثر طلباً' }}
          </span>
        </div>

        <!-- التفاصيل -->
        <div class="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <span class="text-xs font-bold text-gold-400 uppercase tracking-wider">{{ product.categoryName }}</span>
            <h3 class="text-2xl font-black text-white mt-1">{{ product.name }}</h3>

            <div class="mt-2 flex items-center gap-2">
              <div class="flex text-gold-400">
                <Star v-for="i in 5" :key="i" class="size-3.5 fill-gold-400" />
              </div>
              <span class="text-xs text-white/50">{{ product.rating }} ({{ product.reviewsCount }} تقييم)</span>
            </div>

            <div class="mt-4 flex items-baseline gap-3">
              <span class="text-2xl font-black text-gold-400 font-mono">{{ formatPrice(product.price) }}</span>
              <span class="text-sm font-bold text-white/40 line-through font-mono">{{ formatPrice(product.originalPrice) }}</span>
              <span class="rounded bg-rose-500/20 px-2 py-0.5 text-xs font-black text-rose-400">
                -{{ discountPercentage }}%
              </span>
            </div>

            <p class="mt-3 text-xs leading-relaxed text-white/60">
              {{ product.description }}
            </p>

            <!-- اختيار المقاس -->
            <div class="mt-5">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-white/80">المقاس:</span>
                <button
                  type="button"
                  class="text-[11px] font-bold text-gold-400 hover:underline cursor-pointer"
                  @click="$emit('open-size-guide')"
                >
                  دليل المقاسات
                </button>
              </div>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="size in product.sizes"
                  :key="size"
                  type="button"
                  :class="[
                    'rounded-xl border px-3 py-1.5 text-xs font-bold transition cursor-pointer',
                    selectedSize === size
                      ? 'border-gold-400 bg-gold-400 text-black font-black'
                      : 'border-white/15 bg-white/5 text-white hover:border-white/40'
                  ]"
                  @click="selectedSize = size"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- اختيار اللون -->
            <div class="mt-4">
              <span class="text-xs font-bold text-white/80 block mb-2">اللون: {{ selectedColor?.name }}</span>
              <div class="flex items-center gap-2">
                <button
                  v-for="color in product.colors"
                  :key="color.name"
                  type="button"
                  :class="[
                    'size-6 rounded-full ring-2 transition cursor-pointer',
                    selectedColor?.name === color.name ? 'ring-gold-400 scale-110' : 'ring-transparent hover:ring-white/40'
                  ]"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                  @click="selectedColor = color"
                ></button>
              </div>
            </div>
          </div>

          <!-- العداد وزر الإضافة للسلة -->
          <div class="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
            <div class="flex items-center rounded-xl border border-white/15 bg-white/5 p-1">
              <button
                type="button"
                class="grid size-8 place-items-center rounded-lg bg-white/10 text-white hover:bg-white/20 font-black cursor-pointer"
                @click="qty > 1 ? qty-- : null"
              >
                -
              </button>
              <span class="w-8 text-center text-sm font-black font-mono">{{ qty }}</span>
              <button
                type="button"
                class="grid size-8 place-items-center rounded-lg bg-white/10 text-white hover:bg-white/20 font-black cursor-pointer"
                @click="qty++"
              >
                +
              </button>
            </div>
            <button
              type="button"
              class="flex-1 flex items-center justify-center gap-2 rounded-full bg-white py-3.5 text-xs font-black text-black hover:bg-gold-400 transition active:scale-95 shadow-md cursor-pointer"
              @click="handleAddToCart"
            >
              <ShoppingBag class="size-4" />
              <span>أضف إلى السلة</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { X, Star, ShoppingBag } from 'lucide-vue-next';
import { products } from '../data/products.js';
import { useCurrency } from '../composables/useCurrency.js';
import { useCart } from '../composables/useCart.js';
import { useToast } from '../composables/useToast.js';

const props = defineProps({
  productId: {
    type: String,
    default: null
  },
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'open-size-guide', 'open-cart']);

const { formatPrice } = useCurrency();
const { addToCart } = useCart();
const { showToast } = useToast();

const product = computed(() => {
  return products.find(p => p.id === props.productId) || null;
});

const selectedSize = ref('');
const selectedColor = ref(null);
const qty = ref(1);

watch(
  () => props.productId,
  () => {
    if (product.value) {
      selectedSize.value = product.value.sizes[0] || 'L';
      selectedColor.value = product.value.colors[0] || null;
      qty.value = 1;
    }
  },
  { immediate: true }
);

const discountPercentage = computed(() => {
  if (!product.value || !product.value.originalPrice) return 0;
  return Math.round(((product.value.originalPrice - product.value.price) / product.value.originalPrice) * 100);
});

function handleAddToCart() {
  if (!product.value) return;
  addToCart(product.value, selectedSize.value, selectedColor.value, qty.value);
  showToast(
    `تمت إضافة ${qty.value}x "${product.value.name} (${selectedSize.value})" للسلة`,
    'عرض السلة',
    () => {
      emit('close');
      emit('open-cart');
    }
  );
  emit('close');
}
</script>
