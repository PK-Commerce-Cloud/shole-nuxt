<script setup lang="ts">
import { ProductLineItem } from "~/.nuxt/components";

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
  <article class="shadow-lg flex">
    <div
      class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
    >
      <NuxtImg :src="small(product) || '/loading.svg'" loading="lazy"></NuxtImg>
    </div>

    <div class="w-full px-4">
      <h1 class="text-xl font-bold">
        {{ product?.name }}
      </h1>
      <div>
        <p v-for="(attr, key) in product?.variationValues" class="font-medium">
          <small class="text-gray-400">{{ key }}:</small> {{ attr }}
        </p>
        <p v-if="product?.shortDescription" class="text-gray-400 text-sm">
          {{ product.shortDescription }}
        </p>
      </div>
      <div class="flex justify-between text-lg text-neutral-700">
        <span v-if="product?.c_styleNumber" class="font-bold">
          <small class="text-gray-400">Style:</small>
          {{ product.c_styleNumber }}
        </span>
        <span class="font-bold">
          <small class="text-gray-500">qty:</small>
          {{ productLineItem?.quantity }}
        </span>
        <span class="font-bold">
          <small class="text-gray-500">price:</small>
          {{ productLineItem?.price }}
        </span>
      </div>
    </div>
  </article>
</template>
