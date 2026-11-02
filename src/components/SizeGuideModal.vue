<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-hidden">
    <div class="fixed inset-0 bg-black/85 backdrop-blur-xs" @click="$emit('close')"></div>

    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-[#120a10] border border-white/10 p-6 text-white shadow-2xl animate-pop-up max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-4 border-b border-white/10">
          <div class="flex items-center gap-2">
            <div class="grid size-8 place-items-center rounded-lg bg-gold-400 text-black font-bold">
              <Ruler class="size-5" />
            </div>
            <h3 class="text-lg font-black text-white">دليل مقاسات قمصان بن جمال</h3>
          </div>
          <button
            type="button"
            class="grid size-8 place-items-center rounded-full bg-white/10 text-white/70 hover:text-white cursor-pointer"
            @click="$emit('close')"
          >
            <X class="size-4" />
          </button>
        </div>

        <p class="text-xs text-white/60 mt-4 leading-relaxed">
          جميع القياسات أدناه بالسنتيمتر مأخوذة بدقة. إذا كان قياسك بين مقاسين، ننصح باختيار المقاس الأكبر.
        </p>

        <div class="mt-4 overflow-x-auto rounded-2xl border border-white/10">
          <table class="w-full text-center text-xs">
            <thead class="bg-black/60 text-gold-400 font-bold border-b border-white/10">
              <tr>
                <th class="p-3">المقاس</th>
                <th class="p-3">محيط الصدر</th>
                <th class="p-3">طول القميص</th>
                <th class="p-3">عرض الكتف</th>
                <th class="p-3">الوزن التقريبي</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/10 font-bold text-white/80">
              <tr
                v-for="row in sizeGuideData"
                :key="row.size"
                class="hover:bg-white/5 transition"
              >
                <td class="p-3 font-black text-gold-400">{{ row.size }}</td>
                <td class="p-3">{{ row.chest }}</td>
                <td class="p-3">{{ row.length }}</td>
                <td class="p-3">{{ row.shoulder }}</td>
                <td class="p-3 text-white/70">{{ row.weight }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-5 rounded-2xl bg-gold-500/10 p-4 border border-gold-500/20 text-xs text-white/80 flex items-start gap-3">
          <ShieldCheck class="size-5 text-gold-400 shrink-0 mt-0.5" />
          <div>
            <strong class="font-black text-gold-400">ضمان المقاس الذهبي:</strong>
            <p class="mt-0.5 text-white/60">
              إذا لم يناسبك المقاس بعد استلام القميص، نقوم بتبديله مجاناً وبدون أي تعقيد.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Ruler, X, ShieldCheck } from 'lucide-vue-next';
import { sizeGuideData } from '../data/products.js';

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

defineEmits(['close']);
</script>
