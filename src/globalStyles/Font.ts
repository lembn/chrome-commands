import { createGlobalStyle } from "styled-components";
import SCP_Regular from "../fonts/SourceCodePro-Regular.ttf";
import SCP_MediumItalic from "../fonts/SourceCodePro-MediumItalic.ttf";
import SCP_Bold from "../fonts/SourceCodePro-Bold.ttf";

export default createGlobalStyle`
    @font-face {
    font-family: "SourceCodePro";
    src: url(${SCP_Regular})
        format("truetype");
    font-style: normal;
  }

  @font-face {
    font-family: "SourceCodePro";
    src: url(${SCP_MediumItalic})
        format("truetype");
    font-style: italic;
  }

  @font-face {
    font-family: "SourceCodePro-Bold";
    src: url(${SCP_Bold})
        format("truetype"); 
    font-weight: bold;
  }
`;
