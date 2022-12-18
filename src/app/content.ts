import { type } from "os"


export class content{
  constructor(public id:string,public name:string,public count:number,public price:number,public description:string, public type:string){

  }
  };
export function contentObject(cont:content) {
  return {
    id:cont.id,
    name:cont.name,
    count:cont.count,
    price:cont.price,
    description:cont.description,
    type:cont.type
  }
}
export function item({ id= '', name= '', count=0, price=0, description= '' ,type=''}) {
  return {
    id:id,
    name:name,
    count:count,
    price:price,
    description:description,
    type:type
  }
  }

