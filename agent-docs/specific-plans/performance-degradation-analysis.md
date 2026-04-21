# Performance Degradation Analysis

## Prompt

So a problem I'm having with the application (before we made any changes to it) is that scene performance starts to degrade after several minutes. Specifically, when playing scenes with many animated gifs and videos, I'll see stuttering and lag in the playing of the videos and gifs, and also in the application of effects (zoom, back+forth, scene overlay, etc) to the scene itself. It won't be there immediately, but will start to show up after about 5-10 minutes of playing. Despite the visual performance issues, the Task Manager reports that the app is not hitting any limits in CPU or memory - it consumes around 25-30% CPU and a couple gigs of memory, nothing crazy on a machine with 16GB of RAM or more. Please analyze the application and the technologies it runs on, come up with several suggestions for the root cause of this performance degradation, then, using a deep analysis of the code base, consulting relevant online resources, and running internal simulations, present what you think are the three most likely causes in detail.

## Response

I did a code‑level deep dive of the renderer/player path and focused on the GIF/video pipeline. I didn’t run runtime simulations (would need real media + GPU profiling) and I didn’t access the web from this environment; if you want external sources cited or a live profiling run, tell me and I’ll do that. Based on the code, here are the most likely causes of the gradual stutter, plus a few secondary suspects.

Other plausible causes (short list)
- GPU process pressure (Chromium/Electron) doesn’t show up as high CPU/RAM in Task Manager; you can see stutter even at 25–30% CPU.
- Effects stacking (blur + zoom + panning + overlays) increases compositing load; performance can degrade as more layers accumulate.
- GIF decoding is CPU‑heavy and often main‑thread bound; combining with canvas draws makes it worse.

Top 3 most likely causes (with code evidence)

1) Timeout‑driven video/canvas loops accumulate and are not fully cleared
- Evidence: ImageView sets videoLoop, drawLoop, extraDrawLoop, extraBGDrawLoop, each scheduling a new setTimeout every 20–100ms and pushing into _timeouts (src/renderer/components/player/ImageView.tsx:116-160).
- _timeouts are only cleared on unmount (componentWillUnmount) or in one blur‑specific branch (if (!scene.crossFade) clearTimeouts() at ImageView.tsx:215-216). There’s no general cleanup when the image changes.
- Why it matches: Each new image/video can start more looping timeouts. After 5–10 minutes (hundreds of frames), these accumulate and keep the renderer thread busy, causing stutter without maxing overall CPU.
- Likely fix: Clear timeouts on image change (e.g., at start of _applyImage), or move loops to requestAnimationFrame with cancellation. Also cache canvas contexts rather than repeatedly querying document.getElementsByClassName.

2) Canvas‑based video cloning + blurred background redraws are heavy and scale with grid/overlays
- Evidence: For grid video clones and blurred backgrounds, the code draws frames into canvases every 20ms (ImageView.tsx:138-160, ImageView.tsx:220-250, ImageView.tsx:430-520).
- It also repeatedly calls document.getElementsByClassName inside the draw loops (ImageView.tsx:144-159), which is expensive at 50fps *per loop*.
- Why it matches: With multiple videos/gifs and grids, you can get N×50fps canvas draws. Even if CPU isn’t maxed, the renderer thread becomes frame‑bound and effects stutter.
- Likely fix/mitigation:
  - Enable cloneGridVideoElements (avoid canvas draw for grid clones)
  - Avoid blur on videos/gifs (or lower resolution)
  - Reduce grid size/overlays
  - Lower draw rate (e.g., 50ms) or use requestAnimationFrame

3) History keeps many video/GIF elements alive without explicit teardown
- Evidence: ImagePlayer.advance appends each element into historyPaths and only trims after maxInHistory (default 120) by calling .remove() (src/renderer/components/player/ImagePlayer.tsx:1045-1047, defaults in src/renderer/data/Config.tsx:580-582).
- There is no explicit pause() or src="" cleanup for videos when removed from history, and continueVideo can keep reusing old video elements (ImagePlayer.tsx:1033-1039).
- Why it matches: Many HTMLVideoElements/GIFs can keep decoders and GPU memory active even if not visible. Over time this can fragment resources and cause stutter without a dramatic CPU/RAM spike.
- Likely fix: When trimming history, explicitly pause(), remove event handlers, and set src = "" before remove(); or lower maxInHistory / maxInMemory for heavy scenes.

How to validate quickly
- DevTools Performance: look for long tasks and many timers; watch “JS Heap” and “DOM Nodes”.
- Toggle settings: disable blur, reduce overlays/grid, enable cloneGridVideoElements, reduce maxInHistory/maxInMemory.
- If stutter disappears, it strongly supports causes 1–3.

If you want, I can:
1) add instrumentation to count active timeouts/loops per frame
2) prototype a cleanup fix in ImageView and ImagePlayer
3) run a targeted profiler session and summarize traces
