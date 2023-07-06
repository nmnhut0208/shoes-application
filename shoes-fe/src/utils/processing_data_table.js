export const processingInfoColumnTable = (list_key, setMinMax = true) => {
  const infoColumns = [];
  for (var obj in list_key) {
    const info = {
      header: list_key[obj]["header"],
      size: list_key[obj]["width"],
      accessorKey: list_key[obj]["key"],
      key: list_key[obj]["key"],
    };
    if (setMinMax) {
      info["minSize"] = list_key[obj]["width"];
      info["maxSize"] = list_key[obj]["width"];
    }
    if (list_key[obj]["header_custorm"])
      info["header"] = list_key[obj]["header_custorm"];
    if (list_key[obj]["muiTableBodyCellProps"])
      info["muiTableBodyCellProps"] = list_key[obj]["muiTableBodyCellProps"];
    infoColumns.push(info);
  }
  return infoColumns;
};

export const processingInfoColumnTableHaveFooter = (
  list_key,
  COLS_HAVE_SUM_FOOTER,
  data,
  setMinMax = true
) => {
  const infoColumnsInit = [];
  for (var obj in list_key) {
    const info = {
      header: list_key[obj]["header"],
      size: list_key[obj]["width"],
      accessorKey: list_key[obj]["key"],
      key: list_key[obj]["key"],
    };
    if (setMinMax) {
      info["minSize"] = list_key[obj]["width"];
      info["maxSize"] = list_key[obj]["width"];
    }

    if (list_key[obj]["key"] === "TENGIAY")
      info["Footer"] = () => <div>Tổng cộng: </div>;
    if (COLS_HAVE_SUM_FOOTER.includes(list_key[obj]["key"])) {
      let sum_value = data.reduce(
        (total, row) => total + row[list_key[obj]["key"]],
        0
      );
      info["Footer"] = () => (
        <div style={{ textAlign: "right" }}>{sum_value}</div>
      );
    }

    if (list_key[obj]["Cell"]) info["Cell"] = list_key[obj]["Cell"];
    if (list_key[obj]["header_custorm"])
      info["header"] = list_key[obj]["header_custorm"];

    if (list_key[obj]["muiTableBodyCellProps"])
      info["muiTableBodyCellProps"] = list_key[obj]["muiTableBodyCellProps"];
    infoColumnsInit.push(info);
  }
  return infoColumnsInit;
};

export const renderDataEmpty = (list_key, number_rows) => {
  const data = [];
  const object_empty = {};
  for (var i = 0; i < list_key.length; i++) {
    object_empty[list_key[i]["key"]] = "";
  }
  for (var i = 0; i < number_rows; i++) {
    data.push(object_empty);
  }

  return data;
};
