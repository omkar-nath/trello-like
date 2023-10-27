import React from "react";
import Provider from "./context";
import App from "./App";

const Application = () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};

export default Application;
