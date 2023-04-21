<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBasketStore } from "~/store/basket";

const basketStore = useBasketStore();

const { totalItems, basket } = storeToRefs(basketStore);

watch(basket, () => {
  const { $swal } = useNuxtApp();
  $swal.fire({
    toast: true,
    title: "New Product Added",
    position: "top-right",
    showConfirmButton: false,
    icon: "success",
    timer: 1500,
    timerProgressBar: true,
  });
});

const { getCategories } = await useProducts();
const { data: categories } = await getCategories("root", 2);
</script>

<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-screen-2xl px-2 sm:px-6 lg:px-8">
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
          <HlMenu v-for="category in categories?.categories">
            <HlMenuButton
              :key="category.id"
              class="ml-3 bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
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
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <button
            type="button"
            class="bg-gray-800 p-1 text-gray-400 hover:text-white flex space-x-2 space-x-reverse"
          >
            <span class="sr-only">View notifications</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <ClientOnly>
              {{ totalItems }}
            </ClientOnly>
          </button>

          <!-- Profile dropdown -->
          <div class="relative ml-3">
            <div>
              <button
                type="button"
                class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
