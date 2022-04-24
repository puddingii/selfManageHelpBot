import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// import monitorReducersEnhancer from "./enhancers/monitorReducers";
// import loggerMiddleware from "./middleware/logger";
import rootReducer from "./store/reducer/_rootReducer";

export default function configureStore(preloadedState) {
  preloadedState = preloadedState || {};
  // const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  // const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./store/reducer/_rootReducer", () =>
      store.replaceReducer(rootReducer)
    );
  }

  return store;
}
