import { useEffect, useState } from "react";
import { TableContent } from "~common_tag";
import FormGiay from "./FormGiay";
import {
  useTableContext,
  actions_table,
  cleanupContextTable,
} from "~table_context";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import { list_key } from "./ConstantVariale";

const infoColumns = processingInfoColumnTable(list_key, false);

const Giay = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  useEffect(() => {
    dispatchTable(actions_table.setTitleModal("Giày - F0025"));
    dispatchTable(actions_table.setTitleTable("Giày - F0024"));
    dispatchTable(actions_table.setComponentForm(FormGiay));
    fetch("http://localhost:8000/giay")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        dispatchTable(actions_table.setInforColumnTable(infoColumns));
        dispatchTable(actions_table.setInforTable(info));
        dispatchTable(actions_table.setModeShowTable(true));
        setRenderUI(true);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });

    // cleanup function
    return () => {
      cleanupContextTable(dispatchTable);
    };
  }, []);

  return (
    <>
      {renderUI && <TableContent info_other_column={{ action: 26, stt: 12 }} />}
    </>
  );
};
export default Giay;
