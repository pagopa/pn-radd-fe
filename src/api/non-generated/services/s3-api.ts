import { apiClient } from "../../axios"
import { S3PutPayload } from "../types/S3PutPayload"

export const S3Api = {
    upload: async (presignedUrl: string, payload: S3PutPayload) => {
        const {files, secret} = payload;
        const config = {
            headers: {
                "secret": secret
            }
        }
        return await apiClient.put(presignedUrl, files, config);
    }
}