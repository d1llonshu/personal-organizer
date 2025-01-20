export let sampleHabits = 
[
{"category": "Fitness", "dataType": "number", "goal": "200", "keyName": "weeklyNumMiss", "prettyPrint": "weeklyNumMiss", "timeframe": "Weekly"}, 
{"category": "Fitness", "dataType": "number", "goal": "15", "keyName": "weeklyNumHit", "prettyPrint": "weeklyNumHit", "timeframe": "Weekly"},
{"category": "Personal Care", "dataType": "boolean", "goal": "4", "keyName": "weeklyBoolHit", "prettyPrint": "weeklyBoolHit", "timeframe": "Weekly"},
{"category": "Personal Care", "dataType": "boolean", "goal": "7", "keyName": "weeklyBoolMiss", "prettyPrint": "weeklyBoolMiss", "timeframe": "Weekly"},
{"category": "Productivity", "dataType": "number", "goal": "20", "keyName": "dailyNumMiss", "prettyPrint": "dailyNumMiss", "timeframe": "Daily"}, 
{"category": "Productivity", "dataType": "number", "goal": "5", "keyName": "dailyNumHit", "prettyPrint": "dailyNumHit", "timeframe": "Daily"},
{"category": "Hobby", "dataType": "boolean", "goal": "1", "keyName": "dailyBoolHit", "prettyPrint": "dailyBoolHit", "timeframe": "Daily"},
{"category": "Hobby", "dataType": "boolean", "goal": "1", "keyName": "dailyBoolMiss", "prettyPrint": "dailyBoolMiss", "timeframe": "Daily"}
];

export let sampleSubmissions = 
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