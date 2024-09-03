import { type Component, createSignal, splitProps } from "solid-js";

type GridProps = {
  text: string;
  className?: string;
};

export const TextScambler: Component<GridProps> = (props) => {
  const [local] = splitProps(props, ["text", "className"]);
  const [isHovered, setIsHovered] = createSignal(false);
  const [scrambledText, setScrambledText] = createSignal(local.text);

  const scrambleText = () => {
    const scrambleChars = "abcdefghijklmnopqrstuvwxyz-.，+*@&%/=";
    let i = 0;

    const performIteration = () => {
      if (i <= local.text.length) {
        const unscrambledText = local.text
          .split("")
          .map((char, index) => {
            if (index < i) {
              return local.text[index];
            }
            return scrambleChars[
              Math.floor(Math.random() * scrambleChars.length)
            ];
          })
          .join("");

        setScrambledText(unscrambledText);

        i++;

        if (i <= local.text.length) {
          setTimeout(performIteration, 12);
        }
      }
    };

    performIteration();
  };

  const handleHover = () => {
    setIsHovered(true);
    scrambleText();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      class={
        "-ml-2 px-2 py-1 hover:bg-black hover:text-white w-fit" +
        local.className
      }
    >
      <p class='text-[24px]  font-bold'>{scrambledText()}</p>
    </div>
  );
};
