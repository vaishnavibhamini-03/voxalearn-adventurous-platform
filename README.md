# VoxaLearn Adventure World

Build MODULE 1 — PART 1 of my final-year project:

Project Title:

“Voice-Controlled Gaming Tools for Enhanced Learning in the Skill Ecosystem”

Platform Name:

“VoxaLearn”

IMPORTANT:

This is PART 1 of MODULE 1.

Build ONLY the complete PUBLIC WEBSITE VISUAL/FRONTEND FOUNDATION.

Do NOT implement authentication or backend functionality in this part.

Do NOT create Supabase integration yet.

Do NOT create Login/Register functionality yet.

Do NOT create the student dashboard, learning system, game modes, voice system, AI assistant, XP, leaderboard, questions, or any other later functionality.

The purpose of Part 1 is to create a polished, responsive, visually consistent VoxaLearn public website that will later receive authentication and backend functionality.

==================================================

1. IMPORTANT VISUAL REFERENCE

==================================================

I have attached a reference image showing the exact type of fantasy pixel-art game environment I want for VoxaLearn.

USE THE ATTACHED IMAGE AS THE PRIMARY VISUAL REFERENCE.

Do NOT create a generic fantasy website.

Do NOT replace the visual style with another fantasy style.

Do NOT create a generic gaming background.

The Home page should closely match the visual language, atmosphere, composition, color palette, lighting, and pixel-art feeling of the attached image.

The attached image should be treated as the MAIN visual design reference.

The actual website UI must remain real HTML/CSS/React components.

Do NOT use the entire reference screenshot as one giant image containing all website text and controls.

Use the image/environment as the visual reference and implement the UI separately.

==================================================

2. VOXALEARN VISUAL IDENTITY

==================================================

The website should feel like:

“A magical interactive learning game world.”

Visual direction:

- High-quality pixel-art

- Fantasy adventure game

- Retro/pixel-game inspiration

- Modern polished web interface

- Educational atmosphere

- Immersive environment

- Friendly game character

- Strong visual depth

Do NOT make it overly childish.

Do NOT make it look like:

- Generic education website

- Generic SaaS landing page

- Corporate LMS

- Realistic 3D game

- Stock-template website

It should look like a polished pixel-art educational adventure platform.

==================================================

3. HOME PAGE

==================================================

Create the Home route:

/

The Home page should primarily be a large immersive HERO/GAME-WORLD experience.

Do NOT make Home a long scrolling page containing complete:

- About

- Courses

- Features

- Contact

sections.

Those must be separate pages.

The Home page should contain:

- Responsive navigation

- VoxaLearn branding

- Hero text

- Start Learning button

- Explore Courses button

- Fantasy pixel-art environment

- Voxa mascot

- Footer

==================================================

4. HOME BACKGROUND — EXACT VISUAL DIRECTION

==================================================

Recreate the visual atmosphere and major composition shown in the attached reference image.

LEFT SIDE:

Create a large fantasy tree.

The tree should have:

- Thick dark trunk

- Dense blue/green foliage

- Pixel-art leaves

- Hanging glowing lanterns

- Detailed branches

- Dark foreground framing

Near the lower-left side:

- Floating grassy platforms

- Small plants

- Small fantasy objects

- A small adventurer/player character

TOP SKY:

Use:

- Deep navy blue

- Dark purple

- Blue-purple gradients

- Pink/magenta near the horizon

- Warm orange/pink sunset glow

Add:

- Crescent moon

- Numerous stars

- Small bright stars

- Tiny glowing particles

- Pixel-art clouds

- Purple/blue atmospheric clouds

CENTER:

Create:

- Floating islands

- Floating grassy platforms

- Distant mountains

- Layered mountain silhouettes

- Pink/orange horizon

- Purple atmospheric haze

- Small fantasy structures

- Glowing environmental elements

RIGHT SIDE:

Create a large fantasy castle on a floating island.

