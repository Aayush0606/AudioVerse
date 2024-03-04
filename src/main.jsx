import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path=""
        lazy={async () => {
          const HomePage = await import("./pages/HomePage/HomePage");
          return { Component: HomePage.default };
        }}
      />
      <Route
        path="/:id"
        lazy={async () => {
          const BookPage = await import("./pages/BookPage/BookPage");
          return { Component: BookPage.default };
        }}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
