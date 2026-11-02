# بن جمال للأزياء الرجالية الفاخرة | BEN JAMAL Luxury Store (Vue 3)

متجر إلكتروني متكامل وعصري للقمصان والأزياء الرجالية الفاخرة مبني باستخدام **Vue 3 (Composition API)** و **Vite** و **Tailwind CSS v4**، بتصميم مستوحى من علامة الأزياء العالمية **HEEMS** (Dark Luxury Minimal Aesthetic).

---

## ✨ المميزات الرئيسية للمشروع

1. **تصميم HEEMS الفاخر (Dark Luxury)**:
   - علامة مائية ضخمة في البانر الرئيسي بنمط Street Luxury (`BEN JAMAL`).
   - بطاقة ثلاثية الأبعاد مائلة (`3D Perspective Showcase`) مع تأثير hover مميز.
   - شرائط تمرير أفقية مع شريط جانبي ثابت (`Sticky Sidebar`) وأزرار تنقل دائرية.
   - تأثير تبديل الصورة المزدوج عند التمرير (`Dual Image Hover Flip`).
   - شريط إعلاني متحرك لا نهائي (`Infinite Continuous Marquee Ticker`).

2. **سلة مشتريات وتجربة شراء متطورة (E-Commerce)**:
   - سلة مشتريات تفاعلية منزلقة (`Cart Drawer`).
   - دعم كامل لنظام الكوبونات والخصومات التلقائية (`JAMAL10`, `BEN20`, `FREE`).
   - شريط تقدم للشحن المجاني للطلبات فوق 100,000 ج.س.
   - إتمام سريع للطلب عبر نافذة منبثقة مع إنشاء رقم مرجعي فريد لكل طلب (`#BJ-2026-XXXX`).
   - توليد رسالة طلب احترافية ومفصلة بنقرة واحدة عبر **WhatsApp API**.

3. **تعدد العملات الذكي (Multi-Currency)**:
   - دعم التبديل التلقائي والفوري بين:
     - الجنيه السوداني (`SDG`)
     - الريال السعودي (`SAR`)
     - الدرهم الإماراتي (`AED`)
     - الدولار الأمريكي (`USD`)
   - حفظ العملة المختارة تلقائياً في `LocalStorage`.

4. **لوحة إدارة الطلبات والمفضلة**:
   - لوحة إدارة متكاملة لمراجعة الطلبات والبحث وتحديث الحالات.
   - تصدير سجل الطلبات إلى ملف `CSV / Excel` بنقرة واحدة.
   - قائمة المفضلة (`Wishlist`) مع شارة تنبيهات فورية في الهيدر.

5. **دليل المقاسات وضمان الجودة**:
   - جدول قياسات دقيق بالسنتيمتر لجميع مقاسات القمصان (M حتى 3XL).
   - توضيح أوزان وأطوال القياسات المناسبة.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API with `<script setup>`)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide Vue Next](https://lucide.dev/)
- **Typography**: Anton, Cairo, Playfair Display (Google Fonts)

---

## 🚀 كيفية تشغيل المشروع محلياً (Quick Start)

### 1. تثبيت الحزم (إذا لزم الأمر):
```bash
npm install
```

### 2. تشغيل السيرفر المحلي للتطوير:
```bash
npm run dev
```
افتح المتصفح على الرابط: `http://localhost:5173/`

### 3. بناء النسخة الإنتاجية (Production Build):
```bash
npm run build
```
سيتم إنشاء ملفات الويب الجاهزة للنشر داخل مجلد `dist/`.

---

## 🌐 رفع المشروع على GitHub (GitHub Upload)

يمكنك رفع المشروع بسهولة إلى حسابك في GitHub عبر الأوامر التالية:

1. أنشئ مستودعاً جديداً (New Repository) فارغاً على موقع GitHub باسم `ben-jamal-vue`.
2. داخل مجلد المشروع، نفذ الأوامر التالية في الطرفية (Terminal):

```bash
git init -b main
git add .
git commit -m "Initial commit: Ben Jamal Vue 3 luxury store"
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/ben-jamal-vue.git
git push -u origin main
```

*(استبدل `<YOUR_GITHUB_USERNAME>` باسم المستخدم الخاص بك في GitHub)*.

---

## 📁 هيكلية المجلدات (Folder Structure)

```
ben-jamal-vue/
├── public/
│   └── manifest.json         # ملف الـ PWA
├── src/
│   ├── assets/               # الأيقونات والأصول
│   ├── components/           # مكونات Vue 3 المنفصلة
│   │   ├── Navbar.vue
│   │   ├── Hero.vue
│   │   ├── Marquee.vue
│   │   ├── Showcase3D.vue
│   │   ├── ProductCard.vue
│   │   ├── SnapCarousel.vue
│   │   ├── CatalogGrid.vue
│   │   ├── Features.vue
│   │   ├── Reviews.vue
│   │   ├── Footer.vue
│   │   ├── CartDrawer.vue
│   │   ├── QuickViewModal.vue
│   │   ├── SizeGuideModal.vue
│   │   ├── CheckoutModal.vue
│   │   ├── OrdersModal.vue
│   │   ├── WishlistModal.vue
│   │   ├── FloatingWhatsApp.vue
│   │   └── Toast.vue
│   ├── composables/          # دوال الحالة التفاعلية
│   │   ├── useCart.js
│   │   ├── useCurrency.js
│   │   ├── useWishlist.js
│   │   ├── useOrders.js
│   │   └── useToast.js
│   ├── data/
│   │   └── products.js       # كتالوج المنتجات والتقييمات والمقاسات
│   ├── images/               # صور القمصان عالية الدقة
│   ├── App.vue               # المكون الرئيسي
│   ├── main.js               # مدخل التطبيق
│   └── style.css             # ملف أنماط Tailwind والتأثيرات
├── index.html
├── package.json
└── vite.config.js
```

---
© 2026 متجر بن جمال للأزياء الرجالية.
