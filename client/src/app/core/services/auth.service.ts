import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IStudent } from '../../layouts/dashboard/pages/students/models/index';
import { LoginData } from "../../layouts/auth/models/index";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService{
    private MOCK_AUTH_USER : IStudent = {
        id:1,
        createdAt: new Date(),
        email:'admin@mail.com',
        nombre:'Karina',
        apellido:'Romero',
        turno:'Mañana',
        curso:'Angular',
        rol: 'ADMIN'       
    }
    private _authUser$ = new BehaviorSubject<IStudent | null >(null);
    public authUser$ = this._authUser$.asObservable();

    constructor(private router:Router){}

    login(data: LoginData):void{
        if(data.email!=='admin@mail.com' || data.password !== '123456'){
            alert('Correo o password incorrectos')
        } else{
            this._authUser$.next(this.MOCK_AUTH_USER)
            localStorage.setItem(
                'accessToken',
                'sdfsdfjhsndjfkn'
            );
            this.router.navigate(['dashboard','home']);
        }
    }

    verifyToken() : boolean{
        const token = localStorage.getItem('accessToken'); //consultando de accesToken existe
        if(token){
            this._authUser$.next(this.MOCK_AUTH_USER);
            return true
        } else{
            return false
        }
    }

    logOut():void{
        this._authUser$.next(null);
        localStorage.removeItem('accessToken');
    }
}