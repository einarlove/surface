import React, { PropTypes } from 'react'
import IconSVG from 'svg-inline-loader/lib/component'
const icons = require.context('../../../assets/icons', false)
import styles from 'styles/Card'

const Action = ({action, classNames = {}}) => {
  return (
    <div className={classNames.action || styles.action}>
      {action.icon &&
        <IconSVG src={icons(action.icon)} className={classNames.actionIcon || styles.actionIcon} />
      }
      <div className={classNames.actionLabel || styles.actionLabel}>{action.label}</div>
    </div>
  )
}

Action.propTypes = {
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }),
  classNames: PropTypes.object.isRequired,
}

export default Action
