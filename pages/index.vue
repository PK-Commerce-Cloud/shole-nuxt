<script setup lang="ts">
const { getProducts } = useProducts();
const { getBasket } = useBasket();

const { data: products } = await getProducts("newarrivals-womens", 5);

await getBasket();
</script>

<template>
  <div>
    <PromoSection />
    <Hero title="Shop Products">
      <template v-slot:subtitle>
        <b
          >This section contains content from the catalog. <a>Read docs</a> on
          how to replace it.</b
        >
      </template>
      <Swiper
        :height="300"
        :modules="[SwiperAutoplay]"
        :slides-per-view="3"
        :loop="true"
        :effect="'creative'"
        :autoplay="{
          delay: 8000,
          disableOnInteraction: true,
        }"
      >
        <SwiperSlide
          v-for="product in products?.hits"
          :key="product.productId"
          class="px-5"
        >
          <ProductCard :product="product" />
        </SwiperSlide>
      </Swiper>
    </Hero>
  </div>
</template>
