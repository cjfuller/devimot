<script lang="ts">
  import { v4 as uuidv4 } from "uuid";
  export let letter: string | null = null;
  export let active: boolean = false;
  export let colors: "standard" | "cb-friendly";

  import type { Status } from "./core";
  export let status: Status = "inconnu";
  export let onLetterChange: (newLetter: string | null) => void;
  export let onClearPrevious: () => void = () => null;
  export let onEnter: () => void;
  export let id: string | undefined = undefined;
  export let boxSize: number = 65;
  export let fontSize: number = 38;
  export let tweakVertical: number = 5;
  export let unknownColor: string = "#111";
  const idForLabel = uuidv4();
  $: cssVars = `--box-size:${boxSize}px;--font-size:${fontSize}px;--tweak:${tweakVertical}px;--unknown:${unknownColor};`;
  $: label =
    letter == null || letter === "" || letter === " "
      ? "vide, statut: inconnu"
      : `lettre: ${letter}, statut: ${status}`;

  const handleInput = (e) => {
    let letter = e.target.value;
    if (letter === "" || letter === " ") {
      letter = null;
    }
    letter = letter?.toLowerCase();
    if (letter !== null) {
      onLetterChange(letter);
      const inputs = document.getElementsByTagName("input");
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i] === document.activeElement) {
          if (inputs[i + 1]) {
            e.preventDefault();
            inputs[i + 1].focus();
          }
          break;
        }
      }
    }
  };

  const handleKeyUp = (e) => {
    if ((e.key === "Enter" || e.key === "Return") && active) {
      e.preventDefault();
      onEnter();
    } else if (e.key === "Backspace" && active) {
      if (letter == null || letter === "" || letter === " ") {
        const inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
          if (inputs[i] === document.activeElement) {
            if (inputs[i - 1]) {
              inputs[i - 1].focus();
              onClearPrevious();
            }
            break;
          }
        }
      } else {
        onLetterChange(null);
      }
    }
  };
</script>

<span id={idForLabel} hidden>
  {label}
</span>
<input
  aria-labelledby={idForLabel}
  autocapitalize="off"
  autocomplete="off"
  style={cssVars}
  {id}
  class={`box dark-mode ${status} ${colors}`}
  disabled={!active}
  maxlength="1"
  type="text"
  value={letter}
  on:keyup={handleKeyUp}
  on:input={handleInput}
/>

<style>
  .box {
    opacity: 1;
    -webkit-opacity: 1;
    font-family: "Concourse C6 Tab", sans-serif;
    font-size: var(--font-size);
    padding-bottom: var(--tweak);
    min-width: 25px;
    min-height: 25px;
    max-width: var(--box-size);
    max-height: var(--box-size);
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 1px solid #555;
    margin-left: 2px;
    margin-right: 2px;
    text-align: center;
  }
  .inconnu {
    background-color: var(--unknown);
    color: #ddd;
  }
  .non {
    color: #ddd;
    background-color: #111;
  }
  .ailleurs.standard {
    color: #fff;
    background-color: #981;
  }
  .ailleurs.cb-friendly {
    color: #fff;
    background-color: #69e;
  }
  .exact.standard {
    color: #fff;
    background-color: #193;
  }
  .exact.cb-friendly {
    color: #fff;
    background-color: #e96;
  }
</style>
