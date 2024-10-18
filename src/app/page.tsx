"use client";
import React from "react";
import InfiniteScroll from "./components/infiniteScroll";
import { CompanyProvider } from "./context/CompanyContext";

export default function Home() {
  return (
    <CompanyProvider>
      <div className={`flex py-4 flex-col justify-center items-center`}>
        <h1 className="text-5xl ">DDD</h1>
        <h2 className="text-lg ">Data Discovery Dashboard</h2>
        <InfiniteScroll />
      </div>
    </CompanyProvider>
  );
}
