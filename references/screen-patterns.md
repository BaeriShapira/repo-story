# Screen Patterns Catalog

> **IMPORTANT: These are structural layout references only — NOT design templates.**
> The visual design (button shapes, card styles, typography, colors, badges, spacing) must come from the project's actual component code. Use these archetypes ONLY to understand where to position elements (header, content, navigation). Never copy the visual styling from these snippets — always read the real code and replicate its actual design language.

---

## 1. Landing / Hero Screen

Use for: App landing page, onboarding splash, first impression.

```html
<div class="screen" data-transition="fade">
  <div class="s-gradient-bg s-center s-gap-lg" style="padding: 60px 32px;">
    <!-- App icon / logo placeholder -->
    <div class="s-animate" style="width:80px;height:80px;border-radius:22px;background:white;display:flex;align-items:center;justify-content:center;">
      <span style="font-size:36px;font-weight:800;color:var(--app-primary);">J</span>
    </div>
    <div class="s-animate">
      <h1 style="font-size:32px;font-weight:800;color:white;margin-bottom:8px;">{App Name}</h1>
      <p style="font-size:16px;color:rgba(255,255,255,0.7);line-height:1.5;">{Tagline}</p>
    </div>
    <div class="s-animate s-flex-col s-gap-sm" style="width:100%;margin-top:16px;">
      <button class="s-btn s-btn-full" style="background:white;color:var(--app-primary);">Get Started</button>
      <button class="s-btn s-btn-outline s-btn-full">Sign In</button>
    </div>
  </div>
</div>
```

Customization notes:
- Replace logo letter with app's initial or an inline SVG icon
- Match gradient direction to the project's style
- Adapt CTA copy to the app's domain ("Start Matching", "Explore Jobs", etc.)

---

## 2. Auth Form (Login / Register)

Use for: Login, registration, forgot password screens.

```html
<div class="screen" data-transition="slide-left">
  <div class="s-white-bg">
    <div class="s-header">
      <span style="font-size:20px;">←</span>
      <span></span>
    </div>
    <div class="s-px s-flex-col s-gap-lg" style="padding-top:24px;">
      <div class="s-animate">
        <h2 style="font-size:26px;font-weight:800;color:var(--app-text);">{Title}</h2>
        <p class="s-text-muted" style="margin-top:6px;">{Subtitle}</p>
      </div>
      <div class="s-animate s-input-group">
        <div>
          <div class="s-label">Email</div>
          <div class="s-input">user@example.com</div>
        </div>
        <div>
          <div class="s-label">Password</div>
          <div class="s-input">••••••••</div>
        </div>
      </div>
      <button class="s-animate s-btn s-btn-primary s-btn-full">Continue</button>
      <p class="s-animate s-text-center s-text-sm s-text-muted">
        Already have an account? <span style="color:var(--app-primary);font-weight:600;">Sign In</span>
      </p>
    </div>
  </div>
</div>
```

Customization notes:
- Adapt field labels to match the app's auth flow (username vs email, phone number, etc.)
- Add role selection toggle if the app has multiple user types
- Match button style to the project's convention

---

## 3. Profile / Form Screen

Use for: Profile setup, settings, job creation, onboarding forms.

```html
<div class="screen" data-transition="slide-left">
  <div class="s-white-bg">
    <div class="s-header">
      <span style="font-size:20px;">←</span>
      <span class="s-header-title">{Title}</span>
      <span></span>
    </div>
    <div class="s-px s-flex-col s-gap-md" style="padding-top:12px;padding-bottom:24px;overflow-y:auto;flex:1;">
      <!-- Avatar / photo upload -->
      <div class="s-animate s-center">
        <div class="s-avatar s-avatar-round s-avatar-lg" style="background:rgba(108,92,231,0.1);color:var(--app-primary);">
          📷
        </div>
      </div>
      <div class="s-animate s-input-group">
        <div>
          <div class="s-label">{Field 1}</div>
          <div class="s-input">{Placeholder 1}</div>
        </div>
        <div>
          <div class="s-label">{Field 2}</div>
          <div class="s-input">{Placeholder 2}</div>
        </div>
      </div>
      <!-- Tags / skills -->
      <div class="s-animate">
        <div class="s-label">{Tags Label}</div>
        <div class="s-badge-row" style="margin-top:8px;">
          <span class="s-badge">{Tag 1}</span>
          <span class="s-badge">{Tag 2}</span>
          <span class="s-badge">{Tag 3}</span>
          <span class="s-badge" style="border:1.5px dashed #d1d5db;background:transparent;color:#9ca3af;">+ Add</span>
        </div>
      </div>
    </div>
    <div class="s-px" style="padding-bottom:32px;">
      <button class="s-animate s-btn s-btn-primary s-btn-full">Save Profile</button>
    </div>
  </div>
</div>
```

