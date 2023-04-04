// import { useContext } from 'react'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { itemsHeThong } from './ConstantVariable'
// import { GlobalContext } from '../../GlobalContext';
import { useTaskContext, actions } from '../../../Task';


const HeThong = () => {
    // const [stateTask, dispatchTask] = useTaskContext()
    // const inforCurrentTask = stateTask.inforCurrentTask
    // console.log("inforCurrentTask: ", inforCurrentTask)
    return (
        <>
        <Dropdown
            menu={{
                items: itemsHeThong,
                // onClick: (e) => {dispatchTask(actions.setTaskDanhMuc(e.key))} ,
            }}
        >
            <a onClick={(e) => e.preventDefault()}> 
                <Space>
                    Hệ thống
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
        </>
        
    )
}

export default HeThong




