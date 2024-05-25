export type UserRol = 'ADMIN' | 'STUDENT';

export interface IStudent{
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    curso:'Angular' | 'React';
    turno: 'Mañana' | 'Tarde' | 'Noche';
    createdAt: Date;
    rol: UserRol;
}


export interface CreateStudentPayload{
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    rol:UserRol | null;
    createdAt: Date | null;
}