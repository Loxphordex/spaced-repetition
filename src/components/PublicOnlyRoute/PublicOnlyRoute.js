import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'

export default function PublicOnlyRoute({ component, ...props }) {
  const Component = component
  const setOnLanding = props.setOnLanding
  return (
    <Route
      {...props}
      render={componentProps => (
        <UserContext.Consumer>
          {userContext =>
            !!userContext.user.id
              ? <Redirect to={'/'} />
              : <Component {...componentProps} setOnLanding={setOnLanding} />
          }
        </UserContext.Consumer>
      )}
    />
  )
}
