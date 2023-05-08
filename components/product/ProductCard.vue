<script setup lang="ts">
const props = defineProps({
  product: Object,
  showActions: Boolean,
});

const localePath = useLocalePath();

const { addItem } = useBasket();
</script>

<template>
  <div class="group relative bg-white">
    <div
      class="min-h-80 aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80"
    >
      <NuxtLink :to="localePath(`/product/${product?.productId}`)">
        <NuxtImg
          :src="product?.image.disBaseLink || '/loading.svg'"
          :alt="product?.name"
          lazy
        />
      </NuxtLink>
      <div
        v-if="showActions"
        class="absolute -bottom-full flex w-3/4 justify-around duration-300 ease-in-out group-hover:bottom-4"
      >
        <button
          class="rounded bg-blue-50 p-2 uppercase text-gray-800 shadow-sm"
        >
          View Product
        </button>
        <button
          class="rounded bg-green-400 p-2 uppercase text-green-950 shadow-sm"
          @click="addItem(product.representedProduct.id)"
        >
          add to cart
        </button>
      </div>
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <a href="#">
            {{ product?.productName }}
          </a>
        </h3>
        <p
          class="mt-1 text-sm text-gray-500"
          v-if="product?.variationAttributes"
        >
          {{ product?.variationAttributes[0].name }}:
          {{ product?.variationAttributes[0].values[0].name }}
        </p>
      </div>
      <p class="text-sm font-medium text-gray-900">${{ product?.price }}</p>
    </div>
  </div>
</template>
