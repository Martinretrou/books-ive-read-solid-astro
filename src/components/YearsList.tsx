import {
  type Component,
  createEffect,
  createSignal,
  For,
  Show,
  splitProps,
} from "solid-js";
import type { IBook } from "../types/book";
import { Year } from "./Year";

type YearsListProps = {
  booksByYear: {
    books: IBook[];
    year: number;
  }[];
};

export const YearsList: Component<YearsListProps> = (props) => {
  const [local] = splitProps(props, ["booksByYear"]);
  const [currentElement, setCurrentElement] = createSignal<number | null>(null);
  const elementsRef: HTMLDivElement[] = [];

  function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): T {
    let inThrottle: boolean;
    return function (this: any, ...args: Parameters<T>): ReturnType<T> | void {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    } as T;
  }

  const findClosestElement = () => {
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;
    let closestElement = {
      index: -1,
      distance: Infinity,
    };
    elementsRef.forEach((element, index) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distanceToCenter = Math.abs(elementCenter - viewportCenter);

        if (distanceToCenter < closestElement.distance) {
          closestElement = {
            index,
            distance: distanceToCenter,
          };
        }
      }
    });
    return closestElement.index;
  };

  const handleScroll = throttle(() => {
    const closestIndex = findClosestElement();
    setCurrentElement(closestIndex + 1);
  }, 100);

  createEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <For each={local.booksByYear}>
      {(year, index) => (
        <Year
          ref={(el: any) => (elementsRef[index()] = el)}
          variation='warm-gradient'
          books={year.books}
          year={year.year}
          isActive={
            currentElement() !== null
              ? (currentElement() ?? 0) - 1 === index()
              : false
          }
        />
      )}
    </For>
  );
};
