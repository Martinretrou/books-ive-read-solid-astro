import { type Component, splitProps } from "solid-js";
import {
  createOptions,
  Select as SelectComponent,
} from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";

type SelectProps = {
  class?: string;
  options: string[];
};

export const Select: Component<SelectProps> = (props) => {
  const [local] = splitProps(props, ["class", "options"]);

  const selectProps = createOptions(local.options, { createable: true });

  return (
    <SelectComponent
      class='mt-2 border border-black bg-white h-10'
      {...selectProps}
    />
  );
};
