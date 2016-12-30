import React from 'react'
import { InputGroup, FormControl, DropdownButton } from 'react-bootstrap'
import DatePicker from 'react-bootstrap-date-picker'
import { generateId } from "../utils"

const formControlComponent = ({ input, meta, ...rest }) => {
    // for some reason value has to be left out
    const { value , ...others } = input
    return (
        <FormControl
            {...others}
            {...rest}
            />
    )
}

const dropdownButtonComponent = ({ input, meta, ...rest }) => (
    <DropdownButton
        id={generateId()}
        componentClass={InputGroup.Button}
        onSelect={input.onChange}
        {...rest}
        />
)

const datePickerComponent = ({ input, ...rest }) => (
    <DatePicker
        onChange={ (value, formattedValue) => input.onChange(formattedValue) }
        {...rest}
        />
)

export { formControlComponent, dropdownButtonComponent, datePickerComponent }
