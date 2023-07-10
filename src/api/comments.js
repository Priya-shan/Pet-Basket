import {baseUrl} from "../constants/contants"
import axios from "axios";

export async function fetchComments(){
    return axios.get(`${baseUrl}/Comments`);
}

export async function fetchCommentById(CommentId){
    return axios.get(`${baseUrl}/Comments/${CommentId}`);
}

export async function addComment(CommentModal){
    return axios.post(`${baseUrl}/Comments`,CommentModal);
}

export async function updateComment(CommentId,CommentModal){
    return axios.put(`${baseUrl}/Comments/${CommentId}`,CommentModal);
}

export async function deleteComment(CommentId){
    return axios.delete(`${baseUrl}/Comments/${CommentId}`);
}