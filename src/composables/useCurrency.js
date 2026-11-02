import { ref, computed } from 'vue';

export const CURRENCIES = {
    SDG: { code: 'SDG', symbol: 'ج.س', rate: 1, label: 'جنيه سوداني (SDG)', formatDigits: 0 },
    SAR: { code: 'SAR', symbol: 'ر.س', rate: 0.0013, label: 'ريال سعودي (SAR)', formatDigits: 1 },
    AED: { code: 'AED', symbol: 'د.إ', rate: 0.0013, label: 'درهم إماراتي (AED)', formatDigits: 1 },
    USD: { code: 'USD', symbol: '$', rate: 0.00035, label: 'دولار أمريكي (USD)', formatDigits: 2 }
};

const STORAGE_KEY = 'ben_jamal_active_currency';

function getStoredCurrency() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored && CURRENCIES[stored] ? stored : 'SDG';
    } catch (e) {
        return 'SDG';
    }
}

// Global shared state
const currentCode = ref(getStoredCurrency());

export function useCurrency() {
    const currentCurrency = computed(() => CURRENCIES[currentCode.value] || CURRENCIES.SDG);

    function setCurrency(code) {
        if (!CURRENCIES[code]) return;
        currentCode.value = code;
        try {
            localStorage.setItem(STORAGE_KEY, code);
        } catch (e) {}
    }

    function formatPrice(sdgAmount) {
        if (sdgAmount === undefined || sdgAmount === null) return '';
        const cur = currentCurrency.value;
        const converted = sdgAmount * cur.rate;

        if (cur.code === 'USD') {
            return `$${converted.toFixed(cur.formatDigits)}`;
        }

        if (cur.code === 'SDG') {
            return `${Math.round(converted).toLocaleString('ar-EG')} ${cur.symbol}`;
        }

        return `${converted.toFixed(cur.formatDigits)} ${cur.symbol}`;
    }

    return {
        currentCode,
        currentCurrency,
        setCurrency,
        formatPrice,
        CURRENCIES
    };
}
