import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import {content, item} from '../../content'
import { ToastController } from '@ionic/angular';
import { product } from 'src/app/product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Form } from './form';



@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {
  tabAddCategoriesActive=false;
  tabAddProductsActive=false;
  tabModifyProductsActive=false;
  currentChoice:number;
  modeDelete=false;

  categoriesTitle:any[];
  categories: any[];
  idcategories: any[];
  products: any[];
  idproducts: any[];
  private data:any[];
  viewProducts:any[];
  formModify : FormGroup | any;
  formAdd: FormGroup | any;
  constructor(private crudService: CrudService,private toastController: ToastController,private formBuilder:FormBuilder) {
    this.categoriesTitle=[];
    this.categories=[];
    this.currentChoice=0;
    this.products=[];
    this.data=[];
    this.viewProducts=[];
    this.idcategories=[];
    this.idproducts=[];
  }
  private allCate: any;

  ngOnInit() {
    //this.getData();
    //
    this.formAdd=new Form(this.formBuilder).createForm();
    this.formModify=new Form(this.formBuilder).createForm();
    this.getCategories();
    this.getProducts();

  }


  getCategories(){

    this.categories=[];

    this.crudService.getCategories().subscribe(cate => {
      this.categoriesTitle=['Tất cả'];
      this.idcategories=[];
      for (let i of cate) {this.idcategories.push(i.id);this.categoriesTitle.push(i.name);}
      })
   }
   getProducts(){

    this.crudService.getProducts().subscribe(pdt => {
      this.idproducts=[];
      this.products=[];
      this.viewProducts=[];

      for (let i of pdt) {this.idproducts.push(i.id);this.products.push(i.content);this.viewProducts.push(i.content);}
      })
    }



   addCategory(){

    var inputValue = (<HTMLInputElement>document.querySelector(".tab input")).value;
    // this.presentToast('Đã thêm 1 danh mục: '+inputValue);
    this.categoriesTitle.push(inputValue);
    this.crudService.addCategories({
      name: inputValue,
      id: ''
    });

   }

   clickChoice(index:number){
    this.currentChoice=index;
    this.viewProducts=[];
    if (index==0){
      for (let pdt of this.products) this.viewProducts.push(pdt);
    }
    else{
      this.viewProducts=this.products.filter(pdt=>pdt.type===this.categoriesTitle[index]);
    }
   }
   clickDelete(index:number){
    this.crudService.deleteCategories({id:this.idcategories[index],name:''});
   }

   clickModifyCategories(){
    this.modeDelete=!this.modeDelete;
    if (this.modeDelete) this.presentToast('Đang chỉnh sửa danh mục');
   }
   async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top'
    });

    await toast.present();
  }
  addProducts(){
    let input=document.querySelectorAll(".tab .inputTabProduct");
    let pdt={
      id:this.createId(),
      name:(<HTMLInputElement>input[0]).value.valueOf(),
      count:parseInt((<HTMLInputElement>input[1]).value),
      price:parseInt((<HTMLInputElement>input[2]).value),
      description:(<HTMLInputElement>input[3]).value.valueOf(),
      type:((<HTMLSelectElement>input[4]).value)?(<HTMLSelectElement>input[4]).value:'',
    } as content;
    this.formAdd.get('nameProduct').setValue('');
    this.formAdd.get('countProduct').setValue('');
    this.formAdd.get('priceProduct').setValue('');
    this.formAdd.get('descriptionProduct').setValue('');
    this.formAdd.get('typeProduct').setValue('');
    this.crudService.addProducts(pdt);
  }
  clickDeleteProduct(index:number){

    this.crudService.deleteProducts(this.idproducts[index]);
    // this.crudService.deleteData(id);

   }
  contentCurrentModify={
    id:'',
    name:'',
    count:0,
    price:0,
    description:'',
    type:''
  }
  productCurrentModify=new product('', this.contentCurrentModify);

  clickModifyProduct(index:number){
    this.presentToast('Đang chỉnh sửa sản phẩm: ['+this.products[index].id+']');
    this.contentCurrentModify=item({
      id:this.products[index].id,
      name:this.products[index].name,
      count:this.products[index].count,
      price:this.products[index].price,
      description:this.products[index].description,
      type:this.products[index].type,
    });
    this.productCurrentModify=new product(this.idproducts[index],this.contentCurrentModify);
    this.tabModifyProductsActive=true;
  }
  saveModifyProduct(){
    this.crudService.updateProducts(this.productCurrentModify.id,this.productCurrentModify.content);
    //this.presentToast('Đã lưu thay đổi');
  }
  createId(){
    //const alpha=['A','B','C','D','E','F','G','H','J','K'];
    const limit=6;
    let length=this.products.length+1;
    let s=length.valueOf().toString();
    while (s.length<limit) {
      s="0"+s;
    }

    return s;
  }
}











