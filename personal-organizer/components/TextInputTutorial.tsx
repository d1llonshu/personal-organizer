import React from 'react';
import { 
    View, 
    TextInput as RNTextInput, 
    TextInputProps as RNTextInputProps, 
    Text, 
    StyleSheet } from 'react-native';

/* IMPORT HOOKS AND PROPS TYPES */
import { 
    useController, 
    useFormContext, 
    ControllerProps, 
    UseControllerProps 
} from 'react-hook-form';

/* EXTENDING PROPS TYPES TO INHERIT NAME AND RULES FROM USECONTROLLERPROPS */
interface TextInputProps extends RNTextInputProps, UseControllerProps {
  label: string
  defaultValue?: string //ADD DEFAULT VALUE TO PROPS
}

const ControlledInput = (props: TextInputProps) => {
  
    const formContext = useFormContext();
    const { formState } = formContext;
  
    const {
    name,
    label,
    rules,
    defaultValue,
    ...inputProps
  } = props;
  
    const { field } = useController({ name, rules, defaultValue });
  
    return (
  
    <View >
        {label && (<Text >{label}</Text>)}
          <View >
          <RNTextInput
            {...inputProps}
          />
        </View>
      </View>
  
    );
  }
export const TextInput = (props: TextInputProps) => {
    const { name } = props;

const formContext = useFormContext();

if (!formContext || !name) {
  const msg = !formContext ? "TextInput must be wrapped by the FormProvider" : "Name must be defined"
    console.error(msg)
  return null
}

return <ControlledInput {...props} />;

};

