import React from 'react'
import styles from 'styles/Card'

export Cover from './Cover'
export Action from './Action'

export const Title = ({className, children}) => {
  return <h1 className={className || styles.title}>{children}</h1>
}

export const Description = ({className, paragraphClassName, children}) => (
  <div className={className || styles.description}>
    {children.split('\n').map((paragraph, key) => {
      return (
        <p className={paragraphClassName || styles.paragraph} key={key}>
          {paragraph}
        </p>
      )
    })}
  </div>
)