The castle should have:

- Multiple towers

- Pointed roofs

- Small flags

- Dark blue/purple architecture

- Warm glowing windows

- Detailed pixel-art structures

Below/around the castle:

- Large waterfalls

- Multiple water streams

- Blue/cyan water

- Green vegetation

- Floating terrain

LOWER-RIGHT AREA:

Include Voxa.

==================================================

5. VOXA CHARACTER

==================================================

Voxa should be a small friendly creature inspired by the attached reference image.

Visual characteristics:

- Small

- Cute

- Blue/cyan

- Rounded body

- Glowing cyan features

- Friendly appearance

- Pixel-art style

- Game-world character

- Suitable as a learning companion

Voxa should have a subtle idle animation.

For Part 1, Voxa is ONLY a visual mascot.

Do NOT implement:

- AI conversation

- Speech recognition

- Text-to-speech

- AI tutoring

- Doubt clarification

- Voice commands

Only show a simple visual greeting, such as:

“Welcome to VoxaLearn!”

==================================================

6. HOME HERO CONTENT

==================================================

Place the actual website UI over/within the visual game environment.

Main logo/title:

VOXALEARN

Main tagline:

“Learn Smarter. Speak Freely. Grow Faster.”

Supporting description:

“Turn learning into an interactive adventure with engaging challenges, immersive game worlds, and intelligent guidance.”

Primary button:

START LEARNING

Secondary button:

EXPLORE COURSES

The Start Learning button should be the strongest CTA.

For Part 1, clicking Start Learning may navigate to:

/login

even though authentication will be implemented in Part 2.

Do not implement authentication logic yet.

Explore Courses should navigate to:

/courses

==================================================

7. NAVIGATION

==================================================

Desktop navigation:

LEFT:

VoxaLearn

CENTER:

Home

About

Courses

Features

Contact

RIGHT:

Login

Register

Dark/Light Theme Toggle

On mobile:

Use a hamburger menu.

Mobile menu:

Home

About

Courses

Features

Contact

Login

Register

Theme Toggle

Make navigation:

- Responsive

- Touch-friendly

- Keyboard accessible

- Clear

- Consistent

Do not rely on hover-only interactions.

==================================================

8. SEPARATE PUBLIC PAGES

==================================================

Create separate routes/pages:

/

 /about

 /courses

 /features

 /contact

 /login

 /register

IMPORTANT:

Login and Register pages are ONLY visual/form shells in Part 1.

Do NOT connect them to Supabase yet.

Do NOT implement real authentication yet.

The actual authentication functionality will be added in Part 2.

==================================================

9. ABOUT PAGE

==================================================

Create:

/about

Heading:

“About VoxaLearn”

Describe VoxaLearn as a gamified learning platform designed to make learning more:

- Interactive

- Engaging

- Accessible

- Enjoyable

- Skill-oriented

Use the same fantasy/pixel-art design language.

The page should feel like a real part of the VoxaLearn product.

Do not mention:

- Development roadmap

- Module numbers

- Future implementation

- Internal architecture

==================================================

10. COURSES PAGE

==================================================

Create:

/courses

Heading:

“Explore Courses”

Display the finalized initial course catalog.

PROGRAMMING:

C

C++

Python

Java

MATHEMATICS:

Mathematics

SCIENCE:

Chemistry

Physics

ENGLISH:

Grammar

Communication

IMPORTANT:

Python is the ONLY course that will eventually be fully implemented.

However, in Part 1, this is only a public course catalog.

Make the following visually available:

Python → AVAILABLE

The following should show a locked state:

C → 🔒 Locked

C++ → 🔒 Locked

Java → 🔒 Locked

Mathematics → 🔒 Locked

Chemistry → 🔒 Locked

Physics → 🔒 Locked

Grammar → 🔒 Locked

Communication → 🔒 Locked

Do NOT create learning content or databases for these courses.

