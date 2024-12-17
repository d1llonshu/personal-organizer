import { formData, formKeys } from "./formData"
import { streakData } from "./streaks"
import { storage } from "./storage"

export function populateStreaks(){
    const streakKeys = formKeys.map((key) => {
        return key+"Streak"
    })
    const today = new Date()

    streakKeys.map((key) => {
        let streakValue : streakData = {
            name : key,
            currentStreak: 1,
            longestStreak: 1,
            mostRecentDate: today
        }
        storage.set(key, JSON.stringify(streakValue))
    })
}
export function populateFormData(){
    let today = new Date();
    let keyTemplate : string = today.getFullYear() + "/" + (today.getMonth() + 1) + "/";
    let currentMonthKeys = new Array(today.getDate()).fill(null).map((_, i) => keyTemplate + (i + 1).toString());

}