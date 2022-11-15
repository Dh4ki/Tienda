import { Component, OnInit } from '@angular/core';

declare var iziToast:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public file:any=undefined;
  public producto : any = {};
  

  constructor() { }

  ngOnInit(): void {
  }

  registro(registroForm:any){
    if (registroForm.valid) {
      
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class:  'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }
  }
  fileChangeEvent(event:any):void{
    var file:any;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
      console.log(file);
      
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class:  'text-danger',
        position: 'topRight',
        message: 'No hay una imagen de envío'
      });
    }
    if (file.size <= 4000000) {
      //
    }else{

    }
  }

}
