export interface formDataInterface {
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

export class formData implements formDataInterface {
    dateSubmitted: Date;
  
    // personal care
    morningBrush: boolean;
    nightBrush: boolean;
    usedMouthwash: boolean;
    washedFace: boolean;
    usedExfoliator: boolean;
    showered: boolean;
    tookMedicine: boolean;
  
    // fitness goals
    minutesBiked: number;
    situpsDone: number;
    pushupsDone: number;
  
    // personal goals
    leetcodeMinutes: number;
    personalProjectMinutes: number;
    artMinutes: number;
  
    constructor(
      dateSubmitted: Date,
      morningBrush: boolean = false,
      nightBrush: boolean = false,
      usedMouthwash: boolean = false,
      washedFace: boolean = false,
      usedExfoliator: boolean = false,
      showered: boolean = false,
      tookMedicine: boolean = false,
      minutesBiked: number = 0,
      situpsDone: number = 0,
      pushupsDone: number = 0,
      leetcodeMinutes: number = 0,
      personalProjectMinutes: number = 0,
      artMinutes: number = 0
    ) {
      this.dateSubmitted = dateSubmitted;
      this.morningBrush = morningBrush;
      this.nightBrush = nightBrush;
      this.usedMouthwash = usedMouthwash;
      this.washedFace = washedFace;
      this.usedExfoliator = usedExfoliator;
      this.showered = showered;
      this.tookMedicine = tookMedicine;
      this.minutesBiked = minutesBiked;
      this.situpsDone = situpsDone;
      this.pushupsDone = pushupsDone;
      this.leetcodeMinutes = leetcodeMinutes;
      this.personalProjectMinutes = personalProjectMinutes;
      this.artMinutes = artMinutes;
    }

    getAllPropertiesExceptDate?(): string[] {
        const properties: string[] = [];
    
        for (const key in this) {
            console.log(key)
            properties.push(key);
        }

        const index = properties.indexOf("dateSubmitted");

        // return properties.splice(index, 1);
        console.log(properties)
        return properties
    }
}
//needs to be manually changed
export const formKeysMinusDate = 
        [ "morningBrush", 
          "nightBrush",
          "usedMouthwash",
          "washedFace",
          "usedExfoliator",
          "showered",
          "tookMedicine",
          "minutesBiked",
          "situpsDone",
          "pushupsDone",
          "leetcodeMinutes",
          "personalProjectMinutes",
          "artMinutes",
        ]

export const formKeysMinusDatePretty = 
        {"morningBrush" : "Brushed Teeth (Morning)", 
          "nightBrush" : "Brushed Teeth (Night)",
          "usedMouthwash" : "Mouthwash",
          "washedFace" : "Washed Face",
          "usedExfoliator" : "Exfoliated",
          "showered" : "Showered",
          "tookMedicine" : "Took Medication",
          "minutesBiked" : "Biking",
          "situpsDone" : "Situps",
          "pushupsDone" : "Pushups",
          "leetcodeMinutes" : "Leetcode",
          "personalProjectMinutes" : "Personal Project",
          "artMinutes" : "Art",
      }
