<script lang="ts">
  import Box from "./Box.svelte";
  import type { Colors, State } from "./core";
  import { statusForLetter } from "./core";
  export let state: State;
  export let colors: Colors;

  import {letters} from "./letters";

</script>

<div class="container">
  {#each letters as letter}
    <div>
      <Box
        {letter}
        active={false}
        unknownColor="#555"
        status={statusForLetter(state, letter)}
        boxSize={35}
        fontSize={18}
        tweakVertical={4}
        onEnter={() => null}
        onLetterChange={(l) => null}
        {colors}
      />
      <div class="spacer" />
    </div>
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    /* 13 keys wide @ 37px + 4px space between */
    max-width: 507px;
  }
  .spacer {
    margin-bottom: 4px;
  }
</style>
