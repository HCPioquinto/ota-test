"use client";

import React, { useContext, useState } from "react";
import { CONFIGS } from "../config";
import { CompanyApiResp } from "@/types/company";

type CompanyContextType = {
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  onCallDelete: () => Promise<Response>;
  onCallReset: () => Promise<Response>;
  onCallGetData: (page: number, size: number) => Promise<CompanyApiResp>;
};

const CompanyContext = React.createContext<CompanyContextType | undefined>(
  undefined,
);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selected, setSelected] = useState<number[]>([]);

  const onCallDelete = async () => {
    const payload = { ids: selected };
    return await fetch(`${CONFIGS.apiUrl}/company`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  const onCallReset = async () => {
    return await fetch(`${CONFIGS.apiUrl}/company`, { method: "PATCH" });
  };

  const onCallGetData = async (page: number, size: number) => {
    return await fetch(
      `http://localhost:3000/api/company?page=${page}&size=${size}`,
    ).then((x) => x.json());
  };

  return (
    <CompanyContext.Provider
      value={{
        selected,
        setSelected,
        onCallDelete,
        onCallReset,
        onCallGetData,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("Problem with initializing");
  }

  return context;
};
