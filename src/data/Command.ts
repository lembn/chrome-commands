import { makeAutoObservable } from "mobx";

export default class Command {
  static EMPTY: () => Command = () => new Command("", []);
  static commandCounter: number = 0;

  commandId: number = 0;
  commandText: string;
  URLs: Map<number, string> = new Map<number, string>();
  expanded: boolean = false;

  constructor(command: string, URLs: string[]) {
    makeAutoObservable(this);

    this.commandId = Command.commandCounter;
    Command.commandCounter++;

    this.commandText = command;
    for (let i = 0; i < URLs.length; i++) this.URLs.set(i, URLs[i]);

    this.setCommandText = this.setCommandText.bind(this);
    this.mapURLs = this.mapURLs.bind(this);
    this.toggleExpansion = this.toggleExpansion.bind(this);
  }

  setCommandText(command: string) {
    this.commandText = command;
  }

  mapURLs(cb: (URLID: number) => any) {
    let results: any[] = [];
    for (const key of this.URLs.keys()) {
      results.push(cb(key));
    }
    return results;
  }

  toggleExpansion() {
    this.expanded = !this.expanded;
  }
}
