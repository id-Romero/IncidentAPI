

export interface IMonkeyCase {
    genre: string;
    age: number
    lat: number;
    lng: number;
    isSent: boolean;
    creationDate: Date;
}

export interface IMonkeyCasesDocument extends Document, IMonkeyCase {}