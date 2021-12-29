import { action } from "mobx";
import { observer } from "mobx-react-lite";

export default observer(
  ({
    value,
    setValue,
    action,
  }: {
    value: string;
    setValue: (value: string) => void;
    action: () => void;
  }) => {
    return (
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") action();
        }}
        placeholder="search..."
        autoFocus
      />
    );
  }
);
