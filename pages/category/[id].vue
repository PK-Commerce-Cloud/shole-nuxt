<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from "@heroicons/vue/20/solid";

const { params } = useRoute();

const { getProducts } = useProducts();

const { data: products } = await getProducts(params.id as string);

const mobileFiltersOpen = ref(false);
</script>

<template>
  <div class="bg-white">
    <!-- Mobile filter dialog -->
    <HlTransitionRoot as="template" :show="mobileFiltersOpen">
      <HlDialog
        as="div"
        class="relative z-40 lg:hidden"
        @close="mobileFiltersOpen = false"
      >
        <HlTransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </HlTransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <HlTransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <HlDialogPanel
              class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl"
            >
              <div class="flex items-center justify-between px-4">
                <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  @click="mobileFiltersOpen = false"
                >
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Filters -->
              <form class="mt-4 border-t border-gray-200">
                <ProductRefinements
                  custom-class="px-6"
                  :refinements="products?.refinements.filter((r) => r.values)"
                ></ProductRefinements>
              </form>
            </HlDialogPanel>
          </HlTransitionChild>
        </div>
      </HlDialog>
    </HlTransitionRoot>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24"
      >
        <h1 class="text-4xl font-bold tracking-tight text-gray-900">
          {{ params.id }}
        </h1>

        <div class="flex items-center">
          <HlMenu as="div" class="relative inline-block text-left">
            <div>
              <HlMenuButton
                class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sort
                <ChevronDownIcon
                  class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </HlMenuButton>
            </div>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <HlMenuItems
                class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <HlMenuItem
                    v-for="option in products?.sortingOptions"
                    :key="option.id"
                    v-slot="{ active }"
                  >
                    <a
                      :href="option.id"
                      :class="[
                        option[0]
                          ? 'font-medium text-gray-900'
                          : 'text-gray-500',
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm',
                      ]"
                      >{{ option.label }}</a
                    >
                  </HlMenuItem>
                </div>
              </HlMenuItems>
            </transition>
          </HlMenu>

          <button
            type="button"
            class="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
          >
            <span class="sr-only">View grid</span>
            <Squares2X2Icon class="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            @click="mobileFiltersOpen = true"
          >
            <span class="sr-only">Filters</span>
            <FunnelIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <section aria-labelledby="products-heading" class="pb-24 pt-6">
        <h2 id="products-heading" class="sr-only">Products</h2>
        <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <!-- Filters -->
          <form class="hidden lg:block">
            <ProductRefinements
              :refinements="products?.refinements.filter((r) => r.values)"
            ></ProductRefinements>
          </form>

          <!-- Product grid -->
          <div class="lg:col-span-3">
            <div
              class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
            >
              <ProductCard
                v-for="product in products?.hits"
                :product="product"
              ></ProductCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
