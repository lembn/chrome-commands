import { observer } from "mobx-react-lite";
import Command from "../data/Command";
import Input from "./Input";
import { useEffect, useRef } from "react";
import { RiArrowDropRightLine } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";

let focusOptions: {
  targetType: "command" | "url";
  shouldMove: boolean;
  targetId: number;
} = {
  targetType: "command",
  shouldMove: false,
  targetId: 0,
};

export default observer(
  ({
    commands,
    addCommand,
    removeCommand,
  }: {
    commands: Command[];
    addCommand: (command: Command) => void;
    removeCommand: (command: Command) => void;
  }) => {
    const focusTarget = useRef(null);

    useEffect(() => {
      if (focusOptions.shouldMove) {
        focusTarget.current && focusTarget.current.focus();
        focusOptions.targetType = "command";
        focusOptions.shouldMove = false;
      }
    });

    return (
      // List of commands
      <ul>
        {commands.map((command: Command) => {
          return (
            <li key={command.commandId}>
              <RiArrowDropRightLine onClick={command.toggleExpansion} />

              <Input
                placeholder="command"
                value={command.commandText}
                setValue={command.setCommandText}
                _ref={
                  focusOptions.targetType == "command" &&
                  command.commandId == commands[commands.length - 1].commandId
                    ? focusTarget
                    : undefined
                }
              />

              <TiDelete onClick={() => removeCommand(command)} />

              {/* List of URLs */}
              <ul>
                {command.expanded &&
                  command
                    .getURLs()
                    .map(([URLID, URL]: [URLID: number, URL: string]) => {
                      return (
                        <li key={URLID}>
                          <Input
                            placeholder="url"
                            value={URL}
                            setValue={(value) => command.setURL(URLID, value)}
                            _ref={
                              focusOptions.targetType == "url" &&
                              focusOptions.targetId == command.commandId &&
                              URLID ==
                                command.getURLs()[command.URLs.size - 1][0]
                                ? focusTarget
                                : undefined
                            }
                          />

                          <TiDelete onClick={() => command.removeURL(URLID)} />
                        </li>
                      );
                    })}

                {/* New URL */}
                <Input
                  placeholder="new url..."
                  readOnly={true}
                  onKeyPress={(event) => {
                    command.setURL(command.URLs.size, event.key);
                    focusOptions = {
                      targetType: "url",
                      shouldMove: true,
                      targetId: command.commandId,
                    };
                  }}
                />
              </ul>
            </li>
          );
        })}

        {/* New command */}
        <Input
          placeholder="new command..."
          readOnly={true}
          onKeyPress={(event) => {
            addCommand(new Command(event.key));
            focusOptions = {
              targetType: "command",
              shouldMove: true,
              targetId: focusOptions.targetId,
            };
          }}
        />
      </ul>
    );
  }
);
