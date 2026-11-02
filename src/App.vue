<template>
  <div class="min-h-screen bg-[#08080c] text-white font-[Cairo,sans-serif] antialiased selection:bg-gold-500 selection:text-black">
    <!-- الهيدر والنافبار -->
    <Navbar
      v-model:search-query="searchQuery"
      @open-cart="isCartOpen = true"
      @open-wishlist="isWishlistOpen = true"
      @open-orders="isOrdersOpen = true"
      @open-size-guide="isSizeGuideOpen = true"
    />

    <main>
      <!-- الهيرو الفاخر بنمط HEEMS -->
      <Hero />

      <!-- شريط الماركي الترويجي -->
      <Marquee />

      <!-- المعاينة ثلاثية الأبعاد -->
      <Showcase3D @open-quick-view="openQuickView" />

      <!-- السلايدر 1: وصل حديثاً -->
      <SnapCarousel
        id="new-arrivals"
        title="وصل حديثاً"
        english-title="NEW ARRIVALS"
        description="أحدث إصدارات الموسم وتصاميم البولو الحصرية المبتكرة بأرقى الخامات وأحدث درجات الألوان العالمية."
        :products="newArrivalsProducts"
        @open-quick-view="openQuickView"
        @open-cart="isCartOpen = true"
      />

      <!-- السلايدر 2: التشكيلة الملكية -->
      <SnapCarousel
        id="premium-collection"
        title="التشكيلة الملكية"
        english-title="SIGNATURE LINE"
        description="قمصان السادة الأكثر طلباً بخامات قطنية نقية 100% تجمع بين الراحة القصوى والفخامة الدائمة."
        :products="premiumProducts"
        @open-quick-view="openQuickView"
        @open-cart="isCartOpen = true"
      />

      <!-- السلايدر 3: المقلّم والكاروهات -->
      <SnapCarousel
        id="striped-checkered"
        title="المقلّم والكاروهات"
        english-title="PATTERNS & CHECKS"
        description="نقشات مميزة وتنسيقات كاجوال تضفي حيوية وأناقة شبابية عصرية لكل طلعة ومناسبة."
        :products="patternsProducts"
        @open-quick-view="openQuickView"
        @open-cart="isCartOpen = true"
      />

      <!-- المتجر الكامل بشبكة المنتجات وفلاتر البحث -->
      <CatalogGrid
        v-model:search-query="searchQuery"
        @open-quick-view="openQuickView"
        @open-cart="isCartOpen = true"
      />

      <!-- أركان التميز الأربعة -->
      <Features />

      <!-- آراء وتقييمات العملاء -->
      <Reviews />
    </main>

    <!-- الفوتر المقوس الفاخر -->
    <Footer
      @open-size-guide="isSizeGuideOpen = true"
      @open-orders="isOrdersOpen = true"
    />

    <!-- درج السلة المنزلق -->
    <CartDrawer
      :is-open="isCartOpen"
      @close="isCartOpen = false"
      @open-checkout="openCheckoutFromCart"
    />

    <!-- نافذة المعاينة السريعة -->
    <QuickViewModal
      :is-open="isQuickViewOpen"
      :product-id="selectedProductId"
      @close="isQuickViewOpen = false"
      @open-size-guide="isSizeGuideOpen = true"
      @open-cart="isCartOpen = true"
    />

    <!-- نافذة دليل المقاسات -->
    <SizeGuideModal
      :is-open="isSizeGuideOpen"
      @close="isSizeGuideOpen = false"
    />

    <!-- نافذة تأكيد الطلب والدفع -->
    <CheckoutModal
      :is-open="isCheckoutOpen"
      @close="isCheckoutOpen = false"
    />

    <!-- لوحة إدارة الطلبات -->
    <OrdersModal
      :is-open="isOrdersOpen"
      @close="isOrdersOpen = false"
    />

    <!-- نافذة قائمة المفضلة -->
    <WishlistModal
      :is-open="isWishlistOpen"
      @close="isWishlistOpen = false"
      @open-cart="isCartOpen = true"
    />

    <!-- زر الواتساب العائم -->
    <FloatingWhatsApp />

    <!-- التنبيهات المنبثقة -->
    <Toast />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import Marquee from './components/Marquee.vue';
import Showcase3D from './components/Showcase3D.vue';
import SnapCarousel from './components/SnapCarousel.vue';
import CatalogGrid from './components/CatalogGrid.vue';
import Features from './components/Features.vue';
import Reviews from './components/Reviews.vue';
import Footer from './components/Footer.vue';
import CartDrawer from './components/CartDrawer.vue';
import QuickViewModal from './components/QuickViewModal.vue';
import SizeGuideModal from './components/SizeGuideModal.vue';
import CheckoutModal from './components/CheckoutModal.vue';
import OrdersModal from './components/OrdersModal.vue';
import WishlistModal from './components/WishlistModal.vue';
import FloatingWhatsApp from './components/FloatingWhatsApp.vue';
import Toast from './components/Toast.vue';

import { products } from './data/products.js';

const searchQuery = ref('');

// Modals visibility state
const isCartOpen = ref(false);
const isWishlistOpen = ref(false);
const isOrdersOpen = ref(false);
const isSizeGuideOpen = ref(false);
const isCheckoutOpen = ref(false);
const isQuickViewOpen = ref(false);
const selectedProductId = ref(null);

// Filtered product collections for carousels
const newArrivalsProducts = computed(() => {
  return products.filter(p => p.isNew || p.collection === 'new-arrivals');
});

const premiumProducts = computed(() => {
  return products.filter(p => p.price >= 50000 || p.category === 'sada');
});

const patternsProducts = computed(() => {
  return products.filter(p => p.category === 'mogalam' || p.category === 'karuhat');
});

function openQuickView(productId) {
  selectedProductId.value = productId;
  isQuickViewOpen.value = true;
}

function openCheckoutFromCart() {
  isCartOpen.value = false;
  isCheckoutOpen.value = true;
}
</script>
