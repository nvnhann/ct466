import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField'
import {Controller} from 'react-hook-form';


InputFilled.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    lable: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    rows: PropTypes.number
}

export default function InputFilled(props) {
    const {form, name, lable, disabled, fullWidth, rows} = props;
    const {errors} = form;
    const hasError = errors[name];
    // console.log(errors[name])
    return (
        <Controller
            variant="filled"
            margin="normal"
            name={name}
            control={form.control}
            as={TextField}
            fullWidth={fullWidth}
            label={lable}
            disabled={disabled}
            error={!!hasError}
            helperText={errors[name]?.message}
            rows={rows}
        />
    )
}