import {
  type Component,
  createEffect,
  createSignal,
  For,
  Show,
  splitProps,
} from "solid-js";
import { Card } from "./Card";
import { ItemShifter } from "./ItemShifter";

type YearProps = {
  books: any[];
  year: number;
  variation?: string;
  isActive?: boolean;
  ref: any;
};

export const Year: Component<YearProps> = (props) => {
  const [local] = splitProps(props, ["books", "year", "variation", "isActive"]);
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
    if (!local.isActive) {
      setCurrentElement(null);
    }
  }, 100);

  createEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <section
      ref={props.ref}
      class={`relative z-10 pb-48 flex flex-col w-screen h-fit mx-auto gap-5 p-[4vw] year-${local.year}`}
    >
      <Show when={local.isActive}>
        <div class='text-[50px] font-bold z-10 sticky top-[49vh] pointer-events-none'>
          <ItemShifter text={String(local.year)} />
        </div>
      </Show>
      <For each={local.books}>
        {(book, index) => (
          <Card
            ref={(el: any) => (elementsRef[index()] = el)}
            active={
              currentElement() !== null
                ? (currentElement() ?? 0) - 1 === index()
                : false
            }
            index={index()}
            book={book}
          />
        )}
      </For>
    </section>
  );
};
