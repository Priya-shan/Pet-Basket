import {baseUrl} from "../constants/contants"
import axios from "axios";

export async function fetchEnquiries(){
    return axios.get(`${baseUrl}/AdoptionEnquiries`);
}

export async function fetchEnquiryById(EnquiryId){
    return axios.get(`${baseUrl}/AdoptionEnquiries/${EnquiryId}`);
}

export async function addEnquiry(EnquiryModal){
    return axios.post(`${baseUrl}/AdoptionEnquiries`,EnquiryModal);
}

export async function updateEnquiry(EnquiryId,EnquiryModal){
    return axios.put(`${baseUrl}/AdoptionEnquiries/${EnquiryId}`,EnquiryModal);
}

export async function deleteEnquiry(EnquiryId){
    return axios.delete(`${baseUrl}/AdoptionEnquiries/${EnquiryId}`);
}