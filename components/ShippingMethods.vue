<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@headlessui/vue";

const { getShippingMethods, shippingMethods } = useBasket();

await getShippingMethods();

const selected = ref("001");
</script>

<template>
  <RadioGroup v-model="selected">
    <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
    <div class="grid grid-cols-1 gap-x-4 gap-y-4 space-y-2 sm:grid-cols-2">
      <RadioGroupOption
        as="template"
        v-for="plan in shippingMethods?.applicableShippingMethods"
        :key="plan.name"
        :value="plan.id"
        v-slot="{ active, checked }"
      >
        <div
          :class="[
            active
              ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
              : '',
            checked ? 'bg-sky-900 bg-opacity-75 text-white ' : 'bg-white ',
          ]"
          class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
        >
          <div class="flex w-full items-center justify-between">
            <div class="flex items-center">
              <div class="text-sm">
                <RadioGroupLabel
                  as="p"
                  :class="checked ? 'text-white' : 'text-gray-900'"
                  class="font-medium"
                >
                  {{ plan.name }}
                </RadioGroupLabel>
                <RadioGroupDescription
                  as="span"
                  :class="checked ? 'text-sky-100' : 'text-gray-500'"
                  class="inline"
                >
                  <span> {{ plan.description }}</span>
                </RadioGroupDescription>
              </div>
            </div>
            <div v-show="checked" class="shrink-0 text-white">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.2" />
                <path
                  d="M7 13l3 3 7-7"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
