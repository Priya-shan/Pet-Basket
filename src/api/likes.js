import {baseUrl} from "../constants/contants"
import axios from "axios";

export async function fetchLikes(){
    return axios.get(`${baseUrl}/Likes`);
}

export async function fetchLikeById(LikeId){
    return axios.get(`${baseUrl}/Likes/${LikeId}`);
}

export async function addLike(LikeModal){
    return axios.post(`${baseUrl}/Likes`,LikeModal);
}

export async function updateLike(LikeId,LikeModal){
    return axios.put(`${baseUrl}/Likes/${LikeId}`,LikeModal);
}

export async function deleteLike(LikeId){
    return axios.delete(`${baseUrl}/Likes/${LikeId}`);
}