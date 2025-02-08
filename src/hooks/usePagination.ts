import { useState } from "react";

export const usePagination = (itemsPerPage: number) => {
  const [page, setPage] = useState<number>(1);

  const paginate = <T>(items: T[]) => {
    return items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  };

  return { page, setPage, paginate };
};
