"use client";

import  { useEffect, useState, useRef } from "react";
import { Company, CompanyApiResp } from "@/types/company";

const SIZE = 10;
export const useInfiniteScroll = (fetchFn: (page: number, size: number) => Promise<CompanyApiResp>)  => {
  const [data, setData] = useState<Company[]>([]);
  const loading = useRef(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchData = async () => {
    if (!hasMore || loading.current) return;
    loading.current = true;
    try {
      const response = await fetchFn( page, SIZE );
      setData((prevData) => [...prevData, ...response.data]);
      setHasMore(response.hasMore);
      setHasError(false);
    } catch (error) {
      setHasError(true);
      console.error("Error fetching data:", error);
    } finally {
      loading.current = false;
    }
  };

  const onResetData = async () => {
    setData(() => [])
    setPage(() => 0)
    // await fetchData()
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  return {
    data,
    setData,
    page,
    loading,
    setPage,
    hasMore,
    fetchData,
    hasError,
    setHasError,
    onResetData,
  };
};
