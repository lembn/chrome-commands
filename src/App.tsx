import { observer } from "mobx-react-lite";
import CommandList from "./components/CommandList";
import Search from "./components/Search";
import CommandListData from "./data/CommandListData";
import SearchData from "./data/SearchData";
import Command from "./data/Command";
import FocusOptions from "./data/FocusOptions";
import styled from "styled-components";
import Scrollbar from "./components/styles/Scrollbar";

const AppContainer = styled.div`
  ${Scrollbar}
`;

const commandListData = new CommandListData([
  new Command("yt", ["youtube.com"]),
  new Command("scilla", [
    "https://ide.zilliqa.com/#/",
    "dev-wallet.zilliqa.com/faucet?network=testnet",
    "https://viewblock.io/zilliqa/address/zil1dlpql7kls55gnda2l5s7ys6jjz2448xdfv3tef?network=testnet&txsType=all",
  ]),
  new Command("really long command name ahhhhhh"),
  new Command("lots of links!", [
    "https://ide.zilliqa.com/#/",
    "dev-wallet.zilliqa.com/faucet?network=testnet",
    "https://viewblock.io/zilliqa/address/zil1dlpql7kls55gnda2l5s7ys6jjz2448xdfv3tef?network=testnet&txsType=all",
    "https://ide.zilliqa.com/#/",
    "dev-wallet.zilliqa.com/faucet?network=testnet",
    "https://viewblock.io/zilliqa/address/zil1dlpql7kls55gnda2l5s7ys6jjz2448xdfv3tef?network=testnet&txsType=all",
  ]),
  new Command("lots of links!", [
    "https://ide.zilliqa.com/#/",
    "dev-wallet.zilliqa.com/faucet?network=testnet",
    "https://viewblock.io/zilliqa/address/zil1dlpql7kls55gnda2l5s7ys6jjz2448xdfv3tef?network=testnet&txsType=all",
    "https://ide.zilliqa.com/#/",
    "dev-wallet.zilliqa.com/faucet?network=testnet",
    "https://viewblock.io/zilliqa/address/zil1dlpql7kls55gnda2l5s7ys6jjz2448xdfv3tef?network=testnet&txsType=all",
  ]),
  new Command("lots of links!", [
    "https://ide.zilliqa.com/#/",
    "dev-wallet.zilliqa.com/faucet?network=testnet",
    "https://viewblock.io/zilliqa/address/zil1dlpql7kls55gnda2l5s7ys6jjz2448xdfv3tef?network=testnet&txsType=all",
    "https://ide.zilliqa.com/#/",
    "dev-wallet.zilliqa.com/faucet?network=testnet",
    "https://viewblock.io/zilliqa/address/zil1dlpql7kls55gnda2l5s7ys6jjz2448xdfv3tef?network=testnet&txsType=all",
  ]),
]);
const searchData = new SearchData(commandListData.commands);
const focusOptions = new FocusOptions();

export default observer(() => {
  return (
    <AppContainer>
      <Search data={searchData} />
      <CommandList data={commandListData} focusOptions={focusOptions} />
    </AppContainer>
  );
});
