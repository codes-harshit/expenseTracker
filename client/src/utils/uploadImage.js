import { API_PATHS } from "./apiPaths";
import { axiosInstance } from "./axiosInstance";


export const uploadImage = async (image) => {
    const formData = new FormData();

    formData.append("image", image);
    try {
        const res = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })

        return res.data
    } catch (error) {
        console.log("Error in uploading image", error);
        return null;
        
    }
}