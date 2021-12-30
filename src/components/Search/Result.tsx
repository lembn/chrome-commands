import { observer } from "mobx-react-lite";
import { MutableRefObject } from "react";
import styled from "styled-components";
import Command from "../../data/Command";
import Text from "../../styles/Text";

const ResultContainer = styled.div`
  width: 100%;
  min-height: 4.5em;
  display: flex;
  border: none;
  padding: 6px 8px;
  align-items: center;
  border-radius: 8px;
  transition: background 80ms ease-in-out;
  background: ${({ selected }: { selected: boolean }) =>
    selected ? "#dbdbdb" : "transparent"};
  border-bottom: ${({ selected }: { selected: boolean }) =>
    selected ? "none" : "2px solid #d8d8d852"};
`;

const Name = styled.h3`
  ${Text}
`;

const URLs = styled.h3`
  ${Text}
  font-family: "SourceCodePro";
  font-weight: 500;
  font-style: italic;
`;

export default observer(
  ({
    command,
    onClick,
    onHover,
    isActive,
    getRef,
  }: {
    command: Command;
    onClick: (command: Command) => void;
    onHover: () => void;
    isActive: () => boolean;
    getRef: () => MutableRefObject<any>;
  }) => {
    return (
      <ResultContainer
        selected={isActive()}
        onMouseEnter={onHover}
        onClick={() => onClick(command)}
        ref={getRef()}
      >
        <Name>{command.commandText}</Name>
        <URLs>
          [{command.URLs.size > 0 && command.getURLs()[0][1] + " "}...]
        </URLs>
      </ResultContainer>
    );
  }
);
