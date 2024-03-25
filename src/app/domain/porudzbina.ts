
export interface Porudzbina{
    id?:number,
    userDetails:{
        userId:string,
        ime:string,
        prezime:string,
        adresa:string,
        telefon:string,
        email:string
    },
    proizvodi:String[],
    iznosZaNaplatu:number,
    datumPoruzbine:Date,
    status:string

}