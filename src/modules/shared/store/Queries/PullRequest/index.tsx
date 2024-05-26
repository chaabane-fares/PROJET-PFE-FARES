import {message} from 'antd'
import axiosInstance from '@src/modules/auth/utils/axios'
import { endpoints } from '../../routes/endpoints.routes'


export async function fetchGitHubPullRequests({user,repo}:{user:string,repo:string}) {
    console.log(user)
    try {
        const response = await axiosInstance.get(endpoints.getPullRequests.replace(":user",user).replace(":repo",repo))
        return response.data
    }catch (error) {
        message.error("fetch pull Request from GitHub is failed")
    }
}