<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-hidden">
    <div class="fixed inset-0 bg-black/85 backdrop-blur-xs" @click="handleClose"></div>

    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="relative w-full max-w-xl overflow-hidden rounded-3xl bg-[#120a10] border border-white/10 text-white shadow-2xl animate-pop-up max-h-[90vh] overflow-y-auto">
        <!-- ترويسة النافذة -->
        <div class="flex items-center justify-between border-b border-white/10 bg-[#08080c] p-5">
          <div class="flex items-center gap-2">
            <CheckCircle2 class="size-5 text-gold-400" />
            <h3 class="font-extrabold text-base">إتمام وتأكيد الطلب</h3>
          </div>
          <button
            type="button"
            class="grid size-8 place-items-center rounded-full bg-white/10 text-white/70 hover:text-white cursor-pointer"
            @click="handleClose"
          >
            <X class="size-4" />
          </button>
        </div>

        <!-- نموذج إدخال البيانات -->
        <form v-if="!orderSuccess" class="p-6 space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label for="checkout-name" class="block text-xs font-bold text-white/70 mb-1">الاسم الكامل *</label>
            <input
              id="checkout-name"
              v-model="customer.name"
              type="text"
              required
              placeholder="مثال: محمد علي عثمان"
              class="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="checkout-phone" class="block text-xs font-bold text-white/70 mb-1">رقم الهاتف للتواصل *</label>
              <input
                id="checkout-phone"
                v-model="customer.phone"
                type="tel"
                required
                placeholder="مثال: 0912345678"
                class="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs font-mono text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
            <div>
              <label for="checkout-city" class="block text-xs font-bold text-white/70 mb-1">المدينة / الولاية *</label>
              <input
                id="checkout-city"
                v-model="customer.city"
                type="text"
                required
                placeholder="مثال: الخرطوم / بورتسودان"
                class="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label for="checkout-address" class="block text-xs font-bold text-white/70 mb-1">العنوان التفصيلي والحي *</label>
            <input
              id="checkout-address"
              v-model="customer.address"
              type="text"
              required
              placeholder="الحي، الشارع، قرب معلم بارز..."
              class="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white focus:border-gold-400 focus:outline-none"
            />
          </div>

          <div>
            <span class="block text-xs font-bold text-white/70 mb-2">طريقة الدفع *</span>
            <div class="grid grid-cols-2 gap-2 text-xs font-bold">
              <label
                :class="[
                  'flex items-center gap-2 rounded-xl border p-3 cursor-pointer transition',
                  customer.paymentMethod === 'الدفع عند الاستلام'
                    ? 'border-gold-400 bg-gold-500/10'
                    : 'border-white/15 bg-white/5 hover:bg-white/10'
                ]"
              >
                <input
                  v-model="customer.paymentMethod"
                  type="radio"
                  value="الدفع عند الاستلام"
                  class="text-gold-400"
                />
                <span>💵 الدفع عند الاستلام</span>
              </label>

              <label
                :class="[
                  'flex items-center gap-2 rounded-xl border p-3 cursor-pointer transition',
                  customer.paymentMethod === 'تحويل بنكك Bankak'
                    ? 'border-gold-400 bg-gold-500/10'
                    : 'border-white/15 bg-white/5 hover:bg-white/10'
                ]"
              >
                <input
                  v-model="customer.paymentMethod"
                  type="radio"
                  value="تحويل بنكك Bankak"
                  class="text-gold-400"
                />
                <span>📱 تحويل تطبيق بنكك</span>
              </label>
            </div>
          </div>

          <div>
            <label for="checkout-notes" class="block text-xs font-bold text-white/70 mb-1">ملاحظات التوصيل (اختياري)</label>
            <textarea
              id="checkout-notes"
              v-model="customer.notes"
              rows="2"
              placeholder="أي تعليمات للمندوب أو وقت التسليم المفضل..."
              class="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
            ></textarea>
          </div>

          <!-- تفاصيل الحساب -->
          <div class="rounded-2xl bg-black/50 p-4 border border-white/10 text-xs space-y-1.5">
            <div class="flex justify-between text-white/60">
              <span>المجموع الفرعي:</span>
              <span class="font-mono text-white">{{ formatPrice(subtotal) }}</span>
            </div>
            <div v-if="discountAmount > 0" class="flex justify-between text-emerald-400">
              <span>الخصم:</span>
              <span class="font-mono">-{{ formatPrice(discountAmount) }}</span>
            </div>
            <div class="flex justify-between text-white/60">
              <span>رسوم التوصيل:</span>
              <span class="font-mono text-gold-400">
                {{ shippingFee === 0 ? 'مجاني' : formatPrice(shippingFee) }}
              </span>
            </div>
            <div class="flex justify-between font-black text-sm text-white border-t border-white/10 pt-2">
              <span>الإجمالي للدفع:</span>
              <span class="text-gold-400 font-mono text-base">{{ formatPrice(total) }}</span>
            </div>
          </div>

          <div class="flex flex-col gap-2 pt-2">
            <button
              type="submit"
              class="w-full flex items-center justify-center gap-2 rounded-full bg-white py-3.5 text-xs font-black text-black hover:bg-gold-400 transition active:scale-95 shadow-md cursor-pointer"
            >
              <CheckCircle2 class="size-4" />
              تأكيد الطلب الآن
            </button>
            <a
              :href="whatsAppUrlWithCustomer"
              target="_blank"
              class="w-full flex items-center justify-center gap-2 rounded-full bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition"
              @click="recordOrderBeforeWhatsApp"
            >
              <MessageCircle class="size-4" />
              إرسال وتأكيد عبر واتساب
            </a>
          </div>
        </form>

        <!-- رسالة النجاح -->
        <div v-else class="p-8 text-center space-y-4">
          <div class="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Check class="size-8 stroke-[3]" />
          </div>
          <h3 class="text-2xl font-black text-white">تم استلام طلبك بنجاح!</h3>
          <p class="text-xs text-white/60 leading-relaxed max-w-sm mx-auto">
            شكراً لثقتك بمتجر <strong class="text-gold-400">بن جمال</strong>. رقم مرجع طلبك:
            <span class="block my-2 font-mono text-sm font-black text-white bg-white/10 py-1.5 rounded-lg border border-white/10">
              #{{ createdOrderRef }}
            </span>
            سيتواصل معك مندوبنا هاتفياً لتأكيد موعد التسليم والعنوان.
          </p>
          <div class="pt-4 flex flex-col gap-2">
            <a
              :href="successWhatsAppUrl"
              target="_blank"
              class="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition"
            >
              <MessageCircle class="size-4" />
              متابعة الطلب عبر واتساب
            </a>
            <button
              type="button"
              class="rounded-full bg-white/10 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer"
              @click="handleClose"
            >
              متابعة التسوق
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { CheckCircle2, X, MessageCircle, Check } from 'lucide-vue-next';
import { useCart } from '../composables/useCart.js';
import { useCurrency } from '../composables/useCurrency.js';
import { useOrders } from '../composables/useOrders.js';
import { useToast } from '../composables/useToast.js';

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const {
  cartItems,
  subtotal,
  discountAmount,
  shippingFee,
  total,
  clearCart,
  getWhatsAppOrderUrl
} = useCart();

