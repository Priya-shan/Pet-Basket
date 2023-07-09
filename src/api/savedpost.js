import {baseUrl} from "../constants/contants"
import axios from "axios";

export async function fetchSavedPosts(){
    return axios.get(`${baseUrl}/SavedPost`);
}

export async function fetchSavedPostById(SavedPostId){
    return axios.get(`${baseUrl}/SavedPost/${SavedPostId}`);
}

export async function addSavedPost(SavedPostModal){
    return axios.post(`${baseUrl}/SavedPost`,SavedPostModal);
}

export async function updateSavedPost(SavedPostId,SavedPostModal){
    return axios.put(`${baseUrl}/SavedPost/${SavedPostId}`,SavedPostModal);
}

export async function deleteSavedPost(SavedPostId){
    return axios.delete(`${baseUrl}/SavedPost/${SavedPostId}`);
}