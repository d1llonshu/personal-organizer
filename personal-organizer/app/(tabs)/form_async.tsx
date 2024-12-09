import React, { useState } from 'react';
import { Button } from 'react-native'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

enum GenderEnum {
    female = "female",
    male = "male",
    other = "other"
}

interface IFormInput {
    firstName: string;
    gender: GenderEnum;
    // morning_brush_checkbox: boolean;
}

type CheckBoxActivities = {
    morning_brush: boolean;
    night_brush: boolean;
}

export default function App() {
    const { control, register, handleSubmit } = useForm<IFormInput>(
        
    );

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        try {
            await AsyncStorage.setItem(data.firstName, data.gender);
            } catch (e) {
            // saving error
        }
        alert(JSON.stringify(data));

      };
    

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
        {/* <label>Morning Brush</label>
            <Controller
                name="morning_brush_checkbox"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                    <button
                        type="button"
                        onClick={() => field.onChange(!field.value)}
                        style={{
                            backgroundColor: field.value ? 'green' : 'red',
                            color: 'white',
                            padding: '10px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Morning Brush: {field.value ? 'Yes' : 'No'}
                    </button>
                )}
            /> */}
        
        <input type="submit" />
        </form>
    );
}
