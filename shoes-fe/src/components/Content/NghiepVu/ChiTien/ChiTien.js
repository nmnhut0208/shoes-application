import { Space } from "antd";
import { useEffect, useState } from "react";
// import { TableContent } from "~common_tag";
import Modal from "./Modal";
import FormChiTien from "./FormChiTien";
import { useTableContext, actions_table } from "~table_context";

const ChiTien = () => {
  return (
    <>
      <Modal title="Chi Tien">
        <FormChiTien />
      </Modal>
    </>
  );
};

export default ChiTien;
