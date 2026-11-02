<template>
  <header class="sticky top-0 z-40 transition-all duration-300">
    <!-- شريط الإعلانات الترويجي العلوي -->
    <div class="relative z-50 border-b border-white/[0.08] bg-[#0c080d]/80 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-md">
      <div class="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2 mx-auto sm:mx-0">
          <span class="inline-flex items-center rounded-full bg-gold-500/20 px-2 py-0.5 text-[10px] font-black uppercase text-gold-400 ring-1 ring-gold-500/40">
            SPECIAL OFFER
          </span>
          <span class="text-white/80">شحن مجاني للطلبات فوق 100 ألف ج + خصم 10% بكود:</span>
          <button
            type="button"
            class="group inline-flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 font-mono text-[11px] font-bold text-gold-400 hover:bg-gold-500 hover:text-black transition cursor-pointer"
            title="انقر للنسخ"
            @click="copyPromoCode"
          >
            <span>JAMAL10</span>
            <Tag class="size-3" />
          </button>
        </div>

        <!-- العملة وخدمة العملاء -->
        <div class="flex items-center gap-4 mx-auto sm:mx-0">
          <div class="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 text-[11px]">
            <span class="text-white/50">العملة:</span>
            <select
              :value="currentCode"
              aria-label="اختر العملة"
              class="bg-transparent text-xs font-bold text-gold-400 focus:outline-none cursor-pointer"
              @change="onCurrencyChange"
            >
              <option value="SDG" class="bg-[#08080c] text-white">ج.س (سوداني)</option>
              <option value="SAR" class="bg-[#08080c] text-white">ر.س (سعودي)</option>
              <option value="AED" class="bg-[#08080c] text-white">د.إ (إماراتي)</option>
              <option value="USD" class="bg-[#08080c] text-white">$ (USD)</option>
            </select>
          </div>
          <div class="hidden items-center gap-3 text-white/50 md:flex">
            <span class="h-3 w-px bg-white/10"></span>
            <a href="https://wa.me/249912345678" target="_blank" class="flex items-center gap-1.5 text-emerald-400 hover:underline">
              <MessageCircle class="size-3.5" />واتساب: 0912345678
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- الهيدر العائم الفاخر (Floating Pill Header Navbar) -->
    <div class="relative mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12 py-3">
      <!-- الشعار الجانبي -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          aria-label="فتح القائمة"
          class="flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:text-white md:hidden cursor-pointer"
          @click="mobileMenuOpen = true"
        >
          <Menu class="size-5" />
        </button>
        <a href="#" class="group flex items-center gap-2">
          <div class="grid size-9 place-items-center rounded-xl bg-linear-to-br from-gold-400 to-gold-600 text-black shadow-[0_0_20px_rgba(211,169,76,0.35)] transition-transform group-hover:scale-105">
            <Shirt class="size-5 stroke-[2.2]" />
          </div>
          <div class="flex flex-col">
            <span class="font-display text-xl uppercase tracking-wider text-white group-hover:text-gold-400 transition-colors">BEN JAMAL</span>
            <span class="text-[9px] font-bold tracking-widest text-gold-400 -mt-1">بن جمال للأزياء</span>
          </div>
        </a>
      </div>

      <!-- الكبسولة العائمة للتنقل في المنتصف (HEEMS Centered Floating Pill) -->
      <div class="hidden md:flex items-center justify-center pointer-events-auto">
        <div class="floating-pill-nav flex items-center gap-1 px-2 py-1.5 rounded-full">
          <a href="#hero" class="px-5 py-2 rounded-full text-xs font-bold transition-all text-white bg-white/[0.12] hover:bg-white/20">الرئيسية</a>
          <a href="#new-arrivals" class="px-5 py-2 rounded-full text-xs font-semibold transition-all text-white/70 hover:text-white hover:bg-white/[0.06]">وصل حديثاً</a>
          <a href="#premium-collection" class="px-5 py-2 rounded-full text-xs font-semibold transition-all text-white/70 hover:text-white hover:bg-white/[0.06]">التشكيلة الملكية</a>
          <a href="#catalog" class="px-5 py-2 rounded-full text-xs font-semibold transition-all text-white/70 hover:text-white hover:bg-white/[0.06]">المتجر الكامل</a>
          <button
            type="button"
            class="px-5 py-2 rounded-full text-xs font-semibold transition-all text-white/70 hover:text-white hover:bg-white/[0.06] cursor-pointer"
            @click="$emit('open-size-guide')"
          >
            المقاسات
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-full text-xs font-semibold transition-all text-gold-400 hover:text-gold-300 hover:bg-gold-400/10 flex items-center gap-1 cursor-pointer"
            @click="$emit('open-orders')"
          >
            <ClipboardList class="size-3.5" />
            طلباتي
          </button>
        </div>
      </div>

      <!-- أزرار الإجراء السريع (بحث، مفضلة، سلة، زر Explore) -->
      <div class="flex items-center gap-2.5">
        <button
          type="button"
          aria-label="بحث"
          class="flex size-10 items-center justify-center rounded-full text-white/60 hover:text-gold-400 transition-colors cursor-pointer"
          @click="toggleSearch"
        >
          <Search class="size-5" />
        </button>

        <button
          type="button"
          aria-label="المفضلة"
          class="relative flex size-10 items-center justify-center rounded-full text-white/60 hover:text-rose-400 transition-colors cursor-pointer"
          @click="$emit('open-wishlist')"
        >
          <Heart class="size-5" />
          <span
            v-if="wishlist.length > 0"
            class="absolute -top-1 -end-1 grid size-4.5 place-items-center rounded-full bg-rose-500 text-[10px] font-black text-white"
          >
            {{ wishlist.length }}
          </span>
        </button>

        <button
          type="button"
          aria-label="سلة المشتريات"
          class="relative flex size-10 items-center justify-center rounded-full text-white/70 hover:text-gold-400 transition-colors cursor-pointer"
          @click="$emit('open-cart')"
        >
          <ShoppingBag class="size-5" />
          <span
            v-if="totalCount > 0"
            class="absolute -top-1 -end-1 grid size-4.5 place-items-center rounded-full bg-gold-400 text-[10px] font-black text-black"
          >
            {{ totalCount }}
          </span>
        </button>

        <a
          href="#catalog"
          class="hidden sm:flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-black text-black transition-all hover:bg-gold-400 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          <span>استكشف المجموعة</span>
        </a>
      </div>
    </div>

    <!-- شريط البحث المنسدل -->
    <div v-show="searchOpen" class="border-b border-white/10 bg-[#0c080d]/95 px-5 py-4 backdrop-blur-lg">
      <div class="mx-auto flex max-w-2xl items-center gap-2">
        <div class="relative flex-1">
          <Search class="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
          <input
            ref="searchInputRef"
            :value="searchQuery"
            type="search"
            placeholder="ابحث عن قميص، لون، مقاس (مثل: كحلي، زمردي، كاروهات، XL)..."
            class="w-full rounded-full border border-white/15 bg-white/5 py-2.5 ps-10 pe-10 text-xs text-white placeholder-white/40 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
            @input="$emit('update:searchQuery', $event.target.value)"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="absolute end-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white cursor-pointer"
            @click="$emit('update:searchQuery', '')"
          >
            <X class="size-4" />
          </button>
        </div>
        <button
          type="button"
          class="text-xs font-bold text-white/60 hover:text-white cursor-pointer"
          @click="closeSearch"
        >
          إغلاق
        </button>
      </div>
    </div>

    <!-- القائمة الجانبية للشاشات الصغيرة (Mobile Drawer) -->
    <div v-if="mobileMenuOpen" class="fixed inset-0 z-50">
      <div class="fixed inset-0 bg-black/80 backdrop-blur-sm" @click="mobileMenuOpen = false"></div>
      <aside class="fixed inset-y-0 start-0 z-50 w-full max-w-xs bg-[#0b0b10] p-6 text-white border-e border-white/10 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between pb-6 border-b border-white/10">
            <div class="flex items-center gap-2">
              <div class="grid size-8 place-items-center rounded-lg bg-gold-400 text-black font-black">
                <Shirt class="size-4.5" />
              </div>
              <span class="font-display text-xl uppercase text-white">BEN JAMAL</span>
            </div>
            <button
              type="button"
              class="grid size-8 place-items-center rounded-full bg-white/10 text-white/70 hover:text-white cursor-pointer"
              @click="mobileMenuOpen = false"
            >
              <X class="size-4" />
            </button>
          </div>
          <nav class="mt-8">
            <ul class="space-y-4 text-base font-bold text-white/70">
              <li>
                <a href="#hero" class="block rounded-xl px-4 py-2.5 hover:bg-white/10 hover:text-white" @click="mobileMenuOpen = false">الرئيسية</a>
              </li>
              <li>
                <a href="#new-arrivals" class="block rounded-xl px-4 py-2.5 hover:bg-white/10 hover:text-white" @click="mobileMenuOpen = false">وصل حديثاً</a>
              </li>
              <li>
                <a href="#premium-collection" class="block rounded-xl px-4 py-2.5 hover:bg-white/10 hover:text-white" @click="mobileMenuOpen = false">التشكيلة الملكية</a>
              </li>
              <li>
                <a href="#catalog" class="block rounded-xl px-4 py-2.5 hover:bg-white/10 hover:text-white" @click="mobileMenuOpen = false">جميع المنتجات</a>
              </li>
              <li>
                <button
                  type="button"
                  class="w-full text-start rounded-xl px-4 py-2.5 hover:bg-white/10 hover:text-white cursor-pointer"
                  @click="mobileMenuOpen = false; $emit('open-size-guide')"
                >
                  دليل المقاسات
                </button>
              </li>
              <li>
                <button
                  type="button"
                  class="w-full text-start rounded-xl px-4 py-2.5 bg-gold-500/10 text-gold-400 cursor-pointer"
                  @click="mobileMenuOpen = false; $emit('open-orders')"
                >
                  سجل الطلبات للإدارة
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div class="pt-6 border-t border-white/10 space-y-3">
          <a
            href="https://wa.me/249912345678"
            target="_blank"
            class="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition shadow-lg"
          >
            <MessageCircle class="size-4" />
            تواصل مباشر عبر واتساب
          </a>
        </div>
      </aside>
    </div>
  </header>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import {
  Menu,
  Shirt,
  Search,
  Heart,
  ShoppingBag,
  X,
  Tag,
  MessageCircle,
  ClipboardList
} from 'lucide-vue-next';
import { useCurrency } from '../composables/useCurrency.js';
import { useCart } from '../composables/useCart.js';
import { useWishlist } from '../composables/useWishlist.js';
import { useToast } from '../composables/useToast.js';

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
});

const emit = defineEmits([
  'update:searchQuery',
  'open-cart',
  'open-wishlist',
  'open-orders',
  'open-size-guide'
]);

const { currentCode, setCurrency, currentCurrency } = useCurrency();
const { totalCount } = useCart();
const { wishlist } = useWishlist();
const { showToast } = useToast();

const searchOpen = ref(false);
const searchInputRef = ref(null);
const mobileMenuOpen = ref(false);

function toggleSearch() {
  searchOpen.value = !searchOpen.value;
  if (searchOpen.value) {
    nextTick(() => {
      searchInputRef.value?.focus();
    });
  }
}

function closeSearch() {
  searchOpen.value = false;
  emit('update:searchQuery', '');
}

function onCurrencyChange(event) {
  setCurrency(event.target.value);
  showToast(`تم التغيير إلى: ${currentCurrency.value.label}`);
}

function copyPromoCode() {
  navigator.clipboard?.writeText('JAMAL10');
  showToast('تم نسخ كود الخصم: JAMAL10');
}
</script>
