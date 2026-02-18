# HTML Template Specification

This document defines the complete self-contained HTML/CSS/JS template for the phone mockup walkthrough.
You MUST use this as the skeleton for every generated demo. Customize only the parts marked with `{PLACEHOLDER}`.

## Complete HTML Structure

```html
<!DOCTYPE html>
<html lang="{LANG}" dir="{DIR}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{APP_NAME} — Demo Walkthrough</title>
  <style>
    /* ============================================
       RESET & BASE
       ============================================ */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--demo-bg);
      color: var(--demo-text);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-x: hidden;
    }

    /* ============================================
       THEME VARIABLES — injected from project
       ============================================ */
    :root {
      /* Project colors — REPLACE with actual values from codebase analysis */
      --app-primary: {PRIMARY_COLOR};
      --app-primary-light: {PRIMARY_LIGHT};
      --app-primary-dark: {PRIMARY_DARK};
      --app-accent: {ACCENT_COLOR};
      --app-success: {SUCCESS_COLOR};
      --app-error: {ERROR_COLOR};
      --app-bg: {BG_COLOR};
      --app-text: {TEXT_COLOR};

      /* Demo chrome — do NOT change */
      --demo-bg: #0f0f23;
      --demo-text: #e2e8f0;
      --frame-color: #000000;
      --frame-shadow: rgba(0, 0, 0, 0.5);

      /* Timing */
      --screen-duration: 3s;
      --transition-duration: 0.6s;
    }

    /* ============================================
       DEMO CONTAINER
       ============================================ */
    .demo-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem 1rem;
      gap: 24px;
      max-width: 100%;
    }

    .demo-header {
      text-align: center;
      margin-bottom: 8px;
    }

    .demo-header h1 {
      font-size: 28px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 4px;
    }

    .demo-header p {
      font-size: 15px;
      color: rgba(255,255,255,0.5);
    }

    /* ============================================
       PHONE FRAME
       ============================================ */
    .phone-frame {
      position: relative;
      width: 375px;
      height: 812px;
      background: var(--frame-color);
      border-radius: 55px;
      padding: 12px;
      box-shadow:
        0 0 0 2px #333,
        0 0 0 5px #1a1a1a,
        0 30px 80px var(--frame-shadow);
      overflow: hidden;
      flex-shrink: 0;
    }

    .phone-inner {
      width: 100%;
      height: 100%;
      border-radius: 43px;
      overflow: hidden;
      position: relative;
      background: var(--app-bg);
    }

    /* Dynamic Island */
    .phone-island {
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      width: 126px;
      height: 37px;
      background: #000;
      border-radius: 24px;
      z-index: 20;
    }

    /* Status Bar */
    .phone-status-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 28px 0;
      height: 54px;
      position: relative;
      z-index: 15;
    }

    .status-time {
      font-size: 16px;
      font-weight: 600;
      color: white;
      mix-blend-mode: difference;
    }

    .status-icons {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .status-icons svg {
      width: 18px;
      height: 18px;
      fill: white;
      mix-blend-mode: difference;
    }

    /* Home Indicator */
    .phone-home-bar {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 134px;
      height: 5px;
      background: rgba(255,255,255,0.3);
      border-radius: 3px;
      z-index: 15;
    }

    /* ============================================
       SCREEN VIEWPORT & TRANSITIONS
       ============================================ */
    .screen-viewport {
      position: relative;
      width: 100%;
      height: calc(100% - 54px);
      overflow: hidden;
    }

    .screen {
      position: absolute;
      inset: 0;
      opacity: 0;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
      transform: translateX(0);
      will-change: transform, opacity;
    }

    .screen.active {
      opacity: 1;
      pointer-events: auto;
      z-index: 2;
    }

    .screen.exiting {
      z-index: 1;
    }

    /* Transition: Slide Left (forward navigation) */
    .screen.slide-left-enter {
      transform: translateX(100%);
      opacity: 1;
    }
    .screen.slide-left-enter.active {
      transform: translateX(0);
      transition: transform var(--transition-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .screen.slide-left-exit {
      transform: translateX(0);
      opacity: 1;
    }
    .screen.slide-left-exit.exiting {
      transform: translateX(-30%);
      opacity: 0.5;
      transition: transform var(--transition-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  opacity var(--transition-duration) ease;
    }

    /* Transition: Slide Right (backward navigation) */
    .screen.slide-right-enter {
      transform: translateX(-100%);
      opacity: 1;
    }
    .screen.slide-right-enter.active {
      transform: translateX(0);
      transition: transform var(--transition-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .screen.slide-right-exit {
      transform: translateX(0);
      opacity: 1;
    }
    .screen.slide-right-exit.exiting {
      transform: translateX(30%);
      opacity: 0.5;
      transition: transform var(--transition-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  opacity var(--transition-duration) ease;
    }

    /* Transition: Fade (context switch) */
    .screen.fade-enter {
      opacity: 0;
    }
    .screen.fade-enter.active {
      opacity: 1;
      transition: opacity var(--transition-duration) ease;
    }
    .screen.fade-exit.exiting {
      opacity: 0;
      transition: opacity var(--transition-duration) ease;
    }

    /* Transition: Zoom In (detail view) */
    .screen.zoom-in-enter {
      transform: scale(0.85);
      opacity: 0;
    }
    .screen.zoom-in-enter.active {
      transform: scale(1);
      opacity: 1;
      transition: transform var(--transition-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  opacity var(--transition-duration) ease;
    }
    .screen.zoom-in-exit.exiting {
      transform: scale(1.1);
      opacity: 0;
      transition: transform var(--transition-duration) ease,
                  opacity var(--transition-duration) ease;
    }

    /* Transition: Slide Up (modal/overlay) */
    .screen.slide-up-enter {
      transform: translateY(100%);
      opacity: 1;
    }
    .screen.slide-up-enter.active {
      transform: translateY(0);
      transition: transform var(--transition-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .screen.slide-up-exit.exiting {
      transform: translateY(100%);
      transition: transform var(--transition-duration) ease;
    }

    /* ============================================
       SCREEN CONTENT PRIMITIVES
       Use these classes inside screen content.
       ============================================ */

    /* Gradient background fills the whole screen */
    .s-gradient-bg {
      background: linear-gradient(135deg, var(--app-primary), var(--app-primary-dark));
      min-height: 100%;
      display: flex;
      flex-direction: column;
    }

    /* White background */
    .s-white-bg {
      background: var(--app-bg);
      min-height: 100%;
      display: flex;
      flex-direction: column;
    }

    /* Header bar */
    .s-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px 12px;
      font-size: 18px;
      font-weight: 700;
      color: var(--app-text);
    }

    .s-header-light {
      color: white;
    }

    .s-header-title {
      font-size: 24px;
      font-weight: 800;
    }

    /* Card */
    .s-card {
      background: white;
      border-radius: 20px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      padding: 24px;
      margin: 8px 16px;
    }

    .s-card-hero {
      background: white;
      border-radius: 24px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.12);
      padding: 24px;
      margin: 8px 16px;
      flex: 1;
    }

    /* Badge / Pill */
    .s-badge {
      display: inline-flex;
      align-items: center;
      padding: 5px 14px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
      background: rgba(108, 92, 231, 0.1);
      color: var(--app-primary);
      gap: 4px;
    }

    .s-badge-accent {
      background: rgba(255, 107, 129, 0.1);
      color: var(--app-accent);
    }

    .s-badge-success {
      background: rgba(34, 197, 94, 0.1);
      color: var(--app-success);
    }

    .s-badge-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    /* Button */
    .s-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 28px;
      border-radius: 999px;
      font-weight: 700;
      font-size: 16px;
      border: none;
      cursor: default;
      gap: 8px;
    }

    .s-btn-primary {
      background: var(--app-primary);
      color: white;
    }

    .s-btn-accent {
      background: var(--app-accent);
      color: white;
    }

    .s-btn-outline {
      background: transparent;
      border: 2px solid rgba(255,255,255,0.3);
      color: white;
    }

    .s-btn-full {
      width: 100%;
    }

    .s-btn-sm {
      padding: 10px 20px;
      font-size: 14px;
    }

    /* Input */
    .s-input {
      width: 100%;
      padding: 14px 18px;
      border: 2px solid #e5e7eb;
      border-radius: 14px;
      font-size: 15px;
      background: white;
      color: #9ca3af;
    }

    .s-input-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .s-label {
      font-size: 13px;
      font-weight: 600;
      color: #6b7280;
      margin-bottom: 4px;
    }

    /* Avatar */
    .s-avatar {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 18px;
      flex-shrink: 0;
    }

    .s-avatar-round {
      border-radius: 50%;
    }

    .s-avatar-lg {
      width: 72px;
      height: 72px;
      font-size: 28px;
    }

    /* Bottom navigation bar */
    .s-bottom-nav {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 12px 16px 24px;
      background: white;
      border-top: 1px solid #f3f4f6;
      margin-top: auto;
    }

    .s-nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: #9ca3af;
    }

    .s-nav-item.active {
      color: var(--app-primary);
    }

    .s-nav-item svg {
      width: 22px;
      height: 22px;
    }

    /* Circle action buttons (like swipe) */
    .s-action-buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      padding: 16px;
    }

    .s-action-circle {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      border: none;
      cursor: default;
    }

    .s-action-circle svg {
      width: 24px;
      height: 24px;
    }

    .s-action-circle-lg {
      width: 72px;
      height: 72px;
    }

    .s-action-circle-lg svg {
      width: 32px;
      height: 32px;
    }

    /* Compatibility Ring */
    .s-compat-ring {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 16px;
      position: relative;
    }

    .s-compat-ring::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 4px solid #e5e7eb;
    }

    .s-compat-ring::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 4px solid transparent;
      border-top-color: var(--app-primary);
      border-right-color: var(--app-primary);
    }

    /* Chat bubble */
    .s-chat-bubble {
      max-width: 75%;
      padding: 12px 16px;
      border-radius: 20px;
      font-size: 14px;
      line-height: 1.4;
      margin-bottom: 8px;
    }

    .s-chat-sent {
      background: var(--app-primary);
      color: white;
      align-self: flex-end;
      border-bottom-right-radius: 6px;
    }

    .s-chat-received {
      background: #f3f4f6;
      color: #374151;
      align-self: flex-start;
      border-bottom-left-radius: 6px;
    }

    .s-chat-input-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px 28px;
      background: white;
      border-top: 1px solid #f3f4f6;
      margin-top: auto;
    }

    .s-chat-input {
      flex: 1;
      padding: 10px 16px;
      border-radius: 24px;
      border: 1.5px solid #e5e7eb;
      font-size: 14px;
      color: #9ca3af;
    }

    /* List item */
    .s-list-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 20px;
      border-bottom: 1px solid #f3f4f6;
    }

    .s-list-item-content {
      flex: 1;
      min-width: 0;
    }

    .s-list-item-title {
      font-size: 15px;
      font-weight: 600;
      color: #1f2937;
    }

    .s-list-item-subtitle {
      font-size: 13px;
      color: #9ca3af;
      margin-top: 2px;
    }

    /* Spacer & layout helpers */
    .s-spacer { flex: 1; }
    .s-center { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
    .s-gap-sm { gap: 8px; }
    .s-gap-md { gap: 16px; }
    .s-gap-lg { gap: 24px; }
    .s-px { padding-left: 20px; padding-right: 20px; }
    .s-py { padding-top: 16px; padding-bottom: 16px; }
    .s-mt-auto { margin-top: auto; }
    .s-text-white { color: white; }
    .s-text-muted { color: #9ca3af; }
    .s-text-sm { font-size: 13px; }
    .s-text-lg { font-size: 20px; }
    .s-text-xl { font-size: 28px; }
    .s-text-center { text-align: center; }
    .s-font-bold { font-weight: 700; }
    .s-font-extrabold { font-weight: 800; }
    .s-flex-row { display: flex; flex-direction: row; align-items: center; }
    .s-flex-col { display: flex; flex-direction: column; }

    /* ============================================
       STAGGERED ELEMENT ANIMATION
       Add .s-animate to elements inside screens.
       They fade in with staggered delays when active.
       ============================================ */
    .screen .s-animate {
      opacity: 0;
      transform: translateY(16px);
    }

    .screen.active .s-animate {
      animation: fadeInUp 0.5s ease forwards;
    }

    .screen.active .s-animate:nth-child(1) { animation-delay: 0.05s; }
    .screen.active .s-animate:nth-child(2) { animation-delay: 0.12s; }
    .screen.active .s-animate:nth-child(3) { animation-delay: 0.19s; }
    .screen.active .s-animate:nth-child(4) { animation-delay: 0.26s; }
    .screen.active .s-animate:nth-child(5) { animation-delay: 0.33s; }
    .screen.active .s-animate:nth-child(6) { animation-delay: 0.40s; }
    .screen.active .s-animate:nth-child(7) { animation-delay: 0.47s; }
    .screen.active .s-animate:nth-child(8) { animation-delay: 0.54s; }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    /* ============================================
       RICH IN-SCREEN ANIMATIONS
       These animate components WITHIN each screen
       for a more dynamic, app-like feel.
       ============================================ */

    /* Bounce In — for logos, modals, celebratory elements */
    @keyframes bounceIn {
      0% { opacity: 0; transform: scale(0.3); }
      50% { opacity: 1; transform: scale(1.08); }
      70% { transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1); }
    }
    .screen.active .s-bounce-in {
      opacity: 0;
      animation: bounceIn 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
    }

    /* Pop In — for badges, tags, small elements */
    @keyframes popIn {
      0% { opacity: 0; transform: scale(0); }
      70% { transform: scale(1.15); }
      100% { opacity: 1; transform: scale(1); }
    }
    .screen.active .s-pop-in { opacity: 0; animation: popIn 0.4s ease forwards; }
    .screen.active .s-pop-in:nth-child(1) { animation-delay: 0.6s; }
    .screen.active .s-pop-in:nth-child(2) { animation-delay: 0.72s; }
    .screen.active .s-pop-in:nth-child(3) { animation-delay: 0.84s; }
    .screen.active .s-pop-in:nth-child(4) { animation-delay: 0.96s; }
    .screen.active .s-pop-in:nth-child(5) { animation-delay: 1.08s; }
    .screen.active .s-pop-in:nth-child(6) { animation-delay: 1.20s; }

    /* Type In — simulates text being typed into an input */
    @keyframes typeIn {
      0% { width: 0; }
      100% { width: 100%; }
    }
    .s-type-in {
      overflow: hidden;
      white-space: nowrap;
      width: 0;
      border-right: 2px solid var(--app-primary);
    }
    .screen.active .s-type-in {
      animation: typeIn 1s steps(20) forwards, blink-cursor 0.6s step-end infinite;
    }
    @keyframes blink-cursor {
      50% { border-color: transparent; }
    }

    /* Ring Fill — animates SVG compatibility ring from 0 to target */
    @keyframes ringFill {
      from { stroke-dashoffset: var(--ring-circumference); }
      to { stroke-dashoffset: var(--ring-target-offset); }
    }
    .screen.active .s-ring-fill {
      animation: ringFill 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    /* Score Count Up — number counts up from 0 */
    .s-count-up {
      /* Handled via JS inline: uses CSS counter or data attribute animation */
    }

    /* Bars Grow — urgency/signal bars grow sequentially */
    @keyframes barGrow {
      from { transform: scaleY(0); }
      to { transform: scaleY(1); }
    }
    .s-bar-grow { transform-origin: bottom; transform: scaleY(0); }
    .screen.active .s-bar-grow { animation: barGrow 0.4s ease forwards; }
    .screen.active .s-bar-grow:nth-child(1) { animation-delay: 1.2s; }
    .screen.active .s-bar-grow:nth-child(2) { animation-delay: 1.35s; }
    .screen.active .s-bar-grow:nth-child(3) { animation-delay: 1.50s; }
    .screen.active .s-bar-grow:nth-child(4) { animation-delay: 1.65s; }

    /* Swipe Right — card tilts and slides off to the right */
    @keyframes swipeRight {
      0% { transform: translateX(0) rotate(0deg); opacity: 1; }
      100% { transform: translateX(120%) rotate(15deg); opacity: 0; }
    }
    .screen.active .s-swipe-right {
      animation: swipeRight 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
    }

    /* Slide From Left — element enters from left side */
    @keyframes slideFromLeft {
      from { opacity: 0; transform: translateX(-40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .screen.active .s-slide-left { opacity: 0; animation: slideFromLeft 0.5s ease forwards; }

    /* Slide From Right — element enters from right side */
    @keyframes slideFromRight {
      from { opacity: 0; transform: translateX(40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .screen.active .s-slide-right { opacity: 0; animation: slideFromRight 0.5s ease forwards; }

    /* Chat message animations — messages slide in from their side */
    .screen.active .s-msg-in { opacity: 0; }
    .screen.active .s-msg-received { animation: slideFromLeft 0.4s ease forwards; }
    .screen.active .s-msg-sent { animation: slideFromRight 0.4s ease forwards; }
    .screen.active .s-msg-in:nth-child(1) { animation-delay: 0.3s; }
    .screen.active .s-msg-in:nth-child(2) { animation-delay: 0.9s; }
    .screen.active .s-msg-in:nth-child(3) { animation-delay: 1.5s; }
    .screen.active .s-msg-in:nth-child(4) { animation-delay: 2.1s; }
    .screen.active .s-msg-in:nth-child(5) { animation-delay: 2.7s; }

    /* Typing indicator — three bouncing dots */
    @keyframes typingBounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-6px); }
    }
    .s-typing-dots { display: flex; gap: 4px; padding: 10px 16px; }
    .s-typing-dot {
      width: 8px; height: 8px; border-radius: 50%; background: #9ca3af;
      animation: typingBounce 1.2s ease infinite;
    }
    .s-typing-dot:nth-child(2) { animation-delay: 0.15s; }
    .s-typing-dot:nth-child(3) { animation-delay: 0.30s; }

    /* Pulse Glow — gentle glow effect on buttons/CTAs */
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.4); }
      50% { box-shadow: 0 0 20px 6px rgba(147, 51, 234, 0.2); }
    }
    .screen.active .s-pulse-glow {
      animation: pulseGlow 2s ease infinite;
    }

    /* Confetti — pseudo-element based celebration particles */
    @keyframes confettiFall {
      0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(200px) rotate(720deg); opacity: 0; }
    }
    .s-confetti {
      position: relative;
      overflow: hidden;
    }
    .s-confetti-particle {
      position: absolute;
      width: 8px; height: 8px;
      border-radius: 2px;
      opacity: 0;
    }
    .screen.active .s-confetti-particle {
      animation: confettiFall 2s ease forwards;
    }

    /* Fan Out — cards spread from a stack */
    @keyframes fanLeft {
      from { transform: rotate(0deg) translateX(0); }
      to { transform: rotate(-8deg) translateX(-8px); }
    }
    @keyframes fanRight {
      from { transform: rotate(0deg) translateX(0); }
      to { transform: rotate(5deg) translateX(4px); }
    }
    .screen.active .s-fan-left { animation: fanLeft 0.8s 0.3s ease forwards; }
    .screen.active .s-fan-right { animation: fanRight 0.8s 0.3s ease forwards; }

    /* Slide Toggle — role/tab selector animation */
    @keyframes slideToggle {
      0% { transform: translateX(0); }
      50% { transform: translateX(100%); }
      100% { transform: translateX(0); }
    }
    .screen.active .s-toggle-animate {
      animation: slideToggle 2s 1.2s ease forwards;
    }

    /* Scale In — gentle scale from small */
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.6); }
      to { opacity: 1; transform: scale(1); }
    }
    .screen.active .s-scale-in { opacity: 0; animation: scaleIn 0.5s ease forwards; }

    /* Shake — attention-grabbing micro-animation */
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-4px) rotate(-1deg); }
      75% { transform: translateX(4px) rotate(1deg); }
    }

    /* ============================================
       CAPTION AREA
       ============================================ */
    .caption-area {
      position: relative;
      min-height: 60px;
      width: 100%;
      max-width: 420px;
      text-align: center;
    }

    .caption {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 0.4s ease;
      font-size: 16px;
      line-height: 1.6;
      color: var(--demo-text);
      padding: 0 16px;
    }

    .caption.active {
      opacity: 1;
    }

    .caption strong {
      color: white;
    }

    /* ============================================
       RESPONSIVE
       ============================================ */
    @media (max-width: 420px) {
      .phone-frame {
        width: 320px;
        height: 693px;
        border-radius: 48px;
        padding: 10px;
      }
      .phone-inner { border-radius: 38px; }
      .phone-island { width: 110px; height: 32px; }
      .caption { font-size: 14px; }
    }

    @media (min-width: 900px) {
      .demo-container {
        flex-direction: row;
        gap: 64px;
        padding: 3rem;
      }
      .demo-side {
        display: flex;
        flex-direction: column;
        gap: 32px;
        max-width: 340px;
      }
      .caption-area { text-align: left; }
      .caption { text-align: left; }
    }
  </style>
</head>
<body>
  <div class="demo-container">
    <!-- Optional: header on mobile, side panel on desktop -->
    <div class="demo-side">
      <div class="demo-header">
        <h1>{APP_NAME}</h1>
        <p>{APP_TAGLINE}</p>
      </div>

      <div class="caption-area">
        <!-- One <p> per screen -->
        <p class="caption caption-0 active">{CAPTION_0}</p>
        <p class="caption caption-1">{CAPTION_1}</p>
        <!-- ... more captions ... -->
      </div>

    </div>

    <!-- Phone frame -->
    <div class="phone-frame">
      <div class="phone-inner">
        <div class="phone-island"></div>
        <div class="phone-status-bar">
          <span class="status-time">9:41</span>
          <div class="status-icons">
            <svg viewBox="0 0 24 24"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
          </div>
        </div>

        <div class="screen-viewport">
          <!-- SCREENS GO HERE -->
          <!-- Each screen: <div class="screen screen-{N}" data-transition="{TYPE}"> ... </div> -->
        </div>

        <div class="phone-home-bar"></div>
      </div>
    </div>
  </div>

  <script>
  (function() {
    const SCREEN_DURATIONS = [{SCREEN_DURATIONS}]; // e.g. [3000, 3500, 3000, 4000, 3000, 3500]
    const TRANSITION_MS = 600;

    const screens = document.querySelectorAll('.screen');
    const captions = document.querySelectorAll('.caption');
    const totalScreens = screens.length;
    let currentIndex = 0;
    let isPlaying = true;
    let timer = null;

    function getDuration(index) {
      return SCREEN_DURATIONS[index] || 3000;
    }

    function getTransition(screenEl) {
      return screenEl.dataset.transition || 'fade';
    }

    function clearTransitionClasses(el) {
      el.classList.remove(
        'active', 'exiting',
        'slide-left-enter', 'slide-left-exit',
        'slide-right-enter', 'slide-right-exit',
        'fade-enter', 'fade-exit',
        'zoom-in-enter', 'zoom-in-exit',
        'slide-up-enter', 'slide-up-exit'
      );
    }

    function goToScreen(newIndex, forceReverse) {
      if (newIndex < 0) newIndex = totalScreens - 1;
      if (newIndex >= totalScreens) newIndex = 0;
      if (newIndex === currentIndex) return;

      const oldScreen = screens[currentIndex];
      const newScreen = screens[newIndex];
      const isReverse = forceReverse || newIndex < currentIndex;
      const transition = isReverse ? getTransition(oldScreen) : getTransition(newScreen);

      screens.forEach(s => clearTransitionClasses(s));

      let enterClass, exitClass;
      if (transition === 'slide-left' || transition === 'slide-right') {
        enterClass = isReverse ? 'slide-right-enter' : 'slide-left-enter';
        exitClass = 'slide-left-exit';
      } else {
        enterClass = transition + '-enter';
        exitClass = transition + '-exit';
      }

      newScreen.classList.add(enterClass);
      newScreen.offsetWidth; // force reflow
      oldScreen.classList.add(exitClass, 'exiting');
      newScreen.classList.add('active');

      setTimeout(() => { clearTransitionClasses(oldScreen); }, TRANSITION_MS + 50);

      captions.forEach(c => c.classList.remove('active'));
      if (captions[newIndex]) captions[newIndex].classList.add('active');

      currentIndex = newIndex;
      if (isPlaying) scheduleNext();
    }

    function scheduleNext() {
      clearTimeout(timer);
      timer = setTimeout(() => { goToScreen(currentIndex + 1, false); }, getDuration(currentIndex));
    }

    function play() { isPlaying = true; scheduleNext(); }
    function pause() { isPlaying = false; clearTimeout(timer); }

    // Keyboard (hidden controls for power users)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { pause(); goToScreen(currentIndex - 1, true); }
      if (e.key === 'ArrowRight') { pause(); goToScreen(currentIndex + 1, false); }
      if (e.key === ' ') { e.preventDefault(); isPlaying ? pause() : play(); }
    });

    // Initialize — auto-play
    screens[0].classList.add('active');
    captions[0]?.classList.add('active');
    scheduleNext();
  })();
  </script>
</body>
</html>
```

