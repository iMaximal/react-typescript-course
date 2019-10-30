import * as React from 'react'
import { Trans } from 'react-i18next'

export const required = (value) => (value ? undefined : <Trans>validators.required</Trans>)

export const maxLength = (max) => (value) =>
  value && value.length > max ? (
    <Trans i18nKey="validators.maxLength" defaults="Must be {{max}} characters or less" values={{ max }} />
  ) : (
    undefined
  )

export const minLength = (min) => (value) =>
  value && value.length < min ? (
    <Trans i18nKey="validators.minLength" defaults="Must be {{min}} characters or more" values={{ min }} />
  ) : (
    undefined
  )

export const onlyNumber = (value) => (value && isNaN(Number(value)) ? <Trans>validators.number</Trans> : undefined)

export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+$/i.test(value) ? <Trans>validators.email</Trans> : undefined

export const alphaNumeric = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? <Trans>validators.alphaNumeric</Trans> : undefined

export const phoneNumber = (value) =>
  value && !/^\+?([0-9 -.])*$/i.test(value) ? <Trans>validators.phoneNumber</Trans> : undefined

export const password = (value) =>
  value && !/^(?=.*\d).{8,}$/.test(value) ? <Trans>validators.password</Trans> : undefined

export const confirmPassword = (value: string, allValues: any) =>
  allValues.password !== value ? <Trans>validators.confirmPassword</Trans> : undefined
