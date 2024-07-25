import { type Component, splitProps } from "solid-js";

type HeroProps = {
  class?: string;
};

export const Hero: Component<HeroProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div class='animated-gradient bg-gradient-to-r from-[#d53369] to-[#daae51]'>
      <h1 class='text-[150px] font-bold'>Books I've read</h1>
      <p class='text-xl'>
        Here's a list of my readings ranging from early 2016 to right now
        (2024).
      </p>
    </div>
  );
};
