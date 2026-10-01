# Build the Challenge social habits app

## Goal
Recreate the four supplied Portuguese mobile screens as one polished, interactive app while preserving the visual system, content, and navigation shown in the references.

## Screens and flow
- Build the weekly home dashboard as the default screen.
- Build the active reading challenge detail with progress, ranking, feed, and rules tabs.
- Build the new challenge form with editable name, category, duration, rules, privacy, and publish action.
- Build Sofia's profile with achievements and recent challenge history.
- Connect the bottom navigation, challenge cards, create controls, back/close controls, and relevant tabs.

## Visual implementation
- Match the references with Plus Jakarta Sans, indigo primary actions, orange accents, cool gray surfaces, compact mobile spacing, and fixed bottom navigation.
- Use responsive constraints so the mobile design remains centered and usable on larger screens.
- Replace reference placeholders with cohesive, visible profile and challenge imagery while retaining the supplied copy.
- Add restrained interaction feedback and accessible labels without changing the intended design.

## Technical details
- Keep the experience on the existing TanStack home route with React state controlling the four screens for instant navigation.
- Define all colors, typography, shadows, and animation roles as semantic tokens in the global design system.
- Add route-specific title, description, Open Graph, and Twitter metadata.
- Verify the build and render at mobile and desktop widths, including navigation and form interactions.
