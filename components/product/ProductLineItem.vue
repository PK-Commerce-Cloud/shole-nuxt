<script setup lang="ts">
const { remove } = useBasket();
const { format } = useCurrency();
const props = defineProps({
  product: Object,
  productLineItem: Object,
});

const small = computed(
  () => (product) =>
    product?.imageGroups.find((i) => i.viewType === "small").images[0]
      .disBaseLink
);
</script>

<template>
  <div
    class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
  >
    <NuxtImg
      lazy
      :src="small(product)"
      class="h-full w-full object-cover object-center"
    />
  </div>

  <div class="ml-4 flex flex-1 flex-col">
    <div>
      <div class="flex justify-between text-base font-medium text-gray-900">
        <h3>
          <a>{{ product?.name }}</a>
        </h3>
        <p class="ml-4">{{ format(productLineItem?.price) }}</p>
      </div>
      <p class="mt-1 text-sm text-gray-500" v-if="product?.variationAttributes">
        {{ product?.variationAttributes[0].name }}:
        {{ product?.variationAttributes[0].values[0].name }}
      </p>
    </div>
    <div class="flex flex-1 items-end justify-between text-sm">
      <p class="text-gray-500">Qty {{ productLineItem?.quantity }}</p>

      <div class="flex">
        <button
          @click="remove(productLineItem?.itemId)"
          type="button"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>