The lock should be visually attractive and consistent with the game-world theme.

Do not display technical development information.

Do not say “Module 2”, “future module”, “development stage”, or anything similar.

==================================================

11. FEATURES PAGE

==================================================

Create:

/features

Heading:

“Features”

Display polished feature cards.

Include:

🎤 Voice-First Interaction

Voice will be the primary interaction method within the learning experience.

🎮 Gamified Learning

Learning concepts are presented through interactive challenges.

🌍 Immersive Game Worlds

Learning takes place inside engaging game-like environments.

🤖 Voxa Learning Companion

A friendly digital companion guides the learner.

♿ Accessible Interaction

The platform supports multiple interaction methods.

🏆 Progress & Rewards

Students can track their learning journey.

🧠 Personalized Learning

Learning experiences can adapt to individual students.

🧪 Interactive Learning Experiences

Practical and simulation-based experiences can support learning.

IMPORTANT:

These are product feature descriptions only.

Do not implement their actual logic in Part 1.

==================================================

12. CONTACT PAGE

==================================================

Create:

/contact

Heading:

“Contact Us”

Form:

Full Name

Email

Subject

Message

Button:

SEND MESSAGE

For Part 1:

Create the complete polished form UI.

Add frontend validation where appropriate.

Do NOT build a complex contact backend.

The Send button can display a visually polished success message for now without sending data to a backend.

Do not use fake company information.

Do not invent phone numbers or physical addresses.

==================================================

13. LOGIN PAGE — UI ONLY

==================================================

Create:

/login

Fields:

Email or Username

Password

Actions:

LOGIN

FORGOT PASSWORD?

REGISTER

BACK TO HOME

Include:

- Password visibility toggle

- Validation styling

- Loading-state design

- Error-state design

IMPORTANT:

Do NOT connect authentication yet.

Do NOT connect Supabase yet.

The login form is only the frontend foundation in Part 1.

==================================================

14. REGISTER PAGE — UI ONLY

==================================================

Create:

/register

Fields:

Full Name

Email

Username

Password

Confirm Password

IMPORTANT:

DO NOT INCLUDE GENDER.

There must be:

NO gender field

NO gender selection

NO gender-based recommendation

Actions:

CREATE ACCOUNT

LOGIN

BACK TO HOME

Include:

- Form validation

- Password strength UI

- Confirm-password validation

- Error states

- Loading states

- Success-state design

Do NOT connect Supabase in Part 1.

==================================================

15. DARK / LIGHT MODE

==================================================

Implement a fully working Dark/Light theme system in Part 1.

This is REQUIRED.

The theme must work across:

- Home

- About

- Courses

- Features

- Contact

- Login

- Register

Theme toggle should be visible in navigation.

Support:

☀ Light

🌙 Dark

System preference when no manual selection exists.

Persist the user's selected theme.

IMPORTANT:

Do NOT simply invert the page colors.

Create a proper design system.

DARK THEME:

- Deep navy

- Purple

- Blue

- Cyan highlights

- Glowing elements

- Dark fantasy atmosphere

LIGHT THEME:

- Soft blue

- Lavender

- Warm light tones

- Cyan highlights

- Readable surfaces

- Maintain fantasy identity

Both themes must remain visually polished.

The theme transition should be smooth but lightweight.

==================================================

16. RESPONSIVE DESIGN

==================================================

This is a HIGH PRIORITY requirement.

The website must work correctly on:

- Windows PC

- Mac

- Laptop

- Android phone

- iPhone/iOS

- Android tablet

- iPad

Do NOT simply shrink desktop layouts.

Create responsive layouts.

Test at:

1920×1080

1440×900

1366×768

1024×768

768×1024

412×915

393×852

390×844

360×800

Ensure:

- No horizontal scrolling

- No text overflow

- No overlapping elements

- No clipped buttons

- No broken layouts

- No unreadable text

- No inaccessible controls

