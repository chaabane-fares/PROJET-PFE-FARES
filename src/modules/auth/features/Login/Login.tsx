import CardBalance from '@src/modules/shared/components/Cards/Card-BALANCE/Card-balance'
const Login = () => {
  async function signInWithGithub() {
    console.log('hello ')
  }

  return (
    <CardBalance>
      <div className="login-module">
        <div className="login-module__card">
          <p className="login-module__card__title">Welcome</p>
          <button onClick={signInWithGithub}>login btn</button>
        </div>
      </div>
    </CardBalance>
  )
}

export default Login
