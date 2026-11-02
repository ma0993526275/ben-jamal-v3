import { ref, computed } from 'vue';

const STORAGE_KEY = 'ben_jamal_cart_v1';
const COUPON_KEY = 'ben_jamal_applied_coupon';
export const FREE_SHIPPING_THRESHOLD = 100000;
export const STANDARD_SHIPPING_FEE = 5000;
export const STORE_PHONE = '+249912345678';

export const VALID_COUPONS = {
    'JAMAL10': { discountPercent: 10, description: 'خصم 10% على إجمالي الطلب' },
    'BEN20': { discountPercent: 20, minSubtotal: 100000, description: 'خصم 20% للطلبات فوق 100 ألف ج' },
    'FREE': { freeShipping: true, description: 'شحن مجاني لكافة المناطق' },
};

function getStoredCart() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {}
}

function getStoredCoupon() {
    try {
        return localStorage.getItem(COUPON_KEY) || null;
    } catch (e) {
        return null;
    }
}

const cartItems = ref(getStoredCart());
const appliedCouponCode = ref(getStoredCoupon());

export function useCart() {
    const totalCount = computed(() => {
        return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
    });

    const subtotal = computed(() => {
        return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    });

    const appliedCoupon = computed(() => {
        if (!appliedCouponCode.value) return null;
        const coupon = VALID_COUPONS[appliedCouponCode.value];
        return coupon ? { code: appliedCouponCode.value, ...coupon } : null;
    });

    const discountAmount = computed(() => {
        if (!appliedCoupon.value || !appliedCoupon.value.discountPercent) return 0;
        return Math.round(subtotal.value * (appliedCoupon.value.discountPercent / 100));
    });

    const freeShippingCoupon = computed(() => {
        return Boolean(appliedCoupon.value && appliedCoupon.value.freeShipping);
    });

    const eligibleForFreeShipping = computed(() => {
        return subtotal.value >= FREE_SHIPPING_THRESHOLD || freeShippingCoupon.value;
    });

    const shippingFee = computed(() => {
        if (cartItems.value.length === 0 || eligibleForFreeShipping.value) return 0;
        return STANDARD_SHIPPING_FEE;
    });

    const total = computed(() => {
        return Math.max(0, subtotal.value - discountAmount.value + shippingFee.value);
    });

    const progressToFreeShipping = computed(() => {
        return Math.min(100, Math.round((subtotal.value / FREE_SHIPPING_THRESHOLD) * 100));
    });

    const remainingForFreeShipping = computed(() => {
        return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal.value);
    });

    function addToCart(product, size, color, quantity = 1) {
        if (!product || !size) return false;

        const itemKey = `${product.id}__${size}__${color?.name || 'default'}`;
        const existingIndex = cartItems.value.findIndex(item => item.itemKey === itemKey);

        if (existingIndex > -1) {
            cartItems.value[existingIndex].quantity += quantity;
        } else {
            cartItems.value.push({
                itemKey,
                productId: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.image,
                size: size,
                color: color || { name: 'افتراضي', hex: '#1a2c4d' },
                quantity: quantity,
                addedAt: Date.now()
            });
        }

        saveCart(cartItems.value);
        return true;
    }

    function updateQuantity(itemKey, delta) {
        const index = cartItems.value.findIndex(item => item.itemKey === itemKey);
        if (index === -1) return;

        cartItems.value[index].quantity += delta;
        if (cartItems.value[index].quantity <= 0) {
            cartItems.value.splice(index, 1);
        }

        saveCart(cartItems.value);
    }

    function removeFromCart(itemKey) {
        cartItems.value = cartItems.value.filter(item => item.itemKey !== itemKey);
        saveCart(cartItems.value);
    }

    function clearCart() {
        cartItems.value = [];
        saveCart(cartItems.value);
    }

    function applyCoupon(code) {
        const cleanCode = (code || '').trim().toUpperCase();
        if (!cleanCode) return { success: false, message: 'يرجى إدخال كود الخصم' };

        const coupon = VALID_COUPONS[cleanCode];
        if (!coupon) {
            return { success: false, message: 'كود الخصم غير صحيح أو منتهي الصلاحية' };
        }

        if (coupon.minSubtotal && subtotal.value < coupon.minSubtotal) {
            return {
                success: false,
                message: `هذا الكوبون مخصص للطلبات التي تزيد عن ${coupon.minSubtotal.toLocaleString('ar-EG')} ج`
            };
        }

        appliedCouponCode.value = cleanCode;
        try { localStorage.setItem(COUPON_KEY, cleanCode); } catch (e) {}
        return { success: true, message: `تم تفعيل الكوبون: ${coupon.description}` };
    }

    function removeCoupon() {
        appliedCouponCode.value = null;
        try { localStorage.removeItem(COUPON_KEY); } catch (e) {}
    }

    function generateWhatsAppMessage(customer) {
        if (cartItems.value.length === 0) return null;

        let lines = [
            '✨ *طلب شراء جديد من متجر بن جمال للأزياء الرجالية* ✨',
            '---------------------------------------',
            '🛍️ *المنتجات المطلوبة:*'
        ];

        cartItems.value.forEach((item, index) => {
            lines.push(`${index + 1}. *${item.name}*`);
            lines.push(`   • المقاس: ${item.size} | اللون: ${item.color.name}`);
            lines.push(`   • الكمية: ${item.quantity} | السعر: ${(item.price * item.quantity).toLocaleString('ar-EG')} ج`);
        });

        lines.push('---------------------------------------');
        lines.push(`💰 المجموع الفرعي: ${subtotal.value.toLocaleString('ar-EG')} ج`);

        if (discountAmount.value > 0) {
            lines.push(`🎁 كود الخصم (${appliedCoupon.value.code}): -${discountAmount.value.toLocaleString('ar-EG')} ج`);
        }

        lines.push(`🚚 مصاريف الشحن: ${shippingFee.value === 0 ? 'مجاني 🎁' : `${shippingFee.value.toLocaleString('ar-EG')} ج`}`);
        lines.push(`💳 *الإجمالي النهائي المطلوب:* *${total.value.toLocaleString('ar-EG')} ج*`);
        lines.push('---------------------------------------');

        if (customer) {
            lines.push('👤 *بيانات العميل المستلم:*');
            lines.push(`• الاسم: ${customer.name || 'غير محدد'}`);
            lines.push(`• رقم الهاتف: ${customer.phone || 'غير محدد'}`);
            lines.push(`• المدينة / المنطقة: ${customer.city || 'الخرطوم'}`);
            lines.push(`• العنوان التفصيلي: ${customer.address || 'العنوان المسجل'}`);
            if (customer.paymentMethod) {
                lines.push(`• طريقة الدفع: ${customer.paymentMethod}`);
            }
            if (customer.notes) {
                lines.push(`• ملاحظات التوصيل: ${customer.notes}`);
            }
            lines.push('---------------------------------------');
        }

        lines.push('🙏 برجاء تأكيد الطلب وتحديد أقرب موعد للتسليم. شكراً لكم!');

        return lines.join('\n');
    }

    function getWhatsAppOrderUrl(customer) {
        const message = generateWhatsAppMessage(customer);
        if (!message) return null;
        return `https://wa.me/249912345678?text=${encodeURIComponent(message)}`;
    }

    return {
        cartItems,
        totalCount,
        subtotal,
        discountAmount,
        shippingFee,
        eligibleForFreeShipping,
        total,
        progressToFreeShipping,
        remainingForFreeShipping,
        appliedCoupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        generateWhatsAppMessage,
        getWhatsAppOrderUrl,
        FREE_SHIPPING_THRESHOLD,
        STANDARD_SHIPPING_FEE
    };
}
