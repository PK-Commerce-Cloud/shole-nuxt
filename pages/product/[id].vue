<script setup lang="ts">
const { params } = useRoute();

const { getProduct } = useProducts();

const { data: product } = await getProduct(params.id as string);
</script>

<template>{{ product }}</template>
