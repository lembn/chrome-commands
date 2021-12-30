import { observer } from "mobx-react-lite";
import { MutableRefObject, KeyboardEvent } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import RemoveIcon from "./RemoveIcon";
import { RiArrowDropRightLine } from "react-icons/ri";

const InputContainer = styled.div`
  min-height: 4em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const TextInput = styled.input`
  font-family: "SourceCodePro";
  font-size: 15px;
  color: #000;
  margin-left: 10px;
  flex: 2;
  display: flex;
  font-weight: 500;
  border-left: 0;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #999;
  outline: none;
  background: transparent;

  &[readOnly]:focus {
    cursor: pointer;
    box-shadow: 0 0 10px #9ecaed;
    border: 2px solid #dadada;
    border-color: #9ecaed;
    border-radius: 7px;
    padding: 10px;
  }
`;

const ExpandIconContainer = styled(animated.span)`
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
  margin: 0;
`;

export default observer(
  ({
    placeholder,
    value,
    remove,
    _ref,
    setValue,
    onKeyPress,
    expand,
    onExpand,
    readOnly,
  }: {
    placeholder: string;
    value?: string;
    remove?: () => void;
    _ref?: MutableRefObject<any>;
    setValue?: (value: string) => void;
    onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
    expand?: boolean | undefined;
    onExpand?: () => void;
    readOnly?: boolean;
  }) => {
    let expandStyles;
    if (expand === undefined) {
      expandStyles = undefined;
    } else {
      expandStyles = useSpring({
        to: {
          transform: `rotate(${expand ? 90 : 0}deg)`,
        },
      });
    }

    return (
      <InputContainer>
        {expand !== undefined && (
          <ExpandIconContainer style={expandStyles} onClick={onExpand}>
            <RiArrowDropRightLine />
          </ExpandIconContainer>
        )}

        <TextInput
          type="text"
          readOnly={readOnly}
          spellCheck="false"
          value={value}
          placeholder={placeholder}
          onChange={
            setValue ? (event) => setValue(event.target.value) : undefined
          }
          onKeyPress={onKeyPress ? onKeyPress : undefined}
          ref={_ref}
        />

        {remove && <RemoveIcon onClick={remove} />}
      </InputContainer>
    );
  }
);
