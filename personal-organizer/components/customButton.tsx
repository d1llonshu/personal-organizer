import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { styles } from '@/constants/stylesheet'

export const CustomButton = ({ onPress, title, color}: { onPress: () => void; title: string, color: string}) => (
    <View style = {styles.buttonContainer}>
        <Pressable
            android_ripple={{color : 'white'}}
            onPress={onPress}
            style={({pressed}) => [
                {
                    backgroundColor: color,
                    padding: 5,
                    borderRadius: 4,
                },
            ]}>
            <Text style={styles.buttonTitle}>{title}</Text>
        </Pressable>
    </View>
    
);
