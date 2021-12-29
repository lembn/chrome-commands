import { observer } from "mobx-react-lite";
import { MutableRefObject } from "react";
import { KeyboardEvent } from "react";

export default observer(
  ({
    placeholder,
    value,
    setValue,
    onKeyPress,
    readOnly,
    _ref,
  }: {
    placeholder: string;
    value?: string;
    setValue?: (value: string) => void;
    onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    _ref?: MutableRefObject<null>;
  }) => {
    return (
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={
          setValue ? (event) => setValue(event.target.value) : undefined
        }
        onKeyPress={onKeyPress}
        readOnly={readOnly}
        ref={_ref}
      />
    );
  }
);
