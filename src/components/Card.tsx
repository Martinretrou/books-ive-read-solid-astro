import { type Component, createSignal, Show, splitProps } from "solid-js";
import { TextScambler } from "./TextScrambler";
import type { IBook } from "../types/book";

import slugify from "slugify";

type BookProps = {
  class?: string;
  book: IBook;
  index: number;
};

export const Card: Component<BookProps> = (props) => {
  const [local] = splitProps(props, ["class", "book", "index"]);
  const [isHovered, setIsHovered] = createSignal(false);

  return (
    <a
      href={`/book/${slugify(local.book.title.toLowerCase())}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      class='items-center grid grid-cols-23 '
    >
      <div class='flex flex-col col-start-[12] col-span-12 cursor-crosshair'>
        <div class='flex items-center justify-between'>
          <div class='flex text-left items-center'>
            <p class='text-gray-600'>{local.index + 1} - </p>
            <TextScambler text={local.book.title}></TextScambler>
          </div>
          <Show when={!local.book.review}>
            <p class='text-white bg-black py-2 px-4 h-fit'>
              Currently reading this book
            </p>
          </Show>
          <Show when={!!local.book.review}>
            <p class='text-white bg-black py-2 px-4 h-fit'>
              {local.book.review}/5{" "}
            </p>
          </Show>
        </div>
        <p class='text-gray-500 '>{local.book.author}</p>
      </div>
      <Show when={isHovered()}>
        <div class='fixed left-[20vw] flex items-center h-screen top-0 z-20'>
          <img
            class='w-[20vw]'
            src={local.book.image.url}
            alt={local.book.image.alt}
          />
        </div>
      </Show>
    </a>
  );
};
