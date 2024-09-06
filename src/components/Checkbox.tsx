import { createEffect, type Component } from "solid-js";
import { createCheckbox, type AriaCheckboxProps } from "@solid-aria/checkbox";
import { createFocusRing } from "@solid-aria/focus";
import { createVisuallyHidden } from "@solid-aria/visually-hidden";

type CheckboxProps = {
  onChange: (state: boolean) => void;
} & AriaCheckboxProps;

export const Checkbox: Component<CheckboxProps> = (props) => {
  let ref: HTMLInputElement | undefined;

  const { inputProps, state } = createCheckbox(props, () => ref);
  const { focusProps } = createFocusRing();
  const { visuallyHiddenProps } = createVisuallyHidden();

  return (
    <label
      class='cursor-pointer mt-2'
      style={{ display: "flex", "align-items": "center" }}
    >
      <div {...visuallyHiddenProps}>
        <input {...inputProps} {...focusProps} ref={ref} />
      </div>
      <div
        class={`w-16 h-9 rounded-full cursor-pointer border border-black ${
          state.isSelected() ? "bg-black" : "bg-white"
        }`}
        onClick={() => props.onChange(state.isSelected())}
      >
        <div
          class={`w-8 h-8 mt-[1px] ml-[2px] rounded-full bg-white border border-black transition-all ${
            state.isSelected() ? "translate-x-7" : ""
          }`}
        />
      </div>
      {props.children}
    </label>
  );
};
