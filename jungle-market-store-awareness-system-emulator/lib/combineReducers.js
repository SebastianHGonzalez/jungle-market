// type Action = { type: string };
// type Reducer = <T>(state: T, action: Action) => T;
// interface ReducersDictionary {
//   [key: string]: Reducer;
// }

export default function combineReducers(
  reducers, /* : ReducersDictionary */
) /* : Reducer */ {
  return (state /* : Record<string, never> */, action /* : Action */) => (
    Object.entries(reducers).reduce(
      (acc, [k, reducer]) => Object.assign(acc, { [k]: reducer(state[k], action) }),
      {},
    ));
}
