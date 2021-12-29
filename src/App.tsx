import { observer } from "mobx-react-lite";
import CommandList from "./components/CommandList";
import Search from "./components/Search";
import AppState from "./data/AppState";
import Command from "./data/Command";

const appState = new AppState([
  new Command("yt", ["youtube.com"]),
  new Command("scilla", [
    "https://ide.zilliqa.com/#/",
    "dev-wallet.zilliqa.com/faucet?network=testnet",
    "https://viewblock.io/zilliqa/address/zil1dlpql7kls55gnda2l5s7ys6jjz2448xdfv3tef?network=testnet&txsType=all",
  ]),
]);

export default observer(() => {
  return (
    <>
      <Search
        value={appState.searchText}
        setValue={appState.setSearchText}
        action={appState.search}
      />
      <CommandList
        commands={appState.commands}
        addCommand={appState.addCommand}
        removeCommand={appState.removeCommand}
      />
    </>
  );
});
