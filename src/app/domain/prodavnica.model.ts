export interface Proizvod{
    id:String;
    naziv:string;
    opis:string;
    cena:number;
    slika:string;
    kolicina?:number
}
export interface Prodavnica{
    id:number;
    ime:string;
    opis:string;
    lokacija:{
        latitude:number,
        longitude:number
    };
    proizvodi?: Proizvod[];
}
   
