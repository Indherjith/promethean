import {
    legacy_createStore,
    applyMiddleware,
    compose,
  } from "redux";
  import { thunk } from "redux-thunk";
  import { reducer } from "./reducer";
  
  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;
  const store = legacy_createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  
  export {store}