Customization notes:
- Replace tags with skills/categories relevant to the app domain
- Add or remove fields based on the actual profile model
- Include file upload area if the app supports it (e.g., resume upload)

---

## 4. Card Feed (Swipe / Browse)

Use for: Tinder-style swiping, product browse, candidate review.

```html
<div class="screen" data-transition="slide-left">
  <div style="background:linear-gradient(180deg, var(--app-primary-dark) 0%, var(--app-primary) 100%);min-height:100%;display:flex;flex-direction:column;">
    <div class="s-header s-header-light">
      <span class="s-header-title s-text-white">{Section Title}</span>
      <span style="font-size:20px;">🔔</span>
    </div>
    <!-- Hero card -->
    <div class="s-animate s-card-hero s-flex-col s-gap-sm" style="margin:0 16px;flex:1;">
      <div class="s-flex-row" style="justify-content:space-between;">
        <div>
          <div style="font-size:18px;font-weight:700;color:#1f2937;">{Card Title}</div>
          <div class="s-text-sm s-text-muted" style="margin-top:2px;">{Card Subtitle}</div>
        </div>
        <div class="s-compat-ring" style="color:var(--app-primary);">87%</div>
      </div>
      <div class="s-badge-row">
        <span class="s-badge">{Tag 1}</span>
        <span class="s-badge">{Tag 2}</span>
        <span class="s-badge s-badge-accent">{Tag 3}</span>
      </div>
      <p class="s-text-sm s-text-muted" style="line-height:1.5;flex:1;">
        {Short description of the card content, 2-3 lines max.}
      </p>
    </div>
    <!-- Action buttons -->
    <div class="s-animate s-action-buttons" style="padding:16px 0 32px;">
      <div class="s-action-circle" style="background:white;">
        <svg viewBox="0 0 24 24" style="fill:var(--app-error);"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      </div>
      <div class="s-action-circle s-action-circle-lg" style="background:var(--app-primary);">
        <svg viewBox="0 0 24 24" style="fill:white;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </div>
      <div class="s-action-circle" style="background:white;">
        <svg viewBox="0 0 24 24" style="fill:var(--app-success);"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      </div>
    </div>
  </div>
</div>
```

Customization notes:
- Replace compatibility ring with whatever scoring/metric the app uses
- Adapt tags to the domain (skills, categories, price range, etc.)
- Swap swipe icons (X, heart, check) based on the app's actions (skip/like/save, reject/accept, etc.)
- If no swipe interface, show a scrollable card list instead

---

## 5. List View

Use for: Matches list, messages inbox, notifications, search results.

```html
<div class="screen" data-transition="slide-left">
  <div class="s-white-bg">
    <div class="s-header">
      <span class="s-header-title">{Section Title}</span>
      <span class="s-badge">{Count}</span>
    </div>
    <!-- List items -->
    <div class="s-animate s-list-item">
      <div class="s-avatar" style="background:rgba(108,92,231,0.12);color:var(--app-primary);">A</div>
      <div class="s-list-item-content">
        <div class="s-list-item-title">{Item Title 1}</div>
        <div class="s-list-item-subtitle">{Item Subtitle 1}</div>
      </div>
      <span class="s-badge s-badge-success" style="font-size:11px;">{Status}</span>
    </div>
    <div class="s-animate s-list-item">
      <div class="s-avatar" style="background:rgba(255,107,129,0.12);color:var(--app-accent);">B</div>
      <div class="s-list-item-content">
        <div class="s-list-item-title">{Item Title 2}</div>
        <div class="s-list-item-subtitle">{Item Subtitle 2}</div>
      </div>
      <span class="s-text-sm s-text-muted">{Time}</span>
    </div>
    <div class="s-animate s-list-item">
      <div class="s-avatar" style="background:rgba(34,197,94,0.12);color:var(--app-success);">C</div>
      <div class="s-list-item-content">
        <div class="s-list-item-title">{Item Title 3}</div>
        <div class="s-list-item-subtitle">{Item Subtitle 3}</div>
      </div>
      <span class="s-text-sm s-text-muted">{Time}</span>
    </div>
    <div class="s-animate s-list-item">
      <div class="s-avatar" style="background:rgba(108,92,231,0.12);color:var(--app-primary);">D</div>
      <div class="s-list-item-content">
        <div class="s-list-item-title">{Item Title 4}</div>
        <div class="s-list-item-subtitle">{Item Subtitle 4}</div>
      </div>
      <span class="s-text-sm s-text-muted">{Time}</span>
    </div>
    <div class="s-mt-auto">
      <div class="s-bottom-nav">
        <div class="s-nav-item"><svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor"/></svg><span>Home</span></div>
        <div class="s-nav-item active"><svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/></svg><span>{Tab}</span></div>
        <div class="s-nav-item"><svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor"/></svg><span>Chat</span></div>
        <div class="s-nav-item"><svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/></svg><span>Profile</span></div>
      </div>
    </div>
  </div>
</div>
```

