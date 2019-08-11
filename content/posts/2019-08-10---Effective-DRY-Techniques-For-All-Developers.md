---
title: Effective DRY Techniques for all Developers
date: "2019-08-10T10:38:00.000Z"
template: "post"
draft: false
slug: "/posts/effective-dry-techniques-for-all-developers"
category: "Productivity"
description: "DRY techniques to increase your productivity while developing software."
tags:
  - "Productivity"
  - "DRY"
  - "Software"
  - "Liferay"
---

[__Don't Repeat Yourself (DRY)__](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) in software development typically refers to code abstraction. [OOP](https://en.wikipedia.org/wiki/Object-oriented_programming) lends itself to DRY code by using abstraction layers to reduce functional repetition. I wrote [an article](https://medium.com/@then_marc_says/functional-javascript-inheritance-and-cats-7850c48812b0) about this a long time ago that demonstrates OOP abstraction.

Staying DRY while writing code is great and all, but there's much more to writing software than the code itself. At the time of writing this article, no nueral interface exists that will allow us conceptualize and compose software with telepathy, so we're forced to hammer away at our keyboards for now.

![Typing and Coffee Are Great /s](/blog/giphy.gif)

## Repetition Reduction

Here are a some of the non-code but software-related actions we take while developing software. A few years ago, I was fortunate enough to be mentored by a couple of incredible developers: [Brian Chan](https://github.com/brianchandotcom) and [Nate Cavanaugh](https://github.com/natecavanaugh). The amount of repetition reduction they were capable was mind-blowing. Here is a list of some of their incredible task management and repetition reduction:

+ Typing
+ Mouse pointing
+ Mouse clicking
+ Window Activating
+ Context Switching
+ Git Committing
+ Project Opening
+ Code Reviewing
+ Pattern Matching
+ Code Building

Typing? Mouse Clicking? Yeah. Unless interacting directly with the UI we were developing, Brian and Nate would make a few precise keystrokes to perform their tasks at a high-throughput rate. I could write a book on everything amazing I witnessed while working for Liferay, and at least an entire chapter would be dedicated to each of these guy's workflow and high-throughput. Ironically, Nate (our UI Director) went out of his way to write custom github terminal integration scripts that would save him time by __avoiding the github.com UI__. He had shortcuts that increased his productivity for GitHub tasks like:

+ Discoverying new pull requests to review
+ Checking out pull request branches
+ Updating JIRA ticket status
+ Commenting on github pull requests with an updated status
+ loading his text editor with all files that have changed in a pull-request branch

This descision wasn't to avoid a bad UI; in 2012 [github.com](https://github.com) was a terrific interface for sharing and collaborating on open-source software projects. But Liferay was no ordinary open source project, in fact it had hundreds of developers worldwide contributing daily to several git respositories. [Eduardo Lundgren](https://github.com/eduardolundgren) would automate workflow, and open-source their solutions for other Liferay Developers. It was an ecosystem of true open-source were we all contribute and improve and share those contributions that I would describe as an example of a positive feedback loop.

## APM (Actions Per Minute)

Okay, My recommendation for all devlopers to increase productivity is going to sound obvious, but here it is. Simply perform more actions in less time. IOW increase throughput by maximizing each moment's potential and minimizing the amount of time spent on a task that can be macro'd or automated. Let's take a very common action we all perform every time we're on the computer. Context-switching, specificaly Application-switching.

Situation: You're writing code on your 15inch laptop, so there's not much room for horizontal or vertical window stacking. You're currently editing a styles.css file for a website you're running locally from your terminal. You make a change and want to see what the site looks like after the update. Are you a point and clicker or a keyboard stroker?

![expanding brain](/blog/35xnjn.jpg)

Even better? Enable the use of a [live server](http://tapiov.net/live-server/) that will automaticaly reload after a file has changed, saving you from manually reloading a page. VS Code has a [live-server plugin](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) that I use frequently.

## Challenge yourself, unplug your mouse

Step 1. Pretend like you don't have a mouse/trackpacd. Step 2. Learn every keyboard shortcuts that you find useful for every application you use, as well as your operating system. Step 3. Configure your own keyboard shortcuts to fill any gaps not provided by either your application or OS. Many applications will allow you to customize keyboard shortcuts. Mac ofters. [Automator](https://support.apple.com/guide/automator/welcome/mac) can be used to customize keyboard shortcuts. One of my most valued keyboard shortcut applications is [Thor](https://apps.apple.com/cn/app/thor/id1120999687?l=en&mt=12), an open-source, easy-to-install global application hot key binding app. I bind the following applications to these mappings:

__CMD + 1__ File Manager (Finder)

__CMD + 2__ Browser (Chrome)

__CMD + 3__ Varies day-to-day

__CMD + 4__ Code Editor (VS Code)

__CMD + 5__ Message App (Slack)

__CMD + ~__ Terminal (iTerm)

[Alfred](https://www.alfredapp.com/) allows application key-binding as well as many other very useful workflow productivity tools.

By using a global hotkey to focus an application window, you're reducing steps you'd otherwise take to accomplish this micro-task. It might only save you take 1-2 seconds each time, but that can quickly add if you find yourself switching from your editor to your browser often. As a UI developer, I find myself doing this a lot. And any developer might fight the need to load a browser to search for solutions to an given problem they're currentely creating a solution for.

Let's just make a wild guess and say you switch from your editor to your browser and back 50 times a day in an eight hour work day. That would be about 1.5 minutes per day, about 16 minutes per week and about 415 minutes per year saved on simply binding a hotkey! That's 6.5 hours more you could be spending coding, sleeping, eating, laughing, reading, riding a bike, etc.

Once you have configured your global hotkeys, take time to learn each application's internal navigation keybindings. Switching tabs in Chrome is __CMD + ]__ and __CMD + [__ for forward and backward tab navigation. The same is true for Sublime Text, Atom and VS Code.

If you use Slack, quickly switch channels using the search hotkey __CMD + K__ and typing the first few characters of the person or channel you'd like to switch to.

In addition to binding a global hotkey for each of your most used applications, there are plenty of other keyboard shortcuts you can take to shave off time from developing.

## Essential Keyboard Shortcuts

Whichever operating system you prefer, learn keyboard shortcuts. Challenge yourself and pretend you don't have a mouse or trackpad and find a way to navigate around. As it turns out, computers have been designed to accomodate users with accessibility needs including the inibility to use a mouse.

Once you've learned the basics of keyboard navigating around each of your most used apps, start learning keyboard shortcut actions. First check the help menu to see if an action already exists and if it has a keyboard shortcut.

![vscode-go-to-file-shortcut.png](/blog/vscode-go-to-file-shortcut.png)

The most important keybindings to learn for a code editor, in no particular order are:

+ Go to File
+ Search by keyword
+ Search by keyword and replace
+ Find a keyword in the active (opened) file
+ Move a line up/down
+ ___Multi-line selection___
+ Accessing the Command Pallete (editor, plugins extensions)

One of the first keyboard shortcut classes to master is text manipulation. Review and familiarize your self with these very practical shortcuts. These usually apply operating system-specfic shortcuts and should behave the same in any application on your computer.

+ __CMD + Z__: Undo
+ __CMD + Y__: Redo
+ __CMD + X__: Cut
+ __CMD + C__: Copy
+ __CMD + V__: Paste
+ __CMD + A__: Select All
+ __CMD + F__: Open a "Find all" pattern search
+ __CMD + SHIFT + F__: Open a "Find all" pattern search for a project

## __CMD + A__ Select All

Wherever your cursor is active, Select All will highlight and select everything in the active cursor input. For the case of a text editor, it's the entire editing text area. Some of the ways you can select a group of text are:

+ clicking and then dragging your mouse over some text,
+ double clicking a word (selecting the entire word)
+ using the ___CMD + A___ shortcut to highlight everything

When a group of text is selected, any additional keystroke of a alphanumberic character will replace the group of selected text. Using the ___Paste___ shortcut will also replace any selected group of text. AFAIK, one of the fastest ways to change the url or google result for a tab is to press ___CMD + L___ to highlight and select the entire url text area, then to begin typing to replace the exiting url entirely. This is similar if you were to focus the url input, then press ___CMD + A___ to Select All text in the url, and then type to replace.

One of the quickest ways to refactor a bunch of code you just wrote is to select multiple lines and press delete, or cut, or copy depending on what you need to do. The slower way would be to take the mouse and precisely drag to highlight the desired selection. However, this guide favors using the keyboard so that more complex transformations can be changed together without your fingers needing to leave their position.

Practice selecting mutliple lines with __SHIFT + ↓__ (and __SHIFT + ↑__ to unselect when you've gone too far).

![shift-keyboard-down](/blog/media/shift-keyboard-down.gif)

## Skipping Though Words

If you haven't already, go ahead and max out your keyboard's "Key Repeat" settings to be as fast as possible, and "Delay Until Repeat" to be as short as possible. Part of increasing APM is to increase the overall keyboard throughput any way possible.

![keyboard-go-fast](/blog/media/keyboard-go-fast.png)

Now, compare navigating through words with your hot rod keyboard. Pretty fast, right? Sure, but you're still only in first gear.

![keyboard-go-fast](/blog/media/keyboard-go-fast.gif)

Enter __OPTION + →__ and __OPTION + ←__

![keyboard-go-fast](/blog/media/keyboard-go-faster.gif)

Now you're cooking with grease!

Using __OPTION + →__ and __OPTION + ←__ the cursor will jump from the beginning of a word to the end, then to the beginning of the next word. This is the centerpeice of what makes a good multile line macro transformation. For now, just trust me and get used to using this shortcut over clicking your target or holding the arrow keys until you get to where you need to go.

![option-arrow-horizontal](/blog/media/option-arrow-horizontal.gif)

Okay. Get ready for LUDICROUS SPEED!

## __CMD + →__ and __CMD + ←__

![keyboard-go-LUDICROUS](/blog/media/keyboard-go-LUDICROUS.gif)

## Moving and Shifting Blocks

Using __OPTION + ↑__ and __OPTION + ↓__ a select line will shift upward and downward, respectively. This can be a much faster approach from deleting and rewriting code to appear in a certain order, and also faster than copy (cut), moving the cursor to the desired position and paste.

![option-arrow-vertical](/blog/media/option-arrow-vertical.gif)

In combination with __SHIFT + ↓__, a selection can consist of a block of any size with multiple lines.

![option-arrow-vertical-group](/blog/media/option-arrow-horizontal-group.gif)

## __CMD + D__

Typing to replace text can be a powerful tool in the code editor as well. Imagine an entire file that contains reference to a word that you'd like to change. __CMD + D__ will progressively select instances of a matched pattern for a text that you're currently selecting. Each time you press __CMD + D__, a new cursor will appear on that line.

When drafting in a rich text editor (e.g. VS Code, Atom, Sublime Text) creating multiple cursors by line or by pattern can help you create or refactor code __n__ times faster given __n__ is the number of occurances you'd like to alter.

```js
const calandarWeek = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' }
};
```

Suppose you'd like to refactor this block of code to add a new property to each line in the object `calendarWeek` object that is a transformation of the current state. For example, you want to capitalize the `value` property values and add a new property called `abbreviation` that will include the first 3 characters from each `label`.

Rather than clicking or arrowing to each line, replacing each week day value with its capitalized version manually, consider using an editor plugin/macro for string transformation. Capitalization is a text transformation avaialble in the [TextTransform](https://marketplace.visualstudio.com/items?itemName=florianloch.text-transform) package. Once your editor of choice has a text-transform plugin installed, invoke it by selecting (highlighting) the word you'd like to capitalize. This can be done several ways. The slowest way is to drag your mouse precisely over every character in the word. A much faster shortcut is to double click the word (this works everywhere on os x computers e.g. text inputs, plain text, editors, websites). Using __shift + arrow directional keys__ is another way to move your cursor while selecting text. __CMD__ and __option__ are selection modifiers that you'll need to become aware of. More on that later. The fastest way to select a word without using your pointer is __Expand Selection__.

![Expand Selection](/blog/media/expand-selection.png)

Next, bring up your command palette.

![Command Palette](/blog/media/command-pallete.png)

Begin to type __uppercase__. You won't need to type the full name of the command thanks to fuzzy matching. Try typing __tr upp__ which is short for __Transform To Uppercase__. You should always aim to type as little as possible to increase your APM. In other words, pretend you're a [StarCraft 2 player](https://www.youtube.com/watch?v=-yfMoIVTilo&feature=youtu.be&t=706) and your goal is to be as productive as possible by ensuring each keystroke's productivity is maximized.

Rather than selecting each day of the week, bringing up the command palette, applying the uppercase transformation 7 times, I'll show you how to apply the transform to all weekdays at once.

1. Find a pattern that matches on every single line
2. Determine that each line begins with "{ value: "
3. navigate to "value"
4. __Expand Selection__ to select the entire "value" word
5. __CMD + D__ until all "value"s were selected and there are now multiple cursors
6. __OPTION + →__ until the cursors are on the weekday values
7. __Expand Selection__ to select each weekday value
8. bring up the command palette with __CMD + P__
9. use a fuzzy search to run __text transform__
10. press __ESC__ to clear the multiple cursors

![Transform Uppercase](/blog/media/transform-uppercase.gif)

Another transformation is adding a third property to each object in the array called `abbr` that can be derived from either the `value` or `label` properties.

![abbr](/blog/media/abbr.gif)

```js
const calandarWeek = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' }
};
```

1. Find a pattern that matches on every single line
2. Determine that each line begins with "{ value: "
3. navigate to "value"
4. __OPTION + →__ until the cursors are on the weekday values
5. use __SHIFT + →__ three times and select the first three characters of each weekday
6. __CMD + C__ to copy
7. __OPTION + →__ until the cursor appears at the end of the `label` values
8. Add a `comma` and a `space`
9. Press the apostrophe key once. The cursor should now appear within 2 apostrophes ready for your input
10. __CMD + V__ to paste the abbreviations

Voilà! You've just performed a multi-line transformation that saved you keystrokes, energy, and most importantly __time__. This solution is scaleable. Imagine you're not updating 7 lines, but 70. You now have a solution to apply a composed transformation because you were able to recognize a pattern and a derived conversion of your code.

## Text Editor Language Syntax

Ready to comment a line of code? Rather than manually move your cursor to the beginning of the line, pressing the forward slash twice, and adding a space because it looks nicer, let your text editor do that for you.

Go to your favorite text editor and look for a way to add syntax highlighting for your programming language of choice. Most of them will automatically come with common language syntax support. Pressing __SHIFT + /__ in most cases will automatically comment the active cursor line. No need to highlight the line, shift the cursor to the beginning, let the editor do that for you. Working on code with platform specific syntax? Like JSX or Typescript? Modern text editors should either come with syntax support out-of-the-box, or available with a plugin or extention.

## Summary

Each keystroke and movement needs to be as impactful as possible. Not only to save time, but to reduce developer wear and tear. Both mentally and physically. [What Does a Coder Do If They Can't Type?](https://nsaphra.github.io/post/hands/) has an incredible insight, go check it out.
