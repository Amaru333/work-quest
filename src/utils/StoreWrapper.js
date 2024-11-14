"use client";

import store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function StoreWrapper({ children }) {
  return (
    <Provider store={store}>
      <ToastContainer />
      {children}
    </Provider>
  );
}

export default StoreWrapper;
