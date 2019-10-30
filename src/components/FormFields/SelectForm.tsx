import * as React from 'react'
import { FormControl, FormHelperText, InputLabel, Select } from '@material-ui/core'

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  }

  return <FormHelperText>{touched && error}</FormHelperText>
}

export const SelectForm = ({ input, label, meta: { touched, error }, children, id, name, options, ...custom }) => {
  return (
    <FormControl error={touched && error}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        native
        {...input}
        {...custom}
        inputProps={{
          id,
          name,
        }}
        role="listbox"
      >
        {options.map((opt, i) => (
          <option aria-selected={input.value === opt.value} role="option" key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  )
}
