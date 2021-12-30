import styled from "styled-components";
import Scrollbar from "../styles/Scrollbar";

const SearchResultsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1em;
  overflow-y: auto;

  ${Scrollbar}
`;

export default function SearchResults({
  generator,
}: {
  generator: () => JSX.Element[] | JSX.Element;
}) {
  return <SearchResultsContainer>{generator()}</SearchResultsContainer>;
}
