import { supabase } from '@src/client'
import CardBalance from '@src/modules/shared/components/Cards/Card-BALANCE/Card-balance'
import { PATH } from '../../routes/paths'
import GithubIcon from '@src/modules/shared/assets/icons/github'
import { useAuthGard } from '../../hook/useAuthgard'
import Canvas from '@src/modules/shared/components/Canvas/Canvas'
import { message } from 'antd'
const Login = () => {
  useAuthGard()
  const location = window.location.origin
  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location}${PATH.LOGIN}`,
      },
    })
    await supabase.auth.getSession()
    message.success('sign in successful')    
  }

  return ( 
        <div className="login-module">
          <CardBalance>
            <div className="login-module__card">
              <p className="login-module__card__title">Welcome</p> 
                <p className="login-module__card__description"> Login via your Github account to get started with our app </p>
              
                <button onClick={signInWithGithub}>
                  <GithubIcon className="button-icon"/>
                  <p className="button-desc">Sign in with Github</p>
                </button>
              </div>
          </CardBalance>
          <Canvas/>
      </div>
  )
}

export default Login
