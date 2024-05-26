import { fetchGitHubPullRequests } from "@src/modules/shared/store/Queries/PullRequest";
import { Collapse } from "antd";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import MainContainer from "../../../shared/layout/MainContainer/MainContainer";
import MainLayout from "../../../shared/layout/MainLayout/MainLayout";
import { useAppSelector } from "../../../shared/store";
import { PATH } from "../../routes/paths";
import Commits from "./commits";
import './index.scss';
import OnePullRequest from "./OnePullRequest";


export default function PullRequest () {
    const navigate = useNavigate()
    const {user}=useAppSelector((state)=>state.auth.user)
    const {id}=useParams() 
    const {data: pullRequests , isLoading} = useQuery({
        queryFn:() => fetchGitHubPullRequests({user:user?.user_metadata?.user_name,repo:id!}), // for getting just the name of the user no more information
        queryKey:['pullRequests',{}],
        staleTime:Infinity,   
        cacheTime : 1 ,      
    } ) 
    
    
    


return (
   
        <MainLayout>                        
            
            <MainContainer                    
                linkProps={{
                    title:'pullRequest',     
                    links:[{href:PATH.PULLREQUEST ,name: 'pullRequest'}], 
                }}
                style={{ paddingBottom: 0 }}
                >
                   <Collapse
                items={pullRequests?.map((pull: any) => ({
                  key: `${pull.number}`,
                  label: <OnePullRequest pull={pull}/>, // pull request header 
                  children: (
                    <Commits PullId={pull.number} /> // pull request commits list  
                  ),
                }))}
 />
            </MainContainer>
        </MainLayout>
    
)}
