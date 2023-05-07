<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import BattleshipGrid from "./components/BattleshipGrid.vue";
import { FieldState, solve } from "./solver";
import ChoiceDialog from "./components/ChoiceDialog.vue";

const selectedTile = ref<[number, number] | null>(null);
const board = reactive<FieldState[][]>(
  Array.from(Array(10), () => Array.from(Array(10), () => FieldState.Empty))
);

function setTile(state: FieldState) {
  if (selectedTile.value == null) return;
  board[selectedTile.value[0]][selectedTile.value[1]] = state;
  selectedTile.value = null;
}

const distribution = computed(() => {
  return solve(board, Date.now() + 500, 10000);
});
</script>

<template>
  <ChoiceDialog
    v-if="selectedTile != null"
    title="Tile type"
    :options="[
      ['Miss', () => setTile(FieldState.Miss)],
      ['Hit', () => setTile(FieldState.Hit)],
      ['Sunk', () => setTile(FieldState.Sunk)],
    ]"
  />
  <BattleshipGrid
    :tiles="
      distribution.map((a) =>
        a.map((b) => ({
          text: Math.floor(b * 100).toString(),
          color: `rgb(${255 * (1 - 0.9 * b)}, ${228 * (1 - 0.9 * b)}, ${230 * (1 - 0.9 * b)})`,
        }))
      )
    "
    @click="(tile) => (selectedTile = tile)"
  />
</template>
