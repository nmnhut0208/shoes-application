import { useEffect, useState, useMemo } from "react";
import SubTable from "./SubTable";
import { renderDataEmpty } from "../PhanCong/ConstantVariable";
import { Modal } from "~common_tag";
import FormGiay from "./FormGiay";
import FormMau from "./FormMau";
import { useTableContext, actions_table } from "~table_context";
import styles from "./DonHang.module.scss";
import { list_key, columns_have_sum_feature } from "./config";

const DonHang = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [dataTable, setDataTable] = useState([]);

  /*
  TODO: Add logic
  - Chọn khách hàng A từ select option
  - Ở mã giày sẽ là select option tất cả các giày khách hàng
    A đã đặt trước đó 
       -> Chọn những mã khách hàng A đã đặt để đặt lại nếu muốn
       -> Chỗ này khó quá, select muti option 
         => mà nhìn giống kiểu bảng con
      Có thể chỉnh thành logic: click vô ô mã giày
      => show ra bảng con, chọn nhiều row, trả về kết quả 
      chứ select option làm sao hiện ra được full bảng @@ 
  - Trường hợp chú muốn thêm 1 mã giày mới mà khách hàng chưa đặt
       -> Mình đoán: sẽ bấm vào thêm giày để tạo thông tin 
       -> Bữa sau test trường hợp này
  - Sau khi chọn những giày muốn lấy 
       -> Hiện xuống bảng bên dưới để nhập số lượng 
   */

  // const [dataTable, setDataTable] = useState(() => {
  //   return renderDataEmpty(infoColumns, 50);
  // });

  const [showFormGiay, setShowFormGiay] = useState(false);
  const [showFormMau, setShowFormMau] = useState(false);
  const [stateTable, dispatchTable] = useTableContext();

  const handleThemGiay = () => {
    dispatchTable(actions_table.setTitleModal("Giày - F0025"));
    dispatchTable(actions_table.setModeShowModal(true));
    setShowFormGiay(true);
    setShowFormMau(false);
  };

  const handleThemMau = () => {
    dispatchTable(actions_table.setTitleModal("Màu sắc - F0010"));
    dispatchTable(actions_table.setModeShowModal(true));
    setShowFormMau(true);
    setShowFormGiay(false);
  };

  const handleNhapTiep = () => {
    // Render lại số đơn hàng
    // Reset lại hết những thông tin hiện có
    // để chú nhận đơn hàng mới
    setDataTable([]);
  };

  const infoColumns = useMemo(() => {
    const infoColumnsInit = [];

    for (var obj in list_key) {
      let key = list_key[obj]["key"];
      var info = {
        header: list_key[obj]["key"],
        size: list_key[obj]["width"],
        accessorKey: list_key[obj]["key"],
        enableEditing: list_key[obj]["enableEditing"],
        key: list_key[obj]["key"].toLowerCase(),
      };

      // thử thêm select box vô 1 cell
      if (key === "Màu đế") {
        info["editSelectOptions"] = [
          "Màu đế - 1",
          "Màu đế - 2",
          "Màu đế - 3",
          "Màu đế - 4",
        ];
        info["editVariant"] = "select";
        info["enableEditing"] = true;
      }

      if (key === "Tên giày") info["Footer"] = () => <div>Tổng cộng</div>;
      if (columns_have_sum_feature.includes(key)) {
        let sum_value = dataTable.reduce((total, row) => total + row[key], 0);
        info["Footer"] = () => <div>{sum_value}</div>;
      }
      infoColumnsInit.push(info);
    }
    return infoColumnsInit;
  }, [dataTable]);

  useEffect(() => {
    fetch("http://localhost:8000/items_donhang")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setRenderUI(true);
        setDataTable(info);
        console.log(dataTable);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  return (
    <>
      <div className={styles.form}>
        <div className={styles.group_item}>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label>Số đơn hàng</label>
              <input name="Số đơn hàng" />
            </div>
          </div>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label>Mã khách hàng</label>
              <input name="Mã khách hàng" />
              <span>Tên khách hàng</span>
            </div>
          </div>
          <input
            type="checkbox"
            name="Giá lẻ"
            value="true"
            className={styles.checkbox}
          />
          <span for="Giá lẻ" className={styles.span_for_checkbox}>
            Giá lẻ
          </span>
        </div>
        <div className={styles.group_item}>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label>Ngày đơn hàng</label>
              <input type="date" name="Ngày đơn hàng" />
            </div>
            <div className={styles.pair}>
              <label>Ngày giao hàng</label>
              <input type="date" name="Ngày giao hàng" />
            </div>
          </div>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label className={styles.label_for_textatea}>Diễn dãi</label>
              <textarea />
            </div>
          </div>
        </div>
      </div>
      {
        <SubTable
          columns={infoColumns}
          data={dataTable}
          setDataTable={setDataTable}
        />
      }
      <div className={styles.form}>
        {/* Không hiểu tại sao gộp 2 form lại thì ko nhận extend nên phải tách đỡ ra vầy */}
        <div className={styles.group_button}>
          <button onClick={handleThemGiay}>Thêm giày</button>
          <button onClick={handleThemMau}>Thêm màu</button>
          <button onClick={handleNhapTiep}>Nhập tiếp</button>
          <button>Lưu</button>
          <button>In</button>
          <button>Đóng</button>
        </div>
      </div>
      {showFormGiay && (
        <Modal>
          <FormGiay />
        </Modal>
      )}

      {showFormMau && (
        <Modal>
          <FormMau />
        </Modal>
      )}
    </>
  );
};

export default DonHang;
