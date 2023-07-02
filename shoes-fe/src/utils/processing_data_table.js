export const processingInfoColumnTable = (list_key) => {
  const infoColumns = [];
  for (var obj in list_key) {
    const info = {
      header: list_key[obj]["header"],
      size: list_key[obj]["width"],
      minSize: list_key[obj]["width"],
      maxSize: list_key[obj]["width"],
      accessorKey: list_key[obj]["key"],
      key: list_key[obj]["key"],
    };
    if (list_key[obj]["header_custorm"])
      info["header"] = list_key[obj]["header_custorm"];
    if (list_key[obj]["muiTableBodyCellProps"])
      info["muiTableBodyCellProps"] = list_key[obj]["muiTableBodyCellProps"];
    infoColumns.push(info);
  }
  return infoColumns;
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
