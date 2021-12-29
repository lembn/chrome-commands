import { observer } from "mobx-react-lite";

export default observer(
  ({
    placeholder,
    value,
    setValue,
    beforeInput,
  }: {
    placeholder: string;
    value?: string;
    setValue?: (value: string) => void;
    beforeInput?: () => void;
  }) => {
    return (
      <input
        type="text"
        placeholder={placeholder}
        value={value || ""}
        onChange={
          setValue ? (event) => setValue(event.target.value) : undefined
        }
        onBeforeInput={beforeInput || undefined}
      />
    );
  }
);
