export interface Habit {
   keyName: string;
   prettyPrint: string;
   dataType: string;
   timeClassification: string;
   category: string;
}

export const dataTypes = [
    { label: 'boolean', value: 'boolean' },
    { label: 'number', value: 'number' },
];
export const timeClassifications = [
    { label: 'Once daily', value: 'Once Daily' },
    { label: 'Once deekly', value: 'Once Weekly' },
    { label: 'More than once daily', value: 'Count Per Day' },
];
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