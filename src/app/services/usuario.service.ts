import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, docData, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firestore: Firestore) { }

  getUsuarios(): Observable<Usuario[]>{
    const usuariosRef = collection(this.firestore,'usuarios');
    return collectionData(usuariosRef, {idField:'id'}) as Observable<Usuario[]>;
  }

  getUsuarioById(id:string): Observable<Usuario> {
    const usuarioRef = doc(this.firestore, `usuarios/${id}`);
    return docData(usuarioRef, {idField:'id'} ) as Observable<Usuario>;
  }

  addUsuario(usuario:Usuario){
    const usuarioRef = collection(this.firestore, 'usuarios');
    return addDoc(usuarioRef, usuario);
  }

  updateUsuario(usuario: Usuario){
    const usuarioRef = doc(this.firestore, `usuarios/${usuario.id}`);
    return updateDoc(usuarioRef, {
      name:usuario.name,
      lastname:usuario.lastname,
      gender:usuario.gender,
      age:usuario.age,
      email:usuario.email,
      image:usuario.image
    });
  }

  deleteUsuario(usuario: Usuario){
    const usuarioRef = doc(this.firestore, `usuarios/${usuario.id}`);
    return deleteDoc(usuarioRef);
  } 

}