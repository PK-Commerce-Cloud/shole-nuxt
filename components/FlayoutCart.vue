<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";

const { toggle, showBasket, basket, products } = useBasket();

const fullProduct = computed(() => (productId) => {
  return products.value?.data?.find((p) => p.id === productId);
});
</script>

<template>
  <div>
    <HlTransitionRoot as="template" :show="showBasket">
      <HlDialog as="div" class="relative z-10" @close="toggle()">
        <HlTransitionChild
          as="template"
          enter="ease-in-out duration-500"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in-out duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </HlTransitionChild>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div
              class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
            >
              <HlTransitionChild
                as="template"
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
              >
                <HlDialogPanel class="pointer-events-auto w-screen max-w-md">
                  <div
                    class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                  >
                    <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div class="flex items-start justify-between">
                        <HlDialogTitle class="text-lg font-medium text-gray-900"
                          >Shopping cart</HlDialogTitle
                        >
                        <div class="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            @click="toggle()"
                          >
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div class="mt-8">
                        <div class="flow-root">
                          <ul
                            role="list"
                            class="-my-6 divide-y divide-gray-200"
                          >
                            <li
                              v-for="product in basket?.productItems"
                              :key="product.productId"
                              class="flex py-6"
                            >
                              <ProductLineItem
                                :product="fullProduct(product.productId)"
                                :product-line-item="product"
                              ></ProductLineItem>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div
                        class="flex justify-between text-base font-medium text-gray-900"
                      >
                        <p>Subtotal</p>
                        <p>${{ basket?.productSubTotal }}</p>
                      </div>
                      <p class="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div class="mt-6">
                        <NuxtLink
                          to="/checkout"
                          class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >Checkout</NuxtLink
                        >
                      </div>
                      <div
                        class="mt-6 flex justify-center text-center text-sm text-gray-500"
                      >
                        <p>
                          or
                          <button
                            type="button"
                            class="font-medium text-indigo-600 hover:text-indigo-500"
                            @click="toggle()"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </HlDialogPanel>
              </HlTransitionChild>
            </div>
          </div>
        </div>
      </HlDialog>
    </HlTransitionRoot>
  </div>
</template>
