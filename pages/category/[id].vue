<script setup lang="ts">
const { params } = useRoute();

const { getProducts } = useProducts();

const { data: products } = await getProducts(params.id as string);
</script>

<template>
  <div class="grid grid-cols-4 gap-4 my-4">
    <div><h1>hola</h1></div>
    <div class="col-span-3">
      <section class="grid grid-cols-4">
        <ProductCard
          v-for="product in products?.hits"
          :product="product"
        ></ProductCard>
      </section>
    </div>
  </div>
</template>
