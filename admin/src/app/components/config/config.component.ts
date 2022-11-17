import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { AdminService } from 'src/app/services/admin.service';


declare var iziToast:any;




@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  public token;
  public config : any = {};
  public titulo_cat = '';
  public icono_cat = '';

  constructor(
    private _adminService : AdminService
  ) { 
    this.token = localStorage.getItem('token');
    this._adminService.obtener_config_admin(this.token).subscribe(
      response=>{
        
        this.config = response.data;
        console.log(response);
      },error=>{
        console.log(error);
        
      }
    )
  }

  ngOnInit(): void {
  }

  agregar_cat(){
    if (this.titulo_cat && this.icono_cat) {
      console.log(uuidv4());
      
      this.config.categorias.push({
        titulo: this.titulo_cat,
        icono: this.icono_cat,
        _id: uuidv4()
      });
      this.titulo_cat = '';
      this.icono_cat = '';
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class:  'text-danger',
        position: 'topRight',
        message: 'Debe ingresar un titulo para la categoria'
      });
    }
  }
}
