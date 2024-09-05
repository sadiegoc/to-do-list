import axios from "axios";
import { baseURL } from "@/config/global";

export default axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json"
    }
})