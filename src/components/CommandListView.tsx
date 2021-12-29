import { observer } from "mobx-react-lite";
import Command from "../data/Command";
import Input from "./Input";
import GeneratedList from "./GeneratedList";

export default observer(({ commands }: { commands: Command[] }) => {
  function addCommand() {}
  function addURL() {}

  return (
    <GeneratedList
      arr={commands}
      generator={(command: Command) => {
        return (
          <li key={command.commandId}>
            <Input
              placeholder="command"
              value={command.commandText}
              setValue={command.setCommandText}
            />

            <GeneratedList
              arr={[...command.URLs.entries()]}
              generator={([URLID, URL]: [URLID: number, URL: string]) => {
                return (
                  <li key={URLID}>
                    <Input
                      placeholder="url"
                      value={URL}
                      setValue={(value) => command.URLs.set(URLID, value)}
                    />
                  </li>
                );
              }}
              empty={<Input placeholder="new url..." beforeInput={addURL} />}
            />
          </li>
        );
      }}
      empty={<Input placeholder="new command..." beforeInput={addCommand} />}
    />
  );
});
