<script setup lang="ts">
const props = defineProps({
  title: String,
  subtitle: String,
});
</script>

<template>
  <section class="py-12">
    <div class="max-w-screen-xl mx-auto px-4 md:px-8">
      <div class="max-w-7-xl mx-auto sm:text-center py-8">
        <h3 class="text-gray-800 text-3xl font-semibold sm:text-4xl">
          {{ title || "Title" }}
        </h3>
        <p class="text-gray-600 mt-3">
          {{ subtitle }}
          <slot name="subtitle"></slot>
        </p>
      </div>

      <slot />
    </div>
  </section>
</template>
