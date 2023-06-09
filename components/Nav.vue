<script setup>
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

const localePath = useLocalePath();

const { toggle, totalItems } = useBasket();

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "/category/womens-clothing",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "/category/womens-jewelry" },
            { name: "Dresses", href: "/category/womens-accessories" },
            { name: "Pants", href: "/category/newarrivals-womens" },
            { name: "Denim", href: "/category/newarrivals-womens" },
            { name: "Sweaters", href: "/category/newarrivals-womens" },
            { name: "T-Shirts", href: "/category/newarrivals-womens" },
            { name: "Jackets", href: "/category/newarrivals-womens" },
            { name: "Activewear", href: "/category/newarrivals-womens" },
            { name: "Browse All", href: "/category/newarrivals-womens" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "/category/mens-clothing",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "/category/mens-accessories",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "/category/mens-clothing" },
            { name: "Pants", href: "/category/mens-clothing" },
            { name: "Sweaters", href: "/category/mens-clothing" },
            { name: "T-Shirts", href: "/category/mens-clothing" },
            { name: "Jackets", href: "/category/mens-clothing" },
            { name: "Activewear", href: "/category/mens-clothing" },
            { name: "Browse All", href: "/category/mens-clothing" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "/category/mens-clothing" },
            { name: "Wallets", href: "/category/mens-clothing" },
            { name: "Bags", href: "/category/mens-clothing" },
            { name: "Sunglasses", href: "/category/mens-clothing" },
            { name: "Hats", href: "/category/mens-clothing" },
            { name: "Belts", href: "/category/mens-clothing" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "/category/top-seller" },
    { name: "Stores", href: "/category/top-seller" },
  ],
};

const open = ref(false);

const { locale, locales, setLocale } = useI18n();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});

const currentLocale = computed(() => {
  return locales.value.find((i) => i.code === locale.value);
});
</script>

