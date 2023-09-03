export const processingInfoColumnTable = (list_key, setMinMax = true) => {
  const infoColumns = [];
  for (let index in list_key) {
    const info = {
      header: list_key[index]["header"],
      size: list_key[index]["width"],
      accessorKey: list_key[index]["key"],
      key: list_key[index]["key"],
    };
    if (setMinMax) {
      info["minSize"] = list_key[index]["width"];
      info["maxSize"] = list_key[index]["width"];
    }
    if (list_key[index]["enableEditing"] !== undefined)
      info["enableEditing"] = list_key[index]["enableEditing"];
    if (list_key[index]["header_custorm"])
      info["header"] = list_key[index]["header_custorm"];
    if (list_key[index]["Cell"]) info["Cell"] = list_key[index]["Cell"];
    if (list_key[index]["muiTableBodyCellProps"])
      info["muiTableBodyCellProps"] = list_key[index]["muiTableBodyCellProps"];
    infoColumns.push(info);
  }
  return infoColumns;
};

export const processingInfoColumnTableHaveFooter = (
  list_key,
  COLS_HAVE_SUM_FOOTER,
  data,
  setMinMax = true,
  footer_name = "Tổng cộng"
) => {
  const infoColumnsInit = [];
  for (let index in list_key) {
    const info = {
      header: list_key[index]["header"],
      size: list_key[index]["width"],
      accessorKey: list_key[index]["key"],
      key: list_key[index]["key"],
    };
    if (setMinMax) {
      info["minSize"] = list_key[index]["width"];
      info["maxSize"] = list_key[index]["width"];
    }
    if (list_key[index]["enableEditing"] !== undefined)
      info["enableEditing"] = list_key[index]["enableEditing"];
    if (list_key[index]["key"] === "MAGIAY")
      info["Footer"] = () => <div>{footer_name}: </div>;
    if (COLS_HAVE_SUM_FOOTER.includes(list_key[index]["key"])) {
      let sum_value = data.reduce(
        (total, row) => total + row[list_key[index]["key"]],
        0
      );
      info["Footer"] = () => (
        <div style={{ textAlign: "right", width: "100%" }}>{sum_value}</div>
      );
    }

    if (list_key[index]["Cell"]) info["Cell"] = list_key[index]["Cell"];
    if (list_key[index]["header_custorm"])
      info["header"] = list_key[index]["header_custorm"];

    if (list_key[index]["muiTableBodyCellProps"])
      info["muiTableBodyCellProps"] = list_key[index]["muiTableBodyCellProps"];
    infoColumnsInit.push(info);
  }
  return infoColumnsInit;
};

export const renderDataEmpty = (list_key, number_rows) => {
  const data = [];
  const object_empty = {};
  for (let i = 0; i < list_key.length; i++) {
    if (
      list_key[i]["key"].includes("SIZE") ||
      list_key[i]["key"].includes("THANHTIEN") ||
      list_key[i]["key"].includes("SOLUONG")
    )
      object_empty[list_key[i]["key"]] = 0;
    else object_empty[list_key[i]["key"]] = "";
  }
  for (let i = 0; i < number_rows; i++) {
    data.push(object_empty);
  }

  return data;
};
