<script lang="ts">
  import type { Colors } from "./core";
  import Container from "./Container.svelte";
  import Row from "./Row.svelte";
  export let colors: Colors;
  export let onClose: () => void;
</script>

<Container {onClose} title="Comment jouer?">
  <div class="body">
    <p>Devinez le mot caché dans 6 essais.</p>

    <p>
      Chaque essai doit être un mot valide de 5 lettres. Appuyez sur «Enter» pour soumettre un mot.
    </p>

    <p>
      Après chaque essai, les couleurs des boîtes changeront pour indiquer si des lettres sont
      proches aux lettres du mot caché.
    </p>

    <p>
      Prenez note que les lettres aux accents sont considerés comme lettres complètement distinctes.
    </p>

    <div class="rule" />

    <p>Par example:</p>
    <Row
      guess="coeur"
      active={false}
      statuses={["exact", "non", "non", "non", "non"]}
      {colors}
      handleGuess={(g) => null}
      boxSize={45}
      fontSize={28}
    />
    La lettre «c» est dans le mot caché et à l'endroit correct.

    <div class="spacer" />
    <Row
      guess="sauté"
      active={false}
      statuses={["non", "non", "non", "non", "ailleurs"]}
      {colors}
      handleGuess={(g) => null}
      boxSize={45}
      fontSize={28}
    />
    La lettre «é» est dans le mot caché, mais à un autre endroit.

    <div class="spacer" />
    <Row
      guess="glace"
      active={false}
      statuses={["non", "exact", "exact", "exact", "exact"]}
      {colors}
      handleGuess={(g) => null}
      boxSize={45}
      fontSize={28}
    />
    La lettre «g» ne se trouve pas dans le mot caché.
    <p />
    <div class="rule" />
    <div class="spacer" />
    Un nouveau puzzle sera disponible chaque jour!
  </div>
</Container>

<style>
  .spacer {
    margin-bottom: 24px;
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
