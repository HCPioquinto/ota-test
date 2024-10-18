"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInfiniteScroll } from "@/utils/hooks/useInfiniteScroll";
import { useCompanyContext } from "../context/CompanyContext";
import Warning from "@/assets/svg/warning";

const Item = (props: {
  action: (isChecked: boolean) => void;
  name: string;
}) => {
  const { action, name } = props;

  return (
    <div className="py-4 pl-4 border border-b-gray-300 first:rounded-md">
      <label className="text-xl ml-5 text-black w-full ">
        <input
          className="text-xl"
          type="checkbox"
          name={name}
          onChange={(e) => {
            action(e.target.checked);
          }}
        />
        <span className="ml-2">{name}</span>
      </label>
    </div>
  );
};

function InfiniteScroll() {
  const { selected, setSelected, onCallGetData, onCallReset, onCallDelete } =
    useCompanyContext();
  const { data, setPage, loading, hasMore, hasError, fetchData, onResetData } =
    useInfiniteScroll(onCallGetData);
  const bottomRef = useRef(null);

  const addToSelected = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setSelected((x) => [...x, id]);
    } else {
      setSelected((x) => x.filter((x) => x !== id));
    }
  };

  useEffect(() => {
    const dom = bottomRef.current;
    if (!dom || !hasMore || loading.current) return;
    const observer = new IntersectionObserver((nodes) => {
      const target = nodes[0];
      if (target.isIntersecting && hasMore && !loading.current) {
        setPage((x) => x + 1);
      }
    });
    observer.observe(dom);
    return () => observer.unobserve(dom);
  }, [bottomRef.current, loading.current]);

  const onRetry = () => {
    fetchData();
  };

  const onDeleteAction = async () => {
    await onCallDelete();
    setSelected([]);
    onResetData();
  };

  const onResetAction = async () => {
    await onCallReset();
    setSelected([]);
    onResetData();
  };

  return (
    <div className="mt-8 flex flex-col">
      <div className="flex flex-col bg-white rounded-md min-w-96 min-h-[70vh] max-h-[70vh] overflow-scroll">
        {data.map((x, idx) => {
          return (
            <Item
              action={(isChecked: boolean) => addToSelected(x.id, isChecked)}
              {...x}
              key={x.name}
            />
          );
        })}
        {hasMore ? (
          <div className="color-black" ref={bottomRef}>
            {hasError ? (
              <a href="#" onClick={onRetry}>
                <div className="py-4 text-center text-red-400 cursor-pointer flex flex-row justify-center gap-4">
                  <Warning className="w-8 h-8 fill-red-400" />
                  <div className="flex flex-row items-center">
                    Encountered an issue, click to try again
                  </div>
                </div>
              </a>
            ) : loading ? (
              <div className="flex flex-row py-4 justify-center">
                <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-8 h-8 animate-spin"></div>
                <div className="ml-8 text-center text-blue-700 flex flex-col justify-center">
                  Loading
                </div>
              </div>
            ) : (
              <div className="loader">Loading</div>
            )}
          </div>
        ) : (
          <div className="py-4 text-center text-blue-400">Reached end</div>
        )}
      </div>

      <div className="flex flex-row justify-between w-full mt-4">
        <button
          className="bg-red-900 py-2 px-4 rounded-md"
          onClick={onDeleteAction}
        >
          Delete
        </button>
        <button
          className="bg-blue-900 py-2 px-4 rounded-md"
          onClick={onResetAction}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default React.memo(InfiniteScroll);
