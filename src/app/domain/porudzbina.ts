import { Proizvod } from "./prodavnica.model"

export interface Porudzbina{
    id?:string,
    userDetails:{
        userId:string,
        ime:string,
        prezime:string,
        adresa:string,
        telefon:string,
        email:string
    },
    proizvodi:Proizvod[],
    iznosZaNaplatu:number,
    datumPoruzbine:Date,
    status:string

}