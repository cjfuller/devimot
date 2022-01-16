<script lang="ts">
  import { Colors, rowIntoShareGrid, State, stateIntoShareGrid } from "./core";
  import { countWinsByTurn } from "./core";
  import Container from "./Container.svelte";
  import Bar from "./Bar.svelte";
  export let currState: State;
  export let colors: Colors;
  export let onClose: () => void;
  const [counts, total] = countWinsByTurn();
  let maxCount = -1;
  [1, 2, 3, 4, 5, 6].forEach((it) => {
    if (maxCount < counts[it] ?? -1) {
      maxCount = counts[it];
    }
  });

  $: windicator = currState.result === "win" ? ` (${currState.lockedGuesses.length} / 6)` : "";
  $: toCopy = [
    `Devimot #${currState.puzzleNumber}${windicator}`,
    stateIntoShareGrid(currState),
  ].join("\n");
</script>

<Container title="Statistiques" {onClose}>
  <div class="title">Distribution d'essais historiques</div>
  <div class="bargraph">
    {#each [1, 2, 3, 4, 5, 6] as i}
      <Bar
        index={i}
        highlight={counts[i] === maxCount}
        {colors}
        proportion={total > 0 ? counts[i] / total : 0}
      />
    {/each}
    <Bar
      index={"perte"}
      highlight={false}
      {colors}
      proportion={total > 0 ? counts[10] / total : 0}
    />
  </div>
  <div class="spacer" />
  <div class="rule" />
  <div class="title">Puzzle actuel</div>
  <div class="spacer" />
  <div>Devimot #{currState.puzzleNumber}{windicator}</div>
  {#each currState.lockedGuesses as row}
    <div>{rowIntoShareGrid(row)}</div>
  {/each}
  <div class="spacer" />
  <button on:click={() => globalThis.navigator.clipboard.writeText(toCopy)}> Copier </button>
</Container>

<style>
  button {
    padding: 3px 30px;
    border-radius: 2px;
    background-color: #111;
    border: 2px solid #ddd;
    color: #ddd;
    cursor: pointer;
    font-family: "Concourse C6 Tab", sans-serif;
  }
  button:active {
    background-color: #555;
  }
  .title {
    margin-bottom: 8px;
    font-family: "Concourse C6 Tab", sans-serif;
  }
  .bargraph {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .spacer {
    margin-bottom: 8px;
  }
  .rule {
    border-bottom: 1px solid #555;
    margin-top: 4px;
    margin-bottom: 4px;
    min-width: 250px;
    max-width: 400px;
    width: 100%;
  }
</style>
