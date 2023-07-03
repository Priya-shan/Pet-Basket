import {baseUrl} from "../constants/contants"
import axios from "axios";

export async function fetchProducts(){
    return axios.get(`${baseUrl}/Products`);
}

export async function fetchProductById(productId){
    return axios.get(`${baseUrl}/Products/${productId}`);
}

export async function addProduct(productModal){
    return axios.post(`${baseUrl}/Products`,productModal);
}

export async function updateProduct(productId,productModal){
    return axios.put(`${baseUrl}/Products/${productId}`,productModal);
}

export async function deleteProduct(productId){
    return axios.delete(`${baseUrl}/Products/${productId}`);
}