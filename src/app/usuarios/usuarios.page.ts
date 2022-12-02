import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/services/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalPage } from '../modal/modal.page';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage {

  usuarios : Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private alertCtrl:AlertController,private ToastCtrl:ToastController, private modalCtrl:ModalController) {
    this.getUsuarios();
   }

   getUsuarios(){
    this.usuarioService.getUsuarios().subscribe(respuesta => {
      console.log(respuesta);
      this.usuarios = respuesta;
    });
  }
  async openDetailUser(usuario:Usuario) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {id: usuario.id},
      breakpoints:[0, 0.5, 0.8],
      initialBreakpoint: 1
    });
    modal.present();
  }
  async addUsuario(){
    const alert = await this.alertCtrl.create({
      header:'Add User',
      inputs:[
        {
          name:'name',
          type:'text',
          placeholder:'Name'
        },
        {
          name:'lastname',
          type:'text',
          placeholder:'Lastname'
        },
        {
          name:'gender',
          type:'text',
          placeholder:'Gender'
        },
        {
          name:'age',
          type:'number',
          placeholder:'Age'
        },
        {
          name:'email',
          type:'email',
          placeholder:'correo@correo.com'
        },
        {
          name:'image',
          type:'url',
          placeholder:'Link web image'
        }
      ],
      buttons:[
        {
          text:'Cancel',
          role:'cancel'
        },
        {
          text:'Save',
          role:'confirm',
          handler:(data) =>{
            this.usuarioService.addUsuario(data);
            this.toastPresent('User added!!!!');
          }
        }
      ]
    });
    await alert.present();
  }

  async toastPresent(message:string){
    const toast = await this.ToastCtrl.create({
      message:message,
      duration:1000
    });
    toast.present();
  }


  

}
