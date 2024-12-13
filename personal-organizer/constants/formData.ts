export type formData = {
    dateSubmitted : Date;

    //personal care
    morningBrush: boolean;
    nightBrush: boolean;
    usedMouthwash: boolean;
    washedFace: boolean;
    usedExfoliator: boolean;
    showered: boolean;
    tookMedicine: boolean;

    //fitness goals
    minutesBiked: number;
    situpsDone: number;
    pushupsDone: number;

    //personal goals
    leetcodeMinutes: number;
    personalProjectMinutes: number;
    artMinutes: number;
}