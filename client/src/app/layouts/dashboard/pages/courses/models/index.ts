export interface ICourse{
    id:number;
    curso:'Angular' | 'React' | 'JavaScript';
    turno: 'Mañana' | 'Tarde' | 'Noche'
}

export interface CreateCoursePayload{
    curso:string | null,
    turno: string | null
}