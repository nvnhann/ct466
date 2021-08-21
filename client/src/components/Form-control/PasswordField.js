import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Controller} from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {FormHelperText} from '@material-ui/core';

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    lable: PropTypes.string,
    disabled: PropTypes.bool,
}

export default function PasswordField(props) {
    const {form, name, lable, disabled} = props;
    const {errors} = form;
    const hasError = errors[name];
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(x => !x);
    }

    // console.log(errors[name])
    return (
        <>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel htmlFor="outlined-adornment-password">{lable}</InputLabel>
                <Controller
                    name={name}
                    control={form.control}
                    as={OutlinedInput}
                    type={showPassword ? 'text' : 'password'}
                    label={lable}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={toggleShowPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    disabled={disabled}
                    error={!!hasError}
                />
                <FormHelperText error={!!hasError}>
                    {errors[name]?.message}
                </FormHelperText>
            </FormControl>
        </>
    )
}