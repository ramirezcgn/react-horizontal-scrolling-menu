# Fork of [React horizontal scrolling menu](https://github.com/asmyshlyaev177/react-horizontal-scrolling-menu)

[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://war.ukraine.ua)

![example](/sample.gif)

[![npm](https://img.shields.io/npm/v/react-horizontal-scrolling-menu.svg)](https://www.npmjs.com/package/@ramirezcgn/react-horizontal-scrolling-menu)
[![Tests](https://github.com/ramirezcgn/react-horizontal-scrolling-menu/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/ramirezcgn/react-horizontal-scrolling-menu/actions/workflows/tests.yml)

### [Poll what you like/dislike/need from this library](https://github.com/asmyshlyaev177/react-horizontal-scrolling-menu/discussions/221)

### Proud corner

[performance-dashboard-on-aws
](https://github.com/awslabs/performance-dashboard-on-aws/blob/49ce2517a29569a9761dec8f212f25cf85a394af/frontend/src/components/Tabs.tsx#L3) |
[React status code](https://react.statuscode.com/issues/257)

### Examples

[Demo](https://ramirezcgn.github.io/react-horizontal-scrolling-menu)

[Basic example](https://codesandbox.io/s/react-horizontal-scrolling-menu-v2-basic-example-swg0y?file=/src/index.tsx)

[Hidden scrollbar and arrows on bottom](https://codesandbox.io/s/no-scrollbar-and-buttons-position-c3kn5?file=/src/index.tsx)

[Select item](https://codesandbox.io/s/react-horizontal-scrolling-menu-v2-basic-with-select-item-qtxwt?file=/src/index.tsx)

[Drag by mouse](https://codesandbox.io/s/react-horizontal-scrolling-menu-v2-drag-by-mouse-o3u2t?file=/src/index.tsx)

[Click and select multiple items](https://codesandbox.io/s/react-horizontal-scrolling-menu-v2-item-selection-and-click-0oze7?file=/src/index.tsx)

[Scroll by 1 item](https://codesandbox.io/s/react-horizontal-scrolling-menu-v2-scroll-one-item-6hn8q?file=/src/index.tsx)

[Center items](https://codesandbox.io/s/center-items-on-click-drag-e8cyph?file=/src/index.tsx)

[Dynamically add items when last is visible](https://codesandbox.io/s/react-horizontal-scrolling-menu-v2-dynamically-add-items-38ted?file=/src/index.tsx)

[apiRef - controling component outside](https://codesandbox.io/s/react-horizontal-scrolling-menu-v2-apiref-vdr0d?file=/src/index.tsx)

[Add item and scroll to it](https://codesandbox.io/s/basic-example-forked-3j0xm?file=/src/index.tsx)

[RTL](https://codesandbox.io/s/rtl-ng3bq9?file=/src/index.tsx)

[Loop scroll](https://codesandbox.io/s/loop-scroll-4w8ek6?file=/src/index.tsx)

[One centered item](https://codesandbox.io/s/one-item-j9dzxd?file=/src/index.tsx)

[Custom transition/animation](https://codesandbox.io/s/custom-transition-animation-n2pyn)

[Swipe on mobile devices(need to run locally, codesandbox has issues)](https://codesandbox.io/s/swipe-on-mobile-qmgqtj)


### Previous version [V1](https://github.com/asmyshlyaev177/react-horizontal-scrolling-menu/tree/v1)

This is a horizontal scrolling menu component for React.
Menu component has adaptive width, just set width for parent container.
Items width will be determined from CSS styles.

For navigation, you can use scrollbar, native touch scroll, mouse wheel or drag by mouse.

Component provide context with visible items and helpers.

Possible set default position on initialization.

:star: if you like the project :)

### NextJS issues
[Cannot use import statement outside a module](https://github.com/asmyshlyaev177/react-horizontal-scrolling-menu/issues/240)_

## Quick start

```bash
npm install @ramirezcgn/react-horizontal-scrolling-menu
```

In project:

```javascript
import React from 'react';
import { ScrollMenu, VisibilityContext } from '@ramirezcgn/react-horizontal-scrolling-menu';
import '@ramirezcgn/react-horizontal-scrolling-menu/dist/styles.css';

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }));

function App() {
  const [items, setItems] = React.useState(getItems);
  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
    };

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {items.map(({ id, i }) => (
        <Card
          itemId={id} // NOTE: itemId is required for track items
          itemClassName={ i % 2 ? 'odd' : 'even'} // Optional custom class for item container element
          title={id}
          key={id}
          onClick={handleClick(id)}
          selected={isItemSelected(id)}
        />
      ))}
    </ScrollMenu>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      Left
    </Arrow>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
      Right
    </Arrow>
  );
}

function Card({ onClick, selected, title, itemId }) {
  const visibility = React.useContext(VisibilityContext);

  return (
    <div
      onClick={() => onClick(visibility)}
      style={{
        width: '160px',
      }}
      tabIndex={0}
    >
      <div className="card">
        <div>{title}</div>
        <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
        <div>selected: {JSON.stringify(!!selected)}</div>
      </div>
      <div
        style={{
          height: '200px',
        }}
      />
    </div>
  );
}

export default App;
```

Check out Example in `example-nextjs` folder for info how to implement more features like mouse drag or disable body scroll.

## Example

You can clone repository and run demo project.

```bash
git clone https://github.com/ramirezcgn/react-horizontal-scrolling-menu
yarn install
yarn run demo
```

### Helpers and api

Children of main ScrollMenu component(arrows, fotter, items) can use **VisibilityContext** to access state and callbacks.
Function callbacks also pass context, eg `onWheel`, `onScroll` etc.

## Properties and callbacks

| Prop                     | Signature                                                     |
| ------------------------ | ------------------------------------------------------------- |
| LeftArrow                | React component for left arrow                                |
| RightArrow               | React component for right arrow                               |
| Header                   | React component Header                                        |
| Footer                   | React component Footer                                        |
| onWheel                  | (VisibilityContext, event) => void                            |
| onScroll                 | (VisibilityContext, event) => void, will fire _before_ scroll |
| onInit                   | (VisibilityContext) => void                                   |
| apiRef                   | React.RefObject                                               |
| onUpdate                 | (VisibilityContext) => void                                   |
| onMouseDown              | (VisibilityContext) => (React.MouseEventHandler) => void      |
| onMouseUp                | (VisibilityContext) => (React.MouseEventHandler) => void      |
| onMouseMove              | (VisibilityContext) => (React.MouseEventHandler) => void      |
| onTouchMove              | (VisibilityContext) => (React.TouchEventHandler) => void      |
| onTouchStart             | (VisibilityContext) => (React.TouchEventHandler) => void      |
| onTouchEnd               | (VisibilityContext) => (React.TouchEventHandler) => void      |
| itemClassName            | ClassName of Item                                             |
| separatorClassName       | ClassName of Item's separator                                 |
| scrollContainerClassName | ClassName of scrollContainer                                  |
| transitionDuration       | Duration of transitions in ms, default 500                    |
| transitionBehavior       | 'smooth' \|'auto' \| customFunction                           |
| transitionEase           | Ease function, eg t => t\*(2-t)                               |
| wrapperClassName         | ClassName of the outer-most div                               |
| RTL                      | Enable Right to left direction                                |
| noPolyfill               | Don't use polyfill for scroll, no transitions                 |

### VisibilityContext

| Prop                                                            | Signature                                              |
| --------------------------------------------------------------- | ------------------------------------------------------ |
| getItemById                                                     | itemId => IOItem \| undefined                          |
| getItemElementById                                              | itemId => DOM Element \| null                          |
| getItemByIndex                                                  | index => IOItem \| undefined                           |
| getItemElementByIndex                                           | index => DOM Element \| null                           |
| getNextElement (use this first, result without separators)      | () => IOItem \| undefined                              |
| getNextItem                                                     | () => IOItem \| undefined)                             |
| getPrevElement (use this first, result without separators)      | () => IOItem \| undefined                              |
| getPrevItem                                                     | () => IOItem \| undefined                              |
| initComplete                                                    | boolean                                                |
| isFirstItemVisible                                              | boolean                                                |
| isItemVisible                                                   | itemId => boolean                                      |
| isLastItem                                                      | boolean                                                |
| isLastItemVisible                                               | boolean                                                |
| scrollNext                                                      | (behavior, inline, block, ScrollOptions) => void       |
| scrollPrev                                                      | (behavior, inline, block, ScrollOptions) => void       |
| scrollToItem                                                    | (item, behavior, inline, block, ScrollOptions) => void |
| initComplete                                                    | boolean                                                |
| items                                                           | ItemsMap class instance                                |
| scrollContainer                                                 | Ref<OuterContainer>                                    |
| visibleElements                                                 | ['item1', 'item2']                                     |
| visibleElementsWithSeparators                                   | ['item1', 'item1-separator', 'item2']                  |
| visibleItemsWithoutSeparators (deprecated, use visibleElements) | ['item1', 'item2']                                     |
| visibleItems (deprecated, use visibleElementsWithSeparators)    | ['item1', 'item1-separator', 'item2']                  |

### Transition/Animation

NOTE: won't work with RTL prop

Can use `transitionDuration`, `transitionEase` and `transitionBehavior`
See [example](https://codesandbox.io/s/custom-transition-animation-n2pyn)

#### ScrollOptions for scrollToItem, scrollPrev, scrollNext

Will override transition\* options passed to ScrollMenu

```javascript
{
  // target,
  behavior, // 'smooth', 'auto' or custom function
    // inline,
    // block,
    {
      duration: number, // number in milliseconds
      ease: (t) => t, // ease function, more https://gist.github.com/gre/1650294#file-easing-js
    };
}
```

### Other helpers

#### slidingWindow

Can get previous or next visible group of items with `slidingWindow(allItems: string[], visibleItems: string[])` helper, e.g

```
slidingWindow(allItems, visibleItems)
.prev()
//.next()
```

#### getItemsPos

Can get first, center and last items, e.g.

```
const prevGroup = slidingWindow(allItems, visibleItems).prev()
const { first, center: centerItem, last } = getItemsPos(prevGroup)

// and scroll to center item of previous group of items
scrollToItem(getItemById(centerItem, 'smooth', 'center'))

```

Check out [examples](#examples)

### apiRef

Can pass Ref object to Menu, current value will assigned as VisibilityContext. But `visibleItems` and some other values can be staled, so better use it only for firing functions like `scrollToItem`.

For scrolling use `apiRef.scrollToItem(apiRef.getItemElementById)` instead of `apiRef.scrollToItem(apiRef.getItemById)`.

Can get item outside of context via `apiRef.getItemElementById(id)` or directly via `` document.querySelector(`[data-key='${itemId}']`) ``.
See [`apiRef` example and `Add item and scroll to it`](#examples)

## Browser support

- Browser must support **IntersectionObserver API** and **requestAnimationFrame** or use polyfills.
- Only modern browsers, no IE or smart toasters

## About

My first npm project. Sorry for my english.

Any contribution and correction appreciated. Just fork repo, commit and make PR, don't forget about tests.

## [Contributing](https://github.com/ramirezcgn/react-horizontal-scrolling-menu/blob/main/CONTRIBUTING.md)

## [Changelog](https://github.com/ramirezcgn/react-horizontal-scrolling-menu/blob/main/CHANGELOG.md)
