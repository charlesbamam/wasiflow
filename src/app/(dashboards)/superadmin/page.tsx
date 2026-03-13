import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function SuperAdminDashboardPage() {
    return (
        <div className="flex-1 p-8 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Configurações Globais</h1>
                        <p className="text-slate-500 mt-2">Visão geral do SaaS HS Xpert.</p>
                    </div>
                    <Button variant="outline" className="text-slate-700 bg-white">Exportar Relatório</Button>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Famílias Ativas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-800">45</div>
                            <p className="text-xs text-slate-500 mt-1">Plano Founder (Máx 100)</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Relatórios Gerados</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-800">1.250</div>
                            <p className="text-xs text-slate-500 mt-1">Neste mês</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Conexões IA</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-800">18.500</div>
                            <p className="text-xs text-slate-500 mt-1">Tokens totais do sistema</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Receita MRR</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-800">R$ 5.800</div>
                            <p className="text-xs text-emerald-600 font-medium mt-1">+12% este mês</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Últimas Famílias Cadastradas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Família</TableHead>
                                    <TableHead>E-mail Responsável</TableHead>
                                    <TableHead>Alunos</TableHead>
                                    <TableHead>Uso de IA</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { name: "Andrade", mail: "papai@andrade.com", students: 2, ia: "90%", status: "Ativa" },
                                    { name: "Silva", mail: "mamae@silva.net", students: 1, ia: "15%", status: "Ativa" },
                                    { name: "Pereira", mail: "lucas@pereira.org", students: 4, ia: "110%", status: "Bloqueada (Token)" },
                                ].map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium text-slate-800">{row.name}</TableCell>
                                        <TableCell className="text-slate-600">{row.mail}</TableCell>
                                        <TableCell>{row.students}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.ia === '110%' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                {row.ia}
                                            </span>
                                        </TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" className="text-xs text-blue-600 bg-blue-50">Impersonar</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
