<script setup lang="ts">
const { getCategories } = await useProducts();
const categories = await getCategories("root", 2);
</script>

<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center">
            <img
              class="block h-8 w-auto lg:hidden"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
            <img
              class="hidden h-8 w-auto lg:block"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
          <!-- <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a
                v-for="category in categories?.categories"
                :key="category.id"
                href="#"
                class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                aria-current="page"
                >{{ category.name }}</a
              >
            </div>
          </div> -->
          <HlMenu v-for="category in categories?.categories">
            <HlMenuButton
              :key="category.id"
              class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
              >{{ category.name }}</HlMenuButton
            >
            <HlMenuItems v-if="category.categories.length >= 2">
              <HlMenuItem
                v-slot="{ active }"
                v-for="subCategory in category.categories"
              >
                <a :class="{ 'bg-blue-500': active }">
                  {{ subCategory.name }}
                </a>
              </HlMenuItem>
            </HlMenuItems>
          </HlMenu>
        </div>
      </div>
    </div>
  </nav>
</template>