import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { fetchGitHubRepositories } from "../shared/store/Queries/Repositories";
import { PATH } from "../auth/routes/paths";
import MainContainer from "../shared/layout/MainContainer/MainContainer";
import LoadingScreen from "../shared/components/Loading";
import CardSkew from "../shared/components/Cards/Cards-SKEW/Card-skew";
import NoData from "../shared/components/NoData";


export default function Repositories () {
    const navigate = useNavigate()
    const {data: repositories , isLoading} = useQuery({
        queryFn:() => fetchGitHubRepositories(),
        queryKey:['repositories',{}],
        staleTime:Infinity,
        cacheTime : 1 ,
   } ) 
    const handleRepoClick = (repo : string) => {
        navigate(PATH.PULLS.replace(';id',repo))
    }

    return (
        <MainContainer                     // same as div : feha le contenue as children feha css mte3ha 7a4er
            linkProps={{
                links:[{name: 'repositories',href:''}],
                title:'repositories',
            }}
            style={{ paddingBottom: 0 }}
        >
            {isLoading ? (
                <LoadingScreen blur/>              // if the fetching is not finished yet
            ) : (
               <div className="repositories-container">
                    {!repositories || repositories?.length==0 ? (
                        <NoData title={`no repositories in your account GitHub`}/>
                    ) : (
                    repositories?.map((repo: {name :string ; visibility: string },i: number)=>(
                        <CardSkew autoColors={i+1}>
                            <div
                            className="repositories-container__card"
                            onClick={()=> handleRepoClick(repo?.name)}
                            >
                                <p className="repositories-container__card__title">{repo?.name}</p>
                                <div className="repositories-container__card__visibility">
                                    <p className="repositories-container__card__visibility__status"> {repo?.visibility}</p>
                                </div>
                            </div>
                        </CardSkew>
                    ))
                )}
            </div>        
        )}
        </MainContainer>
)}