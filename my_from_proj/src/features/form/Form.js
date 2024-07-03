// src/features/form/Form.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setPassword, setDob, setDropdown } from './formSlice';

const Form = () => {
    const dispatch = useDispatch();
    const form = useSelector((state) => state.form);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                //TODO handle validation and store to update validation error
                dispatch(setUsername(value));
                break;
            case 'password':
                dispatch(setPassword(value));
                break;
            case 'dob':
                dispatch(setDob(value));
                break;
            case 'dropdown':
                dispatch(setDropdown(value));
                break;
            default:
                break;
        }
    };

    return (
        <form>
            <div>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Date of Birth:
                    <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Dropdown:
                    <select
                        name="dropdown"
                        value={form.dropdown}
                        onChange={handleInputChange}
                    >
                        <option value="">Select an option</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </label>
            </div>
        </form>
    );
};

export default Form;
