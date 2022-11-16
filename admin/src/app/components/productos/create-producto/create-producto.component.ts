import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast:any;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  
  public producto : any = {
    categoria: ''
  };
  public file:any=undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
  public config : any = {};
  public token;
  constructor(
    private _productoSercive : ProductoService,
    private _adminServide : AdminService
  ) { 
    this.config = {
      height: 500
    }
    this.token = this._adminServide.getToken();
  }

  ngOnInit(): void {
  }

  registro(registroForm:any){
    if (registroForm.valid) {
      console.log(this.producto);
      console.log(this.file);
      
      this._productoSercive.registro_producto_admin(this.token, this.producto, this.file,).subscribe(
        response=>{
          console.log(response);
          
        },error=>{
          console.log(error);
          
        }
      );
      
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class:  'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
      $('#input-portada').text('Seleccionar imagen');
      this. imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
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

      if (file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jepg') {

      const reader = new FileReader();
      reader.onload = e => this.imgSelect = reader.result;
      
      reader.readAsDataURL(file);

      $('#input-portada').text(file.name);
      this.file = file;
        
      }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class:  'text-danger',
        position: 'topRight',
        message: 'El archivo debe ser una imagen'
      });
      $('#input-portada').text('Seleccionar imagen');
      this. imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
  }else{
    iziToast.show({
      title: 'ERROR',
      titleColor: '#FF0000',
      color: '#FFF',
      class:  'text-danger',
      position: 'topRight',
      message: 'La imagen no puede superar los 4MB'
      });
      $('#input-portada').text('Seleccionar imagen');
      this. imgSelect = 'assets/img/01.jpg';
      this.file = undefined;

    }

    console.log(this.file);
    
  }
}
