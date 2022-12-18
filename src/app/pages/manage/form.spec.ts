import { FormBuilder, FormGroup } from "@angular/forms";
import { Form } from "./form";

describe('Form', ()=>{

    let formN: Form;
    let form :FormGroup;
    beforeEach(()=>{
        formN= new Form(new FormBuilder());
        form = formN.createForm();
    })

    it('should have new product information', () =>{

        expect(form).not.toBeNull();
        expect(form.get('nameProduct')).toBeNull();
        expect(form.get('nameProduct')?.value).toEqual('text');
        expect(form.get('nameProduct')?.valid).toBeFalsy();

        expect(form.get('countProduct')).toBeNull();
        expect(form.get('countProduct')?.value).toEqual('number');
        expect(form.get('countProduct')?.valid).toBeFalsy();

        expect(form.get('priceProduct')).toBeNull();
        expect(form.get('priceProduct')?.value).toEqual('number');
        expect(form.get('priceProduct')?.valid).toBeFalsy();

    })

    // it('should have email invalid if email is not valid',()=>{
    //     form.get('nameProduct')?.setValue('invalid email');
    //     expect(form.get('nameProduct')?.valid).toBeFalsy();
    // })

    // it('should have email invalid if email is valid',()=>{
    //     form.get('nameProduct')?.setValue('abc@vidu.com');
    //     expect(form.get('nameProduct')?.valid).toBeFalsy();
    // })

    it('should have a valid form',()=>{
        // form.get('nameProduct')?.setValue('Tên sản phẩm');
        // form.get('descriptionProduct')?.setValue('Mô tả');
        expect(form.valid).toBeTruthy();
    })
})
