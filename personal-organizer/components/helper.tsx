import { FormData, Submissions } from '@/constants/FormData';
import { Habit } from "@/constants/habit"


// Important: Assumes it takes in consecutive keys
// number[] returns at index:
// 0: sum
// 1: streak length (starting from first entry); 
//    Note: streak length for weekly tasks will only work if the number of submission keys is 7
export function calculateStatsForPeriod(habits: Habit[], submissions: Submissions, keys: string[]) : {[key: string] : number[]}{
    let ret : {[key: string] : number[]} = {};
    habits.forEach((h) => {
        ret[h.keyName] = Array<number>(2).fill(0);
    });
    let reqForStreak = 0;
    keys.forEach((key)=>{
        //if the submission exists
        if(submissions[key]){
            habits.forEach((h) => {
                let val = habitValueAsInt(h.keyName, submissions[key], h.dataType);
                // increment sum
                ret[h.keyName][0] = ret[h.keyName][0] + val; 
                if(h.dataType == "number"){
                    if(val >= Number(h.goal) && ret[h.keyName][1] == reqForStreak && h.timeframe != "Weekly"){
                        ret[h.keyName][1]++;
                    }
                }
                else if (h.dataType == "boolean"){
                    // if positive, hasn't missed any days, and isn't a weekly target increment streak
                    if(val > 0 && ret[h.keyName][1] == reqForStreak && h.timeframe != "Weekly"){
                        ret[h.keyName][1]++;
                    }
                }
                
                
            });
        }
        reqForStreak++;
    })

    //if provided a one week long set of keys, increment weekly streaks if the weekly sum is greater than goal
    if(keys.length === 7){
        habits.forEach((h) => {
            if (h.timeframe === "Weekly"){
                if(ret[h.keyName][0] >= Number(h.goal)){
                    ret[h.keyName][1]++;
                }
            }
        });
    }

    return ret;
}

// Returns habit value as int, such that boolean true = 1 and false = 0. 
// Inputs:
// habit - habit.keyName, assumes valid for submission
// submission - formData for a given day
// dtype - valid habit datatype (currently "boolean" or "number")
// Output:
// a number correpsonding to habit data for given day such that boolean true = 1 and false = 0
export function habitValueAsInt(habit: string, submission: FormData, dtype: string) : number {
    if(dtype === "boolean"){
        switch(submission[habit]){
            case true:
                return 1;
            case false:
                return 0;
            case undefined:
                return 0;
        }
    } 
    if (dtype === "number"){
        switch(submission[habit]){
            case undefined:
                return 0;
            default: 
                return Number(submission[habit]);
        }
    }
    
    return 0;//replace w/ throw error?
}

export function generateDifferentDaysKey(key:string, daysBeforeProvidedKey:number){
    let newTime = new Date(key).getTime() - 86400000*daysBeforeProvidedKey;
    let newDate = new Date(newTime);
    // console.log(newDate)
    // console.log(newDate.getUTCDate());
    return(String(newDate.getUTCFullYear()) + "-" + String(newDate.getUTCMonth()+1) + "-" + String(newDate.getUTCDate()));
}

// starts from key provided then goes back x days
// arr[0] = key provided
export function generateConsecutiveKeys(key:string, days:number){
    let arr = [];
    let count = 0;

    while(count < days){
        arr.push(generateDifferentDaysKey(key, count));
        count = count + 1;
    }

    return arr
}