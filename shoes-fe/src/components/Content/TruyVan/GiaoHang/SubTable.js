import { useState, memo } from "react";
import MaterialReactTable from "material-react-table";
import { Popconfirm } from "antd";
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
  setDataTable,
  //   rowSelection,
  //   setRowSelection,
  maxHeight,
}) => {
  // console.log("databig: ", data);
  const [stateUser, dispatchUser] = useUserContext();
  const maForm = "F0033";
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
      //   enableRowSelection
      //   getRowId={(row) => row.userId}
      //   onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
      //   state={{ rowSelection }}
      enableTopToolbar={true}
      initialState={{ showColumnFilters: true }}
      enableBottomToolbar={false}
      enablePagination={false}
      muiTableContainerProps={{ sx: { maxHeight: { maxHeight } } }}
      enableRowVirtualization
      enableStickyFooter
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
              } else {
                CustomAlert("Bạn không có quyền sửa");
              }
            }}
          >
            Sửa
          </button>
          <Popconfirm
            title="Xác nhận hành động"
            description="Bạn thực sự muốn xoá thông tin này?"
            onConfirm={() => {
              console.log("delete: ", row.original);
              if (
                stateUser.userPoolAccess.some(
                  (obj) => obj.MAFORM === maForm && obj.XOA === 1
                )
              ) {
                fetch("http://localhost:8000/tv_giaohang", {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(row.original),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.status === "success") {
                      fetch("http://localhost:8000/tv_giaohang")
                        .then((response) => {
                          return response.json();
                        })
                        .then((info) => {
                          setDataTable(info);
                        })
                        .catch((err) => {
                          console.log(":error: ", err);
                        });
                      // CustomAlert("Xóa thành công");
                    } else {
                      CustomAlert("Xóa thất bại");
                    }
                  })
                  .catch((error) => {
                    console.error("Error:", error);
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
        </div>
      )}
    />
  );
};

export default memo(SubTable);
