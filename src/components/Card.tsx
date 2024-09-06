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
      class={"items-center grid sm:grid-cols-1 md:grid-cols-23 group py-4 mb-4"}
    >
      <div class='flex flex-col md:col-start-[12] md:col-span-12'>
        <div class='relative'>
          <img
            class={`md:hidden relative flex w-[50vw] max-w-[260px] z-10 mb-4 transition-all ${
              local.active
                ? "scale-110 translate-x-3 -translate-y-3"
                : "scale-100 "
            }`}
            src={local.book.image.url}
            alt={local.book.image.alt}
          />
          <Show when={local.active}>
            <img
              class='md:hidden absolute flex w-[50vw] max-w-[260px] top-0 z-0 blur-2xl'
              src={local.book.image.url}
              alt=''
            />
          </Show>
        </div>
        <div class='flex items-center justify-between'>
          <div class='flex text-left items-center'>
            <TextScambler
              className={`${
                local.active ? " bg-black text-white ml-0 px-2" : ""
              } text-xl md:text-[20px] lg:text-[24px]`}
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
              class={`text-white bg-black py-1 md:py-2 px-2 md:px-4 h-fit transition-all ${
                local.active ? " md:-translate-x-5" : ""
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
          <p class='text-gray-700 '>{local.book.comment}</p>
        </Show>
      </div>
      <Show when={local.active}>
        <div
          class={`hidden md:flex fixed left-[20vw]  items-center h-screen top-0`}
        >
          <CoverCard img={local.book.image} />
        </div>
      </Show>
    </div>
  );
};
