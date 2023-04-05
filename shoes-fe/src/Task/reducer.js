import { SET_TASK_DANH_MUC, SET_TASK_HE_THONG } from "./constants"
const initState = {
    inforCurrentTask: {"infoContent": "Header"}
}

function reducer (state, action) {
    const info = {}
    switch (action.type) {
        case SET_TASK_DANH_MUC:{
            info["infoContent"] = "DanhMuc"
            info["infoDetail"] = action.payload
            break
        }
        case SET_TASK_HE_THONG: {
            info["infoContent"] = "HeThong"
            info["infoDetail"] = action.payload
            break
        }
        default:
            // throw new Error("Action is not supported")
            break
    }
    return {...state, inforCurrentTask: info}
}

export { initState }
export default reducer