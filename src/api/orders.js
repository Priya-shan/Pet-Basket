import {baseUrl} from "../constants/contants"
import axios from "axios";

export async function fetchOrders(){
    return axios.get(`${baseUrl}/Orders`);
}

export async function fetchOrderById(OrderId){
    return axios.get(`${baseUrl}/Orders/${OrderId}`);
}

export async function addOrder(OrderModal){
    return axios.post(`${baseUrl}/Orders`,OrderModal);
}

export async function updateOrder(OrderId,OrderModal){
    return axios.put(`${baseUrl}/Orders/${OrderId}`,OrderModal);
}

export async function deleteOrder(OrderId){
    return axios.delete(`${baseUrl}/Orders/${OrderId}`);
}