import { type Component, createSignal, Show, splitProps } from "solid-js";
import { TextScambler } from "./TextScrambler";
import type { IBook } from "../types/book";

import slugify from "slugify";
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
    <a
      ref={props.ref}
      href={`/book/${slugify(local.book.title.toLowerCase())}`}
      class={"items-center grid grid-cols-23 cursor-pointer group py-4"}
    >
      <div class='flex flex-col col-start-[12] col-span-12'>
        <div class='flex items-center justify-between'>
          <div class='flex text-left items-center'>
            <TextScambler
              className={local.active ? " bg-black text-white" : ""}
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
                local.active ? " -translate-x-5" : ""
              }`}
            >
              {local.book.review}/5{" "}
            </p>
          </Show>
        </div>
        <p class='text-gray-500'>{local.book.author}</p>
      </div>
      <Show when={local.active}>
        <div class={`fixed left-[20vw] flex items-center h-screen top-0`}>
          <CoverCard img={local.book.image} />
        </div>
      </Show>
    </a>
  );
};
