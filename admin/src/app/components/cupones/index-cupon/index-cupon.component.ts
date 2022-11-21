import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';

declare var iziToast:any;
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit {

  public token;
  public cupones : Array<any>=[];
  public load_data = true;
  public page = 1;
  public pageSize = 20;
  public filtro = '';

  constructor(
    private _cuponService : CuponService
  ) { 
    this.token = localStorage.getItem('token')
  }

  ngOnInit(): void {

    this._cuponService.listar_cupones_admin(this.token,this.filtro).subscribe(
      response=>{
        this.cupones = response.data;
        this.load_data=false;
        
      }
    )
  }

  filtrar(){
    this._cuponService.listar_cupones_admin(this.token,this.filtro).subscribe(
      response=>{
        this.cupones = response.data;
        this.load_data=false;
        
      }
    )
  }

  eliminar(id:any){
    this._cuponService.eliminar_cupon_admin(this.token,id).subscribe(
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

        this._cuponService.listar_cupones_admin(this.token,this.filtro).subscribe(
          response=>{
            this.cupones = response.data;
            this.load_data=false;
            
          }
        )
        
      },error=>{
        console.log(error);
        
      }
    )
  }

}
