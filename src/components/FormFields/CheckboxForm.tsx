import * as React from 'react'
import {
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'

export const CheckboxForm = ({ color, id, input, name, label }) => (
  <>
    <FormControlLabel
      control={
        <Checkbox
          id={id}
          name={name}
          checked={Boolean(input.value)}
          onChange={input.onChange}
          color={color}/>
      }
          label={label}
    />
  </>
)
