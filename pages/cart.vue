<script setup lang="ts">
import { useBasketStore } from "~/store/basket";

const { basket, products } = useBasketStore();

const fullProduct = computed(() => (productId) => {
  return products.value?.data.find((p) => p.id === productId);
});
</script>

<template>
  <div>
    <Hero title="Your cart is empty." v-if="!basket.productItems">
      <template v-slot:subtitle>
        <p class="font-bold">
          Sign in to retrieve your saved items or continue shopping.
        </p>
      </template>
    </Hero>

    <div class="grid grid-cols-4 gap-4 my-4" v-else>
      <section class="col-span-3">
        <ul class="space-y-4">
          <li v-for="product in basket?.productItems" :key="product.productId">
            <ProductLineItem
              :product="fullProduct(product.productId)"
              :product-line-item="product"
            />
          </li>
        </ul>
      </section>
      <section>
        <article class="space-y-2">
          <h2 class="text-lg capitalize font-bold mb-2">Order Summary</h2>
          <h3 id="subtotal" class="font-bold flex justify-between">
            <label for="subtotal">Subtotal</label> ${{
              basket?.productSubTotal
            }}
          </h3>
          <h3 id="tax" class="flex justify-between">
            <label for="tax">Tax</label>
            ${{ basket?.adjustedMerchandizeTotalTax }}
          </h3>
          <hr />
          <h3 id="total" class="font-bold flex justify-between">
            <label for="total">Estimated Total</label>
            ${{ basket?.productTotal }}
          </h3>
          <footer class="py-8">
            <button
              class="w-full bg-blue-500 text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Proceed to Checkout
            </button>
          </footer>
        </article>
      </section>
    </div>
  </div>
</template>
