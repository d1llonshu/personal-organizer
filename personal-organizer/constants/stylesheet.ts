import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    homescreenTitle: {
        fontSize: 30,
        color: '#E1D9D1',
        marginVertical: 5,
        fontWeight: 'bold',
        marginLeft: 10,
        
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
      fontSize: 20,
      color: '#E1D9D1',
      marginVertical: 8,
      fontWeight: 'bold',
    },
    homeScreenRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      textAlign: 'center',
      
    },
    homeScreenSurface: {
      backgroundColor: '#212121',
      marginHorizontal: 8,
      marginBottom: 8,
      paddingBottom: 8,
    },
    habitPageSubtitle: {
      textAlign: 'left',
      fontSize: 18,
      color: '#E1D9D1',
      marginTop: 4,
      marginBottom: 4,
      marginLeft: 12,
      fontWeight: 'bold',
    },
    habitPageRegularText: {
      textAlign: 'left',
      fontSize: 18,
      color: '#E1D9D1',
      marginTop: 4,
      marginBottom: 4,
      marginLeft: 0,
    },
    habitPageRegularTextWithMargin: {
      textAlign: 'left',
      fontSize: 18,
      color: '#E1D9D1',
      marginBottom: 4,
      paddingLeft: 12,
    },
    dayPageSubtitle: {
      textAlign: 'left',
      fontSize: 18,
      color: '#E1D9D1',
      marginTop: 4,
      marginBottom: 4,
      marginLeft: 12,
      fontWeight: 'bold',
    },
    dayPageTitle: {
      textAlign: 'left',
      fontSize: 24,
      color: '#E1D9D1',
      marginTop: 4,
      marginBottom: 4,
      marginLeft: 0,
      fontWeight: 'bold',
    },
    dayPageRegularText: {
      textAlign: 'left',
      fontSize: 18,
      color: '#E1D9D1',
      marginTop: 4,
      marginBottom: 4,
      marginLeft: 0,
    },
    dayPageHyperlink: {
      textAlign: 'left',
      fontSize: 18,
      color: '#E1D9D1',
      marginTop: 4,
      marginBottom: 4,
      textDecorationLine:"underline",
    },
    dayPageContainer:{
      paddingLeft: 10,
      paddingVertical: 1,
    },
    reminderPageContainer:{
      paddingLeft: 10,
      paddingVertical: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    formContainer:{
      padding: 6,
    },
    formSaveButton:{
      padding: 4,
    },
    iconButton: {
      padding: 10,
      backgroundColor: '#FFA500',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    centeredRow: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
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
    borderRadius: 0,
    marginHorizontal: 10,
    marginBottom: 5,
    flex: 0.6,
    
  },
  progressBarfillStyle: {
    borderRadius: 0,
  },
});
export const reminderStyles = StyleSheet.create({ 
  reminderFormSubtitle: {
    flex: 0.25,
    textAlign: 'right',
    fontSize: 18,
    color: '#E1D9D1',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 12,
    fontWeight: 'bold',
  },
  reminderFormSubtitleMoreMargin: {
    flex: 0.25,
    textAlign: 'right',
    fontSize: 18,
    color: '#E1D9D1',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 28,
    fontWeight: 'bold',
  },
  reminderFormRegularText: {
    flex: 0.6,
    textAlign: 'left',
    fontSize: 16,
    color: '#E1D9D1',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 14,
  },
  reminderRow:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  textInput: {
    flex: 0.7,
    marginVertical: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E1D9D1',
    color: '#E1D9D1',
    borderRadius: 5,
    paddingVertical: 5,
    marginRight: 2,
    marginLeft: 6,
    height: 30,
  },
  dropdown:{
    marginLeft: 4,
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
    flex: 0.7,
  },
  AMPMDropdown: {
    marginLeft: 4,
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
    flex: 0.15,
  },
  timeInput: {
    flex: 0.15,
    marginVertical: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E1D9D1',
    color: '#E1D9D1',
    borderRadius: 5,
    paddingVertical: 5,
    marginHorizontal: 6,
    height: 30,
  },
  colon:{
    textAlign: 'left',
    fontSize: 24,
    color: '#E1D9D1',
    marginTop: 4,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  reminderOverviewHyperlink: {
    textAlign: 'left',
    fontSize: 18,
    color: '#E1D9D1',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 6,
    textDecorationLine:"underline",
    flex: 0.3,
  },
  overviewInfo:{
    textAlign: 'right',
    fontSize: 18,
    color: '#E1D9D1',
    flex: 1,
    marginRight: 6,
  }
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
      flexWrap: 'wrap',
      alignItems: 'center',
      marginRight: 16,
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
    titleWithEvenLessMargin: {
      marginLeft: -26,
      textAlign: 'right',
      alignItems: 'flex-end',
      fontSize: 14,
      flex: 0.25,
      color: '#E1D9D1',
      marginRight: 10,
      fontWeight: 'bold',
    },
    titleWithLessMargin: {
      marginLeft: -14,
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


export const buttonColorFalse = "#CF6679";
export const buttonColorTrue = "#4f7942";
export const backgroundColor = '#121212';
export const surfaceBackgroundColor = '#212121';
export const textColor = '#E1D9D1';

export const calendarTheme = {
  calendarBackground: surfaceBackgroundColor,
  textSectionTitleColor: textColor,
  // textSectionTitleDisabledColor: 'pink',
  dayTextColor: textColor,
  todayTextColor: textColor,
  selectedDayTextColor: textColor,
  monthTextColor: textColor,
  indicatorColor: textColor,
  selectedDayBackgroundColor: '#333248',
  arrowColor: textColor,
  textDisabledColor: 'gray',
  stylesheet: {
    calendar: {
      header: {
        week: {
          marginTop: 30,
          marginHorizontal: 12,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }
      }
    }
  }
}