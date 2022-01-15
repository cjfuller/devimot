<script lang="ts">
  import type { Colors } from "./core";
  import Container from "./Container.svelte";
  export let colors: Colors;
  export let onClose: () => void;
  export let changeColors: (newColors: Colors) => void;
</script>

<Container {onClose} title="Paramètres">
  <div class="spacer" />
  <div class="left">
    <input
      type="checkbox"
      id="color-scheme"
      name="color-scheme"
      checked={colors === "cb-friendly"}
      on:input={(e) => {
        console.log(e);
        e.target?.checked ? changeColors("cb-friendly") : changeColors("standard");
      }}
    />
    <label for="color-scheme"> Utiliser couleurs pour daltonisme </label>
  </div>
  <div class="dynamic-spacer" />
  <div class="rule" />
  <div class="technical-info">
    <p>
      Codé par Colin Fuller à Montréal.<br />
      Basé sur l'excellent <a href="https://powerlanguage.co.uk/wordle" target="_blank">Wordle</a>
      (en anglais) de Josh Wardle.<br />
      <a href="https://github.com/cjfuller/devimot" target="_blank">Source ouverte à Github.</a>
    </p>
    <p>
      Icônes faites par <a href="https://remixicon.com" target="_blank">Remix Icon</a>.
    </p>
    <p>
      Liste de mots adaptée de <a
        href="https://www.freelang.com/dictionnaire/dic-francais.php"
        target="_blank">freelang</a
      >.
    </p>
  </div>
</Container>

<style>
  a {
    color: #59c;
    text-decoration: none;
  }
  @font-face {
    font-family: "Concourse T3 Tab";
    src: url("/concourse_t3_tab_regular.woff2") format("woff2");
  }
  .left {
    text-align: left;
    width: 100%;
  }
  .dynamic-spacer {
    flex-grow: 1;
  }
  .rule {
    border-bottom: 1px solid #555;
    margin-top: 4px;
    margin-bottom: 4px;
    min-width: 350px;
    max-width: 400px;
    width: 100%;
  }
  .spacer {
    margin-bottom: 24px;
  }
  .technical-info {
    text-align: left;
    width: 100%;
  }
</style>
