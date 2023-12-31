import MaterialReactTable from "material-react-table";
import { Popconfirm } from "antd";
import { Box } from "@mui/material";
import { useTableContext, actions_table } from "~table_context";
import { useUserContext, actions } from "~user";
import { border_text_table_config } from "~config/ui";
import { CustomAlert } from "~utils/alert_custom";
import styles from "./SubTable.module.scss";

const SubTable = ({
  columns,
  data,
  setShowForm,
  setSendData,
  setData,
  //   rowSelection,
  //   setRowSelection,
  maxHeight,
  allowDelete,
}) => {
  //   console.log("data: ", data);
  const [stateUser, dispatchUser] = useUserContext();
  const maForm = "F0042";
  const [stateTable, dispatchTable] = useTableContext();

  return (
    <MaterialReactTable
      {...border_text_table_config}
      columns={columns}
      data={data}
      components
      enableColumnResizing
      enableRowNumbers
      enableEditing
      enableColumnActions={false}
      enableSorting={false}
      enableSelectAll={false}
      enableGrouping
      initialState={{ grouping: ["MAKY"], expanded: true }}
      //   enableRowSelection
      //   getRowId={(row) => row.userId}
      //   onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
      //   state={{ rowSelection }}
      enableTopToolbar={true}
      enableBottomToolbar={false}
      enablePagination={false}
      muiTableContainerProps={{ sx: { maxHeight: { maxHeight } } }}
      enableRowVirtualization
      enableStickyFooter
      displayColumnDefOptions={{
        "mrt-row-actions": {
          minSize: 80, //set custom width
          muiTableHeadCellProps: {
            align: "center", //change head cell props
          },
          muiTableBodyCellProps: {
            minSize: 80,
          },
          enableResizing: true,
        },
      }}
      renderRowActions={({ row, table }) => (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: "0.3rem",
            marginLeft: "0.2rem",
            marginRight: "0.2rem",
          }}
        >
          <Box>
            <button
              className={styles.edit_button}
              style={{ borderRight: "0.17rem solid rgba(0, 0, 0, 0.4)" }}
              onClick={() => {
                if (
                  stateUser.userPoolAccess.some(
                    (obj) => obj.MAFORM === maForm && obj.SUA === 1
                  )
                ) {
                  setShowForm(true);
                  setSendData(row.original);
                  dispatchTable(actions_table.setModeShowModal(true));
                } else {
                  CustomAlert("Bạn không có quyền xem");
                }
              }}
            >
              Xem
            </button>
          </Box>

          <Box>
            {allowDelete && (
              <Popconfirm
                title="Xác nhận hành động"
                description="Bạn thực sự muốn xoá thông tin này?"
                onConfirm={() => {
                  if (
                    stateUser.userPoolAccess.some(
                      (obj) => obj.MAFORM === maForm && obj.XOA === 1
                    )
                  ) {
                    fetch("http://localhost:8000/tv_chamcong", {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(row.original),
                    })
                      .then((response) => {
                        return response.json();
                      })
                      .then((data) => {
                        if (data["status"] === "success") {
                          fetch("http://localhost:8000/tv_chamcong")
                            .then((response) => {
                              return response.json();
                            })
                            .then((info) => {
                              setData(info);
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                          // CustomAlert("Xóa thành công");
                        } else {
                          CustomAlert("Xóa thất bại");
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else {
                    CustomAlert("Bạn không có quyền xóa");
                  }
                }}
                onCancel={() => {}}
                okText="Đồng ý"
                cancelText="Không đồng ý"
              >
                <button className={styles.delete_button}>Xoá</button>
              </Popconfirm>
            )}
          </Box>
        </div>
      )}
    />
  );
};

export default SubTable;
