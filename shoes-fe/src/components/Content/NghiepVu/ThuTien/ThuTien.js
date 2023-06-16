import { Space } from "antd";
import { useEffect, useState } from "react";
// import { TableContent } from "~common_tag";
import Modal from "./Modal";
import FormThuTien from "./FormThuTien";
import { useTableContext, actions_table } from "~table_context";

const ThuTien = () => {
  return (
    <>
      <Modal title="Thu Tiền">
        <FormThuTien type_action="add" />
      </Modal>
    </>
  );
};

export default ThuTien;
