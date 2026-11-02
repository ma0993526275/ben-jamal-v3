<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-hidden">
    <div class="fixed inset-0 bg-black/85 backdrop-blur-xs" @click="$emit('close')"></div>

    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-[#120a10] border border-white/10 text-white shadow-2xl animate-pop-up max-h-[90vh] flex flex-col">
        <!-- ترويسة اللوحة -->
        <div class="flex items-center justify-between border-b border-white/10 bg-[#08080c] p-5">
          <div class="flex items-center gap-2">
            <ClipboardList class="size-5 text-gold-400" />
            <h3 class="font-extrabold text-base">سجل وإدارة طلبات المتجر</h3>
            <span class="rounded-full bg-gold-400 px-2 py-0.5 text-xs font-black text-black">
              {{ orders.length }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition cursor-pointer"
              @click="handleExportCSV"
            >
              <Download class="size-3.5" />
              تصدير Excel/CSV
            </button>
            <button
              type="button"
              class="grid size-8 place-items-center rounded-full bg-white/10 text-white/70 hover:text-white cursor-pointer"
              @click="$emit('close')"
            >
              <X class="size-4" />
            </button>
          </div>
        </div>

        <!-- شريط البحث ومسح الطلبات -->
        <div class="p-4 border-b border-white/10 bg-black/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <input
            v-model="searchQuery"
            type="search"
            placeholder="بحث برقم الطلب، اسم العميل، الهاتف، أو المدينة..."
            class="flex-1 min-w-[200px] rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none"
          />
          <button
            type="button"
            class="text-rose-400 font-bold hover:underline cursor-pointer"
            @click="handleClearAll"
          >
            مسح الطلبات التجريبية
          </button>
        </div>

        <!-- جدول الطلبات -->
        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="filteredOrders.length > 0" class="overflow-x-auto rounded-2xl border border-white/10">
            <table class="w-full text-start text-xs">
              <thead class="bg-black/60 text-gold-400 font-bold border-b border-white/10">
                <tr>
                  <th class="p-3">رقم الطلب</th>
                  <th class="p-3">العميل والهاتف</th>
                  <th class="p-3">المدينة والعنوان</th>
                  <th class="p-3">المنتجات</th>
                  <th class="p-3">الإجمالي والدفع</th>
                  <th class="p-3">الحالة</th>
                  <th class="p-3 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/10 text-white/80">
                <tr
                  v-for="order in filteredOrders"
                  :key="order.id"
                  class="hover:bg-white/5 transition border-b border-white/5"
                >
                  <td class="p-3 font-mono font-bold text-gold-400">{{ order.id }}</td>
                  <td class="p-3">
                    <div class="font-bold text-white">{{ order.customer.name }}</div>
                    <div class="font-mono text-white/50 text-[11px]">{{ order.customer.phone }}</div>
                  </td>
                  <td class="p-3">
                    <div>{{ order.customer.city }}</div>
                    <div class="text-[11px] text-white/50 truncate max-w-[150px]">{{ order.customer.address }}</div>
                  </td>
                  <td class="p-3">
                    <span class="font-bold text-white/80">{{ order.items.length }} قطع</span>
                  </td>
                  <td class="p-3">
                    <div class="font-bold text-gold-400 font-mono">{{ formatPrice(order.summary.total) }}</div>
                    <div class="text-[10px] text-white/50">{{ order.customer.paymentMethod }}</div>
                  </td>
                  <td class="p-3">
                    <select
                      :value="order.status"
                      class="rounded-lg border border-white/15 bg-black/60 px-2 py-1 text-[11px] font-bold text-white cursor-pointer"
                      @change="handleStatusChange(order.id, $event.target.value)"
                    >
                      <option value="جديد (قيد المراجعة)" class="bg-[#0b0b10]">جديد</option>
                      <option value="تم الشحن والتسليم للمندوب" class="bg-[#0b0b10]">تم الشحن</option>
                      <option value="مكتمل ومستلم" class="bg-[#0b0b10]">مكتمل</option>
                      <option value="ملغي" class="bg-[#0b0b10]">ملغي</option>
                    </select>
                  </td>
                  <td class="p-3 text-center">
                    <button
                      type="button"
                      class="text-white/40 hover:text-rose-400 transition cursor-pointer"
                      title="حذف الطلب"
                      @click="handleDeleteOrder(order.id)"
                    >
                      <Trash2 class="size-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="p-12 text-center text-white/40 text-xs">
            لا توجد طلبات مطابقة حتى الآن.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ClipboardList, Download, X, Trash2 } from 'lucide-vue-next';
import { useOrders } from '../composables/useOrders.js';
import { useCurrency } from '../composables/useCurrency.js';
import { useToast } from '../composables/useToast.js';

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

defineEmits(['close']);

const { orders, updateOrderStatus, deleteOrder, clearAllOrders, exportOrdersToCSV } = useOrders();
const { formatPrice } = useCurrency();
const { showToast } = useToast();

const searchQuery = ref('');

const filteredOrders = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return orders.value;

  return orders.value.filter(o => {
    return (
      o.id.toLowerCase().includes(query) ||
      o.customer.name.toLowerCase().includes(query) ||
      o.customer.phone.toLowerCase().includes(query) ||
      o.customer.city.toLowerCase().includes(query)
    );
  });
});

function handleStatusChange(orderId, newStatus) {
  updateOrderStatus(orderId, newStatus);
  showToast(`تم تحديث حالة الطلب ${orderId}`);
}

function handleDeleteOrder(orderId) {
  deleteOrder(orderId);
  showToast(`تم حذف الطلب ${orderId}`);
}

function handleClearAll() {
  if (confirm('هل أنت متأكد من رغبتك في مسح كافة الطلبات؟')) {
    clearAllOrders();
    showToast('تم مسح سجل الطلبات');
  }
}

function handleExportCSV() {
  const url = exportOrdersToCSV();
  if (url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ben-Jamal-Orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('تم تصدير ملف الطلبات بنجاح!');
  } else {
    showToast('لا توجد طلبات لتصديرها');
  }
}
</script>
