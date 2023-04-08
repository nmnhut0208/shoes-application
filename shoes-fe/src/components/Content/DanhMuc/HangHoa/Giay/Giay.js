import { Table, Space, Modal } from 'antd';
import ResizableAntdTable from 'resizable-antd-table';
import { useEffect, useState } from 'react'
import styles from "./Giay.module.scss"
import FormGiay from './FormGiay';
import './antd.css'

const list_key = ["STT", "Mã giày", "Đơn giá",
    "Tên giày", "Mã đế", "Tên đế",
    "Mã sườn", "Tên sườn", "Mã cá",
    "Tên cá", "Item 3", "Item 4"]

const infoColumns = []
for (var obj in list_key) {
    const info = {
        title: list_key[obj],
        width: 100,
        dataIndex: list_key[obj],
        key: list_key[obj].toLowerCase(),
        // fixed: 'left',
    }
    infoColumns.push(info)
}

infoColumns.push({
    title: 'Action',
    key: 'action',
    render: (_, record) => (
        <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
        </Space>
    ),
})

console.log("infoColumns: ", infoColumns)

const Giay = () => {

    const [infoGiay, setInfoGiay] = useState({})
    const [showGiay, setShowGiay] = useState(false)
    const [record, setRecord] = useState([]);
    const [visible, setVisible] = useState(false);

    console.log("infoGiay: ", infoGiay)
    console.log("showGiay: ", showGiay)
    console.log("record: ", record)
    useEffect(() => {
        fetch("http://localhost:8000/items")
            .then(response => {
                console.log("response: ", response)
                return response.json()
            })
            .then(info => {
                console.log(":info: ", info)
                setInfoGiay(info)
                setShowGiay(true)
            })
            .catch(err => {
                console.log(":error: ", err)
            })
    }, [])

    const handleCancel = () => {
        setVisible(false);
    }

    return (
        <>
            {showGiay && <Table
                // caption="Thông tin Giày"
                className={styles.tableCustom}
                columns={infoColumns}
                dataSource={infoGiay}
                scroll={{
                    x: 1300,
                    y: 500
                }}
                onRow={(record) => {
                    return {
                        onDoubleClick: () => {
                            setRecord(record)
                            setVisible(true)
                        }
                    }
                }}
            />}

            <Modal title="Thông tin chi tiết"
                open={visible}
                onCancel={handleCancel}>
                <FormGiay record={record}></FormGiay>
            </Modal>

        </>


    )
}
export default Giay