import {atom} from "recoil"

export const authStatus=atom({
    key:"authStatus",
    default: {
        status:false,
        userName:""
    }
})

export const postsState = atom({
  key: 'postsState',
  default: true,
});
