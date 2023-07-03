import {baseUrl} from "../constants/contants"
import axios from "axios";

export async function fetchPosts(){
    return axios.get(`${baseUrl}/Posts`);
}

export async function fetchPostById(postId){
    return axios.get(`${baseUrl}/Posts/${postId}`);
}

export async function addPost(postModal){
    return axios.post(`${baseUrl}/Posts`,postModal,{headers:{"Content-type":"multipart/form-data",}});
}

export async function updatePost(postId,postModal){
    return axios.put(`${baseUrl}/Posts/${postId}`,postModal);
}

export async function deletePost(postId){
    return axios.delete(`${baseUrl}/Posts/${postId}`);
}