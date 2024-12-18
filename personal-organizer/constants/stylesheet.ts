import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#eaeaea',
    },
    keys: {
      fontSize: 14,
      color: 'grey',
    },
    title: {
      fontSize: 18,
      color: 'black',
      marginRight: 10,
      fontWeight: 'bold'
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    buttonRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    textInput: {
      flex: 0.8,
      marginVertical: 6,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'black',
      borderRadius: 5,
      paddingLeft: 5
    },
    buttonContainer: {
        paddingHorizontal: 2,
        paddingVertical: 2,
    },
    buttonTitle: {
        textAlign: 'center',
        color: 'white'
    },
    textInputTitle:{
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        flex:0.2
    }
  });
