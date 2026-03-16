export interface Student {
    id: string;
    name: string;
    age: string;
    grade: string;
    color: string;
}

export interface Activity {
    id: number;
    title: string;
    kid: string;
    time: string;
    status: "Concluído" | "Em revisão";
    sColor: string;
}

export const MOCK_STUDENTS: Student[] = [
    { id: '1', name: "Joãozinho", age: "8", grade: "Ensino Fundamental I", color: "blue" },
    { id: '2', name: "Mariazinha", age: "5", grade: "Educação Infantil", color: "pink" }
];

export const MOCK_ACTIVITIES: Activity[] = [
    { id: 1, title: "Matemática - Frações", kid: "Joãozinho", time: "Hoje, 14:30", status: "Concluído", sColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { id: 2, title: "Leitura Compartilhada", kid: "Mariazinha", time: "Hoje, 10:00", status: "Em revisão", sColor: "text-amber-700 bg-amber-50 border-amber-200" },
    { id: 3, title: "Projeto de Ciências", kid: "Joãozinho", time: "Segunda, 16:00", status: "Concluído", sColor: "text-emerald-700 bg-emerald-50 border-emerald-200" }
];
