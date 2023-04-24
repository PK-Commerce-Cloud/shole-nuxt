<script setup lang="ts">
import { MinusIcon, PlusIcon } from "@heroicons/vue/20/solid";
const props = defineProps({
  refinements: Array,
  customClass: String,
  selected: Object,
});

const checked = computed(() => (id, value) => {
  return props.selected[id]?.split("|").indexOf(value) >= 0;
});
</script>
<template>
  <div>
    <HlDisclosure
      as="div"
      v-for="section in refinements?.filter(
        (attr) => attr.attributeId !== 'cgid'
      )"
      :key="section.attributeId"
      :class="`border-b border-gray-200 py-6 ${customClass}`"
      v-slot="{ open }"
    >
      <h3 class="-my-3 flow-root">
        <HlDisclosureButton
          class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
        >
          <span class="font-medium text-gray-900">{{ section.label }}</span>
          <span class="ml-6 flex items-center">
            <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
            <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
          </span>
        </HlDisclosureButton>
      </h3>
      <HlDisclosurePanel class="pt-6">
        <div class="space-y-4">
          <div
            v-for="(option, optionIdx) in section.values.filter(
              (v) => v.hitCount
            )"
            :key="option.value"
            class="flex items-center"
          >
            <input
              :id="`${section.attributeId}`"
              :name="`${section.attributeId}[]`"
              :value="option.value"
              :on-change="(e) => this.$emit('change')"
              type="checkbox"
              :checked="checked(section.attributeId, option.value)"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />

            <label
              :for="`filter-${section.attributeId}-${optionIdx}`"
              class="ml-3 text-sm text-gray-600"
              >{{ option.label }}</label
            >
          </div>
        </div>
      </HlDisclosurePanel>
    </HlDisclosure>
  </div>
</template>
