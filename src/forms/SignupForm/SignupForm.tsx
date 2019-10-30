import * as React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import * as style from './style.styl'
import { ISignupRequest } from '@src/interfaces'
import { confirmPassword, email, maxLength, minLength, password, required } from '@src/forms'
import { TextForm } from '@components/FormFields'
import { url } from '@src/helpers/constants'
import { Link } from 'react-router-dom'
import FormError from '@components/FormError'

export interface TSignupFormOwnProps {
  isSubmitting: boolean
}

type TSignupFormProps = TSignupFormOwnProps & InjectedFormProps<ISignupRequest, TSignupFormOwnProps>

const minUserNameLength = minLength(3)
const maxUserNameLength = maxLength(300)
const maxEmailLength = maxLength(320)
const maxPasswordLength = maxLength(1000)

const SignupForm: React.FC<TSignupFormProps> = (props) => {
  const { error, isSubmitting, handleSubmit, pristine, invalid } = props

  const { t } = useTranslation()

  return (
    <>
      <div className={style.twoColumn}>
        <form onSubmit={handleSubmit} className={style.fieldsContainer}>
          <h1>{t('signup.title')}</h1>
          <p className="silent-text">{t('signup.description')}</p>
          <Field
            id="username"
            name="username"
            label={t('labels.username')}
            component={TextForm}
            validate={[required, minUserNameLength, maxUserNameLength]}
            required
          />
          <Field
            id="email"
            name="email"
            label={t('labels.email')}
            component={TextForm}
            validate={[required, email, maxEmailLength]}
            required
          />
          <Field
            id="password"
            name="password"
            label={t('labels.password')}
            type="password"
            component={TextForm}
            validate={[required, password, maxPasswordLength]}
            required
          />
          <Field
            id="confirmPassword"
            name="confirmPassword"
            label={t('labels.confirmPassword')}
            type="password"
            component={TextForm}
            validate={[required, confirmPassword]}
            required
          />

          <FormError id="signUpFormError" text={error} />

          <Button
            variant="contained"
            color="primary"
            aria-label="Sign Up"
            type="submit"
            disabled={pristine || isSubmitting || invalid}
          >
            {t('buttons.signup')}
          </Button>
        </form>
        <div className={style.login}>
          <h2>{t('signup.login')}</h2>
          <p>{t('signup.loginDescription')}</p>
          <Link to={url.login}>
            <Button variant="contained" color="secondary" aria-label="Login" type="submit">
              {t('buttons.login')}
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default reduxForm<ISignupRequest, TSignupFormOwnProps>({
  form: url.register,
})(React.memo(SignupForm))
