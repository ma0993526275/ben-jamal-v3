import { ref } from 'vue';

const STORAGE_KEY = 'ben_jamal_orders_v1';

function getStoredOrders() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveOrders(orders) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
        console.error(e);
    }
}

const ordersState = ref(getStoredOrders());

export function useOrders() {
    function createOrder(orderData) {
        const newOrder = {
            id: orderData.id || `BJ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
            createdAt: new Date().toISOString(),
            customer: orderData.customer,
            items: orderData.items,
            summary: orderData.summary,
            status: 'جديد (قيد المراجعة)',
            paymentStatus: orderData.customer.paymentMethod.includes('بنكك') ? 'بانتظار التحويل' : 'دفع عند الاستلام'
        };

        ordersState.value.unshift(newOrder);
        saveOrders(ordersState.value);
        return newOrder;
    }

    function updateOrderStatus(orderId, newStatus) {
        const order = ordersState.value.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            saveOrders(ordersState.value);
        }
    }

    function deleteOrder(orderId) {
        ordersState.value = ordersState.value.filter(o => o.id !== orderId);
        saveOrders(ordersState.value);
    }

    function clearAllOrders() {
        ordersState.value = [];
        saveOrders(ordersState.value);
    }

    function exportOrdersToCSV() {
        if (ordersState.value.length === 0) return null;

        const headers = ['رقم الطلب', 'تاريخ الطلب', 'الاسم', 'الهاتف', 'المدينة', 'العنوان', 'طريقة الدفع', 'الإجمالي (ج)', 'الحالة'];
        const rows = ordersState.value.map(o => [
            o.id,
            new Date(o.createdAt).toLocaleDateString('ar-EG'),
            `"${o.customer.name}"`,
            `"${o.customer.phone}"`,
            `"${o.customer.city}"`,
            `"${o.customer.address}"`,
            `"${o.customer.paymentMethod}"`,
            o.summary.total,
            `"${o.status}"`
        ]);

        const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        return URL.createObjectURL(blob);
    }

    return {
        orders: ordersState,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        clearAllOrders,
        exportOrdersToCSV
    };
}
