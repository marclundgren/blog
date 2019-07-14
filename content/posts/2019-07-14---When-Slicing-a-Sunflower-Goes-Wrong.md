---
title: "When slicing a 🌻 goes wrong"
date: "2019-07-14T03:27:01.785Z"
template: "post"
draft: false
slug: "/posts/when-slicing-a-sunflower-goes-wrong/"
category: "JavaScript"
tags:
  - "JavaScript"
description: "JavaScript has a unicode problem. Splitting strings can cause trouble."
---

If you've ever built a UI that has a responsive width and fixed height chances are you've had to consider truncating strings with variable length. [`text-overflow`](https://css-tricks.com/almanac/properties/t/text-overflow/) is a property of CSS that can prevent a string from breaking out of its container by replacing the bits of the string that won't fit in the container with some ellipsis. You know...these things...

Sometimes, in javascript we need to truncate a string by slicing it. Let's say you need to split user-generated string by an arbitraty length because there's a character limit and you want to preserve the string parts that don't exceed said limit. E.g. building a twitter clone, but rather than prevent a post submission that exceeds the current (2019) limit of 280 characters.

## The Problem

[JavaScript Split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) is not unicode aware. Some (all?) emojis consist of not __one__ but __two__ unicode characters.

```js
'🌻'.length // 2
```

This fact can lead to some funky behavior when trying to split strings.

```js
'🌻'[0] // "�"
```

In fact, the results above are all from Chrome 75. Try this in your browser. Results may vary.

```js
// Chrome
'a 🌻'.slice(0, 3); // "a �"

// Firefox
'a 🌻'.slice(0, 3); // "a \ud83c"

// Safari
'a 🌻'.slice(0, 3); // "a " 👈 running this results in a string that cannot be copied to the clipboard

// All Browsers
'a 🌻'.slice(0, 2); // "a "

'a 🌻'.slice(0, 4); // "a 🌻"
```

## A JavaScript Solution

[Runes: ✂️ Unicode-aware JS string splitting](https://github.com/dotcypress/runes). This package will account for [surrogate pairs](http://en.wikipedia.org/wiki/UTF-16), including our favorite emoji: 🌻!

## My Advice

Stick with css text-overflow and be done with the problem. If a user generates a string too long, apply validation to reject the post or record or whatever is being generated. If titles can be any length, but a view just doesn't support long titles simply use css text-overflow. When in doubt, use CSS over JavaScript as much as possible.
