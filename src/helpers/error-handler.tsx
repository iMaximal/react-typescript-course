import * as React from 'react'
import { SubmissionError } from 'redux-form'
import { Trans } from 'react-i18next'
import { AxiosError } from 'axios'

export const handleSubmissionError = (error: AxiosError) => {
  if (!error.response) return

  const { data } = error.response

  // {
  //   errors: [
  //       {
  //         _error: 'Incorrect username or password', // -> error for a whole form
  //       },
  //       {
  //         path: 'username', // -> error for the target form's field
  //         message: 'Username must be unique',
  //       },
  //     ]
  // }

  if (data.errors && ((data.errors[0].message && data.errors[0].path) || data.errors[0]._error)) {
    const formErrors = {}

    // for form fields
    data.errors.map((e = { message: '', path: '' }) => {
      if (e.message && e.path) {
        formErrors[e.path] = <Trans>{`messages.${e.message}`}</Trans>
      }

      // global form error
      if (e._error) {
        formErrors['_error'] = <Trans defaults={e._error}>{`messages.${e._error}`}</Trans>
      }
    })

    throw new SubmissionError(formErrors)
  }

  throw error
}
