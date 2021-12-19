import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonstore";
import ModalStore from "./ModalStore";
import UserStore from "./userstore";

interface Store{
    activityStore:ActivityStore;
    userStore:UserStore;
    commonstore:CommonStore;
    modalStore : ModalStore;
}

export const store: Store = {
    activityStore:new ActivityStore(),
    userStore:new UserStore(),
    commonstore:new CommonStore(),
    modalStore: new ModalStore(),
}

export const StoreContext = createContext(store)

export function  useStore()
{
    return useContext(StoreContext);
}