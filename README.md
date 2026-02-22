## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
* getElementById = one by ID
* getElementsByClassName = many by class (live)
* querySelector = first match (flexible)
* querySelectorAll = all matches (flexible)

## 2. How do you create and insert a new element into the DOM?
* createElement → innerText → appendChild

## 3.  What is Event Bubbling? And how does it work?
* When an event happens on an element, it first runs on that element, then moves upward through its parents.

## 4. What is Event Delegation in JavaScript? Why is it useful?
* Instead of adding event listeners to many child elements, we add one event listener to a parent and let events bubble up. Because of event bubbling, the parent can detect what was clicked.

## 5. What is the difference between preventDefault() and stopPropagation() methods?
* preventDefault() → Stops the default browser action for an event.
* stopPropagation() → Stops the event from bubbling up (or capturing down) the DOM.
