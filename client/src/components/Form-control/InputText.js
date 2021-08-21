import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField'
import {Controller} from 'react-hook-form';


InputText.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    lable: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    rows: PropTypes.number
}

export default function InputText(props) {
    const {form, name, lable, disabled, fullWidth, rows} = props;
    const {errors} = form;
    const hasError = errors[name];
    // console.log(errors[name])
    return (
        <Controller
            variant="outlined"
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