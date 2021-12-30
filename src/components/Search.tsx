import styled from "styled-components";
import { IoClose, IoSearch } from "react-icons/io5";
import { observer } from "mobx-react-lite";

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 34em;
  height: 3.8em;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
`;

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 4em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 21px;
  color: #12112e;
  font-family: "SourceCodePro";
  border-radius: 6px;
  background-color: transparent;

  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }

  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
`;

const CloseIcon = styled.span`
  color: #bebebe;
  font-size: 23px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #dfdfdf;
  }
`;

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
      <SearchBarContainer>
        <SearchInputContainer>
          <SearchIcon>
            <IoSearch />
          </SearchIcon>

          <SearchInput
            placeholder="search..."
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ENTER") action();
            }}
          />

          <SearchIcon>
            <IoClose />
          </SearchIcon>
        </SearchInputContainer>
      </SearchBarContainer>
    );
  }
);
