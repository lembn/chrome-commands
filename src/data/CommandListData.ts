import { makeAutoObservable } from "mobx";
import Command from "./Command";

interface SerializedCommand {
  commandText: string;
  URLs: [number, string][];
  lastUsed: Date;
}

export default class CommandListData {
  commands: Command[] = [];

  constructor() {
    makeAutoObservable(this);

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.getCommands = this.getCommands.bind(this);
    this.load = this.load.bind(this);
  }

  add(command: Command) {
    this.commands.push(command);
  }

  remove(command: Command) {
    const index = this.commands.indexOf(command);
    this.commands.splice(index, 1);
  }

  getCommands(): Command[] {
    return this.commands;
  }

  load(commands: SerializedCommand[]) {
    for (const { commandText, URLs, lastUsed } of commands)
      this.commands.push(
        new Command(
          commandText,
          URLs.map(([_, URL]) => URL),
          lastUsed
        )
      );
  }
}
