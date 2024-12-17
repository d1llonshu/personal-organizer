//streaks
//new storage key for array of new type:
//new type - fields: name (should be same as the key), currentStreak, longestStreak, mostRecentDate
export type streakData = {
    name: string;
    currentStreak: number;
    longestStreak: number;
    mostRecentDate: Date;
}