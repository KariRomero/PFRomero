import { TestBed } from "@angular/core/testing"
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

describe('AuthService',()=>{
    let authService: AuthService;
    let router: Router;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers:[AuthService]
        })
        authService = TestBed.inject(AuthService)
        router = TestBed.inject(Router)
    });

    it('Debe establecer un usuario autenticado al llamar login',()=>{
        const spyOnSetItem = spyOn(localStorage,'setItem');
        const spyOnNavigate = spyOn(router,'navigate')        
        authService.login({
            email:'admin@mail.com',
            password:'123456'
        });
        authService.authUser$.subscribe({
            next:(authUser)=>{

                expect(authUser).toBeTruthy();
                expect(spyOnSetItem).toHaveBeenCalled();
                expect(spyOnNavigate).toHaveBeenCalled();
            }
        });
    });

    it('Debe mostrar un alert con el texto "Correo o password incorrectos" si los datos no coinciden con el login',()=>{
        const spyOnAlert=spyOn(window,'alert');        
        authService.login({
            email:'admin@mail.com',
            password:'1236'
        });
        expect(spyOnAlert).toHaveBeenCalledWith('Correo o password incorrectos');
    });


    it('Debe establecer un usuario autenticado al llamar verifyToken() si hay un token en el localStorage', () => {
        localStorage.setItem('accessToken', 'token_de_prueba');
        authService.verifyToken();
        authService.authUser$.subscribe({
            next: (authUser) => {
                expect(authUser).toBeTruthy();
            }
        });
    });

    it('Debe devolver falso al llamar verifyToken() si no hay un token en el localStorage', () => {
        localStorage.removeItem('accessToken');
        const result = authService.verifyToken();
        expect(result).toBeFalsy();
    });

    it('Debe eliminar el usuario autenticado y el token al llamar logOut()', () => {
        authService.login({
            email: 'admin@mail.com',
            password: '123456'
        });
        authService.logOut();
        authService.authUser$.subscribe({
            next: (authUser) => {
                expect(authUser).toBeNull();
            }
        });
        expect(localStorage.getItem('accessToken')).toBeNull();
    });


})