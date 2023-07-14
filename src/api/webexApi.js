import {webexMeetingBaseUrl} from "../constants/contants"
import axios from "axios";

export async function addMeeting(meetingDataModel){
    return axios.post(`${webexMeetingBaseUrl}/Meetings`,meetingDataModel);
}