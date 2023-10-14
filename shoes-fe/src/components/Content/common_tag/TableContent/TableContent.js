import { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Delete, Edit } from "@mui/icons-material";
import { message, Popconfirm, Space } from "antd";

import { Modal } from "~common_tag";
import { border_text_table_config } from "~config/ui";
import { useTableContext, actions_table } from "~table_context";
import { useTaskContext } from "~task";
import { useUserContext } from "~user";
import {
  useItemsContext,
  actions as actions_items_context,
} from "~items_context";

const listFormHaveViewDetail = ["F0024", "F0020", "F0013", "F0018"];

const TableContent = ({ info_other_column }) => {
  const [actionSttInfo, setActionSttInfo] = useState(() => {
    if (info_other_column) return info_other_column;
    else return { action: 30, stt: 15 };
  });

  console.log("actionSttInfo: ", actionSttInfo);
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

  console.log("permission: ", permission);

  const showActionColumn = useMemo(() => {
    if (permission.THEM + permission.SUA + permission.XOA > 0) {
      return true;
    } else {
      if (permission.XEM === 1 && listFormHaveViewDetail.includes(maForm))
        return true;
      else return false;
    }
  }, []);

  console.log("resize: ", inforShowTable.infoColumnTable);

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
        Key = "MANV";
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
    console.log(
      "url + encodeURIComponent(row[Key]): ",
      url + encodeURIComponent(row[Key])
    );
    fetch(url + "?ID=" + encodeURIComponent(row[Key]), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(row),
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
          <header>{inforShowTable.title}</header>
          <MaterialReactTable
            columns={inforShowTable.infoColumnTable}
            data={inforShowTable.infoTable}
            {...border_text_table_config}
            // start
            muiTableProps={{
              sx: {
                tableLayout: "fixed",
              },
            }}
            // end
            components
            autoResetPageIndex={false}
            // resize width of each column
            enableColumnResizing
            // enableRowNumbers
            enableEditing={showActionColumn}
            displayColumnDefOptions={{
              "mrt-row-actions": {
                sx: { minSize: actionSttInfo["action"] },
                // minSize: actionSttInfo["action"], //set custom width
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
            // renderRowActions={({ row, table }) => (
            //   <Box
            //     sx={{
            //       display: "flex",
            //       justifyContent: "center",
            //       paddingLeft: "5px",
            //       paddingRight: "5px",
            //     }}
            //   >
            //     {permission.THEM === 1 && (
            //       <Tooltip arrow placement="right" title="Add">
            //         <IconButton
            //           onClick={() => {
            //             dispatchTable(
            //               actions_table.setInforRecordTable(emptyData)
            //             );
            //             dispatchTable(actions_table.setActionForm("add"));
            //             dispatchTable(actions_table.setModeShowModal(true));
            //           }}
            //         >
            //           <AddCircleIcon />
            //         </IconButton>
            //       </Tooltip>
            //     )}
            //     {permission.SUA === 1 && (
            //       <Tooltip arrow placement="right" title="Edit">
            //         <IconButton
            //           onClick={() => {
            //             dispatchTable(
            //               actions_table.setInforRecordTable(row.original)
            //             );
            //             dispatchTable(actions_table.setActionForm("edit"));
            //             dispatchTable(actions_table.setModeShowModal(true));
            //           }}
            //         >
            //           <Edit />
            //         </IconButton>
            //       </Tooltip>
            //     )}
            //     {permission.XOA === 1 && (
            //       <Popconfirm
            //         title="Xác nhận hành động"
            //         description="Bạn thực sự muốn xoá thông tin này?"
            //         onConfirm={() => handleDeleteRow(row.original)}
            //         onCancel={() => {}}
            //         okText="Đồng ý"
            //         cancelText="Không đồng ý"
            //       >
            //         <Tooltip arrow placement="right" title="Delete">
            //           <IconButton color="error">
            //             <Delete />
            //           </IconButton>
            //         </Tooltip>
            //       </Popconfirm>
            //     )}
            //     {permission.XEM === 1 &&
            //       permission.THEM === 0 &&
            //       permission.SUA === 0 &&
            //       listFormHaveViewDetail.includes(maForm) && (
            //         <Tooltip arrow placement="right" title="View Detail">
            //           <IconButton
            //             onClick={() => {
            //               dispatchTable(
            //                 actions_table.setInforRecordTable(row.original)
            //               );
            //               dispatchTable(actions_table.setActionForm("view"));
            //               dispatchTable(actions_table.setModeShowModal(true));
            //             }}
            //           >
            //             <VisibilityOutlinedIcon />
            //           </IconButton>
            //         </Tooltip>
            //       )}
            //   </Box>
            // )}

            renderRowActions={({ row, table }) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                }}
              >
                <Space>
                  {permission.THEM === 1 && (
                    <button
                      onClick={() => {
                        dispatchTable(
                          actions_table.setInforRecordTable(emptyData)
                        );
                        dispatchTable(actions_table.setActionForm("add"));
                        dispatchTable(actions_table.setModeShowModal(true));
                      }}
                    >
                      Thêm
                    </button>
                  )}
                </Space>
                <Space>
                  {permission.SUA === 1 && (
                    <button
                      onClick={() => {
                        dispatchTable(
                          actions_table.setInforRecordTable(row.original)
                        );
                        dispatchTable(actions_table.setActionForm("edit"));
                        dispatchTable(actions_table.setModeShowModal(true));
                      }}
                    >
                      Sửa
                    </button>
                  )}
                </Space>

                {permission.XOA === 1 && (
                  <Popconfirm
                    title="Xác nhận hành động"
                    description="Bạn thực sự muốn xoá thông tin này?"
                    onConfirm={() => handleDeleteRow(row.original)}
                    onCancel={() => {}}
                    okText="Đồng ý"
                    cancelText="Không đồng ý"
                  >
                    <button>Xoá</button>
                  </Popconfirm>
                )}

                {permission.XEM === 1 &&
                  permission.THEM === 0 &&
                  permission.SUA === 0 &&
                  listFormHaveViewDetail.includes(maForm) && (
                    <Tooltip arrow placement="right" title="View Detail">
                      <IconButton
                        onClick={() => {
                          dispatchTable(
                            actions_table.setInforRecordTable(row.original)
                          );
                          dispatchTable(actions_table.setActionForm("view"));
                          dispatchTable(actions_table.setModeShowModal(true));
                        }}
                      >
                        <VisibilityOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
              </Box>
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
