export interface Reminder {
   notificationID: string; 
   creationTime: Date;
   triggerTime: Date;
   timeUntilTrigger: number;
   repeats: boolean;
   repeatDetails: {weekday: number, hour: number, second: number};
}