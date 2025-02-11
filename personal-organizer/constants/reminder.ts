export interface Reminder {
   notificationID: string; 
   creationTime: Date;
   triggerTime: Date;
   timeUntilTrigger: number;
   repeats: string;
   repeatDetails: {month: number, dayOfMonth: number, weekday: number, hour: number, minute: number};
}