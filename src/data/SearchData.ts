import { makeObservable, observable, action } from "mobx";

export default class SearchData {
  query: string = "";

  constructor() {
    makeObservable(this, {
      query: observable,
      setQuery: action,
    });

    this.setQuery = this.setQuery.bind(this);
  }

  setQuery(value: string) {
    this.query = value.toLowerCase().replace("  ", " ");
  }
}
