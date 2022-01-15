<script lang="ts">
  export let onClose: () => void;
  export let title: string;
</script>

<div class="container">
  <button class="close" on:click={onClose} aria-labelledby="close-label">
    <span id="close-label" hidden>Fermer</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentcolor"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      focusable="false"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
      />
    </svg>
  </button>
  <div class="title">
    {title}
  </div>
  <div class="rule" />
  <slot />
</div>

<style>
  .title {
    font-family: "Concourse C6 Tab", sans-serif;
    font-size: 24px;
  }
  .container {
    color: #ddd;
    font-size: 16px;
    font-family: "Concourse T3 Tab", sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    max-height: 90vh;
    min-height: 75vh;
    min-width: 350px;
    max-width: 400px;
  }
  .rule {
    width: 400px;
    border-bottom: 1px solid #555;
    margin-top: 4px;
    margin-bottom: 4px;
  }
  .close {
    background-color: rgba(0, 0, 0, 0);
    color: #ddd;
    border: none;
    position: absolute;
    right: 0px;
    cursor: pointer;
  }
</style>
