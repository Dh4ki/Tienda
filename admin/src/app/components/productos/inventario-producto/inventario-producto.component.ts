import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast:any;
declare var JQuery:any;
declare var $:any;


@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {
  public id:any;
  public token;
  public producto : any = {};
  public inventarios : Array<any>=[];
  public load_btn = false;

  constructor(
    private _route: ActivatedRoute,
    private _productoService : ProductoService
  ) { 
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        console.log(this.id);
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          response=>{
            if (response.data == undefined) {
              this.producto = undefined;
            }else{
              this.producto = response.data;
              console.log(this.producto);

              this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
                response=>{
                  this.inventarios = response.data;
                  console.log(this.inventarios);
                  
                },error=>{
                  console.log(error);
                  
                }
              )
            }
            
          },error=>{
            console.log(error);
            
          }
        )

      }
    );
  }

  eliminar(id:any){
    this.load_btn = true;
    this._productoService.eliminar_inventario_producto_admin(id,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class:  'text-success',
          position: 'topRight',
          message: 'Se eliminó correctamente el cliente.'
        });
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.load_btn = false;

        this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
          response=>{
            this.inventarios = response.data;
            console.log(this.inventarios);
            
          },error=>{
            console.log(error);
            
          }
        )
        
      },error=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class:  'text-success',
          position: 'topRight',
          message: 'Ocurrió un error en el servidor.'
        });
        console.log(error);
        this.load_btn = false;
      }
    )
  }

}
