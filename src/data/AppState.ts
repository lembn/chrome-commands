import { makeObservable, observable, action } from "mobx";
import Command from "./Command";

export default class AppState {
  searchText: string = "";
  commands: Command[];

  constructor(commands?: Command[]) {
    makeObservable(this, {
      searchText: observable,
      commands: observable,
      setSearchText: action,
      addCommand: action,
      removeCommand: action,
    });

    this.commands = commands || [];

    this.setSearchText = this.setSearchText.bind(this);
    this.addCommand = this.addCommand.bind(this);
    this.removeCommand = this.removeCommand.bind(this);
    this.search = this.search.bind(this);
  }

  setSearchText(searchText: string) {
    this.searchText = searchText.trim().toLowerCase();
  }

  addCommand(command: Command) {
    this.commands.push(command);
  }

  removeCommand(command: Command) {
    const index = this.commands.indexOf(command);
    this.commands.splice(index, 1);
  }

  search() {
    if (this.searchText) {
      for (const command of this.commands) {
        if (command.commandText == this.searchText) {
          //tabs can be opened
          window.close();
        }
      }
    }

    //command is empty
  }
}
