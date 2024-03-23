import { useAppSelector } from "@src/modules/shared/store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useAuthGard=()=>{
    const navigate=useNavigate()
    const {isAuthenticated}=useAppSelector(state=>state.auth)

    useEffect(()=>{
        if (isAuthenticated){
            navigate('/home')
            return
        }
        else if (!isAuthenticated){
            navigate('/login')
            return
        }

    },[isAuthenticated])
    return isAuthenticated;
}