## Placeholder Reference

When generating the HTML, replace these placeholders:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{LANG}` | HTML language code | `en`, `he` |
| `{DIR}` | Text direction | `ltr`, `rtl` |
| `{APP_NAME}` | App name from codebase | `Jobble` |
| `{APP_TAGLINE}` | Short tagline from user | `Find your dream job with a swipe` |
| `{PRIMARY_COLOR}` | Primary color hex | `#6C5CE7` |
| `{PRIMARY_LIGHT}` | Lighter variant | `#8B7CF7` |
| `{PRIMARY_DARK}` | Darker variant | `#5A4BD6` |
| `{ACCENT_COLOR}` | Accent color hex | `#FF6B81` |
| `{SUCCESS_COLOR}` | Success color hex | `#22C55E` |
| `{ERROR_COLOR}` | Error color hex | `#EF4444` |
| `{BG_COLOR}` | Background color hex | `#F9FAFB` |
| `{TEXT_COLOR}` | Text color hex | `#1F2937` |
| `{CAPTION_N}` | Caption for screen N | `Browse AI-scored matches` |
| `{SCREEN_DURATIONS}` | JS array of ms per screen | `3000, 3500, 3000, 4000` |

## Screen Content Instructions

Inside the `<div class="screen-viewport">`, add one `<div class="screen">` per screen:

```html
<div class="screen screen-0 active" data-transition="fade">
  <!-- First screen starts with class "active" -->
  <!-- Use .s-* primitives and .s-animate for staggered entry -->
</div>
<div class="screen screen-1" data-transition="slide-left">
  <!-- Subsequent screens use transition matching their entry type -->
</div>
```

Rules:
1. The first screen MUST have the `active` class
2. Each screen MUST have a `data-transition` attribute
3. Use `.s-animate` on direct children for staggered fade-in effect
4. Use screen primitives (`.s-card`, `.s-btn`, `.s-badge`, etc.) for content
5. Use the project's actual color palette via CSS variables
6. Use domain-realistic placeholder content — never "Lorem ipsum"
7. Keep screen HTML under 50 lines each for maintainability
