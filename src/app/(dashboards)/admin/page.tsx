"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { toast } from "sonner";
import { Sparkles, X, Activity, Users, FileText, Bot, MessageCircle, UserPlus, Pencil, CheckCircle2, Clock, Send, Loader2, Download, CalendarDays, Calendar, Archive, Save, Trash, ChevronRight, BookOpen, Plus, Copy, AlertTriangle } from "lucide-react";


type Student = {
    id: string;
    name: string;
    age: string;
    grade: string;
    color: string;
};

const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string, text: string }> = {
        blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
        pink: { bg: 'bg-pink-100', text: 'text-pink-600' },
        emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
        amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
        purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    };
    return colors[color] || colors.emerald;
};

export default function AdminDashboardPage() {
    const [mounted, setMounted] = useState(false);
    const [showBanner, setShowBanner] = useState(true);
    const [tutorMessage, setTutorMessage] = useState("");
    const [messageSent, setMessageSent] = useState(false);
    const [isMessageRead, setIsMessageRead] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Estados de Carregamento (Loading Flags)
    const [isSavingStudent, setIsSavingStudent] = useState(false);
    const [isSavingTask, setIsSavingTask] = useState(false);

    // Auxiliar (simulação)
    const [hasAuxiliar, setHasAuxiliar] = useState(false);
    const [inviteLink, setInviteLink] = useState("");

    // Chat IA State
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
        { role: 'ai', content: 'Olá, Izabel! Sou o seu Assistente Pedagógico via IA. Como posso te auxiliar com os alunos hoje?' }
    ]);
    const [chatInput, setChatInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatScrollRef = React.useRef<HTMLDivElement>(null);

    // PDF Modal State
    const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState<string | null>(null);
    const [selectedPdfYear, setSelectedPdfYear] = useState<string>("2024");

    const pdfHistory: Record<string, { id: string, month: string, status: 'ready' | 'downloaded' }[]> = {
        '2024': [
            { id: 'mar-2024', month: 'Março 2024', status: 'ready' },
            { id: 'fev-2024', month: 'Fevereiro 2024', status: 'downloaded' },
            { id: 'jan-2024', month: 'Janeiro 2024', status: 'downloaded' },
        ],
        '2023': [
            { id: 'dez-2023', month: 'Dezembro 2023', status: 'downloaded' },
            { id: 'nov-2023', month: 'Novembro 2023', status: 'downloaded' },
            { id: 'out-2023', month: 'Outubro 2023', status: 'downloaded' },
            { id: 'set-2023', month: 'Setembro 2023', status: 'downloaded' },
            { id: 'ago-2023', month: 'Agosto 2023', status: 'downloaded' },
        ],
        '2022': [
            { id: 'dez-2022', month: 'Dezembro 2022', status: 'downloaded' },
            { id: 'nov-2022', month: 'Novembro 2022', status: 'downloaded' },
        ]
    };

    // Students Management State
    const [students, setStudents] = useState<Student[]>([
        { id: '1', name: "Joãozinho", age: "8", grade: "Ensino Fundamental I", color: "blue" },
        { id: '2', name: "Mariazinha", age: "5", grade: "Educação Infantil", color: "pink" }
    ]);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [studentForm, setStudentForm] = useState({ name: '', age: '', grade: '', color: 'emerald' });

    // Tarefas State
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [taskForm, setTaskForm] = useState({ title: '', category: 'Matemática', priority: 'Média', dueDate: '' });

    // Perfil do Aluno Modal State
    const [viewingProfile, setViewingProfile] = useState<Student | null>(null);

    const openAddStudentModal = () => {
        setEditingStudent(null);
        setStudentForm({ name: '', age: '', grade: '', color: 'emerald' });
        setIsStudentModalOpen(true);
    };

    const openEditStudentModal = (student: Student) => {
        setEditingStudent(student);
        setStudentForm({ name: student.name, age: student.age, grade: student.grade, color: student.color });
        setIsStudentModalOpen(true);
    };

    const handleSaveStudent = () => {
        if (!studentForm.name || !studentForm.age || !studentForm.grade) {
            toast.error("Preencha todos os campos do aluno.");
            return;
        }

        setIsSavingStudent(true);
        setTimeout(() => {
            if (editingStudent) {
                setStudents(students.map(s => s.id === editingStudent.id ? { ...s, ...studentForm } : s));
                toast.success("Dados do aluno atualizados!");
            } else {
                setStudents([...students, { id: Math.random().toString(), ...studentForm }]);
                toast.success("Novo aluno adicionado com sucesso!");
            }
            setIsStudentModalOpen(false);
            setEditingStudent(null);
            setIsSavingStudent(false);
        }, 1200);
    };

    const handleDeleteStudent = (id: string, name: string) => {
        toast(`Deseja excluir ${name}?`, {
            action: {
                label: "Excluir",
                onClick: () => {
                    setStudents(students.filter(s => s.id !== id));
                    toast.success(`${name} removido com sucesso.`);
                    if (viewingProfile?.id === id) setViewingProfile(null);
                }
            },
        });
    };

    const openCreateTaskModal = () => {
        setTaskForm({ title: '', category: 'Matemática', priority: 'Média', dueDate: '' });
        setIsTaskModalOpen(true);
    };

    const handleSaveTask = () => {
        if (!taskForm.title || !taskForm.category) return;
        // Aqui simularia salvar a tarefa vinculada ao viewingProfile.id
        console.log("Tarefa Criada para", viewingProfile?.name, taskForm);
        toast.success(`Tarefa "${taskForm.title}" criada com sucesso para ${viewingProfile?.name}!`);
        setIsTaskModalOpen(false);
    };

    // Auto-scroll chat
    useEffect(() => {
        if (chatScrollRef.current) {
            chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
        }
    }, [chatMessages, isTyping, isChatOpen]);

    useEffect(() => {
        if (!mounted) return;
        
        const checkReadStatus = setInterval(() => {
            const read = localStorage.getItem("tutorMessageRead") === "true";
            if (read !== isMessageRead) {
                setIsMessageRead(read);
            }
        }, 1500);
        return () => clearInterval(checkReadStatus);
    }, [isMessageRead, mounted]);

    const sendMessage = () => {
        if (tutorMessage.trim() && mounted) {
            localStorage.setItem("tutorMessage", tutorMessage);
            localStorage.setItem("tutorMessageRead", "false"); // Reseta lido

            const now = new Date();
            const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            localStorage.setItem("tutorTime", `HOJE, ${timeStr}`);

            setMessageSent(true);
            setIsMessageRead(false);
            toast.success("Recado enviado para o auxiliar!");
            setTimeout(() => setMessageSent(false), 3000);
            setTutorMessage("");
        }
    };

    const handleSendChat = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!chatInput.trim() || isTyping) return;

        const newMessages = [...chatMessages, { role: 'user', content: chatInput }] as { role: 'user' | 'ai', content: string }[];
        setChatMessages(newMessages);
        setChatInput("");
        setIsTyping(true);

        setTimeout(() => {
            setChatMessages((prev) => [
                ...prev,
                {
                    role: 'ai',
                    content: 'Entendi! Posso preparar um rascunho de plano de aula ou focar em algum desafio de aprendizado específico. O que achar melhor!'
                }
            ]);
            setIsTyping(false);
        }, 1500);
    };

    const handleGeneratePdf = (monthId: string) => {
        setIsGeneratingPdf(monthId);
        setTimeout(() => {
            setIsGeneratingPdf(null);
            // Simula download ou geração
        }, 2000);
    };

    return (
        <div className="flex-1 p-8 bg-[#FAFAFA] min-h-screen">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Saudação Pessoal */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Olá, Izabel! 👋</h1>
                        <p className="text-slate-500 mt-2 text-lg">
                            Que bom ter você por aqui. O painel da Família Silva está pronto.
                        </p>
                    </div>
                </div>

                {/* Banner de Novidades Controlado pelo Super Admin (Cor Dark/Acessível + Botão Fechar) */}
                {showBanner && (
                    <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center gap-6 relative overflow-hidden pr-12">
                        <button
                            onClick={() => setShowBanner(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 z-20"
                            title="Fechar aviso"
                        >
                            <X size={20} />
                        </button>
                        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                            <Sparkles size={160} />
                        </div>

                        <div className="relative z-10 flex-1">
                            <div className="inline-block bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                                Novidade do Sistema
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-white">Novos Relatórios em PDF 2.0! 🎉</h3>
                            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                                Agora você pode gerar portfólios completos com anexos de fotos automaticamente ajustadas. Teste gerar seu primeiro relatório mensal para ver como ficou lindo!
                            </p>
                        </div>
                        <div className="relative z-10 flex-shrink-0 mt-4 md:mt-0">
                            <Button variant="secondary" className="px-8 bg-emerald-500 text-white font-bold hover:bg-emerald-600 border-none transition-transform hover:scale-105 shadow-emerald-900 shadow-sm">
                                Conferir Agora
                            </Button>
                        </div>
                    </div>
                )}

                {/* Grid de Métricas */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-emerald-800">
                                Atividades na Semana
                            </CardTitle>
                            <div className="bg-emerald-100 p-2 rounded-lg"><Activity className="h-4 w-4 text-emerald-600" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold text-emerald-600">12</div>
                            <p className="text-xs font-medium text-emerald-600/70 mt-1">
                                +2 em relação à semana passada
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-blue-800">
                                Alunos Ativos
                            </CardTitle>
                            <div className="bg-blue-100 p-2 rounded-lg"><Users className="h-4 w-4 text-blue-600" /></div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold text-blue-600">2</div>
                            <p className="text-xs font-medium text-blue-600/70 mt-1">
                                Família ativa e dedicada
                            </p>
                        </CardContent>
                    </Card>
                    <Card
                        onClick={() => setIsPdfModalOpen(true)}
                        className="border-amber-200 shadow-md bg-amber-50 cursor-pointer hover:bg-amber-100 transition-colors"
                    >
                        <CardContent className="p-6 flex flex-col h-full justify-between items-start">
                            <div className="bg-amber-200 p-3 rounded-xl mb-4"><FileText className="h-6 w-6 text-amber-700" /></div>
                            <div>
                                <h3 className="text-lg font-bold text-amber-900 mb-1">Gerar PDF Mensal</h3>
                                <p className="text-xs font-medium text-amber-700/80">Tudo em dia para prestação de contas. Clique para emitir seu painel.</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card
                        onClick={() => setIsChatOpen(true)}
                        className="border-purple-200 shadow-md bg-[#2d1b4e] cursor-pointer hover:bg-[#3d246c] transition-colors relative overflow-hidden group"
                    >
                        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform">
                            <Bot size={120} className="text-white" />
                        </div>
                        <CardContent className="p-6 flex flex-col h-full justify-between items-start relative z-10">
                            <div className="flex justify-between w-full items-start mb-4">
                                <div className="bg-purple-400/30 p-3 rounded-xl"><Bot className="h-6 w-6 text-purple-100" /></div>
                                <span className="text-xs font-bold text-purple-900 bg-purple-100 px-2 py-1 rounded-full shadow-sm">42/500 Tokens</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Chat IA Pedagógico</h3>
                                <p className="text-xs font-medium text-purple-200">Dúvidas? Montar plano de aula? A IA te ajuda num instante.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Nova Seção: Meus Alunos (Administração de Filhos) */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2 border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-bold text-slate-900">GESTÃO DE ALUNOS (Filhos)</CardTitle>
                                <CardDescription>Acompanhe e edite os perfis dos seus alunos.</CardDescription>
                            </div>
                            <Button onClick={openAddStudentModal} size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold ml-auto shrink-0 shadow-sm border-none">
                                <UserPlus className="h-4 w-4 mr-2" /> Adicionar Aluno
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {students.map(student => {
                                    const colors = getColorClasses(student.color);
                                    return (
                                        <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`h-12 w-12 rounded-full ${colors.bg} flex items-center justify-center ${colors.text} font-bold text-xl uppercase`}>
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-800 text-lg">{student.name}</h4>
                                                    <p className="text-sm text-slate-500">{student.age} anos • {student.grade}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button onClick={() => { console.log('Viewing student:', student); setViewingProfile(student); }} variant="outline" size="sm" className="text-slate-600 w-full sm:w-auto">Acessar Perfil</Button>
                                                <Button
                                                    onClick={() => openEditStudentModal(student)}
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-slate-400 hover:text-emerald-600"
                                                    title="Editar Aluno"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    onClick={() => { console.log('Deleting student:', student.id); handleDeleteStudent(student.id, student.name); }}
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    title="Excluir Aluno"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Mensagem para o Auxiliar */}
                    <Card className="border-slate-200 shadow-sm relative overflow-hidden">
                        {/* Faixa decorativa lateral */}
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500"></div>
                        <CardHeader className="pb-3 pl-6">
                            <CardTitle className="flex items-center gap-2 text-emerald-800">
                                <Users className="h-5 w-5 text-emerald-600" /> Meu Auxiliar
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pl-6">
                            {!hasAuxiliar ? (
                                <div className="space-y-4 text-center py-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                                    <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <UserPlus size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">Nenhum Auxiliar Vinculado</p>
                                        <p className="text-sm text-slate-500 max-w-[200px] mx-auto mt-1">
                                            Convide alguém para te ajudar no acompanhamento educacional!
                                        </p>
                                    </div>

                                    {!inviteLink ? (
                                        <Button
                                            onClick={() => setInviteLink("https://hsxpert.com/invite/auxiliar/abc123xyz")}
                                            className="bg-emerald-600 hover:bg-emerald-700 font-bold shadow-md"
                                        >
                                            <Send className="w-4 h-4 mr-2" />
                                            Gerar Link de Convite
                                        </Button>
                                    ) : (
                                        <div className="flex flex-col gap-3 w-full px-4 items-center">
                                            <div className="flex w-full max-w-[240px] gap-2 items-center">
                                                <Input readOnly value={inviteLink} className="text-xs text-center border-emerald-200 h-9 bg-white px-2 w-full" />
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(inviteLink);
                                                        toast.success("O link do seu convite foi copiado! Envie este link pelo WhatsApp ou Email para a pessoa.");
                                                    }}
                                                    className="bg-emerald-600 hover:bg-emerald-700 h-9 shrink-0 px-3"
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <p className="text-[10px] text-slate-500">
                                                A pessoa usará este link para criar uma conta conectada à sua.
                                            </p>

                                            {/* SIMULADOR DE ACEITE */}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    toast.info("Simulação: A outra pessoa clicou no link e criou a conta.");
                                                    setHasAuxiliar(true);
                                                }}
                                                className="mt-2 text-xs border-dashed text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 h-7"
                                            >
                                                [Simular aceite do link]
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    {/* Perfil do Auxiliar */}
                                    <div className="flex items-center gap-4 p-4 border rounded-xl border-emerald-100 bg-emerald-50/30">
                                        <div className="h-14 w-14 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 text-xl font-bold shadow-inner shrink-0 relative">
                                            V
                                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-slate-800 text-lg truncate flex items-center gap-2">Vitória Régia </h3>
                                            <p className="text-xs text-emerald-600 font-semibold mb-1">Auxiliar desde Nov/2025</p>
                                            <div className="flex flex-col gap-0.5 mt-1 text-xs text-slate-500 font-medium">
                                                <span className="truncate">vitoria.regia@email.com</span>
                                                <span>(11) 98765-4321</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chat/Mensagem rapida */}
                                    <div className="space-y-3 pt-2">
                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-1">
                                            <MessageCircle size={14} className="text-emerald-500" />
                                            Mandar Recado Rápido
                                        </div>
                                        <Textarea
                                            value={tutorMessage}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTutorMessage(e.target.value)}
                                            placeholder="Ex: Por favor, foque em matemática hoje com o Joãozinho..."
                                            className="bg-slate-50 border-slate-200 resize-none h-20 focus-visible:ring-emerald-500 text-sm"
                                        />
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={sendMessage}
                                                size="sm"
                                                className={`flex-1 text-white font-bold transition-colors shadow-sm ${messageSent ? "bg-emerald-600 hover:bg-emerald-700" : "bg-emerald-500 hover:bg-emerald-600"}`}
                                            >
                                                {messageSent ? "Recado Enviado! ✅" : "Criar Alerta"}
                                            </Button>
                                        </div>

                                        <div className="flex justify-between items-center px-1">
                                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Aparecerá no painel dela</p>
                                            {mounted && isMessageRead && localStorage.getItem("tutorMessage") && (
                                                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 flex items-center bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                                                    <CheckCircle2 size={10} className="mr-1" /> Auxiliar ciente
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Organização Melhorada dos Gráficos e Registros */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="shadow-sm border-slate-200">
                        <CardHeader className="bg-slate-50/80 border-b border-slate-100 rounded-t-xl pb-4 flex flex-row items-center justify-between space-y-0">
                            <div>
                                <CardTitle>Últimos Registros</CardTitle>
                                <CardDescription>Acompanhe o status das tarefas recentes</CardDescription>
                            </div>
                            <Link href="/admin/diario">
                                <Button variant="outline" size="sm" className="bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50 font-bold shrink-0">
                                    <Calendar className="w-4 h-4 mr-2" /> Ver atividades do dia
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-100">
                                {[
                                    { id: 1, title: "Matemática - Frações", kid: "Joãozinho", time: "Hoje, 14:30", status: "Concluído", sColor: "text-emerald-700 bg-emerald-50 border-emerald-200", sIcon: <CheckCircle2 size={14} className="mr-1" /> },
                                    { id: 2, title: "Leitura Compartilhada", kid: "Mariazinha", time: "Hoje, 10:00", status: "Em revisão", sColor: "text-amber-700 bg-amber-50 border-amber-200", sIcon: <Clock size={14} className="mr-1" /> },
                                    { id: 3, title: "Projeto de Ciências", kid: "Joãozinho", time: "Segunda, 16:00", status: "Concluído", sColor: "text-emerald-700 bg-emerald-50 border-emerald-200", sIcon: <CheckCircle2 size={14} className="mr-1" /> }
                                ].map((item) => (
                                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-slate-50/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold shadow-sm border border-slate-200">
                                                {item.kid.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm sm:text-base">{item.title}</p>
                                                <p className="text-xs sm:text-sm text-slate-500 mt-1">{item.kid} • {item.time}</p>
                                            </div>
                                        </div>
                                        <div className={`flex items-center text-xs font-bold px-3 py-1.5 rounded-full border ${item.sColor} w-max`}>
                                            {item.sIcon} {item.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-slate-200">
                        <CardHeader className="bg-slate-50/80 border-b border-slate-100 rounded-t-xl pb-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Evolução de Atividades</CardTitle>
                                    <CardDescription>Filtre por aluno para ver detalhes</CardDescription>
                                </div>
                                <select className="text-sm border border-slate-200 rounded-lg p-2 bg-white text-slate-700 shadow-sm font-medium focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                                    <option>Todos os Alunos</option>
                                    <option>Joãozinho</option>
                                    <option>Mariazinha</option>
                                </select>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="h-[280px] w-full bg-white rounded-xl flex items-end justify-between gap-2 md:gap-4 relative pt-10">
                                {/* Linhas de grade simuladas */}
                                <div className="absolute inset-x-0 bottom-[20%] border-t border-dashed border-slate-100 w-full pointer-events-none"></div>
                                <div className="absolute inset-x-0 bottom-[40%] border-t border-dashed border-slate-100 w-full pointer-events-none"></div>
                                <div className="absolute inset-x-0 bottom-[60%] border-t border-dashed border-slate-100 w-full pointer-events-none"></div>
                                <div className="absolute inset-x-0 bottom-[80%] border-t border-dashed border-slate-100 w-full pointer-events-none"></div>

                                {/* Barras Chart */}
                                {[
                                    { h: 30, d: "Seg" }, { h: 50, d: "Ter" }, { h: 20, d: "Qua" },
                                    { h: 80, d: "Qui" }, { h: 60, d: "Sex" }, { h: 90, d: "Sáb" }, { h: 45, d: "Dom" }
                                ].map((item, i) => (
                                    <div key={i} className="w-full flex flex-col items-center justify-end h-full relative z-10 group cursor-crosshair">
                                        <div
                                            className="w-full max-w-[40px] rounded-t-md relative transition-all duration-300 group-hover:opacity-80 bg-gradient-to-t from-emerald-500 to-teal-300"
                                            style={{ height: `${item.h}%` }}
                                        >
                                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-md transition-opacity whitespace-nowrap pointer-events-none">
                                                {item.h} Ativ.
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 mt-2">{item.d}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>

            {/* Modal/Widget Chat IA */}
            {isChatOpen && (
                <div className="fixed inset-0 z-50 flex sm:justify-end items-end sm:items-stretch bg-slate-900/20 backdrop-blur-sm sm:p-4 transition-all overflow-hidden group">
                    <div className="bg-white w-full sm:max-w-md h-[90vh] sm:h-full sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 flex-shrink-0 relative transform translate-y-0 sm:translate-y-0 sm:translate-x-0 animate-in slide-in-from-bottom sm:slide-in-from-right-8 duration-300 rounded-t-2xl">
                        {/* Header */}
                        <div className="bg-[#2d1b4e] p-4 text-white flex justify-between items-center shadow-md z-10 relative shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#4a3175] p-2 rounded-xl"><Bot size={20} /></div>
                                <div>
                                    <h3 className="font-bold text-sm">Assistente Pedagógico (IA)</h3>
                                    <p className="text-xs text-purple-200">Online • Respostas imediatas</p>
                                </div>
                            </div>
                            <button onClick={() => setIsChatOpen(false)} className="text-slate-300 hover:text-white p-1 rounded-md hover:bg-[#4a3175] transition-colors focus:outline-none"><X size={20} /></button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 flex flex-col scroll-smooth" ref={chatScrollRef}>
                            <div className="text-center pb-2">
                                <span className="text-xs bg-slate-200 text-slate-500 px-2 py-1 rounded-full font-medium">Hoje</span>
                            </div>
                            {chatMessages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] rounded-2xl p-3 px-4 text-sm shadow-sm ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-tr-sm' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-sm'}`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start animate-in fade-in duration-300">
                                    <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-4 px-5 shadow-sm flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer / Input */}
                        <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-100 flex items-end gap-2 px-4 shrink-0 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.01)] z-10 relative">
                            <div className="flex-1 relative">
                                <Textarea
                                    value={chatInput}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setChatInput(e.target.value)}
                                    placeholder="Faça uma pergunta ou peça ajuda..."
                                    className="pr-10 bg-slate-50 border-slate-200 resize-none rounded-xl min-h-[44px] max-h-[120px] py-3 focus-visible:ring-[#2d1b4e] text-sm"
                                    onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendChat();
                                        }
                                    }}
                                />
                            </div>
                            <Button type="submit" size="icon" className="h-11 w-11 rounded-full bg-[#2d1b4e] hover:bg-[#4a3175] shadow-md flex-shrink-0 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled={!chatInput.trim() || isTyping}>
                                {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-1" />}
                            </Button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Relatórios PDF */}
            {isPdfModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-slate-900/40 backdrop-blur-sm p-4 transition-all">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="bg-amber-50 border-b border-amber-100 p-5 flex justify-between items-center relative">
                            <div className="flex items-center gap-3">
                                <div className="bg-amber-100 p-2.5 rounded-xl"><FileText className="h-6 w-6 text-amber-700" /></div>
                                <div>
                                    <h3 className="font-bold text-amber-900 text-lg">Relatórios de Desempenho</h3>
                                    <p className="text-xs text-amber-700">Seus arquivos e históricos completos</p>
                                </div>
                            </div>
                            <button onClick={() => setIsPdfModalOpen(false)} className="text-amber-700 hover:text-amber-900 bg-amber-200/50 hover:bg-amber-200 p-2 rounded-full transition-colors focus:outline-none"><X size={20} /></button>
                        </div>

                        {/* Body - Controles de Ano e Download Global */}
                        <div className="bg-white border-b border-slate-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_5px_15px_-10px_rgba(0,0,0,0.05)] z-10 relative">
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <span className="text-sm font-bold text-slate-700">Filtrar Ano:</span>
                                <select
                                    className="bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2 font-medium outline-none cursor-pointer"
                                    value={selectedPdfYear}
                                    onChange={(e) => setSelectedPdfYear(e.target.value)}
                                >
                                    {Object.keys(pdfHistory).sort((a, b) => Number(b) - Number(a)).map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                                onClick={() => handleGeneratePdf(`all-${selectedPdfYear}`)}
                                disabled={isGeneratingPdf !== null}
                            >
                                {isGeneratingPdf === `all-${selectedPdfYear}` ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Gerando pacote...</>
                                ) : (
                                    <><Archive className="w-4 h-4 mr-2" /> Baixar todos de {selectedPdfYear}</>
                                )}
                            </Button>
                        </div>

                        {/* Body - Lista de meses */}
                        <div className="p-5 max-h-[50vh] overflow-y-auto space-y-3 bg-slate-50">
                            {pdfHistory[selectedPdfYear]?.map((item) => (
                                <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm hover:border-amber-300 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-amber-50 group-hover:border-amber-100 transition-colors">
                                            <CalendarDays className="w-5 h-5 text-slate-400 group-hover:text-amber-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">{item.month}</h4>
                                            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                                                {item.status === 'ready' ? (
                                                    <span className="flex items-center gap-1 text-amber-600 font-medium">Novo relatório disponível</span>
                                                ) : (
                                                    <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Já baixado anteriormente</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant={item.status === 'ready' ? "default" : "outline"}
                                        className={item.status === 'ready' ? "bg-amber-500 hover:bg-amber-600 text-white shadow-sm" : "border-slate-200 text-slate-600 hover:text-amber-700 hover:bg-amber-50"}
                                        onClick={() => handleGeneratePdf(item.id)}
                                        disabled={isGeneratingPdf !== null}
                                    >
                                        {isGeneratingPdf === item.id ? (
                                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Gerando...</>
                                        ) : (
                                            <><Download className="w-4 h-4 mr-2" /> Baixar PDF</>
                                        )}
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="bg-white border-t border-slate-100 p-4 text-center">
                            <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                Guardamos o histórico de todos os relatórios por tempo indeterminado para eventuais necessidades de prestação de contas das metodologias escolares ou governo.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Adicionar/Editar Aluno */}
            {isStudentModalOpen && (
                <div className="fixed inset-0 z-[100] flex justify-center items-center bg-slate-900/60 backdrop-blur-sm p-4 transition-all">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="bg-emerald-50 border-b border-emerald-100 p-5 flex justify-between items-center relative">
                            <div className="flex items-center gap-3">
                                <div className="bg-emerald-100 p-2.5 rounded-xl">
                                    {editingStudent ? <Pencil className="h-6 w-6 text-emerald-700" /> : <UserPlus className="h-6 w-6 text-emerald-700" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-emerald-900 text-lg">{editingStudent ? 'Editar Aluno' : 'Novo Aluno'}</h3>
                                    <p className="text-xs text-emerald-700">{editingStudent ? 'Atualize os dados do perfil' : 'Cadastre um novo perfil para a plataforma'}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsStudentModalOpen(false)} className="text-emerald-700 hover:text-emerald-900 bg-emerald-200/50 hover:bg-emerald-200 p-2 rounded-full transition-colors focus:outline-none"><X size={20} /></button>
                        </div>

                        {/* Body */}
                        <div className="p-6 bg-white space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Nome do Aluno</label>
                                <Input
                                    className="bg-slate-50 border-slate-200"
                                    placeholder="Ex: Joãozinho Oliveira"
                                    value={studentForm.name}
                                    onChange={e => setStudentForm({ ...studentForm, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Idade</label>
                                    <Input
                                        type="number"
                                        className="bg-slate-50 border-slate-200"
                                        placeholder="Ex: 8"
                                        value={studentForm.age}
                                        onChange={e => setStudentForm({ ...studentForm, age: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Cor Temática</label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={studentForm.color}
                                        onChange={e => setStudentForm({ ...studentForm, color: e.target.value })}
                                    >
                                        <option value="blue">Azul</option>
                                        <option value="pink">Rosa</option>
                                        <option value="emerald">Verde</option>
                                        <option value="amber">Amarelo</option>
                                        <option value="purple">Roxo</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Série / Nível</label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={studentForm.grade}
                                    onChange={e => setStudentForm({ ...studentForm, grade: e.target.value })}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Educação Infantil">Educação Infantil</option>
                                    <option value="Ensino Fundamental I">Ensino Fundamental I</option>
                                    <option value="Ensino Fundamental II">Ensino Fundamental II</option>
                                    <option value="Ensino Médio">Ensino Médio</option>
                                </select>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end gap-3">
                            <Button variant="ghost" onClick={() => setIsStudentModalOpen(false)} className="text-slate-600 hover:text-slate-800">Cancelar</Button>
                            <Button onClick={handleSaveStudent} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-sm" disabled={!studentForm.name || !studentForm.grade || !studentForm.age || isSavingStudent}>
                                {isSavingStudent ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                {isSavingStudent ? "Salvando..." : editingStudent ? "Salvar Alterações" : "Cadastrar Aluno"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Ficha do Aluno - Modal Profile */}
            {viewingProfile && (
                <div className="fixed inset-0 z-[100] flex justify-center items-center bg-slate-900/60 backdrop-blur-sm p-4 transition-all overflow-y-auto">
                    <div className="bg-slate-50 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 my-auto">

                        {/* Header com a cor do Aluno */}
                        <div className={`p-8 relative ${getColorClasses(viewingProfile.color).bg}`}>
                            <button onClick={() => setViewingProfile(null)} className={`absolute top-4 right-4 ${getColorClasses(viewingProfile.color).text} hover:opacity-70 bg-white/50 p-2 rounded-full transition-colors focus:outline-none`}><X size={20} /></button>

                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                                <div className={`h-24 w-24 rounded-full bg-white flex items-center justify-center ${getColorClasses(viewingProfile.color).text} font-bold text-5xl uppercase shadow-md border-4 border-white/50`}>
                                    {viewingProfile.name.charAt(0)}
                                </div>
                                <div className="text-center sm:text-left">
                                    <h2 className={`text-3xl font-extrabold ${getColorClasses(viewingProfile.color).text}`}>{viewingProfile.name}</h2>
                                    <p className="text-slate-700 font-medium mt-1 text-sm bg-white/40 px-3 py-1 inline-block rounded-full">{viewingProfile.age} anos • {viewingProfile.grade}</p>
                                </div>
                            </div>
                        </div>

                        {/* Corpo da Ficha */}
                        <div className="p-6 space-y-6">

                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-slate-800">Resumo Acadêmico</h3>
                                <Button
                                    size="sm"
                                    onClick={openCreateTaskModal}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm"
                                >
                                    <Plus className="w-4 h-4 mr-2" /> Criar Tarefa
                                </Button>
                            </div>

                            {/* Métricas e Progresso */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Carga Horária</p>
                                    <h4 className="text-2xl font-extrabold text-slate-800">42h</h4>
                                    <p className="text-[10px] text-emerald-600 font-medium mt-1">+5h esta semana</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Dias Letivos</p>
                                    <h4 className="text-2xl font-extrabold text-slate-800">18</h4>
                                    <p className="text-[10px] text-slate-400 font-medium mt-1">Este mês</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Atividades</p>
                                    <h4 className="text-2xl font-extrabold text-slate-800">12</h4>
                                    <p className="text-[10px] text-slate-400 font-medium mt-1">Registradas</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Desempenho</p>
                                    <h4 className="text-2xl font-extrabold text-emerald-600">Alta</h4>
                                    <p className="text-[10px] text-slate-400 font-medium mt-1">Engajamento</p>
                                </div>
                            </div>

                            {/* Timeline Recente */}
                            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                                <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
                                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-slate-500" /> Diário Recente
                                    </h3>
                                    <Link href="/admin/diario">
                                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 cursor-pointer hover:bg-emerald-100 transition-colors">Ver Completo</span>
                                    </Link>
                                </div>
                                <div className="p-4">
                                    <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
                                        <div className="relative pl-6">
                                            <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                                            <p className="text-xs text-slate-400 font-medium mb-0.5">Hoje, 09:30</p>
                                            <h4 className="font-bold text-slate-800 text-sm">Leitura e Interpretação - Ciências</h4>
                                            <p className="text-sm text-slate-600 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                Demonstrou muito interesse sobre o ciclo da água. Leu 2 capítulos do livro apoio.
                                            </p>
                                        </div>
                                        <div className="relative pl-6">
                                            <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                                            <p className="text-xs text-slate-400 font-medium mb-0.5">Ontem, 14:00</p>
                                            <h4 className="font-bold text-slate-800 text-sm">Matemática Básica</h4>
                                            <p className="text-sm text-slate-600 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                Dificuldade leve com frações, revisaremos na próxima semana. 1 hora de prática na plataforma externa.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Criar Tarefa */}
            {isTaskModalOpen && (
                <div className="fixed inset-0 z-[110] flex justify-center items-center bg-slate-900/60 backdrop-blur-sm p-4 transition-all">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="bg-slate-900 border-b border-slate-800 p-5 flex justify-between items-center relative">
                            <div className="flex items-center gap-3">
                                <div className="bg-emerald-500/20 p-2.5 rounded-xl border border-emerald-500/30">
                                    <Plus className="h-6 w-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">Nova Tarefa</h3>
                                    <p className="text-xs text-slate-400">Vincular nova atividade para {viewingProfile?.name}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsTaskModalOpen(false)} className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full transition-colors focus:outline-none"><X size={20} /></button>
                        </div>

                        {/* Body */}
                        <div className="p-6 bg-white space-y-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-bold text-slate-700">Título da Tarefa</Label>
                                <Input
                                    className="bg-slate-50 border-slate-200"
                                    placeholder="Ex: Praticar tabuada de 7"
                                    value={taskForm.title}
                                    onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-slate-700">Categoria / Matéria</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                                        value={taskForm.category}
                                        onChange={e => setTaskForm({ ...taskForm, category: e.target.value })}
                                    >
                                        <option value="Matemática">Matemática</option>
                                        <option value="Português">Português</option>
                                        <option value="Ciências">Ciências</option>
                                        <option value="História">História</option>
                                        <option value="Geografia">Geografia</option>
                                        <option value="Inglês">Inglês</option>
                                        <option value="Artes">Artes</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-slate-700">Prioridade</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                                        value={taskForm.priority}
                                        onChange={e => setTaskForm({ ...taskForm, priority: e.target.value })}
                                    >
                                        <option value="Alta">Alta</option>
                                        <option value="Média">Média</option>
                                        <option value="Baixa">Baixa</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-bold text-slate-700">Data de Entrega / Prazo</Label>
                                <Input
                                    type="date"
                                    className="bg-slate-50 border-slate-200"
                                    value={taskForm.dueDate}
                                    onChange={e => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end gap-3">
                            <Button variant="ghost" onClick={() => setIsTaskModalOpen(false)} className="text-slate-600 hover:text-slate-800">Cancelar</Button>
                            <Button onClick={handleSaveTask} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-sm" disabled={!taskForm.title || isSavingTask}>
                                {isSavingTask ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                {isSavingTask ? "Salvando..." : "Salvar Tarefa"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
