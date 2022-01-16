<script lang="ts">
  import { blur } from "svelte/transition";
  import type { Colors, Settings } from "../lib/core";
  import { newState, loadSettings, saveSettings } from "../lib/core";
  import Board from "../lib/Board.svelte";
  import Info from "../lib/Info.svelte";
  import SettingsPage from "../lib/Settings.svelte";
  import Statistics from "../lib/Statistics.svelte";
  let page: "info" | "board" | "settings" | "stats" = "board";
  let settings: Settings = loadSettings();
  let state: State = newState();
  const changeColors = (newColors: Colors) => {
    settings = {
      ...settings,
      colors: newColors,
    };
    saveSettings(settings);
  };

  $: colors = settings.colors;
</script>

<div class="gamearea">
  {#if page == "board"}
    <div class="content" transition:blur>
      <div class="header">
        <button
          aria-labelledby="help-label"
          class="button"
          on:click={() => {
            page = "info";
          }}
        >
          <span id="help-label" hidden>Aide</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentcolor"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            ><path fill="none" d="M0 0h24v24H0z" /><path
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z"
            /></svg
          >
        </button>
        <button disabled class="button button-disabled" aria-hidden="true" />
        <h1 class="title">Devimot</h1>
        <div>
          <button
            class="button"
            aria-labelledby="stats-label"
            on:click={() => {
              page = "stats";
            }}
          >
            <span id="stats-label" hidden>Statistiques</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              fill="currentcolor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              ><path fill="none" d="M0 0h24v24H0z" /><path
                d="M2 13h6v8H2v-8zm14-5h6v13h-6V8zM9 3h6v18H9V3zM4 15v4h2v-4H4zm7-10v14h2V5h-2zm7 5v9h2v-9h-2z"
              /></svg
            >
          </button>
          <button
            class="button"
            aria-labelledby="settings-label"
            on:click={() => {
              page = "settings";
            }}
          >
            <span id="settings-label" hidden>Paramètres</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              fill="currentcolor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              ><path fill="none" d="M0 0h24v24H0z" /><path
                d="M3.34 17a10.018 10.018 0 0 1-.978-2.326 3 3 0 0 0 .002-5.347A9.99 9.99 0 0 1 4.865 4.99a3 3 0 0 0 4.631-2.674 9.99 9.99 0 0 1 5.007.002 3 3 0 0 0 4.632 2.672c.579.59 1.093 1.261 1.525 2.01.433.749.757 1.53.978 2.326a3 3 0 0 0-.002 5.347 9.99 9.99 0 0 1-2.501 4.337 3 3 0 0 0-4.631 2.674 9.99 9.99 0 0 1-5.007-.002 3 3 0 0 0-4.632-2.672A10.018 10.018 0 0 1 3.34 17zm5.66.196a4.993 4.993 0 0 1 2.25 2.77c.499.047 1 .048 1.499.001A4.993 4.993 0 0 1 15 17.197a4.993 4.993 0 0 1 3.525-.565c.29-.408.54-.843.748-1.298A4.993 4.993 0 0 1 18 12c0-1.26.47-2.437 1.273-3.334a8.126 8.126 0 0 0-.75-1.298A4.993 4.993 0 0 1 15 6.804a4.993 4.993 0 0 1-2.25-2.77c-.499-.047-1-.048-1.499-.001A4.993 4.993 0 0 1 9 6.803a4.993 4.993 0 0 1-3.525.565 7.99 7.99 0 0 0-.748 1.298A4.993 4.993 0 0 1 6 12c0 1.26-.47 2.437-1.273 3.334a8.126 8.126 0 0 0 .75 1.298A4.993 4.993 0 0 1 9 17.196zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
              /></svg
            >
          </button>
        </div>
      </div>
      <div class="rule" />
      <Board bind:state {colors} onVictory={() => null} onDefeat={() => null} />
    </div>
  {:else if page === "info"}
    <div class="content" transition:blur>
      <Info
        {colors}
        onClose={() => {
          page = "board";
        }}
      />
    </div>
  {:else if page === "settings"}
    <div class="content" transition:blur>
      <SettingsPage
        {colors}
        onClose={() => {
          page = "board";
        }}
        {changeColors}
      />
    </div>
  {:else if page === "stats"}
    <div class="content" transition:blur>
      <Statistics
        {colors}
        currState={state}
        onClose={() => {
          page = "board";
        }}
      />
    </div>
  {/if}
</div>

<style>
  @font-face {
    font-family: "Concourse C6 Tab";
    src: url("/concourse_c6_tab_regular.woff") format("woff");
  }
  @font-face {
    font-family: "Concourse T3 Tab";
    src: url("/concourse_t3_tab_regular.woff") format("woff");
  }
  .header {
    width: 350px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .button {
    background-color: rgba(0, 0, 0, 0);
    color: #ddd;
    border: none;
    cursor: pointer;
  }
  .button-disabled {
    cursor: default;
  }
  .content {
    position: absolute;
    top: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Concourse C6 Tab", sans-serif;
    max-width: 350;
  }
  .title {
    color: #ddd;
    font-size: 38px;
    margin: 0;
  }
  .gamearea {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Concourse C6 Tab", sans-serif;
    max-width: 350;
  }
  .rule {
    width: 350px;
    border-bottom: 1px solid #555;
    margin-top: 4px;
    margin-bottom: 24px;
  }
</style>
