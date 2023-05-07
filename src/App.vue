<script setup lang="ts">
import { reactive, ref } from "vue";
import BattleshipGrid from "./components/BattleshipGrid.vue";

type FieldState = "Empty" | "Miss" | "Hit" | "Sunk";

const selectedTile = ref<[number, number]>([-1, -1]);
const board = reactive<FieldState[][]>(
  Array<FieldState[]>(10).fill(Array<FieldState>(10).fill("Empty"))
);
</script>

<template>
  <ChoiceDialog
    v-if="selectedTile != null"
    title="Tile type"
    :options="[
      ['Miss', () => (board[selectedTile[0]][selectedTile[1]] = 'Miss')],
      ['Hit', () => (board[selectedTile[0]][selectedTile[1]] = 'Hit')],
      ['Sunk', () => (board[selectedTile[0]][selectedTile[1]] = 'Sunk')],
    ]"
  />
  <BattleshipGrid
    :tiles="board.map((r) => r.map((f) => ({ color: `rgb(${76}, ${5}, ${25})` })))"
    @click="(tile) => (selectedTile = tile)"
  />
</template>
