// Interface para definir las propiedades de la coneccion a postgres
interface DbConection {
  host:string;
  user:string;
  password:string;
  database:string;
  port:string;
}

export { DbConection };