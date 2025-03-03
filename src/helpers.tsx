import React, { ReactChild, ReactFragment, ReactPortal } from 'react';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import type {
  Refs,
  Item,
  IOItem,
  ItemOrElement,
  visibleElements,
  scrollToItemOptions,
  CustomScrollBehavior,
} from './types';
import { separatorString, id as itemId } from './constants';
import { observerOptions } from './settings';
import { dataKeyAttribute, dataIndexAttribute } from './constants';

export const getNodesFromRefs = (refs: Refs): HTMLElement[] => {
  const result = Object.values(refs)
    .map((el) => el.current)
    .filter(Boolean);

  return result as HTMLElement[];
};

export function observerEntriesToItems(
  entries: IntersectionObserverEntry[],
  options: typeof observerOptions
): Item[] {
  return [...entries].map((entry) => {
    const target = entry.target as HTMLElement;
    const key = String(target?.dataset?.key ?? '');
    const index = String(target?.dataset?.index ?? '');

    return [
      key,
      {
        index,
        key,
        entry,
        visible: entry.intersectionRatio >= options.ratio,
      },
    ];
  });
}

function scrollToItem<T>(
  item: ItemOrElement,
  behavior?: ScrollBehavior | CustomScrollBehavior<T>,
  inline?: ScrollLogicalPosition,
  block?: ScrollLogicalPosition,
  rest?: scrollToItemOptions,
  noPolyfill?: boolean
): T | Promise<T> | void {
  const _item = (item as IOItem)?.entry?.target || item;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _behavior: any = behavior || 'smooth';

  if (_item) {
    if (noPolyfill) {
      return _item?.scrollIntoView({
        behavior: _behavior,
        inline: inline || 'end',
        block: block || 'nearest',
      });
    }
    return scrollIntoView(_item, {
      behavior: _behavior,
      inline: inline || 'end',
      block: block || 'nearest',
      duration: 500,
      ...rest,
    });
  }
}

export { scrollToItem };

export const getItemElementById = (
  id: string | number,
  parent?: null | HTMLElement
) => (parent || document).querySelector(`[${dataKeyAttribute}='${id}']`);

export const getItemElementByIndex = (
  id: string | number,
  parent?: null | HTMLElement
) => (parent || document).querySelector(`[${dataIndexAttribute}='${id}']`);

export function getElementOrConstructor(
  Elem: React.FC | React.ReactNode
): JSX.Element | null {
  return (
    (React.isValidElement(Elem) && Elem) ||
    (typeof Elem === 'function' && <Elem />) ||
    null
  );
}

export const filterSeparators = (items: visibleElements): visibleElements =>
  items.filter((item) => !new RegExp(`.*${separatorString}$`).test(item));

export const getItemId = (item: ReactChild | ReactFragment | ReactPortal) =>
  String(
    (item as JSX.Element)?.props?.[itemId] ||
      String((item as JSX.Element)?.key || '').replace(/^\.\$/, '')
  );
