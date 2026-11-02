import { ref } from 'vue';

const STORAGE_KEY = 'ben_jamal_wishlist_v1';

function getStoredWishlist() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveWishlist(items) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {}
}

const wishlist = ref(getStoredWishlist());

export function useWishlist() {
    function isInWishlist(productId) {
        return wishlist.value.includes(productId);
    }

    function toggleWishlist(productId) {
        if (!productId) return false;
        const index = wishlist.value.indexOf(productId);
        let added = false;
        if (index > -1) {
            wishlist.value.splice(index, 1);
            added = false;
        } else {
            wishlist.value.push(productId);
            added = true;
        }
        saveWishlist(wishlist.value);
        return added;
    }

    function removeFromWishlist(productId) {
        const index = wishlist.value.indexOf(productId);
        if (index > -1) {
            wishlist.value.splice(index, 1);
            saveWishlist(wishlist.value);
        }
    }

    return {
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist
    };
}
