export interface City {
   nome: string;
   codice: string;
   zona: Zone;
   regione: Region;
   provincia: Province;
   sigla: string;
   cap: string[];
   codiceCatastale: string
   popolazione: number;
}

export interface Zone {
   codice: string;
   nome: string;
}

export interface Region {
   codice: string;
   nome: string;
}

export interface Province {
   codice: string;
   nome: string;
}
