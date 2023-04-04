import { useState, createContext } from "react";
import { getHandleHeThong, getHandleDanhMuc } from './InfoHandleClick'

const GlobalContext = createContext()

function GlobalProvider({children}){
    const [infoTask, setInfoTask] = useState({})

    const handleDropdownHeThong = (e) => {
        setInfoTask(getHandleHeThong(e))
    }
    
    const handleDropdownDanhMuc = (e) => {
        const detailTask = getHandleDanhMuc(e)
        console.log("=====================")
        console.log(detailTask)
        console.log(e.key)
        setInfoTask(detailTask)
    }

    const globalValue = {
        infoTask,
        "handleHeThong": handleDropdownHeThong,
        "handleDanhMuc": handleDropdownDanhMuc,
    }

    return (
        <GlobalContext.Provider value={globalValue}>
            {children}
        </GlobalContext.Provider>
    )
}

export {GlobalContext, GlobalProvider}