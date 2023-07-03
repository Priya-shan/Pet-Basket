import {baseUrl} from "../constants/contants"
import axios from "axios";

export async function fetchPets(){
    return axios.get(`${baseUrl}/Pets`);
}

export async function fetchPetById(petId){
    return axios.get(`${baseUrl}/Pets/${petId}`);
}

export async function addPet(petModal){
    return axios.post(`${baseUrl}/Pets`,petModal);
}

export async function updatePet(petId,petModal){
    return axios.put(`${baseUrl}/Pets/${petId}`,petModal);
}

export async function deletePet(petId){
    return axios.delete(`${baseUrl}/Pets/${petId}`);
}