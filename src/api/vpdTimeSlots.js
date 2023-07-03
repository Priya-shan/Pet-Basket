import {baseUrl} from "../constants/contants"
import axios from "axios";

export async function fetchVpdTimeSlots(){
    return axios.get(`${baseUrl}/VpdTimeSlots`);
}

export async function fetchVpdTimeSlotById(slotId){
    return axios.get(`${baseUrl}/VpdTimeSlots/${slotId}`);
}

export async function addVpdTimeSlot(vpdTimeSlotModal){
    return axios.post(`${baseUrl}/VpdTimeSlots`,vpdTimeSlotModal);
}

export async function updateVpdTimeSlot(slotId,vpdTimeSlotModal){
    return axios.put(`${baseUrl}/VpdTimeSlots/${slotId}`,vpdTimeSlotModal);
}

export async function deleteVpdTimeSlot(slotId){
    return axios.delete(`${baseUrl}/VpdTimeSlots/${slotId}`);
}