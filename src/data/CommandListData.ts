import { makeObservable, observable, action } from "mobx";
import Command from "./Command";

export default class CommandListData {
  commands: Command[];

  constructor(commands?: Command[]) {
    makeObservable(this, {
      commands: observable,
      add: action,
      remove: action,
    });

    this.commands = commands || [];

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  add(command: Command) {
    this.commands.push(command);
  }

  remove(command: Command) {
    const index = this.commands.indexOf(command);
    this.commands.splice(index, 1);
  }
}
