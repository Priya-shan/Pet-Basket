import {baseUrl} from "../constants/contants"
import axios from "axios";

export async function fetchReplies(){
    return axios.get(`${baseUrl}/Replies`);
}

export async function fetchReplyById(ReplyId){
    return axios.get(`${baseUrl}/Replies/${ReplyId}`);
}

export async function addReply(ReplyModal){
    return axios.post(`${baseUrl}/Replies`,ReplyModal);
}

export async function updateReply(ReplyId,ReplyModal){
    return axios.put(`${baseUrl}/Replies/${ReplyId}`,ReplyModal);
}

export async function deleteReply(ReplyId){
    return axios.delete(`${baseUrl}/Replies/${ReplyId}`);
}