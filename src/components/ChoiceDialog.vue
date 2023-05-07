<script setup lang="ts">
defineProps<{ title: string; options: [string, () => any][] }>();
</script>

<template>
  <div class="absolute w-full h-full z-1 backdrop-blur flex justify-center items-center">
    <div class="p-5 bg-white rounded border border-black border-2 flex flex-col">
      <div class="p-1 m-1 text-center">{{ title }}</div>
      <button
        v-for="[name, onClick] in options"
        :key="name"
        class="rounded border border-black border-2 bg-blue-600 text-white p-1 m-1 text-center"
        @click="onClick"
      >
        {{ name }}
      </button>
    </div>
  </div>
</template>
