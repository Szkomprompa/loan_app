"use client";
import { Provider } from "react-redux";
import { globalStore } from "./global-store";
import React from "react";

export function ReduxProvider({ children } : { children: React.ReactNode }) {
    return <Provider store={globalStore}>{children}</Provider>;
}