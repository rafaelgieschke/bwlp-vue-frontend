# BW-Lehrpool, but VueJS

## The repos (quick links)

[New Repo (Khoding)](https://github.com/Khoding/bwlp-vue-frontend)

[Old Repo (Khoding, Archived) in case we need info](https://github.com/Khoding/bwlp-frontend)

## Tools used

This app uses [Vue.js](https://vuejs.org), [Vite](https://vite.dev) and [Beer CSS](https://www.beercss.com)

- Beer CSS is a [Material UI](https://m3.material.io) CSS Library, it allows for quick Material designing, and it supports [Material You](https://m3.material.io/blog/announcing-material-you) customisation (theming color based off images and stuff like that, it's pointless, but cool for the user)
- The icons can be found at [Google Fonts](https://fonts.google.com/icons)

## Development rules (to keep the project clean)

I'm a code cleanliness you-know-what, so get ready.

### Vue SFCs (Single File Components), we love 'em

You can find most of the information needed here: [SFC on vue.js documentation](https://vuejs.org/api/sfc-spec.html).

I don't remember exactly what I've said after this point, but this is what should be done for components, note that at this state of the app, this hasn't been applied properly because it's still changing too often and it's pointless to do this process ten times.

Basically, a component should be extracted for one main reason, and one technical reason:

- The main reason is that a component represents a piece of the app, whether it requires 50 lines of CSS, 150 of JS, and 283 of HTML, or 5 lines of HTML, no CSS and no JS, whether it's reused 10 times or simply in one place, it represents a piece of the page, and should be extracted to its own component. While working, you can create a new component in a View (or another component), and then extract it and its internal logic and styling to an SFC when it's done, that way, most file only contain a few lines of code, and the actual pieces of the UI are properly organised in a logical tree under `@/components`. That means pieces of code will be shared between components, leading to extracting those to composables or utils files. It creates A LOT of changing files ten times to find out what's going on, but with modern IDEs (or even good ol' VSCode), it's not a pain to navigate files using the variants of "go to definition".
- The other reason is for readability of the main holding Views and SFCs, if all the components are in plain in the parent files, they become impossible to go through and finding what's broken is a pain.
  - Someone who's familiar with the project should be able to deduce that the `SortableTable` component is the main component of the page on List views, and that applies for every other component, as long as they're properly named, you don't need to explore them to know what's happening in them, so you don't lost time going through them if you know the bug comes from someplace else.
  - A good exemple of that is the `DetailDialog` component, it started rather simple and was in the page, then it became too long so I extracted it, then the tabs became a mess so I extracted them, now I have 13 whole files just for everything in that component, but when I see a bug in one of the tabs, I simply go there, I don't need to go through the parent component `DetailDialog` or any of the other files related to them. Even better, they're all under the `@/components/dialog` folder, so I can just open that folder, look inside of it, and I'll usually find my bug in a few seconds to a short few minutes.

#### SFC blocks order

Vue.js is inconsistent in their documentation and different websites and will sometimes use `script-template-style` order, however, it is recommended to use `template-script-style` order, so we do the following:

1. template `<template></template>`
2. (optional) script `<script setup lang="ts"></script>`

   - We use the [Composition API](https://vuejs.org/api/composition-api-setup.html)
     - The reason is it's the new way of doing things and it's proven easier to work with than the Options API (as it allows the use of [`<script setup>`](https://vuejs.org/api/sfc-script-setup.html)). They also say somewhere on the documentation (can't remember where, saw it the other day) that it removed a lot of limitations Vue had with the Options API, basically saying that Composition API is the reason something as powerful as [VueUse](https://vueuse.org) is even possible in the first place, so it's a no brainer.
   - We first set that it's Composition API `setup` and then set the language `lang="ts"`
     - The idea behind this being that the language isn't as important as which API we use. That's a tiny difference, but what are you gonna do? fight me? That's what I thought.
   - Small components that were extracted for readability and reusability might not have scripts, and that's okay, don't keep the empty tag

3. (optional) style `<style scoped></style>`

   You can read [CSS Features in SFCs](https://vuejs.org/api/sfc-css-features.html) on Vue's official documentation for more information

   - style can be last because it has the least impact on an SFC's readability
   - Try learning about [deep](https://vuejs.org/api/sfc-css-features.html#deep-selectors) and [slotted](https://vuejs.org/api/sfc-css-features.html#slotted-selectors) selectors
   - Use scoped styles in 99.9% of cases, if you need global CSS, put it in the main CSS file, if you have one of the specific cases where the CSS works weird within an SFC but it clearly belongs as part of the SFC, first try using deep and slotted selectors, and if all fails, use [`:global`](https://vuejs.org/api/sfc-css-features.html#global-selectors) on that specific rule. Do not make the entirety of the SFC's CSS global, and give the element a very specific class so that it's not applied to random elements project-wide
   - Note the following: [Scoped styles do not eliminate the need for classes](https://vuejs.org/api/sfc-css-features.html#scoped-style-tips) (giving classes to elements will make the code execute faster, among other advantages like readability)
   - Small components that were extracted for readability and reusability might not have styles, and that's okay, don't keep the empty tag

The reasons this order works are as follows:

> Both orders work. Vue officially uses template-script-style in their documentation and examples. This order makes sense semantically since template defines the structure, script adds functionality, and style enhances appearance. But it's ultimately personal preference - pick one and stay consistent.
>
> - Generated by Claude AI, but check anywhere, it's basically the same reasons listed.

My (original developer of this particular web app, and following the "pick on and stay consistent" statement) reasons are the following:

> When you open an SFC Vue file, in most cases, you just need to read the template to know what's going on, you can guess the rest. If you can't, either your component is too complicated and could be broken down into smaller ones for readability, or it is warranted to be big, but you can easily find answers by scrolling down to the script.

> The script will sometimes be extremely long for a few lines of template, when you open it, you can't understand what will be displayed or how it will be displayed, so you have to scroll to find it, that's too much work in cases where you're just trying to debug and understand code.

### Templates

#### Props and Events naming

we define them in camelCase and we call them in templates in kebab-case

#### Importing components

When you're importing a component, use the relative `@` path, not relative `.` 'current location' path, it's longer, but that way, we know where the file comes from.

### Javascript / TypeScript

#### Extracting Javascript code

For the Javascript, if code gets too long in an SFC, it might be a good idea to extract it.

If the code is shared between many SFCs, try extracting it to a composable (for Vue-related code) or a utility (utils, for anything non Vue-related)

```js
// Examples of Vue and non-Vue-related codes, not in this project.
// formatDate.js, utility example
export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

// useCounter.js, composable example
import {ref} from 'vue';

export function useCounter() {
  const count = ref(0);

  function increment() {
    count.value++;
  }

  return {
    count,
    increment,
  };
}
```

#### NPM Packages

I know it's much easier to just install an NPM package for everything we need, but it creates weird dependencies that usually have no use and just make a mess in our package file, when something big is needed, go for it (site-wide stuff like i18n for example), but for small code, even if there is most likely a 10 LOC package that does it out there, try just making an 11 LOC file with basically the same logic (don't steal code though, you're better than that).

Keeping the number of packages to a minimum more easily allows us to keep them all updated in the future, if we have 10 dependencies all pointing to each other, at some point, they'll clash and we'll have to keep one in an outdated state which might cause problems.

##### Potential exceptions

- [VueUse](https://vueuse.org) helps with a lot of tiny utilities and it's a really common tool in the Vue community, so in case one of their tool could simplify the implementation of something, I think it's not a big issue to make use of it.
- Vue has a large ecosystem, but a very clean one, unlike others (looking at you, React and Django), I think this means for most "big tasks" (like i18n), you'll find a "recommended package" that's either basically the only one available at that scale (like vue-i18n) or the list of possibilities is only packages with a good and appreciated background and all of them might help one specific use more than the other, but there's no wrong choice, so no big deal if you make the "wrong" one.

### CSS

#### Selectors

Use classes for 99% of cases, never IDs (can cause many problems if we use ID in a potentially repeated component. Specific cases require ids (although not CSS, but forms for example), in those cases, just try making the id `name-of-component-${some-dynamic-value}`, don't use random, or it WILL fail at some point), and very rarely just the tag (except html, body and main, those are fine, header and footer are often used at different places so not them, give 'em classes).

#### !important

For the love of all things holy and Minecraft's Alex character (idke): Don't. Just don't. As Oliver Jonas "Ollie" (The Green Arrow / Spectre) Queen would put it: "There is always another way."

#### CSS Reset and CSS Normalizer

Since we're using Beer CSS, this is handled by the package, the only reset introduced is the `border-box` thing because Beer only does it on `*`, not on `*::before` and `*::after` for some reason (not that I can see anyway), so just to be sure, I just added it again (also brings me peace knowing it's there, even if unfortunately repeated).

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

#### @import

Using CSS's `@import` in normal HTML CSS projects is often a bad idea, it introduces Sequential loading, blocks parallel downloads and adds HTTP requests. Vue, however, compiles CSS before serving it, so breaking down the files into smaller ones might be a good idea for long stuff that don't need to be in a single file (good example is the fonts declaration in this project, since it's long and, while somewhat overkill, still good practice (although we might want to introduce [Lightning CSS](https://lightningcss.dev) later to remove unecessary declarations and make the entire CSS work for every browser even weird ones, TODO: just found this while writing this so to remember: https://vuejstips.com/lightningcss-vite)).

#### LTR and RTL

For CSS, always use logical properties (like `margin-inline-start` instead of `margin-left` and `border-block-start` instead of `border-top`), that way, if we ever want to support RTL languages, everything just "works" (on that end anyway, the rest is your problem, young Padawan).  
Beer CSS already does that for everything of the sort, so it's only in cases where you add some CSS.

#### Accessibility

Read [Josh Comeau's article about which units to use](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility) to make the right choice when using custom CSS. Since we're using Beer CSS, we're unfortunately obligated to use their "use rem everywhere" approach for the part Beer CSS takes care of, fortunately though, from the current state of the website, it still seems to be working somewhat well, althougn it might not be enough to allow for the [200% rule](https://www.w3.org/TR/WCAG21/#resize-text) in every way, and Josh himself says we should aim for more than 200% zoom, but we don't have billions of users, so it should be okay for now.

#### Use of modern CSS

That's not too much of a problem in this particular case since we're not making an app for two billion people, although, I haven't used any feature that aren't supported on the latest versions of every Evergreen Browsers (2022 and after CSS features (I cheated a little because who can not use `:has()` nowadays?)) (Google Chrome (and all Chromium, like Vivaldi (yaaa), Brave (why?), Opera GX (ew), Microsoft Edge (eh), etc.), Mozilla Firefox, Apple Safari. If it doesn't work on Internet Explorer, the old Edge or Opera (not GX), that's not our problem, anyway the chances of someone using them in the Uni are basically zero, and they probably have Chrome installed for the millions of websites not supporting their shitty choices in life).

That being said, when `@supports` comes in all major Evergreen browsers, it could be a good idea to tell people "Hey bro, you should really update your browsers" when some feature isn't supported.

##### Speaking of modern CSS, [CSS Layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)!

Okay, I know they are cool, and I planned on using them, but I don't want to force them on anyone, and since they can change the way Specificity works, I'd rather not confuse anyone who already hates CSS with them (although if you hate CSS, you should look into them, they look scary but they really fix a lot of issues you probably hate with this wonderful language).

##### [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)

Beer CSS only has three levels of responsive: `.s`, `.m` and `.l`, this is enough in most cases, but it can be limiting. If you need an element to be more responsive, try using Container Queries.

Container Queries allow for WAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY simpler responsive, so don't get annoyed with Responsive Media Queries, they're rendered practically irrelevant (except for full-site responsive, but even then, when you make your container properly, you usually don't need full-site responsive as nothing needs to go anywhere, or it goes by itself).

Articles teaching their use:

- [Really small introduction](https://www.joshwcomeau.com/css/container-queries-introduction/)
- [Probably best article online, visualise their use](https://ishadeed.com/article/css-container-query-guide/)
- [Go further](https://www.joshwcomeau.com/css/container-queries-unleashed/)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### Snippets

For easier development, you can add these snippets to VS Code for the "Vue" language

```json
{
  "Vue Component": {
    "prefix": "vue-component",
    "body": [
      "<template>",
      "  $1",
      "</template>",
      "",
      "<script setup lang=\"ts\">",
      "  $2",
      "</script>",
      "",
      "<style scoped>",
      "  $3",
      "</style>"
    ],
    "description": "Create a Vue component"
  },
  "Vue Method": {
    "prefix": "vue-method",
    "body": ["${1:methodName}() {", "  ${2:// method body}", "}"],
    "description": "Create a Vue method"
  },
  "Vue Computed Property": {
    "prefix": "vue-computed",
    "body": ["computed: {", "  ${1:computedProperty}() {", "    return ${2:value};", "  }", "}"],
    "description": "Create a Vue computed property"
  },
  "Vue Watcher": {
    "prefix": "vue-watch",
    "body": [
      "watch: {",
      "  ${1:propertyToWatch}(newValue, oldValue) {",
      "    ${2:// watcher body}",
      "  }",
      "}"
    ],
    "description": "Create a Vue watcher"
  },
  "Vue Script Setup": {
    "prefix": "setup",
    "body": ["<script setup lang=\"ts\">", "  $0", "</script>"],
    "description": "Create a vue script setup block"
  },
  "Vue Scoped": {
    "prefix": "scoped",
    "body": ["<style scoped>", "  $0", "</style>"],
    "description": "Create a scoped style block"
  }
}
```

## Talk with some Users

So, we talked with some users, two things came out: We like the overall app, but we want to be able to edit data in the Dialog. I'm the kind of guy who hates editing data in a Dialog, but the users want what the users want.

So now we have to make a choice:

- Either when the users enter "edit mode", the "dialog" becomes a full page that cannot be accidentally left at any point, it needs user confirmation (only if data was modified though).
- The other one is, we keep it like it is right now, but we make all the fields enabled (right now they're disabled), and when the user interacts with the thing, it redirects them to the right place in the Edit pages (there were two complaints: I have to break the flow, let's fix that by making the edit page basically work the same as the dialog, just in a more "form" prone environment, the other one was "I have to find the data I'm trying to modify in the form, this can be fixed by redirecting them to the right field in the form and making it flash in front of their eyes").

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
