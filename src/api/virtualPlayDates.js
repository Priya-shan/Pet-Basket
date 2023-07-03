import {baseUrl} from "../constants/contants"
import axios from "axios";

export async function fetchVpds(){
    return axios.get(`${baseUrl}/VirtualPlayDates`);
}

export async function fetchVpdById(vpdId){
    return axios.get(`${baseUrl}/VirtualPlayDates/${vpdId}`);
}

export async function addVpd(vpdModal){
    return axios.post(`${baseUrl}/VirtualPlayDates`,vpdModal);
}

export async function updateVpd(vpdId,vpdModal){
    return axios.put(`${baseUrl}/VirtualPlayDates/${vpdId}`,vpdModal);
}

export async function deleteVpd(vpdId){
    return axios.delete(`${baseUrl}/VirtualPlayDates/${vpdId}`);
}