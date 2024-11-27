import React, { useState } from 'react';
import { Button } from 'react-native'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CheckBox from '@react-native-community/checkbox';

enum GenderEnum {
    female = "female",
    male = "male",
    other = "other"
}

interface IFormInput {
    firstName: String;
    gender: GenderEnum;
    morning_brush_checkbox: boolean;
}

type CheckBoxActivities = {
    morning_brush: boolean;
    night_brush: boolean;
}

export default function App() {
    const { control, register, handleSubmit } = useForm<IFormInput>(

    );

    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

    const [checkboxStates, setCheckboxStates] = useState<CheckBoxActivities>({
        morning_brush: false,
        night_brush: false
    });

    const handleCheckboxes = (name: keyof CheckBoxActivities, value: boolean) => {
        setCheckboxStates(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input {...register("firstName")} />
        <label>Gender Selection</label>
        <select {...register("gender")} >
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
        </select>
        <label>Morning Brush</label>
        <Controller
            name = "morning_brush_checkbox"
            control = {control}
            render = {({field}) => 
                // <CheckBox
                // {...field}
                // disabled={false}
                // value={checkboxStates.morning_brush}
                // onValueChange={(newValue) => handleCheckboxes('morning_brush', newValue)}
                
                // />
                <Button
                    onClick={() => field.onChange(!field.value)}
                    style={{
                        backgroundColor: field.value ? 'green' : 'red',
                        color: 'white',
                        padding: '10px',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                />
                }>
        </Controller>
        
        <input type="submit" />
        </form>
    );
}
