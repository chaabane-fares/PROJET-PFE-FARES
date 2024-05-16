import {message} from 'antd'
import axiosInstance from '@src/modules/auth/utils/axios'
import { endpoints } from '../../routes/endpoints.routes'


export async function fetchGitHubRepositories() {
    try {
        const response = await axiosInstance.get(endpoints.getRepositories)
        return response.data
    }catch (error) {
        message.error("fetch repositories from GitHub is failed")
    }
}