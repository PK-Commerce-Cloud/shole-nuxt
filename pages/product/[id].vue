<template>
  <div class="bg-white">
    <div class="pt-6">
      <!-- Image gallery -->
      <div
        class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8"
      >
        <div
          class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block"
        >
          <img
            :src="product?.imageGroups[0].images[0].disBaseLink"
            :alt="product?.imageGroups[0].images[0].alt"
            class="h-full w-full object-cover object-center"
          />
        </div>
        <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              :src="product?.imageGroups[0].images[0].disBaseLink"
              :alt="product?.imageGroups[0].images[0].alt"
              class="h-full w-full object-cover object-center"
            />
          </div>
          <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              :src="product?.imageGroups[0].images[0].disBaseLink"
              :alt="product?.imageGroups[0].images[0].alt"
              class="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div
          class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg"
        >
          <img
            :src="product?.imageGroups[0].images[0].disBaseLink"
            :alt="product?.imageGroups[0].images[0].alt"
            class="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      <!-- Product info -->
      <div
        class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"
      >
        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1
            class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
          >
            {{ product.name }}
          </h1>
        </div>

        <!-- Options -->
        <div class="mt-4 lg:row-span-3 lg:mt-0">
          <h2 class="sr-only">Product information</h2>
          <p class="text-3xl tracking-tight text-gray-900">
            ${{ product?.price }}
          </p>

          <!-- Reviews -->
          <div class="mt-6">
            <h3 class="sr-only">Reviews</h3>
            <div class="flex items-center">
              <div class="flex items-center">
                <StarIcon
                  v-for="rating in [0, 1, 2, 3, 4]"
                  :key="rating"
                  :class="[
                    reviews.average > rating
                      ? 'text-gray-900'
                      : 'text-gray-200',
                    'h-5 w-5 flex-shrink-0',
                  ]"
                  aria-hidden="true"
                />
              </div>
              <p class="sr-only">{{ reviews.average }} out of 5 stars</p>
              <a
                :href="reviews.href"
                class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >{{ reviews.totalCount }} reviews</a
              >
            </div>
          </div>

          <form>
            <!-- Colors -->
            <div class="mt-10" v-for="variation in product.variationAttributes">
              <h3 class="text-sm font-medium text-gray-900">
                {{ variation.name }}
              </h3>

              <HlRadioGroup v-model="selectedValues[variation.id]" class="mt-4">
                <HlRadioGroupLabel class="sr-only"
                  >Choose a {{ variation.name }}</HlRadioGroupLabel
                >
                <div class="flex items-center space-x-3">
                  <HlRadioGroupOption
                    as="template"
                    v-for="value in variation.values"
                    :key="value.value"
                    :value="value.value"
                    v-slot="{ active, checked }"
                  >
                    <div
                      :class="[
                        value.orderable
                          ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                          : 'cursor-not-allowed bg-gray-50 text-gray-200',
                        active ? 'ring-2 ring-indigo-500' : '',
                        'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6',
                      ]"
                    >
                      <HlRadioGroupLabel as="span">{{
                        value.name
                      }}</HlRadioGroupLabel>
                      <span
                        v-if="value.orderable"
                        :class="[
                          active ? 'border' : 'border-2',
                          checked ? 'border-indigo-500' : 'border-transparent',
                          'pointer-events-none absolute -inset-px rounded-md',
                        ]"
                        aria-hidden="true"
                      />
                      <span
                        v-else
                        aria-hidden="true"
                        class="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                      >
                        <svg
                          class="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                          stroke="currentColor"
                        >
                          <line
                            x1="0"
                            y1="100"
                            x2="100"
                            y2="0"
                            vector-effect="non-scaling-stroke"
                          />
                        </svg>
                      </span>
                    </div>
                  </HlRadioGroupOption>
                </div>
              </HlRadioGroup>
            </div>
          </form>
        </div>

        <div
          class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"
        >
          <!-- Description and details -->
          <div>
            <h3 class="sr-only">Description</h3>

            <div class="space-y-6">
              <p class="text-base text-gray-900">
                {{ product?.longDescription }}
              </p>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">Highlights</h3>

            <div class="mt-4">
              <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                <li
                  v-for="(highlight, key) in product?.variationValues"
                  :key="key"
                  class="text-gray-400"
                >
                  <span class="text-gray-600">{{
                    `${key}: ${highlight}`
                  }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-10">
            <h2 class="text-sm font-medium text-gray-900">Details</h2>

            <div class="mt-4 space-y-6">
              <p class="text-sm text-gray-600">
                {{ product.shortDescription }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { StarIcon } from "@heroicons/vue/20/solid";

const { params } = useRoute();

const { getProduct } = useProducts();

const { data: product } = await getProduct(params.id as string);

const reviews = { href: "#", average: 4, totalCount: 117 };

const selectedValues = ref({
  color: {},
  size: {},
});
</script>
