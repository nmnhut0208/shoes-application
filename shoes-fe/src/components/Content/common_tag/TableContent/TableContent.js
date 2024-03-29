import { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box } from "@mui/material";
import { Popconfirm } from "antd";

import { Modal } from "~common_tag";
import { border_text_table_config } from "~config/ui";
import { useTableContext, actions_table } from "~table_context";
import { useTaskContext } from "~task";
import { useUserContext } from "~user";

import {
  useItemsContext,
  actions as actions_items_context,
} from "~items_context";
import styles from "./TableContent.module.scss";

const listFormHaveViewDetail = ["F0024", "F0020", "F0013", "F0018"];

const TableContent = ({ info_other_column }) => {
  const [actionSttInfo, setActionSttInfo] = useState(() => {
    if (info_other_column) return info_other_column;
    else return { action: 30, stt: 15 };
  });

  const [stateTable, dispatchTable] = useTableContext();
  const [stateTask, dispatchTask] = useTaskContext();
  const [stateUser, dispatchUser] = useUserContext();
  const [stateItem, dispatchItem] = useItemsContext();
  const inforShowTable = stateTable["inforShowTable"];
  const ComponentForm = stateTable["infoShowForm"]["component_form"];
  const maForm = stateTable["inforShowTable"]["title"].split(" - ")[1];
  const permission = useMemo(() => {
    return stateUser.userPoolAccess.filter((obj) => obj.MAFORM === maForm)[0];
  }, []);

  const showActionColumn = useMemo(() => {
    if (permission.THEM + permission.SUA + permission.XOA > 0) {
      return true;
    } else {
      if (permission.XEM === 1 && listFormHaveViewDetail.includes(maForm))
        return true;
      else return false;
    }
  }, []);

  const emptyData = useMemo(() => {
    const emptyData = {};
    inforShowTable.infoColumnTable.forEach((item) => {
      emptyData[item["key"]] = "";
    });
    return emptyData;
  }, []);

  const handleDeleteRow = (row) => {
    let Key = "";
    let url = "";
    switch (stateTask.inforCurrentTask.infoDetail) {
      case "Kho hàng":
        Key = "MAKHO";
        url = "http://localhost:8000/khohang";
        break;
      case "Mũi":
        Key = "MAMUI";
        url = "http://localhost:8000/mui";
        dispatchItem(
          actions_items_context.setInfoMui(
            stateItem.infoItemMui.filter((item) => item["value"] != row[Key])
          )
        );
        break;
      case "Đế":
        Key = "MADE";
        url = "http://localhost:8000/de";
        dispatchItem(
          actions_items_context.setInfoDe(
            stateItem.infoItemDe.filter((item) => item["value"] != row[Key])
          )
        );
        break;
      case "Cá":
        Key = "MACA";
        url = "http://localhost:8000/ca";
        dispatchItem(
          actions_items_context.setInfoCa(
            stateItem.infoItemCa.filter((item) => item["value"] != row[Key])
          )
        );
        break;
      case "Nhân viên":
        Key = "MANVIEN";
        url = "http://localhost:8000/nhanvien";
        if (row["LOAINVIEN"] === "TD") {
          dispatchItem(
            actions_items_context.setInfoThoDe(
              stateItem.infoItemThoDe.filter(
                (item) => item["value"] != row[Key]
              )
            )
          );
        }
        if (row["LOAINVIEN"] === "TQ") {
          dispatchItem(
            actions_items_context.setInfoThoQuai(
              stateItem.infoItemThoQuai.filter(
                (item) => item["value"] != row[Key]
              )
            )
          );
        }
        break;
      case "Kỳ tính lương":
        Key = "MAKY";
        url = "http://localhost:8000/kytinhluong";
        dispatchItem(
          actions_items_context.setInfoKyTinhLuong(
            stateItem.infoItemKyTinhLuong.filter(
              (item) => item["value"] != row[Key]
            )
          )
        );
        break;
      case "Giày":
        Key = "MAGIAY";
        url = "http://localhost:8000/giay";
        break;
      case "Màu":
        Key = "MAMAU";
        url = "http://localhost:8000/mau";
        dispatchItem(
          actions_items_context.setInfoMau(
            stateItem.infoItemMau.filter((item) => item["value"] != row[Key])
          )
        );
        break;
      case "Sườn":
        Key = "MASUON";
        url = "http://localhost:8000/suon";
        dispatchItem(
          actions_items_context.setInfoSuon(
            stateItem.infoItemSuon.filter((item) => item["value"] != row[Key])
          )
        );
        break;
      case "Gót":
        Key = "MAGOT";
        url = "http://localhost:8000/got";
        dispatchItem(
          actions_items_context.setInfoGot(
            stateItem.infoItemGot.filter((item) => item["value"] != row[Key])
          )
        );
        break;
      case "Quai":
        Key = "MAQUAI";
        url = "http://localhost:8000/quai";
        dispatchItem(
          actions_items_context.setInfoQuai(
            stateItem.infoItemQuai.filter((item) => item["value"] != row[Key])
          )
        );
        break;
      case "Khách hàng":
        Key = "MAKH";
        url = "http://localhost:8000/khachhang";
        dispatchItem(
          actions_items_context.setInfoKhachHang(
            stateItem.infoItemKhachHang.filter(
              (item) => item["MAKH"] != row[Key]
            )
          )
        );
        break;
      case "Phân quyền":
        return;
    }

    fetch(url + "?ID=" + encodeURIComponent(row[Key]), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log("response: ", res))
      .catch((err) => console.log("error: ", err));

    const newData = inforShowTable.infoTable.filter(
      (item) => item[Key] != row[Key]
    );
    dispatchTable(actions_table.setInforTable(newData));
  };

  return (
    <>
      {inforShowTable.showTable && (
        <div>
          {/* <header>{inforShowTable.title}</header> */}
          <MaterialReactTable
            columns={inforShowTable.infoColumnTable}
            data={inforShowTable.infoTable}
            {...border_text_table_config}
            // start
            muiTableBodyProps={{
              sx: () => ({
                '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
                  {
                    // backgroundColor: darken(baseBackgroundColor, 0.1),
                    backgroundColor: "#e6fff2",
                  },
                '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]):hover > td':
                  {
                    // backgroundColor: darken(baseBackgroundColor, 0.2),
                    backgroundColor: "#ffcc99",
                  },
                '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]) > td':
                  {
                    backgroundColor: "#ffddcc",
                  },
                '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]):hover > td':
                  {
                    backgroundColor: "#ffcc99",
                  },
              }),
            }}
            muiTableProps={{
              sx: {
                tableLayout: "fixed",
              },
            }}
            initialState={{ showColumnFilters: true }}
            // end
            components
            // page Pagination
            enablePagination={false}
            enableBottomToolbar={true}
            // scroll to bottom
            enableRowVirtualization
            muiTableContainerProps={{
              sx: { maxHeight: "65rem" },
            }}
            // autoResetPageIndex={false}
            // resize width of each column
            enableColumnResizing
            enableRowNumbers
            enableEditing={showActionColumn}
            displayColumnDefOptions={{
              "mrt-row-actions": {
                minSize: actionSttInfo["action"], //set custom width
                // minSize: 24,
                muiTableHeadCellProps: {
                  align: "center", //change head cell props
                },
                muiTableBodyCellProps: {
                  minSize: actionSttInfo["action"],
                },
                enableResizing: true,
              },
              "mrt-row-numbers": {
                size: actionSttInfo["stt"],
                minSize: 12,
                enableColumnOrdering: true, //turn on some features that are usually off
                enableResizing: true,
                muiTableHeadCellProps: {
                  align: "right",
                },
                muiTableBodyCellProps: {
                  align: "right",
                },
              },
            }}
            renderRowActions={({ row, table }) => (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  columnGap: "0.1rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    borderRight: "0.17rem solid rgba(0, 0, 0, 0.4)",
                  }}
                >
                  {permission.THEM === 1 && (
                    <button
                      onClick={() => {
                        dispatchTable(
                          actions_table.setInforRecordTable(emptyData)
                        );
                        dispatchTable(actions_table.setActionForm("add"));
                        dispatchTable(actions_table.setModeShowModal(true));
                      }}
                      className={styles.add_button}
                    >
                      Thêm
                    </button>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    borderRight: "0.17rem solid rgba(0, 0, 0, 0.4)",
                  }}
                >
                  {permission.SUA === 1 && (
                    <button
                      onClick={() => {
                        dispatchTable(
                          actions_table.setInforRecordTable(row.original)
                        );
                        dispatchTable(actions_table.setActionForm("edit"));
                        dispatchTable(actions_table.setModeShowModal(true));
                      }}
                      className={styles.edit_button}
                    >
                      Sửa
                    </button>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                  }}
                >
                  {permission.XOA === 1 && (
                    <Popconfirm
                      title="Xác nhận hành động"
                      description="Bạn thực sự muốn xoá thông tin này?"
                      onConfirm={() => handleDeleteRow(row.original)}
                      onCancel={() => {}}
                      okText="Đồng ý"
                      cancelText="Không đồng ý"
                    >
                      <button className={styles.delete_button}>Xoá</button>
                    </Popconfirm>
                  )}
                </Box>

                <Box>
                  {permission.XEM === 1 &&
                    permission.THEM === 0 &&
                    permission.SUA === 0 &&
                    listFormHaveViewDetail.includes(maForm) && (
                      <button
                        className={styles.edit_button}
                        onClick={() => {
                          dispatchTable(
                            actions_table.setInforRecordTable(row.original)
                          );
                          dispatchTable(actions_table.setActionForm("view"));
                          dispatchTable(actions_table.setModeShowModal(true));
                        }}
                      >
                        Xem
                      </button>
                    )}
                </Box>
              </div>
            )}
          />
        </div>
      )}

      <Modal>
        <ComponentForm />
      </Modal>
    </>
  );
};
export default TableContent;