<template>
  <div class="bg-white">
    <!-- Mobile menu -->
    <HlTransitionRoot as="template" :show="open">
      <HlDialog as="div" class="relative z-40 lg:hidden" @close="open = false">
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
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <HlDialogPanel
              class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
            >
              <div class="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  @click="open = false"
                >
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Links -->
              <HlTabGroup as="div" class="mt-2">
                <div class="border-b border-gray-200">
                  <HlTabList class="-mb-px flex space-x-8 px-4">
                    <HlTab
                      as="template"
                      v-for="category in navigation.categories"
                      :key="category.name"
                      v-slot="{ selected }"
                    >
                      <button
                        :class="[
                          selected
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-900',
                          'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium',
                        ]"
                      >
                        {{ category.name }}
                      </button>
                    </HlTab>
                  </HlTabList>
                </div>
                <HlTabPanels as="template">
                  <HlTabPanel
                    v-for="category in navigation.categories"
                    :key="category.name"
                    class="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div class="grid grid-cols-2 gap-x-4">
                      <div
                        v-for="item in category.featured"
                        :key="item.name"
                        class="group relative text-sm"
                      >
                        <div
                          class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                        >
                          <img
                            :src="item.imageSrc"
                            :alt="item.imageAlt"
                            class="object-cover object-center"
                          />
                        </div>
                        <NuxtLink
                          :to="localePath(item.href)"
                          class="mt-6 block font-medium text-gray-900"
                        >
                          <span
                            class="absolute inset-0 z-10"
                            aria-hidden="true"
                          />
                          {{ item.name }}
                        </NuxtLink>
                        <p aria-hidden="true" class="mt-1">Shop now</p>
                      </div>
                    </div>
                    <div
                      v-for="section in category.sections"
                      :key="section.name"
                    >
                      <p
                        :id="`${category.id}-${section.id}-heading-mobile`"
                        class="font-medium text-gray-900"
                      >
                        {{ section.name }}
                      </p>
                      <ul
                        role="list"
                        :aria-labelledby="`${category.id}-${section.id}-heading-mobile`"
                        class="mt-6 flex flex-col space-y-6"
                      >
                        <li
                          v-for="item in section.items"
                          :key="item.name"
                          class="flow-root"
                        >
                          <NuxtLink
                            :to="localePath(item.href)"
                            class="-m-2 block p-2 text-gray-500"
                            >{{ item.name }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </div>
                  </HlTabPanel>
                </HlTabPanels>
              </HlTabGroup>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div
                  v-for="page in navigation.pages"
                  :key="page.name"
                  class="flow-root"
                >
                  <a
                    :href="page.href"
                    class="-m-2 block p-2 font-medium text-gray-900"
                    >{{ page.name }}</a
                  >
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div class="flow-root">
                  <a href="#" class="-m-2 block p-2 font-medium text-gray-900"
                    >Sign in</a
                  >
                </div>
                <div class="flow-root">
                  <a href="#" class="-m-2 block p-2 font-medium text-gray-900"
                    >Create account</a
                  >
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6">
                <a href="#" class="-m-2 flex items-center p-2">
                  <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    class="block h-auto w-5 flex-shrink-0"
                  />
                  <span class="ml-3 block text-base font-medium text-gray-900">
                    {{ currentLocale.name }}</span
                  >
                  <span class="sr-only">, change currency</span>
                </a>
              </div>
            </HlDialogPanel>
          </HlTransitionChild>
        </div>
      </HlDialog>
    </HlTransitionRoot>

    <header class="relative bg-white">
      <p
        class="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
      >
        Get free delivery on orders over $100
      </p>

      <nav
        aria-label="Top"
        class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8"
      >
        <div class="border-b border-gray-200">
          <div class="flex h-16 items-center">
            <button
              type="button"
              class="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              @click="open = true"
            >
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Logo -->
            <div class="ml-4 flex lg:ml-0">
              <NuxtLink :to="localePath('/')">
                <span class="sr-only">Your Company</span>
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </NuxtLink>
            </div>

            <!-- Flyout menus -->
            <HlPopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="flex h-full space-x-8">
                <HlPopover
                  v-for="category in navigation.categories"
                  :key="category.name"
                  class="flex"
                  v-slot="{ open }"
                >
                  <div class="relative flex">
                    <HlPopoverButton
                      :class="[
                        open
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-700 hover:text-gray-800',
                        'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out',
                      ]"
                      >{{ category.name }}</HlPopoverButton
                    >
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <HlPopoverPanel
                      class="absolute inset-x-0 top-full z-50 text-sm text-gray-500"
                    >
                      <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                      <div
                        class="absolute inset-0 top-1/2 bg-white shadow"
                        aria-hidden="true"
                      />

                      <div class="relative bg-white">
                        <div class="mx-auto max-w-7xl px-8">
                          <div class="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                            <div class="col-start-2 grid grid-cols-2 gap-x-8">
                              <div
                                v-for="item in category.featured"
                                :key="item.name"
                                class="group relative text-base sm:text-sm"
                              >
                                <div
                                  class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                                >
                                  <img
                                    :src="item.imageSrc"
                                    :alt="item.imageAlt"
                                    class="object-cover object-center"
                                  />
                                </div>
                                <NuxtLink
                                  :to="localePath(item.href)"
                                  class="mt-6 block font-medium text-gray-900"
                                >
                                  <span
                                    class="absolute inset-0 z-10"
                                    aria-hidden="true"
                                  />
                                  {{ item.name }}
                                </NuxtLink>
                                <p aria-hidden="true" class="mt-1">Shop now</p>
                              </div>
                            </div>
                            <div
                              class="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm"
                            >
                              <div
                                v-for="section in category.sections"
                                :key="section.name"
                              >
                                <p
                                  :id="`${section.name}-heading`"
                                  class="font-medium text-gray-900"
                                >
                                  {{ section.name }}
                                </p>
                                <ul
                                  role="list"
                                  :aria-labelledby="`${section.name}-heading`"
                                  class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                >
                                  <li
                                    v-for="item in section.items"
                                    :key="item.name"
                                    class="flex"
                                  >
                                    <NuxtLink
                                      :to="localePath(item.href)"
                                      class="hover:text-gray-800"
                                      >{{ item.name }}</NuxtLink
                                    >
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </HlPopoverPanel>
                  </transition>
                </HlPopover>

                <NuxtLink
                  v-for="page in navigation.pages"
                  :key="page.name"
                  :to="localePath(page.href)"
                  class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >{{ page.name }}</NuxtLink
                >
              </div>
            </HlPopoverGroup>

            <div class="ml-auto flex items-center">
              <div
                class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
              >
                <a
                  href="#"
                  class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >Sign in</a
                >
                <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
                <a
                  href="#"
                  class="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >Create account</a
                >
              </div>

              <div class="hidden lg:ml-8 lg:flex">
                <div class="flex items-center">
                  <HlMenu as="div" class="relative inline-block text-left">
                    <div>
                      <HlMenuButton
                        class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                      >
                        {{ currentLocale.name }}
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
                            v-for="locale in availableLocales"
                            :key="locale.code"
                          >
                            <button @click="setLocale(locale.code)">
                              {{ locale.name }}
                            </button>
                          </HlMenuItem>
                        </div>
                      </HlMenuItems>
                    </transition>
                  </HlMenu>
                </div>
              </div>

              <!-- Search -->
              <div class="flex lg:ml-6">
                <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Search</span>
                  <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
                </a>
              </div>

              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <button
                  @click="toggle"
                  class="group -m-2 flex items-center p-2"
                >
                  <ShoppingBagIcon
                    class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <ClientOnly>
                    <span
                      class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
                      >{{ totalItems }}</span
                    >
                  </ClientOnly>
                  <span class="sr-only">items in cart, view bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>
