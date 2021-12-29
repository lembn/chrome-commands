import { makeAutoObservable } from "mobx";
import Command from "./Command";

export default class AppState {
  searchText: string = "";
  commands: Command[];

  constructor(commands: Command[] = []) {
    makeAutoObservable(this);
    this.commands = commands;
    this.setSearchText = this.setSearchText.bind(this);
    this.search = this.search.bind(this);
    this.addCommand = this.addCommand.bind(this);
    this.removeCommand = this.removeCommand.bind(this);
    this.getCommand = this.getCommand.bind(this);
  }

  setSearchText(searchText: string) {
    this.searchText = searchText;
  }

  search() {
    const command = this.getCommand(this.searchText.trim().toLowerCase());
    if (command == Command.EMPTY()) {
      // command is empty
      console.log("command was empty");
    } else {
      //tabs can be opened
      console.log(
        command.mapURLs((URLID: number) => console.log(command.URLs.get(URLID)))
      );
    }
  }

  addCommand(command: Command) {
    if (command.commandText && command.URLs.has(0)) this.commands.push(command);
  }

  getCommand(searchText: string): Command {
    if (searchText) {
      for (const command of this.commands) {
        if (command.commandText == searchText) return command;
      }
    }

    return Command.EMPTY();
  }

  removeCommand(command: Command) {
    const index = this.commands.indexOf(command);
    this.commands.splice(index, 1);
  }
}
