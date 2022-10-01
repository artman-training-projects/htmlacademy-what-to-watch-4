import { createRoot } from "react-dom/client";
// import { applyMiddleware, createStore } from "redux";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";

// import { AuthorizationStatus } from "./const";
// import { createAPI } from "./api";
// import reducer from "./reducer/reducer";
// import { Operations as DataOperations } from "./reducer/data/data";
// import {
// 	ActionCreator,
// 	Operations as UserOperations,
// } from "./reducer/user/user";

// import App from "./components/app/app";

// const onUnauthorized = () => {
// 	store.dispatch(
// 		ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH),
// 	);
// };

// const api = createAPI(onUnauthorized);
// const store = createStore(
// 	reducer,
// 	applyMiddleware(thunk.withExtraArgument(api)),
// );

// store.dispatch(UserOperations.checkAuth());
// store.dispatch(DataOperations.loadPromo());
// store.dispatch(DataOperations.loadFilms());

// ReactDom.render(
// 	<Provider store={store}>
// 		<App />
// 		<div>app start</div>
// 	</Provider>,
// 	document.querySelector(`#root`)
// );

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<div>app</div>);

/*
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/
