<script setup lang="ts">
const { getBasket, setBasket } = useBasket();
const { getProducts } = useProducts();

const basket = await getBasket();
onMounted(() => {
  setBasket(basket.value);
});

const products = await getProducts("newarrivals-womens", 6);
</script>

<template>
  <div>
    <h1>{{ $t("welcome") }}</h1>
    <PromoSection />
    <Hero title="Shop Products">
      <template v-slot:subtitle>
        <b
          >This section contains content from the catalog. <a>Read docs</a> on
          how to replace it.</b
        >
      </template>

      <div
        class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
      >
        <ProductCard v-for="product in products?.hits" :product="product" />
      </div>
    </Hero>
  </div>
</template>
