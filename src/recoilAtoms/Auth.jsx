import {atom} from "recoil"

export const authStatus=atom({
    key:"authStatus",
    default: {
        status:false,
        userName:""
    }
})
