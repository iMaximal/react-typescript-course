import * as React from 'react'
import { Link } from 'react-router-dom'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import * as style from './style.styl'
import { ILoginRequest } from '@src/interfaces'
import { required } from '@src/forms'
import { TextForm } from '@components/FormFields'
import { url } from '@src/helpers/constants'
import FormError from '@components/FormError'

export interface TLoginFormOwnProps {
  isSubmitting: boolean
}

type TLoginFormProps = TLoginFormOwnProps & InjectedFormProps<ILoginRequest, TLoginFormOwnProps>

const LoginForm: React.FC<TLoginFormProps> = (props) => {
  const { error, isSubmitting, handleSubmit, pristine, invalid } = props

  const { t } = useTranslation()

  return (
    <div className={style.twoColumn}>
      <form onSubmit={handleSubmit} className={style.fieldsContainer}>
        <h1>{t('login.title')}</h1>
        <p className="silent-text">{t('login.description')}</p>
        <Field
          id="username"
          name="username"
          label={t('labels.username')}
          component={TextForm}
          validate={[required]}
          required
        />
        <Field
          id="password"
          name="password"
          label={t('labels.password')}
          type="password"
          component={TextForm}
          validate={[required]}
          required
        />

        <FormError id="loginFormError" text={error} />

        <Button
          variant="contained"
          color="primary"
          aria-label="Log In"
          type="submit"
          disabled={pristine || isSubmitting || invalid}
        >
          {t('buttons.login')}
        </Button>
      </form>
      <div className={style.signUp}>
        <h2>{t('login.signup')}</h2>
        <p>{t('login.signupDescription')}</p>
        <Link to={url.register}>
          <Button variant="contained" color="secondary" aria-label="Register" type="submit">
            {t('buttons.registerNow')}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default reduxForm<ILoginRequest, TLoginFormOwnProps>({
  form: url.login,
})(LoginForm)
