import {
  type Component,
  createSignal,
  For,
  onMount,
  Show,
  splitProps,
} from "solid-js";

type ItemShifterProps = {
  text?: string;
  image?: {
    url: string;
    alt: string;
  };
  className?: string;
};

const getRandomItemFromArray = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const ItemShifter: Component<ItemShifterProps> = (props) => {
  const [local, className] = splitProps(props, ["text", "className", "image"]);
  const [letters, setLetters] =
    createSignal<{ text: string; font: string }[]>();
  const [containerClass, setContainerClass] = createSignal<string>();

  let imgRef: HTMLImageElement;

  const fontClasses = [
    "sans",
    "pixel",
    "sans",
    "sans",
    "sans",
    "sans",
    "pixel",
  ];
  const translateClasses = [
    "translate-y-12",
    "translate-y-4",
    "-translate-y-4",
    "translate-x-16",
    "translate-y-8",
    "-translate-y-12",
    "-translate-x-12",
    "-translate-x-8",
    "rotate-6",
    "-rotate-6",
    "-rotate-3",
    "skew-x-3",
    "-skew-x-3",
    "skew-y-2",
    "-skew-y-2",
  ];

  onMount(() => {
    setContainerClass(getRandomItemFromArray(translateClasses));
    if (local.text) {
      setLetters(
        (local.text ?? "").split("").map((letter) => ({
          text: letter,
          font: getRandomItemFromArray(fontClasses),
        }))
      );
    }
  });

  const shifter = () => {
    let i = 0;
    const iterations = local.text
      ? local.text.length > 6
        ? 6
        : local.text.length
      : 6;
    console.log({ iterations });

    const performIteration = () => {
      if (i <= iterations) {
        if (local.text) {
          setLetters(
            (local.text ?? "").split("").map((letter) => ({
              text: letter,
              font: getRandomItemFromArray(fontClasses),
            }))
          );
        }

        setContainerClass(getRandomItemFromArray(translateClasses));

        i++;

        if (i <= iterations) {
          setTimeout(performIteration, 350);
        }
      }

      if (i === iterations + 1) {
        setContainerClass("");
      }
    };

    performIteration();
  };

  shifter();

  return (
    <>
      <Show when={letters()?.length}>
        <p class={"inline " + containerClass()}>
          <For each={letters()}>
            {(letter) => (
              <span class={`${letter.font} ${className}`}>{letter.text}</span>
            )}
          </For>
        </p>
      </Show>
      <Show when={local.image}>
        <div class={`flex ${containerClass()} ${local.className}`}>
          <img
            ref={(r) => (imgRef = r)}
            class='w-full'
            src={local.image?.url}
            alt={local.image?.alt}
          />
        </div>
      </Show>
    </>
  );
};
