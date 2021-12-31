import { makeAutoObservable } from "mobx";

export default class Command {
  static commandCounter: number = 0;

  commandId: number = 0;
  commandText: string;
  URLs: Map<number, string>;
  expanded: boolean = false;
  lastUsed: Date;

  constructor(command?: string, URLs?: string[], lastUsed?: Date) {
    makeAutoObservable(this);

    this.commandId = Command.commandCounter;
    Command.commandCounter++;

    this.commandText = command || "";
    this.URLs = new Map<number, string>();
    if (URLs) for (let i = 0; i < URLs.length; i++) this.URLs.set(i, URLs[i]);
    this.lastUsed = lastUsed || new Date();

    this.setCommandText = this.setCommandText.bind(this);
    this.setURL = this.setURL.bind(this);
    this.getURLs = this.getURLs.bind(this);
    this.removeURL = this.removeURL.bind(this);
    this.toggleExpansion = this.toggleExpansion.bind(this);
  }

  setCommandText(command: string) {
    this.commandText = command.toLowerCase().replace("  ", " ");
  }

  setURL(URLID: number, URL: string) {
    this.URLs.set(URLID, URL);
  }

  getURLs(): [number, string][] {
    return [...this.URLs.entries()];
  }

  removeURL(URLID: number) {
    this.URLs.delete(URLID);
  }

  toggleExpansion() {
    this.expanded = !this.expanded;
  }

  setLastUsed() {
    this.lastUsed = new Date();
  }
}
