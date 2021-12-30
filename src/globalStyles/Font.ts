import { createGlobalStyle } from "styled-components";

import SCP_Regular from "../fonts/SourceCodePro-Regular.ttf";

export default createGlobalStyle`
    @font-face {
    font-family: "SourceCodePro";
    src: url(${SCP_Regular})
        format("truetype");
    font-weight: 400;
    font-style: normal;
  }
`;
