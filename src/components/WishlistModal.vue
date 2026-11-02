<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-hidden">
    <div class="fixed inset-0 bg-black/85 backdrop-blur-xs" @click="$emit('close')"></div>

    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#120a10] border border-white/10 text-white shadow-2xl animate-pop-up max-h-[85vh] flex flex-col">
        <!-- ترويسة المفضلة -->
        <div class="flex items-center justify-between border-b border-white/10 bg-[#08080c] p-5">
          <div class="flex items-center gap-2">
            <Heart class="size-5 text-rose-400 fill-rose-400" />
            <h3 class="font-extrabold text-base">قائمة المفضلة</h3>
            <span class="rounded-full bg-rose-500 px-2 py-0.5 text-xs font-black text-white">
              {{ wishlist.length }}
            </span>
          </div>
          <button
            type="button"
            class="grid size-8 place-items-center rounded-full bg-white/10 text-white/70 hover:text-white cursor-pointer"
            @click="$emit('close')"
          >
            <X class="size-4" />
          </button>
        </div>

        <!-- قائمة العناصر -->
        <div v-if="wishlistProducts.length > 0" class="flex-1 overflow-y-auto p-4 space-y-3">
          <div
            v-for="prod in wishlistProducts"
            :key="prod.id"
            class="flex items-center justify-between gap-3 rounded-2xl border border-white/10 p-3 bg-white/5"
          >
            <img :src="prod.image" :alt="prod.name" class="size-14 rounded-xl object-cover" />
            <div class="flex-1 min-w-0">
              <h4 class="text-xs font-bold text-white truncate">{{ prod.name }}</h4>
              <span class="text-xs font-bold text-gold-400 font-mono">{{ formatPrice(prod.price) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="rounded-full bg-white px-3 py-1.5 text-xs font-black text-black hover:bg-gold-400 transition cursor-pointer"
                @click="handleAddCart(prod)"
              >
                أضف للسلة
              </button>
              <button
                type="button"
                class="text-white/40 hover:text-rose-400 p-1 cursor-pointer"
                title="إزالة من المفضلة"
                @click="removeFromWishlist(prod.id)"
              >
                <Trash2 class="size-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- حالة المفضلة الفارغة -->
        <div v-else class="p-10 text-center">
          <Heart class="size-10 mx-auto text-white/30" />
          <h4 class="mt-3 font-bold text-white text-sm">قائمة المفضلة فارغة</h4>
          <p class="text-xs text-white/50 mt-1">انقر على أيقونة القلب على أي قميص لحفظه هنا</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Heart, X, Trash2 } from 'lucide-vue-next';
import { useWishlist } from '../composables/useWishlist.js';
import { useCurrency } from '../composables/useCurrency.js';
import { useCart } from '../composables/useCart.js';
import { useToast } from '../composables/useToast.js';
import { products } from '../data/products.js';

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'open-cart']);

const { wishlist, removeFromWishlist } = useWishlist();
const { formatPrice } = useCurrency();
const { addToCart } = useCart();
const { showToast } = useToast();

const wishlistProducts = computed(() => {
  return products.filter(p => wishlist.value.includes(p.id));
});

function handleAddCart(prod) {
  const defaultSize = prod.sizes[0] || 'L';
  const defaultColor = prod.colors[0] || { name: 'افتراضي', hex: '#162238' };
  addToCart(prod, defaultSize, defaultColor, 1);
  showToast(`تمت إضافة "${prod.name}" إلى السلة`);
}
</script>
