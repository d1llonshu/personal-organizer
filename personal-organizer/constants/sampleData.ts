export let sampleHabits = 
[
{"category": "Fitness", "dataType": "number", "goal": "200", "habitID": "0", "prettyPrint": "weeklyNumMiss", "timeframe": "Weekly", "history": [{"startDate": "2024-12-29", "endDate":"", "goal":"200", "timeframe":"Weekly"}]}, 
{"category": "Fitness", "dataType": "number", "goal": "15", "habitID": "1", "prettyPrint": "weeklyNumHit", "timeframe": "Weekly", "history": [{"startDate": "2024-12-29", "endDate":"", "goal":"15", "timeframe":"Weekly"}]},
{"category": "Personal Care", "dataType": "boolean", "goal": "4", "habitID": "2", "prettyPrint": "weeklyBoolHit", "timeframe": "Weekly", "history": [{"startDate": "2024-12-29", "endDate":"", "goal":"4", "timeframe":"Weekly"}]},
{"category": "Personal Care", "dataType": "boolean", "goal": "7", "habitID": "3", "prettyPrint": "weeklyBoolMiss", "timeframe": "Weekly", "history": [{"startDate": "2024-12-29", "endDate":"", "goal":"7", "timeframe":"Weekly"}]},
{"category": "Productivity", "dataType": "number", "goal": "20", "habitID": "4", "prettyPrint": "dailyNumMiss", "timeframe": "Daily", "history": [{"startDate": "2024-12-29", "endDate":"", "goal":"20", "timeframe":"Daily"}]}, 
{"category": "Productivity", "dataType": "number", "goal": "5", "habitID": "5", "prettyPrint": "dailyNumHit", "timeframe": "Daily", "history": [{"startDate": "2024-12-29", "endDate":"", "goal":"5", "timeframe":"Daily"}]},
{"category": "Hobby", "dataType": "boolean", "goal": "1", "habitID": "6", "prettyPrint": "dailyBoolHit", "timeframe": "Daily", "history": [{"startDate": "2024-12-29", "endDate":"", "goal":"1", "timeframe":"Daily"}]},
{"category": "Hobby", "dataType": "boolean", "goal": "1", "habitID": "7", "prettyPrint": "dailyBoolMiss", "timeframe": "Daily", "history": [{"startDate": "2024-12-29", "endDate":"", "goal":"1", "timeframe":"Daily"}]}
];

export let sampleSubmissions = 
{
    //WEEK 0
    "2024-12-29": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 10, "4": 10,
    }, 
    //WEEK 1
    "2024-12-30": {
        "2": true, "3": false, "6": true, "7": false,
        "1": 10, "0": 10, "5": 10, "4": 10,
    }, 
    "2024-12-31": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 0, "0": 10, "5": 10, "4": 10,
    }, 
    "2025-1-1": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 10, "4": 10,
    }, 
    "2025-1-2": {//
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 0, "4": 10,
    }, 
    "2025-1-3": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 10, "4": 10,
    }, 
    "2025-1-4": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 10, "4": 10,
    }, 
    "2025-1-5": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 10, "4": 10,
    }, 
    //WEEK 2
    "2025-1-6": {
        "2": true, "3": false, "6": true, "7": false,
        "1": 10, "0": 10, "5": 10, "4": 0,
    }, 
    "2025-1-7": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 10, "4": 10,
    }, 
    "2025-1-8": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 10, "4": 10,
    }, 
    "2025-1-9": {//1
        "2": true, "3": false, "6": true, "7": false,
        "1": 10, "0": 0, "5": 10, "4": 10,
    }, 
    "2025-1-10": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 10, "4": 10,
    }, 
    "2025-1-11": {
        "2": true, "3": false, "6": true, "7": false,
        "1": 10, "0": 10, "5": 10, "4": 10,
    }, 
    "2025-1-12": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 10, "4": 10,
    }, 
    //WEEK 3
    "2025-1-13": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 10, "4": 10,
    }, 
    "2025-1-14": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 10, "4": 20,
    }, 
    "2025-1-15": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 10, "4": 20,
    }, 
    "2025-1-16": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 10, "4": 20,
    }, 
    "2025-1-17": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 10, "4": 20,
    }, 
    "2025-1-18": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 10, "4": 20,
    }, 
    "2025-1-19": {
        "2": true, "3": true, "6": true, "7": true,
        "1": 10, "0": 10, "5": 10, "4": 20,
    }, 
    //WEEK 4
}



/*
 * needs to be 2025/1/15 to produce below
 * expected streaks: 
 * weeklyBoolHit = 2 (14/14)
 * weeklyBoolMiss = 0 (12/14)
 * dailyBoolHit = 17
 * dailyBoolMiss = 3 (13/14)
 * 
 * weeklyNumHit = 2
 * weeklyNumMiss = 0 (12)
 * dailyNumHit = 12
 * dailyNumMiss = 1
 */

let oldSampleSubmissions = 
{
    //WEEK 0
    "2024-12-29": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 10,
    }, 
    //WEEK 1
    "2024-12-30": {
        "weeklyBoolHit": true, "weeklyBoolMiss": false, "dailyBoolHit": true, "dailyBoolMiss": false,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 10,
    }, 
    "2024-12-31": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 0, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 10,
    }, 
    "2025-1-1": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 10,
    }, 
    "2025-1-2": {//
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 0, "dailyNumMiss": 10,
    }, 
    "2025-1-3": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 10,
    }, 
    "2025-1-4": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 10,
    }, 
    "2025-1-5": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 10,
    }, 
    //WEEK 2
    "2025-1-6": {
        "weeklyBoolHit": true, "weeklyBoolMiss": false, "dailyBoolHit": true, "dailyBoolMiss": false,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 0,
    }, 
    "2025-1-7": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 10,
    }, 
    "2025-1-8": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 10,
    }, 
    "2025-1-9": {//weeklynummiss
        "weeklyBoolHit": true, "weeklyBoolMiss": false, "dailyBoolHit": true, "dailyBoolMiss": false,
        "weeklyNumHit": 10, "weeklyNumMiss": 0, "dailyNumHit": 10, "dailyNumMiss": 10,
    }, 
    "2025-1-10": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 10,
    }, 
    "2025-1-11": {
        "weeklyBoolHit": true, "weeklyBoolMiss": false, "dailyBoolHit": true, "dailyBoolMiss": false,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 10,
    }, 
    "2025-1-12": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 10,
    }, 
    //WEEK 3
    "2025-1-13": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 10,
    }, 
    "2025-1-14": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 20,
    }, 
    "2025-1-15": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 20,
    }, 
    "2025-1-16": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 20,
    }, 
    "2025-1-17": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 20,
    }, 
    "2025-1-18": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 20,
    }, 
    "2025-1-19": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 20,
    }, 
    //WEEK 4
    "2025-1-20": {
        "weeklyBoolHit": true, "weeklyBoolMiss": true, "dailyBoolHit": true, "dailyBoolMiss": true,
        "weeklyNumHit": 10, "weeklyNumMiss": 10, "dailyNumHit": 10, "dailyNumMiss": 20,
    }, 
}