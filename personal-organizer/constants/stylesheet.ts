import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    homescreenTitle: {
        fontSize: 26,
        color: '#E1D9D1',
        marginRight: 10,
        fontWeight: 'bold',
        marginLeft: 3,
        
    },
    safeAreaContainer: {
        flex: 1,
        marginTop: 25,
    },
    container: {
      // flex: 1,
      // alignItems: 'flex-start',
      // justifyContent: 'center',
      backgroundColor: '#121212',
    },
    title: {
      fontSize: 18,
      color: '#E1D9D1',
      marginRight: 10,
      fontWeight: 'bold',
      marginLeft: 3,
      marginTop: 3,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    textInput: {
      flex: 0.8,
      marginVertical: 6,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#E1D9D1',
      color: '#E1D9D1',
      borderRadius: 5,
      paddingLeft: 5
    },
    textInputTitle:{
        fontSize: 14,
        color: '#E1D9D1',
        fontWeight: 'bold',
        textAlign: 'center',
        flex:0.2,
    },
    buttonRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginLeft: 5,
    },
    buttonContainer: {
        paddingHorizontal: 2,
        paddingVertical: 2,
    },
    buttonTitle: {
        textAlign: 'center',
        color: '#E1D9D1',
    },
    streakFire: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginLeft: -7.5,
    },
    regularText: {
        marginLeft: 3,
        fontFamily: 'Roboto',
        color: '#E1D9D1',
    },
    homeScreenSubtitle: {
      textAlign: 'center',
      fontSize: 18,
      color: '#E1D9D1',
      marginRight: 10,
      fontWeight: 'bold',
    },
    homeScreenRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      textAlign: 'center',
      
    },

  });
