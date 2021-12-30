import styled from "styled-components";

const SearchResultsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1em;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;

    &:hover {
      background-color: #a8bbbf;
    }
  }
`;

export default function SearchResults({
  generator,
}: {
  generator: () => JSX.Element[] | JSX.Element;
}) {
  return <SearchResultsContainer>{generator()}</SearchResultsContainer>;
}
