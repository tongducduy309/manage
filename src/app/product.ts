import { content } from "./content";

export class product{
  constructor(public id:string,public content:content){

  }
};

export function item({ id= '', name= '', count=0, price=0, description= '',type='' }) {
return {
  id:id,
  name:name,
  count:count,
  price:price,
  description:description,
  type:type
}
}

