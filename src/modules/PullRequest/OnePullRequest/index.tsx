import * as dayjs from 'dayjs'
import MergeIcon from '../../shared/assets/icons/merge'
import rejected from '../../shared/assets/images/rejected.png'
import verified from '../../shared/assets/images/verifie.png'
import '../OnePullRequest/index.scss'

interface OnePullRequestProps {
  pull: {
    base: { ref: string }
    head: { ref: string }
    created_at: string
    state: string
    updated_at: string
    user: {
      avatar_url: string
    }
    locked: boolean
  }
}
export default function OnePullRequest({ pull }: OnePullRequestProps) {
  return (
    <div className="OnePullRequest-container">
      <div className="OnePullRequest-container__left-part">
        <p className="OnePullRequest-container__left-part__title">
          Merge branch {pull?.head.ref} into {pull?.base.ref} <MergeIcon />{' '}
        </p>
        <p className="OnePullRequest-container__left-part__date">
          {' '}
          Created At: {dayjs(pull.created_at).format('YYYY-MM-DD')}{' '}
        </p>
      </div>
      <div className="OnePullRequest-container__right-part">
        <div className="OnePullRequest-container__right-part__icons">
          <img
            className="OnePullRequest-container__right-part__icons__avatar"
            src={pull?.user.avatar_url}
          />
          <div className="OnePullRequest-container__right-part__icons__isverified">
            <p
              className={`OnePullRequest-container__right-part__icons__isverified__state${
                !pull?.locked ? '__open' : '__closed'
              }`}
            >
              {pull?.state}{' '}
            </p>
            <img
              className="OnePullRequest-container__right-part__icons__isverified__icon"
              src={!pull.locked ? verified : rejected}
            />
          </div>
        </div>
        <div className="OnePullRequest-container__right-part__date">
          <p className="OnePullRequest-container__right-part__date__content">
            Updated At: {dayjs(pull.updated_at).format('YYYY-MM-DD/HH:mm')}
          </p>
        </div>
      </div>
    </div>
  )
}
