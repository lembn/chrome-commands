import { observer } from "mobx-react-lite";
import Command from "../data/Command";
import Input from "./Input";
import { useEffect, useRef } from "react";
import CommandListData from "../data/CommandListData";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import FocusOptions from "../data/FocusOptions";

const CommandList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export default observer(
  ({
    data,
    focusOptions,
  }: {
    data: CommandListData;
    focusOptions: FocusOptions;
  }) => {
    const focusTarget = useRef(null);

    useEffect(() => {
      if (focusOptions.shouldMove) {
        focusTarget.current && focusTarget.current.focus();

        focusOptions.setTargetType("command");
        focusOptions.setShouldMove(false);
      }
    });

    return (
      // List of commands
      <CommandList>
        {data.commands.map((command: Command) => {
          return (
            <li key={command.commandId}>
              <Input
                placeholder="command"
                value={command.commandText}
                setValue={command.setCommandText}
                remove={() => data.remove(command)}
                _ref={
                  focusOptions.targetType == "command" &&
                  command.commandId ==
                    data.commands[data.commands.length - 1].commandId
                    ? focusTarget
                    : undefined
                }
                expand={command.expanded}
                onExpand={command.toggleExpansion}
              />

              {/* List of URLs */}
              <AnimatePresence>
                {command.expanded && (
                  <motion.ul
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {command
                      .getURLs()
                      .map(([URLID, URL]: [URLID: number, URL: string]) => {
                        return (
                          <li key={URLID}>
                            <Input
                              placeholder="url"
                              value={URL}
                              setValue={(value: string) =>
                                command.setURL(URLID, value)
                              }
                              remove={() => command.removeURL(URLID)}
                              _ref={
                                focusOptions.targetType == "url" &&
                                focusOptions.targetId == command.commandId &&
                                URLID ==
                                  command.getURLs()[command.URLs.size - 1][0]
                                  ? focusTarget
                                  : undefined
                              }
                            />
                          </li>
                        );
                      })}

                    {/* New URL */}
                    <Input
                      placeholder="new url..."
                      readOnly
                      onKeyPress={(event) => {
                        command.setURL(command.URLs.size, event.key);
                        focusOptions.setTargetType("url");
                        focusOptions.setShouldMove(true);
                        focusOptions.setTargetId(command.commandId);
                      }}
                    />
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          );
        })}

        {/* New command */}
        <Input
          placeholder="new command..."
          readOnly
          onKeyPress={(event) => {
            data.add(new Command(event.key));
            focusOptions.setTargetType("command");
            focusOptions.setShouldMove(true);
            focusOptions.setTargetId(focusOptions.targetId);
          }}
        />
      </CommandList>
    );
  }
);