==================================================

17. RESPONSIVE BACKGROUND

==================================================

The fantasy world must remain visually recognizable on all screen sizes.

DESKTOP:

Display the richest environment:

- Large left tree

- Moon

- Stars

- Floating islands

- Mountains

- Sunset

- Castle

- Waterfalls

- Voxa

- Player character

TABLET:

Preserve major landmarks while intelligently cropping/scaling.

MOBILE:

DO NOT squash the desktop background.

Use a mobile-friendly composition/crop.

Maintain:

- Fantasy sky

- Stars

- Floating environment

- Major fantasy landmark

- Voxa

- Hero text

- Start Learning button

The background must remain behind the UI and never make text unreadable.

==================================================

18. BACKGROUND PERFORMANCE

==================================================

The website must load smoothly on different devices.

DO NOT use:

- Giant uncompressed backgrounds

- Full-screen video

- Huge GIF

- Heavy WebGL

- Excessive particles

- Constant large JavaScript animations

Use:

- Optimized images

- WebP/AVIF where appropriate

- Responsive image sizes

- Compression

- CSS animations

- Lightweight effects

- Lazy loading when appropriate

The main environment should be mostly static.

Layer only lightweight effects such as:

- Star twinkle

- Small particles

- Gentle floating elements

- Subtle glow

- Voxa idle animation

Use CSS transform and opacity when possible.

Respect:

prefers-reduced-motion

If reduced motion is enabled, reduce or disable nonessential animations.

==================================================

19. FOOTER

==================================================

Create a responsive footer.

LEFT:

VOXALEARN

“Learn Smarter. Speak Freely. Grow Faster.”

Short description.

QUICK LINKS:

Home

About

Features

Courses

Contact

COURSES:

Programming

Mathematics

Science

English

COMPANY:

Contact

Privacy Policy

Terms of Service

Desktop:

Multi-column footer.

Mobile:

Stack vertically.

Do not create fake social links.

==================================================

20. GAME-STYLE UI

==================================================

Use visual elements inspired by the attached pixel-art image.

Buttons:

- Pixel-inspired border

- Golden/yellow primary CTA

- Dark outline

- Slight game-style shadow

- Hover animation

- Press animation

Cards:

- Pixel-inspired borders

- Subtle glow

- Game-world styling

- Dark/Light theme compatibility

Typography:

Use pixel-inspired typography for headings/logo where appropriate.

Use modern highly readable typography for body content.

Do not sacrifice readability for pixel styling.

==================================================

21. ACCESSIBILITY

==================================================

Part 1 must work without voice.

Support:

- Mouse

- Keyboard

- Touch

Ensure:

- Semantic HTML

- Proper form labels

- Keyboard navigation

- Visible focus indicators

- Accessible buttons

- Good contrast

- Touch-friendly controls

- No hover-only functionality

Authentication pages must not require a microphone.

==================================================

22. PERFORMANCE

==================================================

Prioritize:

1. Visual quality

2. Responsive behavior

3. Fast loading

4. Accessibility

5. Maintainable code

Avoid unnecessary dependencies.

Optimize assets.

Keep animations lightweight.

Use efficient component rendering.

==================================================

23. COMPONENT ARCHITECTURE

==================================================

Create reusable components:

- Navbar

- MobileMenu

- ThemeToggle

- Footer

- Hero

- GameBackground

- VoxaMascot

- CourseCard

- FeatureCard

- Button

- FormInput

- LoginForm UI

- RegisterForm UI

Use a clean modular project structure.

Avoid duplicated components.

Do not create multiple versions of the same UI component unnecessarily.

==================================================

24. ROUTES

==================================================

Create these routes:

/

 /about

 /courses

 /features

 /contact

 /login

 /register

Login and Register must be frontend-only shells in Part 1.

==================================================

25. WHAT MUST NOT BE BUILT IN PART 1

==================================================

DO NOT implement:

