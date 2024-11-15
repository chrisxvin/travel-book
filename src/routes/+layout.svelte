<script module>
import "@mdi/font/css/materialdesignicons.min.css";

import "../app.css";
import "./styles.css";
</script>

<script lang="ts">
import Header from "./Header.svelte";

interface IProps {
    children?: any;
}
let { children }: IProps = $props();
</script>

<div class="app">
    <Header />

    <main class="container-sm">
        <!-- <slot /> -->
        {@render children?.()}
    </main>

    <footer>
        <p>This is a footer. App is built by SvelteKit, with love from Kitty H, meow.</p>
    </footer>
</div>

<style>
.app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

main {
    flex: 1;
    display: flex;
    flex-direction: column;
    /* padding: 1rem; */
    width: 100%;
    /* max-width: 64rem; */
    margin: 0 auto;
    box-sizing: border-box;
}

footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
}

footer a {
    font-weight: bold;
}

@media (min-width: 480px) {
    footer {
        padding: 12px 0;
    }
}
</style>
