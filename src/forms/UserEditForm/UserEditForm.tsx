import * as React from 'react'
import { connect } from 'react-redux'
import { Field, InjectedFormProps, FormSection, reduxForm, getFormValues } from 'redux-form'
import { Button } from '@material-ui/core'
import { Edit as EditIcon } from '@material-ui/icons'
import { withTranslation, WithTranslation } from 'react-i18next'

import * as style from './style.styl'
import { IRootState, IUserModel, IUserState } from '@src/interfaces'
import { email, maxLength, minLength, required } from '@src/forms'
import { CheckboxForm, SelectForm, TextForm } from '@components/FormFields'
import Can from '@components/Can/Can'
import FormError from '@components/FormError'
import { rules } from '@src/rbac-rules'
import { defaultColors, url } from '@src/helpers/constants'
import { updateColors } from '@src/helpers/updateColors'

const rolesOptions = Object.keys(rules).map((role) => ({
  value: role,
  label: role,
}))

export interface IEditUserFormProps extends IMapStateToProps {
  isSubmitting: boolean
}

interface IState {
  isViewMode: boolean
}

type TEditUserFormProps = IEditUserFormProps & InjectedFormProps<IUserModel, IEditUserFormProps> & WithTranslation

class UserEditForm extends React.Component<TEditUserFormProps, IState> {
  minUserNameLength = minLength(3)
  maxUserNameLength = maxLength(300)
  maxEmailLength = maxLength(320)

  statusOptions = [
    { value: 0, label: this.props.t('labels.deactivated') },
    { value: 1, label: this.props.t('labels.active') },
  ]

  state = {
    isViewMode: true,
  }

  componentWillUnmount(): void {
    const oldColors = this.props.user.colors || defaultColors
    updateColors(oldColors)
  }

  changeViewMode = () => {
    this.setState((prevState) => ({
      isViewMode: !prevState.isViewMode,
    }))
  }

  restoreColors = () => {
    this.props.change('colors', defaultColors)
  }

  renderEditControl = () => {
    return (
      <div className={style.editControl}>
        <button aria-label={this.props.t('buttons.toggleEditMode')} tabIndex={0} onClick={this.changeViewMode}>
          <EditIcon />
        </button>
      </div>
    )
  }

  applyColors = () => {
    updateColors(this.props.formValues.colors)
  }

  handleChangeColor = (event) => {
    const { name, value } = event.target
    document.documentElement.style.setProperty(`--${name.replace('colors.', '')}`, value)
  }

  resetForm = () => {
    const { initialValues, reset } = this.props
    reset()

    updateColors(initialValues.colors)
  }

  renderColorPickers = () => {
    const { initialValues, t } = this.props

    if (!initialValues || !initialValues.colors) return null

    return Object.keys(initialValues.colors).map((color) => (
      <div key={color} className={style.colorContainer}>
        <Field
          name={color}
          component="input"
          type="color"
          disabled={this.state.isViewMode}
          className={style.colorPicker}
          onChange={this.handleChangeColor}
          onKeyUp={this.handleChangeColor}
        />
        <label className={style.label}>{t(`labels.${color}`)}</label>
      </div>
    ))
  }

  render() {
    const {
      error,
      isSubmitting,
      handleSubmit,
      pristine,
      invalid,
      t,
      user: { userId, role },
      initialValues,
    } = this.props
    const { isViewMode } = this.state

    return (
      <>
        <Can
          perform="users:edit"
          data={{ userId, openedUserId: initialValues.userId }}
          yes={() => this.renderEditControl()}
          no={() => null}
        />
        <form className={style.twoColumn} onSubmit={handleSubmit}>
          <div className={style.fieldsContainer}>
            <Field
              id="userId"
              name="userId"
              label={t('labels.userId')}
              component={TextForm}
              validate={[required]}
              disabled
              required
            />
            <Field
              id="username"
              name="username"
              label={t('labels.username')}
              component={TextForm}
              validate={[required, this.minUserNameLength, this.maxUserNameLength]}
              required
              disabled={isViewMode}
            />
            <Field
              id="email"
              name="email"
              label={t('labels.email')}
              component={TextForm}
              validate={[required, email, this.maxEmailLength]}
              required
              disabled={isViewMode}
            />
            <Field
              id="role"
              name="role"
              label={t('labels.role')}
              component={SelectForm}
              validate={[required]}
              options={rolesOptions}
              required
              disabled={isViewMode || role !== 'admin'}
            />
            <Field
              id="status"
              name="status"
              label={t('labels.status')}
              component={SelectForm}
              validate={[required]}
              options={this.statusOptions}
              required
              disabled={isViewMode}
            />
          </div>

          <div className={style.fieldsContainer}>
            <FormSection name="colors">{this.renderColorPickers()}</FormSection>
          </div>

          {!isViewMode && (
            <div>
              <Field
                id="dropSession"
                name="dropSession"
                label={t('labels.dropSession')}
                component={CheckboxForm}
                color="secondary"
              />

              <FormError id="EditUserFormError" text={error} />

              <div className={style.controlButtons}>
                <Button
                  variant="contained"
                  color="secondary"
                  aria-label={t('buttons.reset')}
                  type="button"
                  onClick={this.resetForm}
                >
                  {t('buttons.reset')}
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  aria-label={t('buttons.restoreColors')}
                  type="button"
                  onClick={this.restoreColors}
                >
                  {t('buttons.restoreColors')}
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  aria-label={t('buttons.applyColors')}
                  type="button"
                  onClick={this.applyColors}
                >
                  {t('buttons.applyColors')}
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  aria-label={t('buttons.save')}
                  type="submit"
                  disabled={pristine || isSubmitting || invalid}
                >
                  {t('buttons.save')}
                </Button>
              </div>
            </div>
          )}
        </form>
      </>
    )
  }
}

interface IMapStateToProps {
  initialValues: IUserModel
  formValues: Partial<IUserModel>
  user: IUserState
}

const mapStateToProps = (state: IRootState, ownProps: TEditUserFormProps): IMapStateToProps => ({
  initialValues: ownProps.initialValues,
  formValues: getFormValues(url.userEdit)(state),
  user: state.user,
})

interface IOwnProps {
  initialValues: IUserModel
}

export default connect<IMapStateToProps, undefined, IOwnProps, IRootState>(mapStateToProps)(
  reduxForm<IUserModel, IEditUserFormProps>({
    form: url.userEdit,
    enableReinitialize: true,
  })(withTranslation()(UserEditForm)),
)