const { formatPrice } = useCurrency();
const { createOrder } = useOrders();
const { showToast } = useToast();

const customer = ref({
  name: '',
  phone: '',
  city: '',
  address: '',
  paymentMethod: 'الدفع عند الاستلام',
  notes: ''
});

const orderSuccess = ref(false);
const createdOrderRef = ref('');

const whatsAppUrlWithCustomer = computed(() => {
  return getWhatsAppOrderUrl(customer.value) || '#';
});

const successWhatsAppUrl = computed(() => {
  return getWhatsAppOrderUrl(customer.value) || '#';
});

function recordOrderBeforeWhatsApp() {
  handleSubmit(false);
}

function handleSubmit(shouldShowSuccessScreen = true) {
  if (cartItems.value.length === 0) {
    showToast('سلة المشتريات فارغة');
    return;
  }

  const newOrder = createOrder({
    customer: { ...customer.value },
    items: [...cartItems.value],
    summary: {
      subtotal: subtotal.value,
      discount: discountAmount.value,
      shipping: shippingFee.value,
      total: total.value
    }
  });

  createdOrderRef.value = newOrder.id;
  clearCart();

  if (shouldShowSuccessScreen) {
    orderSuccess.value = true;
  }
  showToast(`تم تأكيد الطلب بنجاح: #${newOrder.id}`);
}

function handleClose() {
  orderSuccess.value = false;
  emit('close');
}
</script>