Customization notes:
- Replace avatar letters with initials or colored circles matching the project's style
- Adapt list item layout to show relevant metadata (score, time, status badge)
- Bottom nav tabs should match the actual app navigation

---

## 6. Detail View

Use for: Job detail, profile detail, product page, article.

```html
<div class="screen" data-transition="zoom-in">
  <div class="s-white-bg">
    <!-- Hero area -->
    <div class="s-animate" style="background:linear-gradient(135deg, var(--app-primary), var(--app-primary-dark));padding:32px 20px 24px;text-align:center;">
      <div class="s-avatar s-avatar-round s-avatar-lg" style="background:white;color:var(--app-primary);margin:0 auto 12px;">
        {Initial}
      </div>
      <div style="font-size:20px;font-weight:700;color:white;">{Title}</div>
      <div style="font-size:14px;color:rgba(255,255,255,0.7);margin-top:4px;">{Subtitle}</div>
    </div>
    <!-- Content -->
    <div class="s-px s-flex-col s-gap-md" style="padding-top:20px;padding-bottom:24px;">
      <div class="s-animate s-badge-row">
        <span class="s-badge">{Tag 1}</span>
        <span class="s-badge">{Tag 2}</span>
        <span class="s-badge s-badge-success">{Tag 3}</span>
      </div>
      <div class="s-animate">
        <div class="s-label">{Section Label}</div>
        <p class="s-text-sm" style="color:#4b5563;line-height:1.6;margin-top:6px;">
          {Description text, 3-4 lines. Use domain-realistic content.}
        </p>
      </div>
      <div class="s-animate s-card" style="margin:0;padding:16px;display:flex;align-items:center;gap:12px;">
        <div class="s-compat-ring" style="color:var(--app-primary);width:48px;height:48px;font-size:13px;">92%</div>
        <div>
          <div style="font-size:14px;font-weight:600;color:#1f2937;">{Metric Label}</div>
          <div class="s-text-sm s-text-muted">{Metric Description}</div>
        </div>
      </div>
    </div>
    <div class="s-px s-mt-auto" style="padding-bottom:32px;">
      <button class="s-animate s-btn s-btn-primary s-btn-full">{CTA}</button>
    </div>
  </div>
</div>
```

---

## 7. Chat / Messaging Screen

Use for: Direct messaging, customer support, in-app chat.

```html
<div class="screen" data-transition="slide-left">
  <div class="s-white-bg" style="display:flex;flex-direction:column;min-height:100%;">
    <!-- Chat header -->
    <div class="s-header" style="border-bottom:1px solid #f3f4f6;">
      <div class="s-flex-row s-gap-sm">
        <span style="font-size:20px;">←</span>
        <div class="s-avatar" style="width:36px;height:36px;font-size:14px;background:rgba(108,92,231,0.12);color:var(--app-primary);">{A}</div>
        <div>
          <div style="font-size:15px;font-weight:600;">{Name}</div>
          <div style="font-size:11px;color:var(--app-success);">● Online</div>
        </div>
      </div>
      <span>⋯</span>
    </div>
    <!-- Messages -->
    <div class="s-flex-col s-gap-sm s-px" style="flex:1;padding-top:16px;padding-bottom:16px;overflow-y:auto;">
      <div class="s-animate s-chat-bubble s-chat-received">{Received message 1}</div>
      <div class="s-animate s-chat-bubble s-chat-sent">{Sent message 1}</div>
      <div class="s-animate s-chat-bubble s-chat-received">{Received message 2}</div>
      <div class="s-animate s-chat-bubble s-chat-sent">{Sent message 2}</div>
      <div class="s-animate s-chat-bubble s-chat-received">{Received message 3}</div>
    </div>
    <!-- Input bar -->
    <div class="s-animate s-chat-input-bar">
      <div class="s-chat-input">{Input placeholder...}</div>
      <div style="width:36px;height:36px;border-radius:50%;background:var(--app-primary);display:flex;align-items:center;justify-content:center;">
        <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:white;"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </div>
    </div>
  </div>
</div>
```

Customization notes:
- Use conversation content relevant to the app domain (e.g., job discussion, scheduling, product inquiry)
- Match message bubble colors to the project's chat implementation

---

## 8. Dashboard Screen

