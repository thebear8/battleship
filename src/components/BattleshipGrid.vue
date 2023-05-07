<script setup lang="ts">
import type { FieldState, GameState } from "../state";
import ChoiceDialog from "./ChoiceDialog.vue";
const props = defineProps<{ state: GameState }>();
const emit = defineEmits<{
  (event: "select", tile: [number, number]): any;
  (event: "Miss", tile: [number, number]): any;
  (event: "Hit", tile: [number, number]): any;
  (event: "Sunk", tile: [number, number]): any;
}>();

function computeTiles() {
  let colors: { [state in FieldState]: string } = {
    Empty: "red",
    Miss: "blue",
    Hit: "black",
    Sunk: "green",
  };

  let tiles: { text: string; backgroundColor: string; onClick: () => any }[] = [];

  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if (i == 0) {
        tiles.push({ text: j.toString(), backgroundColor: "black", onClick: () => {} });
      } else if (j == 0) {
        tiles.push({ text: "ABCDEFGHIJ"[i - 1], backgroundColor: "black", onClick: () => {} });
      } else {
        tiles.push({
          text: `${i}.${j}`,
          backgroundColor: colors[props.state.board[i - 1][j - 1]],
          onClick: () => emit("select", [i - 1, j - 1]),
        });
      }
    }
  }

  return tiles;
}
</script>

<template>
  <ChoiceDialog
    v-if="state.selectedTile != null"
    title="Tile type"
    :options="[
      ['Miss', () => $emit('Miss', state.selectedTile)],
      ['Hit', () => $emit('Hit', state.selectedTile)],
      ['Sunk', () => $emit('Sunk', state.selectedTile)],
    ]"
  />
  <div class="w-full h-full flex justify-center items-center">
    <div
      class="w-full h-full grid grid-cols-11 gap-1"
      style="max-width: min(70vw, 70vh); max-height: min(70vw, 70vh)"
    >
      <div
        v-for="(tile, index) in computeTiles()"
        :key="index"
        :style="{ color: 'white', backgroundColor: tile.backgroundColor }"
        @click="tile.onClick"
      >
        {{ tile.text }}
      </div>
    </div>
  </div>
</template>
