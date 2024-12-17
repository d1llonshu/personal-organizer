import { storage } from "@/constants/storage"
import { formData } from "@/constants/formData"
import { MMKV, useMMKVObject} from 'react-native-mmkv';
import { streakData } from "@/constants/streaks";

export default function updateStreaks(){
    let today = new Date();
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

    //get data for today
    const [todaysEntry, setTodaysEntry] = useMMKVObject<formData>(todaysKey);
    let props = Object.getOwnPropertyNames(todaysEntry);
    props = props.splice(1, props.length); //removes the date prop

    //key format for streak data = formFieldStreak    
    props.map((prop) => {
        const [data, setData] = useMMKVObject<streakData>(prop+"Streak");
        let completedToday = todaysEntry ? todaysEntry[prop as keyof formData] : false;
        if(completedToday){
            if (typeof data == undefined){//if the streak doesn't exist
                let streak : streakData = {
                    name : prop,
                    currentStreak: 1,
                    longestStreak: 1,
                    mostRecentDate: today
                }
                setData(streak)
            }
            else{//data should not be undefined in this case
                let mostRecentDateAsKey = data!.mostRecentDate.getFullYear() + "/" + 
                                      (data!.mostRecentDate.getMonth()+1) + "/" + data!.mostRecentDate.getDate();
                if (mostRecentDateAsKey == yesterdaysKey){
                    let s : streakData = {
                        name : prop,
                        currentStreak: data!.currentStreak+1,
                        longestStreak: (data!.currentStreak+1 > data!.longestStreak) ? data!.currentStreak+1 : data!.longestStreak,
                        mostRecentDate: today
                    }
                    setData(s)
                }
                else if (mostRecentDateAsKey != todaysKey){
                    let streak : streakData = {
                        name : prop,
                        currentStreak: 1,
                        longestStreak: data!.longestStreak,
                        mostRecentDate: today
                    }
                }
            }
        }
        console.log("Name: " + data!.name +
                    "Current: " + data!.currentStreak + 
                    "Longest: " + data!.longestStreak + 
                    "Most Recent Date: " + data!.mostRecentDate.toDateString())
    })
    
}