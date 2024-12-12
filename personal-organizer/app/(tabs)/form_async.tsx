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

enum BrushEnum {
    yes = "yes",
    no = "no"
}

interface IFormInput {
    testKeyName: string;
    bikingDuration: number;
    brushTest: BrushEnum
    // morning_brush_checkbox: boolean;
}

type CheckBoxActivities = {
    morning_brush: boolean;
    night_brush: boolean;
}

export default function App() {
    const { control, register, handleSubmit } = useForm<IFormInput>(
        
    );
    const today = new Date(1);
    const dateFormat: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const onSubmit: SubmitHandler<IFormInput> = async data => {
        try {
            await AsyncStorage.setItem(today.toLocaleDateString(undefined, dateFormat), JSON.stringify(data));
        } 
        catch (e) {
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
        <label>Key Name</label>
        <input {...register("testKeyName")} />

        <label>Biking Duration</label>
        <input {...register("bikingDuration")} />

        <label>Brushed?</label>
        <select {...register("brushTest")} >
            <option value="yes">yes</option>
            <option value="no">no</option>
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
