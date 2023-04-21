<script setup lang="ts">
const props = defineProps({
  product: Object,
});

const small = computed(
  () => (product) =>
    product?.imageGroups.find((i) => i.viewType === "small").images[0]
      .disBaseLink
);
</script>

<template>
  <article class="shadow-lg flex">
    <NuxtImg :src="small(product) || '/loading.svg'" loading="lazy"></NuxtImg>

    <div>
      <h1 class="text-xl font-bold">
        {{ product?.name }}
        <small class="text-sm">{{ product?.id }}</small>
      </h1>
      <p v-if="product?.c_styleNumber">Style: {{ product.c_styleNumber }}</p>
      {{ product?.variationValues }}
    </div>
  </article>
</template>
