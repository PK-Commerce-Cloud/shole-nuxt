<script setup lang="ts">
import { useBasketStore } from "~/store/basket";

const { basket, products } = useBasketStore();

const fullProduct = computed(() => (productId) => {
  return products.value?.data.find((p) => p.id === productId);
});
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <div class="col-span-3">
      <ul class="space-y-4">
        <ClientOnly>
          <li v-for="product in basket?.productItems" :key="product.productId">
            <CartProduct :product="fullProduct(product.productId)" />
          </li>
        </ClientOnly>
      </ul>
    </div>
    <div>right</div>
  </div>
</template>
