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
        backgroundColor: '#121212',
    },
    container: {
      // flex: 1,
      // alignItems: 'flex-start',
      // justifyContent: 'center',
      backgroundColor: '#121212',
      shadowColor: 'white',
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
      padding: 5,
      marginRight: 16,
      height: 30,
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
    regularSubtitle: {
      paddingLeft: 6,
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
export const progressBarStyles = StyleSheet.create({
  progressBarSubtitle: {
    fontFamily: 'Roboto',
    color: '#E1D9D1',
  },
  progressBarTitle: {
    paddingLeft: 10,
    fontFamily: 'Roboto',
    color: '#E1D9D1',
    fontWeight: 'bold',
    fontSize: 15,
  },
  progressBarStyle: {
    backgroundColor: '#E0E0E0',
    height: 18,
    borderRadius: 64,
    marginHorizontal: 10,
    marginBottom: 5,
    flex: 0.6,
  },
  progressBarfillStyle: {
    borderRadius: 64,
  },
});
export const dropdownStyles = StyleSheet.create({
    dropdown: {
      marginBottom: 5,
      marginTop: 5,
      height: 30,
      backgroundColor: 'white',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      flex: 1
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      marginLeft: 5,
      flex: 1,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 14,
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    dropdownRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      marginLeft: 2,
      textAlign: 'right',
      alignItems: 'flex-end',
      fontSize: 14,
      flex: 0.25,
      color: '#E1D9D1',
      marginRight: 10,
      fontWeight: 'bold',
    },
    dropdownSmall: {
      marginBottom: 5,
      marginTop: 5,
      height: 30,
      backgroundColor: 'white',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      flex: 0.33
    },
    dropdownTextInput: {
      flex: 0.6,
      marginVertical: 5,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#E1D9D1',
      color: '#E1D9D1',
      borderRadius: 5,
      padding: 5,
      marginRight: 10,
      height: 30,
    },
  });
