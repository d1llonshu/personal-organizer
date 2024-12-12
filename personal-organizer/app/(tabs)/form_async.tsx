import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert  } from 'react-native'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AsyncStorage } from 'react-native';

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
    brushTest: BrushEnum;
    testInput: string;
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
        <View>
            <Controller
                control={control}
                rules={{
                required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Test Key Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="testKeyName"
            />
            {/* {errors.firstName && <Text>This is required.</Text>} */}

            {/* <Controller
                control={control}
                rules={{
                maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    placeholder="Test Input"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType='numeric'
                />
                )}
                name="bikingDuration"
            /> */}

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            </View>
        // <form onSubmit={handleSubmit(onSubmit)}>
        // <label>Key Name</label>
        // <input {...register("testKeyName")} />

        // <label>Biking Duration</label>
        // <input {...register("bikingDuration")} />

        // <label>Brushed?</label>
        // <select {...register("brushTest")} >
        //     <option value="yes">yes</option>
        //     <option value="no">no</option>
        // </select>
        
        // <input type="submit" />
        // </form>
    );
}
