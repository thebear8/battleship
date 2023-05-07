<script setup lang="ts">
import { ref } from "vue";
import BattleshipGrid from "./components/BattleshipGrid.vue";
import { type FieldState, type GameState } from "./state";

const state = ref<GameState>({
  selectedTile: null,
  board: Array<FieldState[]>(10).fill(Array<FieldState>(10).fill("Empty")),
});
</script>

<template>
  <BattleshipGrid :state="state" @select="(tile) => (state.selectedTile = tile)" />
</template>
