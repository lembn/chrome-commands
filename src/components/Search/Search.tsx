import styled from "styled-components";
import { IoClose, IoSearch } from "react-icons/io5";
import { observer } from "mobx-react-lite";
import SearchData from "../../data/SearchData";
import Command from "../../data/Command";
import { animated, useSpring, useTransition } from "react-spring";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useEffect, useRef, KeyboardEvent } from "react";
import Result from "./Result";
import SearchResults from "./SearchResults";
import FocusOptions from "../../data/FocusOptions";

const initialContainerHeight = "3.8em";

const SearchBarContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  width: 34em;
  height: ${initialContainerHeight};
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
  margin-left: 15px;
  margin-bottom: 5px;

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
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
  margin: 0;
  color: #bebebe;
`;

const CloseIcon = styled(animated.span)`
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
  margin: 0;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: #dfdfdf;
  }
`;

const LineSeperator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;

const WarningMessage = styled.span`
  font-family: "SourceCodePro-Bold";
  font-size: 15px;
  color: #000;
  margin-left: 10px;
  flex: 2;
  display: flex;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #a1a1a1;
`;

export default observer(
  ({
    data,
    focusOptions,
    search,
  }: {
    data: SearchData;
    focusOptions: FocusOptions;
    search: (command: Command) => void;
  }) => {
    const searchBarContainerRef = useRef(null);
    const activeCommandRef = useRef(null);
    const clickedOutside = useOutsideClick(searchBarContainerRef);
    const searchBarContainerStyles = useSpring({
      config: { mass: 1, tension: 500, friction: 30 },
      to: {
        height: data.expanded ? "20em" : initialContainerHeight,
      },
    });

    const quickFadeIn = useTransition(data.expanded, {
      config: { duration: 50 },
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    });

    function keyDownHandler(event: KeyboardEvent<HTMLInputElement>) {
      if (data.filteredResults.length == 0) {
        //create command
      } else if (event.key === "Enter") {
        if (data.active > -1) {
          search(data.filteredResults[data.active]);
        } else {
          search(data.filteredResults[0]);
        }
      } else if (event.key === "Tab") {
        if (data.active > -1) {
          data.setQuery(data.filteredResults[data.active].commandText);
        } else {
          data.setQuery(data.filteredResults[0].commandText);
        }
      } else if (event.key === "ArrowUp") {
        if (data.active == -1) data.setActive(data.filteredResults.length - 1);
        else data.setActive(data.active - 1);
      } else if (event.key === "ArrowDown") {
        if (data.active == data.filteredResults.length - 1) data.setActive(-1);
        else data.setActive(data.active + 1);
      }
    }

    useEffect(() => {
      if (clickedOutside) data.close();
    }, [clickedOutside]);

    useEffect(() => {
      !data.mouseOver &&
        activeCommandRef.current &&
        activeCommandRef.current.scrollIntoView({
          behavior: "smooth",
        });
    }, [data.active]);

    return (
      <SearchBarContainer
        ref={searchBarContainerRef}
        style={searchBarContainerStyles}
        onMouseEnter={() => data.setMouseOver(true)}
        onMouseLeave={() => {
          data.setMouseOver(false);
          data.setActive(-1);
        }}
      >
        <SearchInputContainer>
          <SearchIcon>
            <IoSearch />
          </SearchIcon>

          <SearchInput
            placeholder="search..."
            spellCheck="false"
            autoFocus
            value={data.query}
            onFocus={data.open}
            onKeyDown={keyDownHandler}
            onChange={(event) => data.setQuery(event.target.value)}
          />

          {quickFadeIn((styles, toggle) =>
            toggle ? (
              <CloseIcon onClick={data.close} style={styles}>
                <IoClose />
              </CloseIcon>
            ) : (
              ""
            )
          )}
        </SearchInputContainer>

        {data.expanded && <LineSeperator />}

        {data.expanded && (
          <SearchResults
            generator={() => {
              if (data.filteredResults.length > 0)
                return data.filteredResults.map(
                  (command: Command, index: number) => (
                    <Result
                      key={command.commandId}
                      command={command}
                      onClick={search}
                      onHover={() => data.setActive(index)}
                      isActive={() => data.active == index}
                      getRef={() =>
                        data.active == index + 1 ||
                        (data.active == -1 && index == 0)
                          ? activeCommandRef
                          : undefined
                      }
                    />
                  )
                );
              else return <WarningMessage>no commands found</WarningMessage>;
            }}
          />
        )}
      </SearchBarContainer>
    );
  }
);
