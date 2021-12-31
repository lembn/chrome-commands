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
  overflow: hidden;
`;

export default observer(
  ({
    data,
    focusOptions,
    save,
  }: {
    data: CommandListData;
    focusOptions: FocusOptions;
    save: () => void;
  }) => {
    const focusTarget = useRef(null);

    useEffect(() => {
      if (focusOptions.shouldMove) {
        focusTarget.current && focusTarget.current.focus();

        focusOptions.setTargetType("command");
        focusOptions.setShouldMove(false);
      }
    });

    useEffect(() => {
      let timeout = setTimeout(save, 500);
      return () => clearTimeout(timeout);
    });

    return (
      // List of commands
      <CommandList>
        <AnimatePresence>
          {data.commands.map((command: Command) => {
            return (
              <motion.li
                initial={{ opacity: 0.3, x: "-15%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0.3, x: "100%" }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                }}
                key={command.commandId}
              >
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
                      <AnimatePresence>
                        {command
                          .getURLs()
                          .map(([URLID, URL]: [URLID: number, URL: string]) => {
                            return (
                              <motion.li
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ opacity: 0, x: "100%" }}
                                transition={{
                                  type: "spring",
                                  stiffness: 120,
                                  damping: 18,
                                }}
                                key={URLID}
                              >
                                <Input
                                  placeholder="url"
                                  value={URL}
                                  setValue={(value: string) =>
                                    command.setURL(URLID, value)
                                  }
                                  remove={() => command.removeURL(URLID)}
                                  _ref={
                                    focusOptions.targetType == "url" &&
                                    focusOptions.targetId ==
                                      command.commandId &&
                                    URLID ==
                                      command.getURLs()[
                                        command.URLs.size - 1
                                      ][0]
                                      ? focusTarget
                                      : undefined
                                  }
                                />
                              </motion.li>
                            );
                          })}
                      </AnimatePresence>

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
              </motion.li>
            );
          })}
        </AnimatePresence>

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
