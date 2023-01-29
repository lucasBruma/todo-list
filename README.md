# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Links

- Solution URL: (https://github.com/lucasBruma/todo-list)
- Live Site URL: (https://lucasbruma.github.io/todo-list/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Javascript Vanilla
- Only one library. Sortable.js (https://sortablejs.github.io/Sortable/)


### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

- BEM 
- Modules
- Some type of events that I hadn't heard of, like mouseover or mouseout.
- Sortable library.
- Event Delegation.
- This type of selector.
```css
input[type=checkbox]:hover{
    border: 1px solid hsl(236, 33%, 92%);
}
```
- Spread operator and querySelectorAll.
```js
const array = [...document.querySelectorAll('.active')];
```
- LocalStorage

### Useful resources

- [ChatGPT](https://chat.openai.com/chat) - This IA helped me to understand some concepts, fix errors and give me ideas to solve problems.

## Author

- Website - [Lucas Brumatti](https://lucasbrumatti.netlify.app/)



