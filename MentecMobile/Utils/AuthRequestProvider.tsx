import { useState } from "react";
import { Platform } from "react-native";



export const getToken = () =>{
    
}


export const getApiUrl = () => {

    const system = Platform.OS;

    if (system === "web") {

        return process.env.EXPO_PUBLIC_API_URL;

    }

    return process.env.EXPO_PUBLIC_API_URL_MOBILE;
};