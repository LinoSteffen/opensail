import { Versions } from "$lib/data/versions.svelte.js";
import { FetchManifest } from "$lib/adapter/manifest/manifest.js";

export let Manifest = CreateManifest();

export function CreateManifest() {
  /** @type {import("$lib/adapter/manifest/manifest.js").ManifestConfig | null} */
  let manifest = $state(null);

  /** @type {string} */
  let manifestException = $state("");

  return {
    get manifest() { return manifest },
    error: () => { return manifestException },
    load: async (/** @type {string} */ version) => {
      if (!version) return;
      try {
        manifestException = "";
        manifest = null;
        manifest = await FetchManifest(version);
      } catch (/** @type {any} */ err) {
        manifestException = err.message;
      }
    }
  }
}