export interface Proizvod{
    id:number;
    naziv:string;
    opis:string;
    cena:number;
    slika:string;
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
   
