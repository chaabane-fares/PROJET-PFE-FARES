import { supabase } from '@src/client'
import CardBalance from '@src/modules/shared/components/Cards/Card-BALANCE/Card-balance'
import { PATH } from '../../routes/paths'
import GithubIcon from '@src/modules/shared/assets/icons/github'
import { useAuthGard } from '../../hook/useAuthgard'
const Login = () => {
  useAuthGard()
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
          <p className="login-module__card__title">Welcome
            <p className="login-module__card__description"> Login via your Github account to get started with our app </p>
          </p> 
            <button onClick={signInWithGithub}>
              <GithubIcon className="button-icon"/>
              <p className="button-desc">Sign in with Github</p>
            </button>
          </div>
        </div>
    </CardBalance>
  )
}

export default Login
