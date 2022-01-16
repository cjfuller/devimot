<script lang="ts">
  import type { Colors } from "./core";
  import { v4 as uuidv4 } from "uuid";
  export let proportion: number = 0;
  export let highlight: boolean = false;
  export let index: number | string;
  export let colors: Colors;
  const totalWidth = 200;

  $: cssVars = `--width:${Math.max(totalWidth * proportion, 2)}px;`;
  const label = uuidv4();
</script>

<div class="barcontainer" style={cssVars}>
  <div class="index">{index}</div>
  <div class="h-spacer" />
  <div
    aria-describedby={label}
    role="meter"
    class={`bar  ${highlight ? "highlight" : ""} ${colors}`}
  />
  <div class="h-spacer" />
  <div id={label}>
    {Math.round(proportion * 100)}%
  </div>
</div>

<style>
  .index {
    width: 32px;
    text-align: right;
  }
  .barcontainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .highlight.standard {
    background-color: #193;
  }
  .highlight.cb-friendly {
    background-color: #e96;
  }
  .bar:not(.highlight) {
    background-color: #555;
  }
  .h-spacer {
    margin-right: 4px;
  }
  .bar {
    height: 16px;
    width: var(--width);
  }
</style>
