import { supabase } from '@src/client'
import CardBalance from '@src/modules/shared/components/Cards/Card-BALANCE/Card-balance'
import { PATH } from '../../routes/paths'
import GithubIcon from '@src/modules/shared/assets/icons/github'
const Login = () => {
  const location = window.location
  console.log(location)
  console.log(PATH.LOGIN,"path")
  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}${PATH.LOGIN}`,
      },
    })
    console.log(data)
    
    
  }

  return (
    <CardBalance>
      <div className="login-module">
        <div className="login-module__card">
          <p className="login-module__card__title">Welcome</p>
          <p className="login-module__card__description"> Login via your Github account to get started with our app </p>
          <div className='button-container'>
            <img src={GithubIcon} alt="GithubIcon" />
            <button onClick={signInWithGithub}>Sign in with Github</button>
          </div>
        </div>
      </div>
    </CardBalance>
  )
}

export default Login
