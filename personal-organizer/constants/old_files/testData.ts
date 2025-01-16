import { formData, formKeysMinusDate } from "./oldFormData"
import { streakData } from "../streaks"
import { storage } from "../storage"

function getKeysForDate(today:Date) : {todaysKey:string, yesterdaysKey:string}{
    let todaysKey : string = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();

    //create yesterday's key
    let yesterdaysKey : string = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + (today.getDate()-1);
    if (today.getDate() - 1 == 0){//if its the first of the month
        let daysInLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate()
        if (today.getMonth() == 0){//if its january
            yesterdaysKey = (today.getFullYear()-1) + "/" + (12) + "/" + (31);
        }
        else{//any other month
            yesterdaysKey = today.getFullYear() + "/" + (today.getMonth()) + "/" + (daysInLastMonth);
        }
    }
    return {todaysKey,yesterdaysKey}
}

export function populateStreaks(){
    const streakKeys = formKeysMinusDate

    const today = new Date()
    let yesterday = new Date()
    yesterday.setDate(today.getDate()-1)
    let {todaysKey, yesterdaysKey} = getKeysForDate(today)

    let streakData = streakKeys.map((key) => {
        let streakValue : streakData = {
            name : key,
            currentStreak: 1,
            longestStreak: 1,
            mostRecentDate: yesterdaysKey
        }
        return streakValue
    })
    storage.set('streaks', JSON.stringify(streakData))
}
export function populateFormData(){
    let today = new Date();
    let keyTemplate : string = today.getFullYear() + "/" + (today.getMonth() + 1) + "/";
    let currentMonthKeys = new Array(today.getDate()).fill(null).map((_, i) => keyTemplate + (i + 1).toString());

}