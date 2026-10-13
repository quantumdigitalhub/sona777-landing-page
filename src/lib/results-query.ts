import { queryOptions } from "@tanstack/react-query";
import { fetchResults } from "./results.functions";

export const resultsQueryOptions = queryOptions({
  queryKey: ["live-results"], queryFn: () => fetchResults(),
  staleTime: 30_000, refetchInterval: 60_000,
});