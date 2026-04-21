# Performance Degradation Improvement Plans

## Scope

This document proposes concrete fixes for the three main likely causes in
`performance-degradation-analysis.md`. Each plan includes a goal, approach,
validation, and overlap notes.

## Plan 1: Stop accumulating render loops and timers

Goal: ensure per-image video/canvas loops do not pile up over time.

Targets:
- `src/renderer/components/player/ImageView.tsx` (`_timeouts`, `videoLoop`,
  `drawLoop`, `extraDrawLoop`, `extraBGDrawLoop`)

Approach:
- Call `clearTimeouts()` at the start of `_applyImage` when switching images
  (before new loops start), not only on unmount.
- Replace `setTimeout` draw loops with `requestAnimationFrame` where practical,
  using one cancelable handle per loop.
- Cache canvas contexts per grid cell (store refs when canvases are created)
  to avoid `document.getElementsByClassName` per frame.
- Ensure loops exit when elements are not visible (opacity 0, paused, or
  removed) and avoid creating new timers in that state.

Overlap:
- Reduces canvas redraw pressure in Plan 2.

Validation:
- Add temporary counters for active loop handles in `ImageView` and verify the
  count remains stable across image changes.
- Run a 10+ minute scene and confirm no progressive stutter.

## Plan 2: Reduce canvas redraw load for grids and blurred backgrounds

Goal: reduce per-frame work for video/GIF rendering on grids and blur.

Targets:
- `src/renderer/components/player/ImageView.tsx` (blur + grid canvas loops)
- Config option `cloneGridVideoElements` (`src/renderer/data/Config.tsx`)

Approach:
- Prefer `cloneGridVideoElements` to avoid canvas-based video cloning when
  possible.
- For blur backgrounds on video/GIF, downscale the blur canvas and/or update
  less frequently (e.g., 50-100ms) instead of 20ms.
- Avoid per-frame DOM queries inside draw loops; reuse cached node lists or
  refs created during canvas setup.
- Consider skipping blur rendering for low-motion scenes or when cross-fade
  is active to reduce overlapping work.

Overlap:
- Shares loop and caching changes with Plan 1.

Validation:
- Compare frame time in DevTools Performance before/after.
- Compare stutter with blur enabled vs. disabled and confirm improvement.

## Plan 3: Tear down old media elements when trimming history

Goal: stop hidden videos/GIFs from consuming decoder/GPU resources.

Targets:
- `src/renderer/components/player/ImagePlayer.tsx` (history trimming path)

Approach:
- When trimming `historyPaths`, explicitly:
  - `pause()` videos
  - remove `on*` event handlers
  - set `src = ""` and call `load()` to release resources
  - then `remove()` the element
- Consider reducing defaults for `maxInHistory`/`maxInMemory` for heavy scenes
  or make them dynamic based on media type.

Overlap:
- Helps Plan 1 by reducing active media nodes that might still have loops.

Validation:
- Track number of `HTMLVideoElement` and `HTMLCanvasElement` nodes and confirm
  it stays bounded.
- Confirm memory and stutter do not grow after 10+ minutes.

## Implementation order

1) Plan 1 loop cleanup (likely the biggest cumulative stutter driver)
2) Plan 2 redraw reductions (lower ongoing GPU/CPU cost)
3) Plan 3 teardown improvements (resource leak prevention)

## Risks and mitigations

- Visual changes from reducing blur/update frequency: add a setting to control
  blur refresh rate and default conservatively.
- Behavior changes for cross-fade/overlay timing: validate with scenes that
  use cross-fade and overlay to avoid regressions.
- If `requestAnimationFrame` is used, verify it does not desync video timing.

## Suggested instrumentation (temporary)

- Active loop counters in `ImageView` (videoLoop/drawLoop).
- Count of live `HTMLVideoElement` and `HTMLCanvasElement` nodes.
- Frame time sampling (DevTools performance or `performance.now()` deltas).
- Optional: log loop count every N seconds to the dev console for long runs.

## Acceptance criteria

- A 10+ minute playback session with GIFs/videos shows no progressive stutter.
- Loop counters remain stable across image changes and scene transitions.
- Live video/canvas node counts stay bounded by config limits.
