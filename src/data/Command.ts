import { makeObservable, observable, action } from "mobx";

export default class Command {
  static commandCounter: number = 0;

  commandId: number = 0;
  commandText: string;
  URLs: Map<number, string>;
  edited: boolean = false;
  expanded: boolean = false;

  constructor(command?: string, URLs?: string[]) {
    makeObservable(this, {
      commandText: observable,
      URLs: observable,
      edited: observable,
      expanded: observable,
      setCommandText: action,
      setURL: action,
      toggleExpansion: action,
    });

    this.commandId = Command.commandCounter;
    Command.commandCounter++;

    this.commandText = command || "";
    this.URLs = new Map<number, string>();
    if (URLs) for (let i = 0; i < URLs.length; i++) this.URLs.set(i, URLs[i]);

    this.setCommandText = this.setCommandText.bind(this);
    this.setURL = this.setURL.bind(this);
    this.getURLs = this.getURLs.bind(this);
    this.toggleExpansion = this.toggleExpansion.bind(this);
  }

  setCommandText(command: string) {
    this.commandText = command;
  }

  setURL(URLID: number, URL: string) {
    this.URLs.set(URLID, URL);
  }

  getURLs(): [number, string][] {
    return [...this.URLs.entries()];
  }

  toggleExpansion() {
    this.expanded = !this.expanded;
  }
}