- Supabase

- Authentication logic

- Database

- Student dashboard

- Student profile data

- XP system

- Rewards

- Achievements

- Leaderboard

- Progress calculations

- Course learning modules

- Python lessons

- Questions

- Levels

- Retakes

- Voice Quiz

- Puzzle Quest

- Escape Room

- Scenario Challenge

- Adventure Quest

- Tower Defense

- Mystery Detective

- Boss Battle

- Virtual Laboratory

- Voice recognition

- Speech-to-text

- Text-to-speech

- Voxa AI interaction

- AI tutoring

- Genre selection

Part 1 is strictly the public visual/UX foundation.

==================================================

26. NO DEVELOPMENT ROADMAP IN WEBSITE

==================================================

Do NOT display:

- “Module 2 coming soon”

- “Authentication coming soon”

- “AI coming soon”

- “Game modes coming soon”

- “Voice feature coming soon”

- “Future roadmap”

- “Under development”

The website must look like a polished product.

The ONLY locked status allowed is the course catalog lock:

🔒 Locked

==================================================

27. FINAL VISUAL ACCEPTANCE

==================================================

The Home page should resemble the attached reference image in its visual atmosphere and major composition.

LEFT:

Large tree

Lanterns

Player character

Floating platform

TOP:

Dark blue/purple sky

Stars

Crescent moon

Clouds

CENTER:

Floating islands

Mountains

Sunset

Glowing atmosphere

RIGHT:

Large fantasy castle

Towers

Flags

Glowing windows

Waterfalls

LOWER RIGHT:

Friendly blue/cyan Voxa

CENTER UI:

VOXALEARN

“Learn Smarter. Speak Freely. Grow Faster.”

Supporting description

START LEARNING

EXPLORE COURSES

The result should look like:

“A polished pixel-art educational adventure world.”

==================================================

28. TESTING BEFORE COMPLETION

==================================================

Before completing Part 1, test every route:

/

 /about

 /courses

 /features

 /contact

 /login

 /register

Check:

✓ Navigation

✓ Mobile navigation

✓ Theme toggle

✓ Dark mode

✓ Light mode

✓ Theme persistence

✓ Hero layout

✓ Background

✓ Voxa mascot

✓ Buttons

✓ Forms

✓ Course cards

✓ Locked courses

✓ Footer

Responsive test:

✓ Desktop

✓ Laptop

✓ Tablet

✓ Android-sized screen

✓ iPhone-sized screen

Accessibility test:

✓ Keyboard

✓ Mouse

✓ Touch

✓ Focus states

✓ Labels

✓ Contrast

Performance test:

✓ No oversized background assets

✓ No excessive animations

✓ Smooth scrolling

✓ Fast initial loading

✓ No horizontal scrolling

✓ No major layout shifts

==================================================

29. FINAL PART 1 DELIVERABLE

==================================================

When Part 1 is complete, the result should be a polished public VoxaLearn website containing:

HOME

ABOUT

COURSES

FEATURES

CONTACT

LOGIN UI

REGISTER UI

with:

✓ Exact fantasy pixel-art visual direction

✓ Responsive design

✓ Dark/Light mode

✓ Mobile navigation

✓ Voxa mascot

✓ Locked course catalog

✓ Accessible controls

✓ Optimized game background

✓ Smooth performance

Do not implement backend or authentication yet.

The code must be clean and ready for Part 2, where Supabase authentication and the actual Login/Register/Forgot Password functionality will be added.

==================================================

FINAL INSTRUCTION

==================================================

Focus on getting the VISUAL DESIGN, RESPONSIVENESS, PERFORMANCE, NAVIGATION and USER EXPERIENCE correct.

Do NOT consume development effort implementing functionality belonging to Part 2 or later modules.

Build Part 1 as a polished, production-quality frontend foundation for VoxaLearn.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2393b646-b501-4f52-a805-cf198f24ec03).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
