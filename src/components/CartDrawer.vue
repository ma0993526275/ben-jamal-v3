<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-hidden">
    <!-- خلفية التعتيم -->
    <div
      class="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      @click="$emit('close')"
    ></div>

    <div class="fixed inset-y-0 end-0 max-w-full flex">
      <div class="w-screen max-w-md bg-[#0f0b12] text-white border-s border-white/10 shadow-2xl flex flex-col justify-between">
        <!-- ترويسة السلة -->
        <div class="flex items-center justify-between border-b border-white/10 bg-[#08080c] px-6 py-4">
          <div class="flex items-center gap-2">
            <ShoppingBag class="size-5 text-gold-400" />
            <h3 class="font-black text-sm uppercase tracking-wider">سلة المشتريات</h3>
            <span class="rounded-full bg-gold-400 px-2 py-0.5 text-xs font-black text-black">
              {{ totalCount }}
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

        <!-- شريط الشحن المجاني التفاعلي -->
        <div class="bg-white/[0.02] border-b border-white/10 px-6 py-3">
          <div class="flex items-center justify-between text-xs">
            <span class="flex items-center gap-1.5 text-white/80">
              <template v-if="eligibleForFreeShipping">
                <CheckCircle2 class="size-4 text-emerald-400" />
                <span class="text-emerald-400 font-bold">شحن مجاني لكافة المناطق 🎁</span>
              </template>
              <template v-else>
                <Truck class="size-4 text-gold-400" />
                <span>أضف بـ <strong>{{ formatPrice(remainingForFreeShipping) }}</strong> للحصول على شحن مجاني!</span>
              </template>
            </span>
            <span class="font-mono font-bold text-gold-400">{{ progressToFreeShipping }}%</span>
          </div>
          <div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              class="h-full rounded-full bg-gold-400 transition-all duration-500"
              :style="{ width: `${progressToFreeShipping}%` }"
            ></div>
          </div>
        </div>

        <!-- قائمة عناصر السلة -->
        <div v-if="cartItems.length > 0" class="flex-1 overflow-y-auto p-5 space-y-3 divide-y divide-white/10">
          <div
            v-for="item in cartItems"
            :key="item.itemKey"
            class="flex items-center gap-3 pt-3 first:pt-0"
          >
            <img :src="item.image" :alt="item.name" class="size-16 rounded-xl object-cover shrink-0 border border-white/10" />
            <div class="flex-1 min-w-0">
              <h4 class="text-xs font-bold text-white truncate">{{ item.name }}</h4>
              <div class="flex items-center gap-2 text-[11px] text-white/50 mt-1">
                <span class="rounded bg-white/5 border border-white/10 px-1.5 py-0.5">مقاس: {{ item.size }}</span>
                <span class="rounded bg-white/5 border border-white/10 px-1.5 py-0.5">لون: {{ item.color.name }}</span>
              </div>
              <div class="mt-1 font-bold text-xs text-gold-400 font-mono">
                {{ formatPrice(item.price) }}
              </div>
            </div>
            <div class="flex flex-col items-end gap-2 shrink-0">
              <button
                type="button"
                class="text-white/40 hover:text-rose-400 transition cursor-pointer"
                @click="removeFromCart(item.itemKey)"
              >
                <Trash2 class="size-3.5" />
              </button>
              <div class="flex items-center rounded-lg border border-white/10 bg-white/5 p-0.5 text-xs font-bold font-mono">
                <button
                  type="button"
                  class="size-6 grid place-items-center rounded hover:bg-white/10 cursor-pointer"
                  @click="updateQuantity(item.itemKey, -1)"
                >
                  -
                </button>
                <span class="w-5 text-center">{{ item.quantity }}</span>
                <button
                  type="button"
                  class="size-6 grid place-items-center rounded hover:bg-white/10 cursor-pointer"
                  @click="updateQuantity(item.itemKey, 1)"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- حالة السلة الفارغة -->
        <div v-else class="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div class="grid size-16 place-items-center rounded-full bg-white/5 text-white/40">
            <ShoppingBag class="size-8" />
          </div>
          <h4 class="mt-4 font-black text-white text-base">سلة المشتريات فارغة</h4>
          <p class="mt-1 text-xs text-white/50">تصفح تشكيلة بن جمال الفاخرة وأضف ما يعجبك</p>
          <button
            type="button"
            class="mt-5 rounded-full bg-white px-6 py-2.5 text-xs font-black text-black hover:bg-gold-400 transition cursor-pointer"
            @click="$emit('close')"
          >
            تصفح المنتجات الآن
          </button>
        </div>

        <!-- تفاصيل الحساب والإجراءات -->
        <div v-if="cartItems.length > 0" class="border-t border-white/10 bg-[#08080c] p-5 space-y-3">
          <div class="flex gap-2">
            <input
              v-model="couponCode"
              type="text"
              placeholder="كود الخصم (JAMAL10)"
              class="flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-mono font-bold uppercase text-white placeholder-white/40 focus:border-gold-400 focus:outline-none"
              @keyup.enter="handleApplyCoupon"
            />
            <button
              type="button"
              class="rounded-xl bg-white px-4 py-2 text-xs font-bold text-black hover:bg-gold-400 transition cursor-pointer"
              @click="handleApplyCoupon"
            >
              تطبيق
            </button>
          </div>
          <div
            v-if="couponFeedback"
            :class="['text-xs font-bold', couponSuccess ? 'text-emerald-400' : 'text-rose-400']"
          >
            {{ couponFeedback }}
          </div>

          <div class="space-y-1.5 text-xs text-white/70">
            <div class="flex justify-between">
              <span>المجموع الفرعي:</span>
              <span class="font-bold text-white font-mono">{{ formatPrice(subtotal) }}</span>
            </div>
            <div v-if="discountAmount > 0" class="flex justify-between text-emerald-400 font-bold">
              <span>خصم الكوبون:</span>
              <span class="font-mono">-{{ formatPrice(discountAmount) }}</span>
            </div>
            <div class="flex justify-between">
              <span>الشحن:</span>
              <span class="font-bold text-gold-400">
                {{ shippingFee === 0 ? 'مجاني' : formatPrice(shippingFee) }}
              </span>
            </div>
            <div class="flex justify-between border-t border-white/10 pt-2 text-sm font-black text-white">
              <span>الإجمالي المطلوب:</span>
              <span class="text-gold-400 font-mono text-base font-extrabold">{{ formatPrice(total) }}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              class="flex items-center justify-center gap-1.5 rounded-full bg-white py-3.5 text-xs font-black text-black hover:bg-gold-400 transition active:scale-95 shadow-md cursor-pointer"
              @click="$emit('open-checkout')"
            >
              <Check class="size-4" />
              <span>إتمام الطلب السريع</span>
            </button>
            <a
              :href="whatsAppUrl"
              target="_blank"
              class="flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 py-3.5 text-xs font-black text-white hover:bg-emerald-500 transition active:scale-95 shadow-md"
            >
              <MessageCircle class="size-4" />
              <span>طلب عبر واتساب</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  ShoppingBag,
  X,
  Truck,
  CheckCircle2,
  Trash2,
  Check,
  MessageCircle
} from 'lucide-vue-next';
import { useCart } from '../composables/useCart.js';
import { useCurrency } from '../composables/useCurrency.js';
import { useToast } from '../composables/useToast.js';

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close', 'open-checkout']);

const {
  cartItems,
  totalCount,
  subtotal,
  discountAmount,
  shippingFee,
  eligibleForFreeShipping,
  total,
  progressToFreeShipping,
  remainingForFreeShipping,
  updateQuantity,
  removeFromCart,
  applyCoupon,
  getWhatsAppOrderUrl
} = useCart();

const { formatPrice } = useCurrency();
const { showToast } = useToast();

const couponCode = ref('');
const couponFeedback = ref('');
const couponSuccess = ref(false);

const whatsAppUrl = computed(() => getWhatsAppOrderUrl() || '#');

function handleApplyCoupon() {
  const res = applyCoupon(couponCode.value);
  couponFeedback.value = res.message;
  couponSuccess.value = res.success;
  showToast(res.message);
}
</script>
