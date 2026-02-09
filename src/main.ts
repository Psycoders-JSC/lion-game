import { Assets } from "pixi.js";

import { setEngine } from "./app/getEngine";
import { StartScreen } from "./app/screens/StartScreen";
import { userSettings } from "./app/utils/userSettings";
import { CreationEngine } from "./engine/engine";

/**
 * Importing these modules will automatically register there plugins with the engine.
 */
import "@pixi/sound";
// import "@esotericsoftware/spine-pixi-v8";

// Create a new creation engine instance
const engine = new CreationEngine();
setEngine(engine);

(async () => {
  // Initialize the creation engine instance
  await engine.init({
    background: "#0a0a2e",
    resizeOptions: { minWidth: 360, minHeight: 640, letterbox: true },
    resizeTo: document.getElementById("pixi-container") ?? window,
  });

  // Initialize the user settings
  userSettings.init();

  // Load assets with progress shown on generic HTML overlay
  const loadOverlay = document.getElementById("load-overlay");
  const progressFill = document.getElementById("loadProgressFill");
  const updateProgress = (pct: number) => {
    if (progressFill) progressFill.style.width = `${pct}%`;
  };

  await Assets.loadBundle(["game", "main"], (progress) => {
    updateProgress(progress * 100);
  });
  updateProgress(100);

  loadOverlay?.classList.add("hidden");
  await engine.navigation.showScreen(StartScreen);
})();
