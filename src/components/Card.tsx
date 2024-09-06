import { type Component, createSignal, Show, splitProps } from "solid-js";
import { TextScambler } from "./TextScrambler";
import type { IBook } from "../types/book";

import { CoverCard } from "./CoverCard";

type BookProps = {
  class?: string;
  book: IBook;
  index: number;
  active?: boolean;
  ref: any;
};

export const Card: Component<BookProps> = (props) => {
  const [local] = splitProps(props, ["class", "book", "index", "active"]);

  return (
    <div
      ref={props.ref}
      class={"items-center grid sm:grid-cols-1 lg:grid-cols-23 group py-4 mb-4"}
    >
      <div class='flex flex-col lg:col-start-[12] lg:col-span-12'>
        <img
          class='lg:hidden flex w-[50vw] mb-4'
          src={local.book.image.url}
          alt={local.book.image.alt}
        />
        <div class='flex items-center justify-between'>
          <div class='flex text-left items-center'>
            <TextScambler
              className={`${
                local.active ? " bg-black text-white ml-0 px-2" : ""
              } text-xl lg:text-[24px]`}
              text={local.book.title}
            ></TextScambler>
          </div>
          <Show when={!local.book.review}>
            <p class='text-white bg-black py-2 px-4 h-fit'>
              Currently reading this book
            </p>
          </Show>
          <Show when={!!local.book.review}>
            <p
              class={`text-white bg-black py-2 px-4 h-fit transition-all ${
                local.active ? "-translate-x-2 lg:-translate-x-5" : ""
              }`}
            >
              {local.book.review}/5{" "}
            </p>
          </Show>
        </div>
        <p class='text-gray-500 mt-1 mb-4 pb-2 border-b border-black'>
          {local.book.author}
        </p>
        <Show when={local.book.comment?.length}>
          <p class='text-gray-700  '>{local.book.comment}</p>
        </Show>
      </div>
      <Show when={local.active}>
        <div
          class={`hidden lg:flex fixed left-[20vw]  items-center h-screen top-0`}
        >
          <CoverCard img={local.book.image} />
        </div>
      </Show>
    </div>
  );
};
