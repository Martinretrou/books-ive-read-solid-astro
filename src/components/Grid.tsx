import { type Component, For, splitProps } from "solid-js";
import { Card } from "./Card";

type GridProps = {
  books: any[];
  year: number;
  variation?: string;
};

export const Grid: Component<GridProps> = (props) => {
  const [local] = splitProps(props, ["books", "year", "variation"]);

  return (
    <section class='relative z-10 py-32 flex flex-col w-screen min-h-screen h-fit mx-auto gap-5 p-[4vw]'>
      <h2 class='text-[50px] font-bold z-10 sticky top-[49vh] pointer-events-none'>
        {local.year}
      </h2>
      <For each={local.books}>
        {(book, index) => <Card index={index()} book={book} />}
      </For>
    </section>
  );
};
