import { useAppDispatch, useAppSelector } from '../../store'
import LogOutBtn from '../Buttons/Logout'
import { logout } from '@src/modules/auth/data/authThunk'

export default function Header() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const { avatar_url, email, user_name } = user?.user_metadata || {}
  async function signOut() {
    dispatch(logout())
  }

  return (
    <>
      <div className="header__sign-out">
        <LogOutBtn action={signOut} />
      </div>
      <div className="header">
        <div className="header__credentials">
          <div className="header__image">
            <img src={avatar_url} alt="" className="header__image__src" />
          </div>
          <div className="header__credentials__block">
            <p className="header__credentials__block__title">{user_name}</p>
            <p className="header__credentials__block__sub-title">{email}</p>
          </div>
        </div>
      </div>
    </>
  )
}
