import { observer } from "mobx-react-lite";
import CommandListView from "./components/CommandListView";
import Input from "./components/Input";
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
      <Input
        placeholder="search..."
        value={appState.searchText}
        setValue={appState.setSearchText}
      />

      <CommandListView commands={appState.commands} />
    </>
  );
});
