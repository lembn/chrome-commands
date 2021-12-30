import { observer } from "mobx-react-lite";
import CommandList from "./components/CommandList";
import Search from "./components/Search";
import CommandListData from "./data/CommandListData";
import SearchData from "./data/SearchData";
import Command from "./data/Command";

const commandListData = new CommandListData([
  new Command("yt", ["youtube.com"]),
  new Command("scilla", [
    "https://ide.zilliqa.com/#/",
    "dev-wallet.zilliqa.com/faucet?network=testnet",
    "https://viewblock.io/zilliqa/address/zil1dlpql7kls55gnda2l5s7ys6jjz2448xdfv3tef?network=testnet&txsType=all",
  ]),
]);
const searchData = new SearchData();

export default observer(() => {
  return (
    <>
      <Search
        value={searchData.query}
        setValue={searchData.setQuery}
        action={() => commandListData.search(searchData.query)}
      />
      <CommandList
        commands={commandListData.commands}
        add={commandListData.add}
        remove={commandListData.remove}
      />
    </>
  );
});
