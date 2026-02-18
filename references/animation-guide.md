# Animation & Timing Guide

Rules for screen transitions, timing, and visual polish.

---

## Screen Display Durations

Assign duration based on screen complexity:

| Screen Type | Duration | Rationale |
|---|---|---|
| Landing / Hero | 3000ms | Logo bounce + card fan-out + CTA pulse need time |
| Auth form | 3500ms | Typing animations in fields need ~2.5s to complete |
| Profile / Form | 4000ms | Skills pop-in sequence + resume pulse |
| Card Feed (hero screen) | 4500ms | Ring fill + bar grow + swipe gesture = most animated screen |
| List View | 3000ms | Scannable at a glance |
| Detail View | 3500ms | Reading description + metrics |
| Chat | 4000ms | Messages slide in sequentially with pauses between |
| Dashboard | 3500ms | Stats + activity to scan |
| Success / Modal | 3500ms | Bounce + confetti + heart beat need time to land |
| Empty State | 2500ms | Simple message |

Provide these as a JS array: `[2500, 3000, 3500, 4000, ...]`

---

## Transition Selection

Choose transition based on the **relationship** between screens:

| Transition | When to Use | Visual Effect |
|---|---|---|
| `fade` | First screen entry, context switch between app sections | Cross-fade opacity |
| `slide-left` | Forward navigation in a linear flow (default choice) | New screen slides in from right |
| `slide-right` | Going back (rarely used in demos) | New screen slides in from left |
| `zoom-in` | Opening a detail view, focusing on an item | Scale up from 85% with fade |
| `slide-up` | Modal, overlay, bottom sheet, success popup | Slides up from bottom |

**Defaults:**
- Screen 1 (landing): always `fade`
- Screens 2-N in a linear flow: `slide-left`
- Detail/zoom screens: `zoom-in`
- Modals/celebrations: `slide-up`
- Dashboard or section switch: `fade`

---

## Staggered Element Animation

Elements with class `.s-animate` fade in sequentially when their parent screen becomes active.

Timing per element:
- 1st element: 50ms delay
- 2nd element: 120ms delay
- 3rd element: 190ms delay
- Each subsequent: +70ms

This creates a "building up" effect that guides the viewer's eye from top to bottom.

**Best practices:**
- Apply `.s-animate` only to direct children of the screen or major content sections
- Don't animate more than 8 elements per screen — too many delays feels slow
- The animation itself is 500ms `fadeInUp` (opacity 0→1, translateY 16px→0)
- Elements that should appear together (e.g., a row of badges) should be wrapped in a single `.s-animate` parent

---

## Loop Behavior

After the last screen completes its display duration:
1. Wait an extra 1500ms (pause at the end)
2. Transition to screen 0 using `fade` (regardless of screen 0's configured transition)
3. This creates a seamless infinite loop

The progress bar resets and the loop counter is invisible to the user.

---

## Visual Polish Tips

### Screen entry feel
- The combination of screen transition + staggered element animation creates a layered effect:
  - First the screen slides/fades in (~600ms)
  - Then elements appear one by one (~50-550ms after screen enters)
  - Total "settle" time: ~1.2s before the screen feels complete

### Progress bar
- Use a gradient fill (`linear-gradient(90deg, var(--app-primary), var(--app-accent))`) for visual interest
- Animate with Web Animations API for smooth, pausable progress
- Width goes from 0% to 100% over the screen's display duration

### Dot indicators
- Active dot: scale(1.4) + primary color + subtle glow shadow
- Inactive dots: small, dim — don't compete for attention
- Transition: 300ms ease for smooth dot switching

### Caption transitions
- Fade opacity over 400ms
- Keep caption area a fixed height to prevent layout shift
- Use `<strong>` to highlight key words in captions

### Dark background
- The demo page background (`#0f0f23`) makes the phone frame the clear focal point
- The phone frame shadow (0 30px 80px) creates depth
- Controls and captions use low-opacity white for a subtle, premium feel

---

## Rich In-Screen Animations

Beyond staggered fade-in, use these to make components come alive within each screen:

| Animation Class | Effect | Best For |
|---|---|---|
| `.s-bounce-in` | Scale 0→1.08→0.95→1 with bounce | Logos, modals, celebration elements |
| `.s-pop-in` + `.s-pop-seq-N` | Scale 0→1.15→1, sequential | Badges, tags, skill pills |
| `.s-type-in` + `.s-type-delay-N` | Width grows with blinking cursor | Input field values being "typed" |
| `.s-ring-fill` | SVG stroke-dashoffset animates | Compatibility rings, progress circles |
| `.s-bar-grow` + `.s-bar-seq-N` | scaleY 0→1, sequential from bottom | Urgency bars, signal strength |
| `.s-swipe-right` | translateX + rotate 15deg, fades out | Card swiping gesture |
| `.s-msg-in .s-msg-received` | Slides in from left | Received chat messages |
| `.s-msg-in .s-msg-sent` | Slides in from right | Sent chat messages |
| `.s-typing-dots` | Three bouncing dots | Typing indicator between messages |
| `.s-pulse-glow` | Box-shadow pulses | CTA buttons, upload areas |
| `.s-fan-left` / `.s-fan-right` | Cards rotate apart from stack | Stacked card illustrations |
| `.s-scale-in` | Scale 0.5→1 with fade | Avatars, modal sub-elements |
| `.s-heart-beat` | Double-pulse scale | Heart icons in match screens |
| `.s-confetti` | Particles fall + rotate from top | Celebration/success screens |

### Per-Screen Animation Recipe

**Landing screen:**
- Logo: `.s-bounce-in` (delay 0.1s)
- Card stack: `.s-fan-left` + `.s-fan-right` (delay 0.3s)
- CTA button: `.s-pulse-glow` (delay 0.8s, infinite)

**Auth/Registration screen:**
- Input values: `.s-type-in` with staggered `.s-type-delay-N`
- Submit button: `.s-pulse-glow` after typing completes

**Profile Setup screen:**
- Avatar: `.s-bounce-in` (delay 0.2s)
- Skill tags: `.s-pop-in` + `.s-pop-seq-N` (delays 0.6-1.2s)
- Upload area: `.s-pulse-glow` (delay 1.5s)

**Card Feed / Swipe screen:**
- Badges: `.s-pop-in` + `.s-pop-seq-N`
- Compatibility ring (SVG): `.s-ring-fill` (delay 0.6s, 1.2s duration)
- Score number: JS counter from 0% to target (30ms interval)
- Urgency bars: `.s-bar-grow` + `.s-bar-seq-N` (delays 1.4-1.85s)
- Card swipe: `.s-swipe-right` (delay 3.2s) — the climax

**Match / Success screen:**
- Confetti: `.s-confetti` particles at various positions (delays 0.2-0.8s)
- Modal: `.s-bounce-in` (delay 0.15s)
- Ribbon text: `.s-scale-in` (delay 0.4s)
- Avatars: `.s-scale-in` (delays 0.6s, 0.8s)
- Heart: `.s-heart-beat` (delay 0.4s, infinite)
- CTA: `.s-pulse-glow`

**Chat screen:**
- Messages: `.s-msg-in .s-msg-received` / `.s-msg-sent` + `.s-msg-seq-N` (delays 0.3-2.5s)
- Typing indicator: `.s-typing-show` between received messages
- Input bar: `.s-animate` (delay 3s, appears last)

### Timing Rule

When a screen has rich animations, **increase its display duration** to let all animations complete before transitioning. The longest animation chain in a screen should finish at least 500ms before the screen transitions away.
