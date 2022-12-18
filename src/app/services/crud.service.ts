import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';
import { doc, getDoc, updateDoc, deleteField, DocumentReference, FieldValue, arrayRemove } from "firebase/firestore";

import { Observable, map } from 'rxjs';
import { category} from '../category';
import { product } from '../product';
import { content } from '../content';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  deleteCategory() {
    throw new Error('Method not implemented.');
  }
  //private myArray: [];
  categoriescollection!: AngularFirestoreCollection<category>;
  categories!: Observable<category[]>;
  //categoryDoc!: AngularFirestoreDocument<category>;
  productscollection!: AngularFirestoreCollection<product>;
  products!: Observable<product[]>;
  //categoryDoc!: AngularFirestoreDocument<category>;

  constructor(public fireService:AngularFirestore) {
    this.categoriescollection = this.fireService.collection('categories');
    this.categories = this.categoriescollection.snapshotChanges().pipe(map((actions: any[]) => actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      //console.log(id);
      return { id,...data };
      })))
      this.productscollection = this.fireService.collection('products');
      this.products = this.productscollection.snapshotChanges().pipe(map((actions: any[]) => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        //console.log(id);
        return { id,...data };
        })))

  }
  getCategories(){
    return this.categories;

 }

addCategories(categories:category){
  this.fireService.collection('categories').add({name:categories.name});
}
deleteCategories(categories:category) {
  this.fireService.collection('categories').doc(categories.id).delete();
}



getProducts(){
  return this.products;

}

addProducts(product:any){
this.fireService.collection('products').add({content:product});
}
deleteProducts(id:string) {
this.fireService.collection('products').doc(id).delete();
}

updateProducts(id:string,product:content){
  this.fireService.collection('products').doc(id).set({
    content:product
  })
}

}
