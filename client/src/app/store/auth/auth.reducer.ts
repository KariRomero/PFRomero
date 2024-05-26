import { createReducer, on } from "@ngrx/store";
import { IStudent } from "../../layouts/dashboard/pages/students/models";
import { authActions } from "./auth.actions";

export interface AuthState{
    authUser : null | IStudent
}

const initialState: AuthState={
    authUser:null
};

const MOCK_AUTH_USER_ADMIN: IStudent = {
    id: 1,
    createdAt: new Date(),
    email: 'admin@mail.com',
    nombre: 'Karina',
    apellido: 'Romero',
    turno: 'Mañana',
    curso: 'Angular',
    rol: 'ADMIN'       
};

const MOCK_AUTH_USER_USER: IStudent = {
    id: 2,
    createdAt: new Date(),
    email: 'user@mail.com',
    nombre: 'Juan',
    apellido: 'Pérez',
    turno: 'Tarde',
    curso: 'React',
    rol: 'USER'       
};

export const authFeatureName = 'auth';

export const authReducer = createReducer(initialState,
    on(authActions.login, (state, action) => {
        if ((action.payload.email === 'admin@mail.com' && action.payload.password === '123456') ||
            (action.payload.email === 'user@mail.com' && action.payload.password === '123456')) {
            localStorage.setItem('accessToken', 'sdfsdfjhsndjfkn');
            return {
                authUser: action.payload.email === 'admin@mail.com' ? MOCK_AUTH_USER_ADMIN : MOCK_AUTH_USER_USER
            };
        } else {
            alert('Correo o contraseña incorrectos');
            return state;
        }
    }),
    on(authActions.logout, () => {
        localStorage.removeItem('accessToken');
        return initialState;
    })
);
