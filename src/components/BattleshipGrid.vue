<script setup lang="ts">
defineProps<{ tiles: { text: string; color: string }[][] }>();
defineEmits<{
  (event: "click", tile: [number, number]): any;
}>();
</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <div
      class="w-full h-full grid grid-cols-11 gap-1"
      style="max-width: min(70vw, 70vh); max-height: min(70vw, 70vh)"
    >
      <template v-for="(n1, i) in 11">
        <template v-for="(n2, j) in 11">
          <div v-if="i == 0 && j == 0" :key="i * j"></div>
          <div v-if="i == 0 && j != 0" :key="i * j">{{ j }}</div>
          <div v-if="i != 0 && j == 0" :key="i * j">
            {{ "ABCDEFGHIJ"[i - 1] }}
          </div>

          <div
            v-if="i != 0 && j != 0"
            :key="i * j"
            class="text-white"
            :style="{ backgroundColor: tiles[i - 1][j - 1].color }"
            @click="$emit('click', [i - 1, j - 1])"
          >
            {{ tiles[i - 1][j - 1].text }}
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
