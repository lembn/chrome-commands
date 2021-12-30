import { IoIosCloseCircleOutline } from "react-icons/io";
import styled from "styled-components";

const RemoveIconContainer = styled.span`
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
  margin-left: 5px;
  font-size: 18px;
  color: #bebebe;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

export default function RemoveIcon({ onClick }: { onClick: () => void }) {
  return (
    <RemoveIconContainer onClick={onClick}>
      <IoIosCloseCircleOutline />
    </RemoveIconContainer>
  );
}
