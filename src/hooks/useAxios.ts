import {useEffect, useState} from "react";
import axios from 'axios';

type RequestData = {
    url: string;
    method: string;
    data?: object;
    params?: object;
}
//Custom hook for API calls
const useAxios = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const axiosInstance = axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL,
    });

    // Set up request and response interceptors
    axiosInstance.interceptors.request.use(
        (config) => {
        // Log or modify request here
        console.log("Sending request to:", config.url);
        return config;
        },
        (error) => {
        // Handle request error here
        return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
        // Log or modify response here
        console.log("Received response from:", response.config.url);
        return response;
        },
        (error) => {
        // Handle response error here
        return Promise.reject(error);
        }
    );

    useEffect(() => {
        const source = axios.CancelToken.source();

            return () => {
            // Cancel the request when the component unmounts
            source.cancel("Component unmounted: Request cancelled.");
            };
        }, []);

    // Making the API call with cancellation support
    const fetchData = async ({url, method, data={}, params={}}: RequestData )  => {
        setLoading(true);
        try {
            const result = await axiosInstance({
                url,
                method,
                data: method.toLowerCase() === "get" ? undefined : data, // Only include data for non-GET requests
                params: method.toLowerCase() === "get" ? data : params, // For GET requests, use data as query params
                cancelToken: axios.CancelToken.source().token,
            });
            setResponse(result.data);
            
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request cancelled", error.message);
            } else if (axios.isAxiosError(error)) {
                const responseData =
                error.response && error.response.data
                    ? error.response.data
                    : error.message;
                setError(
                typeof responseData === "string"
                    ? responseData
                    : JSON.stringify(responseData)
                );
            } else if (error instanceof Error) {
                setError(error.message);
            }  else {
                setError(String(error));
            }
        } finally {
            setLoading(false);
        }
    };

    // Expose the state and the fetchData function
    return { response, error, loading, fetchData };
};

export default useAxios;
