import { useContext } from 'react'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { itemsHangHoa } from './ConstantVariable'
// import { GlobalContext } from '../../GlobalContext';
import { TaskContext } from '../../../Task';

const DanhMuc = () => {
    // const context = useContext(TaskContext)
    // console.log("context: ", context)
    return (
            <Dropdown
                menu={{
                    items: itemsHangHoa,
                    // onClick: context.handleDanhMuc,
                }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        Danh mục
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
    )
}

export default DanhMuc


