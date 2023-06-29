import MaterialReactTable from "material-react-table";
import { useMemo, useState, useEffect } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";

import { useUserContext } from "~user";

import { processingInfoColumnTable } from "~utils/processing_data_table";
import { FormNghiepVuPhanCong, Modal } from "~nghiep_vu/PhanCong/";
import { INFO_COLS_PHANCONG } from "./ConstantVariable";
import { border_text_table_config } from "~config/ui";

const Table = ({ columns, data, setDataPhanCong, permission }) => {
  console.log("vao table phan cong ne");
  const [rowInfo, setRowInfo] = useState({});
  const [isSaveData, setIsSaveData] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [
    listMaDongPhanCongAddButWaitSave,
    setListMaDongPhanCongAddButWaitSave,
  ] = useState([]);

  const handleEditRow = () => {
    setListMaDongPhanCongAddButWaitSave([]);
    setShowModal(true);
  };
  return (
    <>
      <MaterialReactTable
        {...border_text_table_config}
        // enableTopToolbar={false} // show tool to filter
        columns={columns}
        data={data}
        // components
        enableColumnActions={false}
        enableSorting={false}
        // enable phân trang
        enablePagination={false}
        enableBottomToolbar={true}
        // scroll to bottom
        enableRowVirtualization
        muiTableContainerProps={{
          sx: { maxHeight: "60rem" },
        }}
        // row number
        enableRowNumbers
        // add action in row
        enableRowActions={true}
        renderRowActions={({ row, table }) => (
          <Box
            sx={{
              display: "flex",
              "align-content": "center",
            }}
          >
            <Tooltip arrow title="View">
              <IconButton
                onClick={() => {
                  setRowInfo(row.original);
                  handleEditRow();
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />

      <Modal
        status={showModal}
        title="Phân Công - F0037"
        setShowModal={setShowModal}
        isResetPageEmpty={false}
        isSaveData={isSaveData}
        listMaDongPhanCongAddButWaitSave={listMaDongPhanCongAddButWaitSave}
      >
        <FormNghiepVuPhanCong
          dataView={rowInfo}
          setIsSaveDataNghiepVuPhanCong={setIsSaveData}
          permission={permission}
          listMaDongPhanCongAddButWaitSave={listMaDongPhanCongAddButWaitSave}
          setListMaDongPhanCongAddButWaitSave={
            setListMaDongPhanCongAddButWaitSave
          }
        />
      </Modal>

      {/* 
        Khi hiện FormPhanCong ở chế độ view chỉ hiện thông tin của đơn hàng hiện tại
        thôi 
        Bảng ở trên show 1 dòng đơn hàng
        Bảng ở dưới show thông tin phân công của đơn hàng đó. 
        => ko cho xóa sửa gì hết 
        // Lấy thông tin dòng select truyền qua cho FormPhanCon ne 
        => Qua đó query thông tin phân công 
         */}
    </>
  );
};

const MAFORM_TRUYVAN_PHANCONG = "F0039";

const PhanCong = () => {
  const [dataPhanCong, setDataPhanCong] = useState([]);

  const columns = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_PHANCONG);
  }, []);

  const [stateUser, dispatchUser] = useUserContext();

  const permission = useMemo(() => {
    const phanquyen = stateUser.userPoolAccess.filter(
      (obj) => obj.MAFORM === MAFORM_TRUYVAN_PHANCONG
    )[0];
    return phanquyen;
  }, []);

  console.log("permission: ", permission);

  useEffect(() => {
    if (permission.XEM + permission.SUA + permission.XOA + permission.IN > 0) {
      fetch("http://localhost:8000/phancong/baocao_phancong")
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          setDataPhanCong(info);
          console.log("info: ", info);
        })
        .catch((err) => {
          console.log(":error: ", err);
        });
    }
  }, []);

  if (permission.XEM + permission.SUA + permission.XOA + permission.IN === 0) {
    alert(stateUser.userName + " không có quyền xem Truy Vấn Phân Công");
    return <></>;
  }

  return (
    <>
      <h1>Phân công - F0039</h1>
      <Table columns={columns} data={dataPhanCong} permission={permission} />
    </>
  );
};

export default PhanCong;
