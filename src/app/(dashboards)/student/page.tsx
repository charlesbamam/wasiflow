"use client";

import React, { useState } from "react";
import {
    CheckCircle2,
    Circle,
    CalendarDays,
    Star,
    Gift,
    ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentDashboardPage() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Mestre dos Números", category: "Matemática", desc: "Resolver 5 desafios com blocos lógicos", emoji: "🧮", color: "from-blue-400 to-indigo-500", done: false, reward: 5 },
        { id: 2, title: "Aventura Literária", category: "Língua Portuguesa", desc: "Ler 10 páginas do livro 'O Pequeno Príncipe'", emoji: "📖", color: "from-emerald-400 to-teal-500", done: true, reward: 5 },
        { id: 3, title: "Explorador da Natureza", category: "Ciências", desc: "Observar e desenhar 3 folhas diferentes no parque", emoji: "🍃", color: "from-amber-400 to-orange-500", done: false, reward: 10 },
        { id: 4, title: "Artista Galáctico", category: "Artes", desc: "Criar uma pintura usando apenas cores primárias", emoji: "🎨", color: "from-rose-400 to-pink-500", done: false, reward: 5 },
    ]);

    const [stars, setStars] = useState(25); // Pontuação inicial simulada

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => {
            if (t.id === id) {
                // Atualiza o saldo de estrelas
                if (!t.done) setStars(prev => prev + t.reward);
                else setStars(prev => prev - t.reward);

                return { ...t, done: !t.done };
            }
            return t;
        }));
    };

    const completedTasks = tasks.filter(t => t.done).length;
    const totalTasks = tasks.length;
    const progressPercentage = Math.round((completedTasks / totalTasks) * 100) || 0;

    // Prêmios definidos pelo tutor (simulação de trilha de metas)
    const rewards = [
        { id: 1, title: "1h extra de Videogame", target: 30, emoji: "🎮" },
        { id: 2, title: "Escolher o jantar de Sexta", target: 50, emoji: "🍕" },
        { id: 3, title: "Passeio no Parque", target: 100, emoji: "🚲" },
    ];

    return (
        <div className="flex-1 bg-slate-50 min-h-screen pb-20">
            {/* Cabeçalho Fixo */}
            <div className="bg-white sticky top-0 z-30 border-b border-slate-100 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 text-lg sm:text-xl font-bold">
                            J
                        </div>
                        <div>
                            <h2 className="text-slate-800 font-bold leading-none">Joãozinho</h2>
                            <p className="text-xs text-slate-500 font-medium mt-1">Herói em Treinamento</p>
                        </div>
                    </div>

                    {/* Cofrinho de Estrelas */}
                    <div className="flex items-center gap-2 bg-amber-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-amber-200 shadow-sm">
                        <Star className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 fill-amber-500" />
                        <span className="font-black text-amber-700 text-sm sm:text-base">{stars} Estrelas</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 space-y-8">

                {/* Resumo e Progresso */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center relative overflow-hidden">
                    <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">
                        {completedTasks === totalTasks
                            ? "Parabéns! Missão de hoje cumprida 🎉"
                            : "Suas missões do dia!"}
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mb-6">
                        Complete as tarefas para ganhar estrelas e trocar por prêmios incríveis!
                    </p>

                    <div className="max-w-md mx-auto">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Progresso</span>
                            <span className="text-lg font-black text-emerald-600">{progressPercentage}%</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div
                                className="h-full bg-emerald-500 transition-all duration-700 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Lista de Atividades */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <CalendarDays className="h-5 w-5 text-sky-500" />
                            <h2 className="text-xl font-bold text-slate-800">Tarefas de Hoje</h2>
                        </div>

                        <div className="space-y-3">
                            {tasks.map(task => (
                                <div
                                    key={task.id}
                                    onClick={() => toggleTask(task.id)}
                                    className={`relative bg-white rounded-2xl p-4 shadow-sm border transition-all duration-200 cursor-pointer
                                        ${task.done ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-100 hover:border-sky-200 hover:shadow-md'}`}
                                >
                                    <div className="flex items-start sm:items-center gap-4">
                                        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br border border-white/50 shadow-sm ${task.color} text-2xl flex items-center justify-center text-white shrink-0 ${task.done && 'grayscale-[0.5] opacity-60'}`}>
                                            {task.emoji}
                                        </div>
                                        <div className="flex-1 w-full min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${task.done ? 'bg-emerald-100/50 border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                                                    {task.category}
                                                </span>
                                                <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-100">
                                                    <Star className="h-3 w-3 fill-amber-500" /> +{task.reward}
                                                </span>
                                            </div>
                                            <h3 className={`text-sm sm:text-base font-bold text-slate-800 mb-0.5 truncate ${task.done && 'text-slate-500 line-through decoration-emerald-500'}`}>
                                                {task.title}
                                            </h3>
                                            <p className={`text-xs leading-snug line-clamp-1 ${task.done ? 'text-slate-400' : 'text-slate-500'}`}>
                                                {task.desc}
                                            </p>
                                        </div>
                                        <div className="shrink-0 absolute sm:static right-4 top-4">
                                            {task.done ? (
                                                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                                            ) : (
                                                <Circle className="h-6 w-6 text-slate-300" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Lojinha de Recompensas */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Gift className="h-5 w-5 text-purple-500" />
                                <h2 className="text-xl font-bold text-slate-800">Meus Prêmios</h2>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
                            <p className="text-xs text-slate-500 font-medium text-center bg-slate-50 p-2 rounded-lg">
                                Recompensas definidas pelos seus tutores. Junte estrelas e resgate!
                            </p>

                            <div className="space-y-4">
                                {rewards.map((reward, i) => {
                                    const prevTarget = i === 0 ? 0 : rewards[i - 1].target;
                                    let progress = 0;

                                    if (stars >= reward.target) progress = 100;
                                    else if (stars > prevTarget) progress = Math.round(((stars - prevTarget) / (reward.target - prevTarget)) * 100);

                                    const isUnlocked = stars >= reward.target;
                                    const starsInMilestone = Math.min(Math.max(stars - prevTarget, 0), reward.target - prevTarget);
                                    const milestoneTotal = reward.target - prevTarget;

                                    return (
                                        <div key={reward.id} className={`relative flex flex-col gap-3 p-4 rounded-2xl border transition-all ${isUnlocked ? 'bg-purple-50/50 border-purple-200 shadow-sm' : 'bg-white border-slate-100'}`}>
                                            <div className="flex items-center gap-3">
                                                <div className={`h-12 w-12 rounded-xl shadow-sm flex items-center justify-center text-2xl shrink-0 ${isUnlocked ? 'bg-white border border-purple-100' : 'bg-slate-50 border border-slate-100 grayscale-[0.5]'}`}>
                                                    {reward.emoji}
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`text-sm font-bold leading-tight ${isUnlocked ? 'text-purple-900' : 'text-slate-700'}`}>{reward.title}</p>
                                                    {isUnlocked && <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest mt-1 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Conquistado</span>}
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center gap-1 font-black text-sm text-slate-500">
                                                        {starsInMilestone} <span className="text-xs text-slate-300">/ {milestoneTotal}</span> <Star className={`h-3 w-3 ${progress > 0 ? 'fill-amber-400 text-amber-500' : 'fill-slate-300 text-slate-300'}`} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Barra de Progresso do Milestone */}
                                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200/50">
                                                <div
                                                    className={`h-full transition-all duration-1000 ease-out ${isUnlocked ? 'bg-purple-500' : 'bg-gradient-to-r from-amber-400 to-amber-500 text-transparent'}`}
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>

                                            {isUnlocked && (
                                                <Button
                                                    size="sm"
                                                    className="w-full mt-1 bg-purple-600 hover:bg-purple-700 text-white font-bold border-none shadow-md shadow-purple-200"
                                                    onClick={() => alert(`Prêmio resgatado! ${reward.title}`)}
                                                >
                                                    Resgatar Agora
                                                </Button>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
