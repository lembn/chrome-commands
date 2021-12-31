import { observer } from "mobx-react-lite";
import CommandList from "./components/CommandList";
import Search from "./components/Search";
import CommandListData from "./data/CommandListData";
import SearchData from "./data/SearchData";
import FocusOptions from "./data/FocusOptions";
import styled from "styled-components";
import Scrollbar from "./components/styles/Scrollbar";

function save() {
  function replacer(key: string, value: any) {
    const ignore = ["expanded", "commandId"];
    if (value instanceof Map) return Array.from(value.entries());
    else if (ignore.includes(key)) return undefined;
    else return value;
  }

  const json = JSON.stringify(commandListData, replacer);
  chrome.runtime.sendMessage(`save::${json}`);
}

chrome.runtime.connect({ name: "popup" });

const commandListData = new CommandListData();
chrome.storage.sync.get("data", (storage: { [key: string]: string }) => {
  const data = JSON.parse(storage["data"])["commands"];
  commandListData.load(data);
});
const searchData = new SearchData(commandListData.getCommands);
const focusOptions = new FocusOptions();

const AppContainer = styled.div`
  ${Scrollbar}
`;

export default observer(() => {
  return (
    <AppContainer>
      <Search data={searchData} close={window.close} />
      <CommandList
        data={commandListData}
        focusOptions={focusOptions}
        save={save}
      />
    </AppContainer>
  );
});