Use for: Admin panel, analytics, overview, employer dashboard.

```html
<div class="screen" data-transition="fade">
  <div class="s-white-bg">
    <div class="s-header">
      <div>
        <div class="s-text-sm s-text-muted">{Greeting}</div>
        <div class="s-header-title">{User Name}</div>
      </div>
      <div class="s-avatar" style="background:rgba(108,92,231,0.12);color:var(--app-primary);">J</div>
    </div>
    <div class="s-px s-flex-col s-gap-md" style="padding-top:8px;">
      <!-- Stat cards row -->
      <div class="s-animate" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="s-card" style="margin:0;padding:16px;text-align:center;">
          <div style="font-size:28px;font-weight:800;color:var(--app-primary);">{N1}</div>
          <div class="s-text-sm s-text-muted">{Stat Label 1}</div>
        </div>
        <div class="s-card" style="margin:0;padding:16px;text-align:center;">
          <div style="font-size:28px;font-weight:800;color:var(--app-accent);">{N2}</div>
          <div class="s-text-sm s-text-muted">{Stat Label 2}</div>
        </div>
      </div>
      <!-- Recent activity -->
      <div class="s-animate">
        <div style="font-size:16px;font-weight:700;color:var(--app-text);margin-bottom:12px;">{Section}</div>
        <div class="s-card" style="margin:0;padding:0;overflow:hidden;">
          <div class="s-list-item">
            <div class="s-avatar" style="width:36px;height:36px;font-size:13px;background:rgba(34,197,94,0.12);color:var(--app-success);">✓</div>
            <div class="s-list-item-content">
              <div class="s-list-item-title">{Activity 1}</div>
              <div class="s-list-item-subtitle">{Time 1}</div>
            </div>
          </div>
          <div class="s-list-item" style="border:none;">
            <div class="s-avatar" style="width:36px;height:36px;font-size:13px;background:rgba(108,92,231,0.12);color:var(--app-primary);">★</div>
            <div class="s-list-item-content">
              <div class="s-list-item-title">{Activity 2}</div>
              <div class="s-list-item-subtitle">{Time 2}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 9. Success / Modal Screen

Use for: Match celebration, payment success, achievement unlocked, confirmation.

```html
<div class="screen" data-transition="slide-up">
  <div style="background:rgba(0,0,0,0.5);min-height:100%;display:flex;align-items:center;justify-content:center;padding:24px;">
    <div class="s-card s-animate s-center s-gap-md" style="margin:0;padding:32px;max-width:300px;">
      <!-- Celebration icon -->
      <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg, var(--app-primary), var(--app-accent));display:flex;align-items:center;justify-content:center;">
        <span style="font-size:36px;">🎉</span>
      </div>
      <div>
        <h2 style="font-size:22px;font-weight:800;color:var(--app-text);margin-bottom:6px;">{Title}</h2>
        <p class="s-text-sm s-text-muted" style="line-height:1.5;">{Description}</p>
      </div>
      <button class="s-btn s-btn-primary s-btn-full">{CTA}</button>
      <button class="s-btn s-btn-full" style="background:transparent;color:var(--app-primary);">{Secondary CTA}</button>
    </div>
  </div>
</div>
```

Customization notes:
- Match the celebration icon to the action (heart for match, check for success, star for achievement)
- Add confetti effect by including a subtle CSS animation on the background
- Overlay should sit on top of the previous screen visually

---

## 10. Empty State

Use for: No results, first-time user, inbox zero, no matches yet.

```html
<div class="screen" data-transition="fade">
  <div class="s-white-bg s-center" style="padding:48px 32px;">
    <div class="s-animate" style="width:100px;height:100px;border-radius:50%;background:rgba(108,92,231,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:24px;">
      <span style="font-size:44px;">{Emoji}</span>
    </div>
    <div class="s-animate">
      <h2 style="font-size:20px;font-weight:700;color:var(--app-text);margin-bottom:8px;">{Title}</h2>
      <p class="s-text-sm s-text-muted" style="line-height:1.6;max-width:260px;">
        {Supportive, friendly message explaining the empty state and what to do next.}
      </p>
    </div>
    <button class="s-animate s-btn s-btn-primary" style="margin-top:24px;">{CTA}</button>
  </div>
</div>
```

---

## Combining Patterns

Most demo screens are combinations or variations of these archetypes. For example:
- A **registration screen with role selection** = Auth Form + Badge row for role toggle
- A **swipe feed with details** = Card Feed + Detail View elements inside the card
- A **match celebration** = Success Modal overlaying a Card Feed background
- A **settings page** = Profile Form with toggles instead of text inputs

Always adapt the archetype to match what you found in the actual component code rather than using the template verbatim.
