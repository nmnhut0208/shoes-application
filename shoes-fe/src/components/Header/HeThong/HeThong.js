import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { itemsHeThong } from './ConstantVariable' 
import { useTaskContext, actions } from '@task';


const HeThong = () => {
    const [stateTask, dispatchTask] = useTaskContext()
    const inforCurrentTask = stateTask.inforCurrentTask
    console.log("inforCurrentTask: ", inforCurrentTask)
    console.log("itemsHeThong: ", itemsHeThong)
    const handleOnclick = (e) => {
        dispatchTask(actions.setTaskHeThong(e.key))
    }
    return (
        <Dropdown
            menu={{
                items: itemsHeThong,
                onClick: handleOnclick,
            }}
        >
            <a onClick={(e) => e.preventDefault()}> 
                <Space>
                    Hệ thống
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
        
    )
}

export default HeThong




