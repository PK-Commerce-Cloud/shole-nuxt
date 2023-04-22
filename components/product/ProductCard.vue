<script setup lang="ts">
const props = defineProps({
  product: Object,
});
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
