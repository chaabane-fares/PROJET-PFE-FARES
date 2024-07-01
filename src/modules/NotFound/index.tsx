import { PATH } from '@src/modules/auth/routes/paths'
import { useNavigate } from 'react-router-dom'

import astronaut from '../shared/assets/icons/svgs/astronaut.svg'
import Canvas from '../shared/components/Canvas/Canvas'
import { useAppSelector } from '../shared/store'
const NotFound = () => {
  const isAuthenticated = useAppSelector(
    (state: { auth: { isAuthenticated: any } }) => state.auth.isAuthenticated
  )
  const navigate = useNavigate()
  const handleclick = () => {
    isAuthenticated ? navigate(PATH.REPO) : navigate(PATH.LOGIN)
  }
  return (
    <>
      <Canvas />
      <nav className="navbar">404 NOT FOUND 🚀</nav>

      <main>
        <div className="message">
          <strong>404</strong>
          <p className="title">LOOKS LIKE YOU ARE LOST IN THE SPACE</p>
          <p className="message-text">
            The page you are looking for might be removed or is temporally unavailable
          </p>
          <button className="button" onClick={() => handleclick()}>
            TAKE ME BACK
          </button>
        </div>
      </main>

      <div className="box-astronaut">
        <img src={astronaut} alt="" />
      </div>
    </>
  )
}

export default NotFound
