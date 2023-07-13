import {baseUrl} from "../constants/contants"
import axios from "axios";

export async function fetchVpdRequests(){
    return axios.get(`${baseUrl}/VpdRequests`);
}

export async function fetchVpdRequestById(VpdRequestId){
    return axios.get(`${baseUrl}/VpdRequests/${VpdRequestId}`);
}

export async function addVpdRequest(VpdRequestModal){
    return axios.post(`${baseUrl}/VpdRequests`,VpdRequestModal);
}

export async function updateVpdRequest(VpdRequestId,VpdRequestModal){
    return axios.put(`${baseUrl}/VpdRequests/${VpdRequestId}`,VpdRequestModal);
}

export async function deleteVpdRequest(VpdRequestId){
    return axios.delete(`${baseUrl}/VpdRequests/${VpdRequestId}`);
}