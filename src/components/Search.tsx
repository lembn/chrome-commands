import { observer } from "mobx-react-lite";

export default observer(
  ({
    value,
    setValue,
  }: {
    value: string;
    setValue: (value: string) => void;
  }) => {
    return (
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="search..."
        autoFocus
      />
    );
  }
);
