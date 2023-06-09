<script setup lang="ts">
import { StarIcon } from "@heroicons/vue/20/solid";

const { params } = useRoute();
const { getProduct } = useProducts();

const selectedValues = ref({
  color: {},
  size: {},
});

const product = await getProduct(params.id as string);
/* const reviews = { href: "#", average: 4, totalCount: 117 }; */

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const gridImages = computed(() => {
  const length = product.value.imageGroups[0].images.length;

  return {
    left: product.value.imageGroups[0].images[0],
    center: [
      product.value.imageGroups[0].images[getRandomInt(length)],
      product.value.imageGroups[0].images[getRandomInt(length)],
    ],
    right: product.value.imageGroups[0].images[length - 1],
  };
});

const swatchs = computed(() => {
  const swatchs = product.value.imageGroups.filter(
    ({ viewType }) => viewType === "swatch"
  );
  return swatchs;
});

/* const swatch = computed(() => (id) => {
  swatchs.find()
}); */
</script>

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
          <NuxtImg
            :src="gridImages.left.disBaseLink"
            :alt="gridImages.left.alt"
            loading="lazy"
            class="h-full w-full object-cover object-center"
          />
        </div>
        <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div
            class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg"
            v-for="image in gridImages.center"
          >
            <NuxtImg
              :src="image.disBaseLink"
              :alt="image.alt"
              loading="lazy"
              class="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div
          class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg"
        >
          <NuxtImg
            :src="gridImages.right.disBaseLink"
            :alt="gridImages.right.alt"
            loading="lazy"
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
          <!-- <div class="mt-6">
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
          </div> -->

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
                    v-for="value in variation.values.filter((v) => v.orderable)"
                    :key="value.value"
                    :value="value.value"
                    v-slot="{ active, checked }"
                  >
                    <div
                      :class="[
                        'cursor-pointer bg-white text-gray-900 shadow-sm',
                        active ? 'ring-2 ring-indigo-500' : '',
                        'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6',
                      ]"
                    >
                      <HlRadioGroupLabel as="span">
                        <template v-if="variation.id === 'color'">
                          color
                        </template>
                        <template v-else> {{ value.name }} </template>
                      </HlRadioGroupLabel>
                      <span
                        :class="[
                          active ? 'border' : 'border-2',
                          checked ? 'border-indigo-500' : 'border-transparent',
                          'pointer-events-none absolute -inset-px rounded-md',
                        ]"
                        aria-hidden="true"
                      />
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
              <div
                class="text-base text-gray-900"
                v-html="product?.longDescription"
              ></div>
            </div>
          </div>

          <div class="mt-10" v-if="product?.variationValues">
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
