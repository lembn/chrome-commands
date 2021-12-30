import { makeAutoObservable } from "mobx";
import Command from "./Command";

export default class SearchData {
  query: string = "";
  expanded: boolean = false;
  results: Command[];
  filteredResults: Command[] = [];
  active: number = -1;
  mouseOver: boolean = false;

  constructor(results?: Command[]) {
    makeAutoObservable(this);

    this.results = results || [];
    this.filteredResults = this.results;

    this.setQuery = this.setQuery.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.setActive = this.setActive.bind(this);
    this.setMouseOver = this.setMouseOver.bind(this);
  }

  setQuery(value: string) {
    this.query = value.toLowerCase().replace("  ", " ");
    this.active = -1;
    this.filteredResults = this.results
      .filter(
        (command: Command) => command.commandText.indexOf(this.query) > -1
      )
      .sort((a: Command, b: Command) => {
        if (a.lastUsed < b.lastUsed) return -1;
        if (b.lastUsed < a.lastUsed) return 1;
        return 0;
      });
  }

  open() {
    this.expanded = true;
  }

  close() {
    this.setQuery("");
    this.expanded = false;
  }

  setActive(value: number) {
    this.active = value;
  }

  setMouseOver(value: boolean) {
    this.mouseOver = value;
  }
}
