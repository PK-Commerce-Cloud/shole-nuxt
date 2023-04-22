<script setup lang="ts">
import products from "~/server/api/products";

const props = defineProps({
  product: Object,
});

const { addItem } = useBasket();
</script>

<template>
  <div class="group relative bg-white">
    <div
      class="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
    >
      <NuxtLink :to="`/product/${product?.productId}`">
        <NuxtImg
          :src="product?.image.disBaseLink || '/loading.svg'"
          :alt="product?.name"
          lazy
          class="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </NuxtLink>
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <a href="#">
            {{ product?.name }}
          </a>
        </h3>
        <p class="mt-1 text-sm text-gray-500">{{ product?.color }}</p>
      </div>
      <p class="text-sm font-medium text-gray-900">${{ product?.price }}</p>
    </div>
    <button v-on:click="addItem(product?.representedProduct.id)">
      add to cart
    </button>
  </div>
</template>
