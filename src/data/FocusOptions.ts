import { makeAutoObservable } from "mobx";

export default class FocusOptions {
  targetType: "command" | "url" = "command";
  shouldMove: boolean = false;
  targetId: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setTargetType(targetType: "command" | "url") {
    this.targetType = targetType;
  }

  setShouldMove(shouldMove: boolean) {
    this.shouldMove = shouldMove;
  }

  setTargetId(targetId: number) {
    this.targetId = targetId;
  }
}
