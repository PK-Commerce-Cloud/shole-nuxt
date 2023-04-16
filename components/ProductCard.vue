<script setup lang="ts">
const props = defineProps({
  image: String,
  name: String,
  color: String,
  price: Number,
  productId: String,
});
</script>

<template>
  <div class="group relative bg-white">
    <div
      class="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
    >
      <img
        :src="
          image ||
          'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'
        "
        :alt="name"
        class="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <a href="#">
            {{ name }}
          </a>
        </h3>
        <p class="mt-1 text-sm text-gray-500">{{ color }}</p>
      </div>
      <p class="text-sm font-medium text-gray-900">${{ price }}</p>
    </div>
  </div>
</template>
