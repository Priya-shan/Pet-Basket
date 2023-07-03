import {baseUrl} from "../constants/contants"
import axios from "axios";

export async function fetchUsers(){
    return axios.get(`${baseUrl}/User`);
}

export async function fetchUserById(userId){
    return axios.get(`${baseUrl}/User/${userId}`);
}

export async function addUser(userModal){
    return axios.post(`${baseUrl}/User`,userModal);
}

export async function updateUser(userId,userModal){
    return axios.put(`${baseUrl}/User/${userId}`,userModal);
}

export async function deleteUser(userId){
    return axios.delete(`${baseUrl}/User/${userId}`);
}