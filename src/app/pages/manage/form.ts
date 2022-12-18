import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class Form{
  private formBuider: FormBuilder;
  createForm():FormGroup{
    return this.formBuider.group({
      nameProduct:['',[Validators.required]],
      countProduct:['',[Validators.required]],
      priceProduct:['',[Validators.required]],
      descriptionProduct:['',[Validators.required]],
      typeProduct:['',[Validators.required]]
    });
  }
  constructor(formBuilder:FormBuilder){
    this.formBuider=formBuilder;
  }
}
