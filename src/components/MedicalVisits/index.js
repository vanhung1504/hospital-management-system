import { format } from "date-fns";
import { memo, useState } from "react";
import Filter from "./Filter";
import Search from "./Search";
import Table from "./Table";

function MedicalVisits({
  depRequired,
  onClickView,
  tableHeight,
  sortable,
  isOutPatient,
}) {
  const [filter, setFilter] = useState({
    fromTime: format(new Date(), "dd/MM/yyyy"),
    toTime: format(new Date(), "dd/MM/yyyy"),
    depId: null,
    status: -1,
  });
  const [search, setSearch] = useState("");

  return (
    <>
      <Filter setFilter={setFilter} depRequired={depRequired} />
      <Search setSearch={setSearch} />
      <Table
        filter={filter}
        search={search}
        onClickView={onClickView}
        tableHeight={tableHeight}
        sortable={sortable}
      />
    </>
  );
}

export default memo(MedicalVisits);
