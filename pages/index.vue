<script setup lang="ts">
const { getProducts } = await useProducts();

const products = await getProducts("newarrivals-mens");
</script>

<template>
  <Swiper
    :height="300"
    :modules="[SwiperAutoplay]"
    :slides-per-view="5"
    :loop="true"
    :effect="'creative'"
    :autoplay="{
      delay: 8000,
      disableOnInteraction: true,
    }"
  >
    <SwiperSlide
      v-for="prodct in products.hits"
      :key="prodct.productId"
      style="background-color: red"
    >
      <nuxt-img :src="prodct.image.disBaseLink"></nuxt-img>
      {{ prodct.productName }}
    </SwiperSlide>
  </Swiper>
</template>
