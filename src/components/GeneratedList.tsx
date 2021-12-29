import { observer } from "mobx-react-lite";

export default observer(function <T>({
  arr,
  generator,
  empty,
}: {
  arr: T[];
  generator: (param: T) => JSX.Element;
  empty: JSX.Element;
}) {
  const data = arr.map(generator);

  return (
    <ul>
      {data} {empty}
    </ul>
  );
});
