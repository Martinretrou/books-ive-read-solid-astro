import { splitProps } from "solid-js";

type CoverCardProps = {
  img: {
    url: string;
    alt: string;
  };
};

export const CoverCard = (props: CoverCardProps) => {
  const [local] = splitProps(props, ["img"]);
  let ref: DOMRect | null;

  return (
    <div class='flex flex-col [perspective:800px]'>
      <div
        onMouseLeave={() => (ref = null)}
        onMouseEnter={(ev) => {
          ref = ev.currentTarget.getBoundingClientRect();
        }}
        onMouseMove={(ev) => {
          if (!ref) return;
          const x = ev.clientX - ref.left;
          const y = ev.clientY - ref.top;
          const xPercentage = x / ref.width;
          const yPercentage = y / ref.height;
          const xRotation = (xPercentage - 0.5) * 20;
          const yRotation = (0.5 - yPercentage) * 20;

          ev.currentTarget.style.setProperty("--x-rotation", `${yRotation}deg`);
          ev.currentTarget.style.setProperty("--y-rotation", `${xRotation}deg`);
          ev.currentTarget.style.setProperty("--x", `${xPercentage * 100}%`);
          ev.currentTarget.style.setProperty("--y", `${yPercentage * 100}%`);
        }}
        class='group relative grid w-[20vw] rounded-md transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.05)]'
      >
        <img class='w-full z-10' src={local.img.url} alt={local.img.alt} />
        <img
          class='absolute z-0 blur-2xl'
          src={local.img.url}
          alt={local.img.alt}
        />
      </div>
    </div>
  );
};
