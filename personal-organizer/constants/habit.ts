export interface Habit {
   keyName: string;
   prettyPrint: string;
   dataType: string;
   goal: string;
   timeframe: string;
   category: string;
}

export const dataTypes = [
    { label: 'complete/not complete', value: 'boolean' },
    { label: 'minutes', value: 'number' },
];
export const timeframes = [
    { label: 'Daily', value: 'Daily' },
    { label: 'Weekly', value: 'Weekly' },
]
export const categories = [
    { label: 'Personal Care', value: 'Personal Care' },
    { label: 'Fitness', value: 'Fitness' },
    { label: 'Productivity', value: 'Productivity' },
    { label: 'Hobby', value: 'Hobby' },
    { label: 'Other', value: 'Other' },
]

export function keyPrettyPrint(keyName: string) {
    return keyName.replace(/\s/g, "_");
}