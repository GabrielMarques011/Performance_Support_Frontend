import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, Search, Filter, Plus, Eye, Edit, Trash2, Shield, User, MoreHorizontal,
  ArrowUpDown, Calendar, Building, CheckCircle, XCircle, UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { supabase } from "../lib/supabase";

const teams = ["Todos", "Suporte Nível 1", "Suporte Nível 2", "Suporte Nível 3", "Desenvolvimento", "Vendas", "Marketing", "RH", "Financeiro"];
const userTypes = ["Todos", "user", "admin"];
const statusOptions = ["Todos", "Ativo", "Inativo"];

// ---------- COMPONENTE: UserCard ----------
function UserCard({ user, onView, onEdit, onDeactivate }: any) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Não disponível";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Não disponível" : date.toLocaleDateString('pt-BR');
  };

  return (
    <Card className="group bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-blue-400/30 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
                user.active === 'Ativo' ? 'bg-emerald-500' : 'bg-red-500'
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent truncate">
                {user.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={user.type === 'admin' ? 'default' : 'secondary'} className="text-xs">
                  {user.type === 'admin' ? (<><Shield className="w-3 h-3 mr-1" />Admin</>) : (<><User className="w-3 h-3 mr-1" />Usuário</>)}
                </Badge>
                <Badge variant={user.active === 'Ativo' ? 'default' : 'destructive'} className="text-xs">
                  {user.active}
                </Badge>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
              {/* <DropdownMenuItem onClick={() => onView(user)} className="text-white hover:bg-slate-700">
                <Eye className="w-4 h-4 mr-2" />Visualizar
              </DropdownMenuItem> */}
              <DropdownMenuItem onClick={() => onEdit(user)} className="text-white hover:bg-slate-700">
                <Edit className="w-4 h-4 mr-2" />Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDeactivate(user)} className="text-red-400 hover:bg-red-500/20 hover:text-red-300">
                <Trash2 className="w-4 h-4 mr-2" />Inativar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-slate-400">
            <Building className="w-4 h-4 mr-2" /><span className="truncate">{user.role}</span>
          </div>
          <div className="flex items-center text-sm text-slate-400">
            <Users className="w-4 h-4 mr-2" /><span className="truncate">{user.team}</span>
          </div>
          <div className="flex items-center text-sm text-slate-400">
            <Calendar className="w-4 h-4 mr-2" /><span>Início: {formatDate(user.start_date)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------- COMPONENTE: EditUserModal ----------
function EditUserModal({ isOpen, onClose, user, onSave }: any) {
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    team: "",
    type: "",
    active: "",
  });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase.from('users').update(formData).eq('id', user.id);
      if (error) throw error;

      toast({ title: "Usuário atualizado", description: `${formData.name} foi atualizado com sucesso.` });
      onSave(formData);
      onClose();
    } catch (err: any) {
      toast({ title: "Erro", description: err.message, variant: "destructive" });
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800/95 backdrop-blur-sm border-slate-700/50">
        <DialogHeader>
          <DialogTitle className="text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Editar Usuário
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Altere as informações do usuário {user.name}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label>Nome</Label>
            <Input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
          </div>
          <div>
            <Label>Equipe</Label>
            <Select value={formData.team} onValueChange={(val) => handleChange("team", val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => <SelectItem key={team} value={team}>{team}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Tipo</Label>
            <Select value={formData.type} onValueChange={(val) => handleChange("type", val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {userTypes.filter(t => t !== "Todos").map((type) => (
                  <SelectItem key={type} value={type}>{type === "admin" ? "Administrador" : "Usuário"}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Status</Label>
            <Select value={formData.active} onValueChange={(val) => handleChange("active", val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.filter(s => s !== "Todos").map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---------- COMPONENTE PRINCIPAL: ManageUsers ----------
export default function ManageUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("Todos");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editUser, setEditUser] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) console.error("Erro ao buscar usuários:", error.message);
      else {
        setUsers(data);
        setFilteredUsers(data);
      }
    };
    fetchUsers();
  }, []);

  const handleView = (user: any) => {
    toast({ title: "Visualizar", description: `Visualizando ${user.name}` });
  };

  const handleEdit = (user: any) => {
    setEditUser(user); // abre o modal de edição
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTeam = selectedTeam === "Todos" || user.team === selectedTeam;
      const matchesType = selectedType === "Todos" || user.type === selectedType;
      const matchesStatus = selectedStatus === "Todos" || user.active === selectedStatus;
      return matchesSearch && matchesTeam && matchesType && matchesStatus;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      if (sortBy === 'start_date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        aValue = aValue?.toString().toLowerCase();
        bValue = bValue?.toString().toLowerCase();
      }
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedTeam, selectedType, selectedStatus, sortBy, sortOrder]);

  // ---------- FUNÇÕES ----------
  const handleDeactivate = async (user: any) => {
    try {
      const { error } = await supabase.from('users').update({ active: 'Inativo' }).eq('id', user.id);
      if (error) throw error;

      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, active: 'Inativo' } : u));
      toast({ title: "Usuário inativado", description: `${user.name} agora está inativo.` });
    } catch (err: any) {
      toast({ title: "Erro", description: err.message, variant: "destructive" });
    }
  };

  const handleSaveEdit = (updatedUser: any) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.active === "Ativo").length,
    inactive: users.filter(u => u.active === "Inativo").length,
    admins: users.filter(u => u.type === "admin").length,
  };

  return (
    <div className="min-h-screen bg-background p-6">
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl shadow-black/10 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-blue-400/30">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Gerenciar Usuários
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Administre os membros da sua equipe
              </p>
            </div>
          </div>
          <Button
            /* variant="outline" */
            onClick={() => navigate("/create")}
            className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Usuário
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl shadow-black/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-blue-400/30">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-400">Total</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl shadow-black/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 ring-1 ring-emerald-400/30">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-400">Ativos</p>
                <p className="text-3xl font-bold text-white">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl shadow-black/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 ring-1 ring-red-400/30">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-400">Inativos</p>
                <p className="text-3xl font-bold text-white">{stats.inactive}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl shadow-black/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 ring-1 ring-amber-400/30">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-400">Admins</p>
                <p className="text-3xl font-bold text-white">{stats.admins}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl shadow-black/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            <Filter className="w-5 h-5 text-primary" />
            <span>Filtros</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-300">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Nome, email ou cargo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600/50 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-300">Equipe</Label>
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600/50 focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {teams.map((team) => (
                    <SelectItem key={team} value={team} className="text-white hover:bg-slate-700">
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-300">Tipo</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600/50 focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {userTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-white hover:bg-slate-700">
                      {type === "Todos" ? "Todos" : type === "admin" ? "Administrador" : "Usuário"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-300">Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600/50 focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status} className="text-white hover:bg-slate-700">
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-300">Ordenar por</Label>
              <Button
                variant="outline"
                onClick={() => handleSort("name")}
                className="w-full justify-between bg-slate-700/50 border-slate-600/50 hover:bg-slate-600/50"
              >
                <span>Nome</span>
                <ArrowUpDown className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Usuários ({filteredUsers.length})
          </h2>
        </div>

        {filteredUsers.length === 0 ? (
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl shadow-black/10">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">Nenhum usuário encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou{" "}
                <button
                  onClick={() => navigate("/create")}
                  className="text-primary hover:underline"
                >
                  criar um novo usuário
                </button>
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onView={handleView}
                onEdit={handleEdit}
                onDeactivate={handleDeactivate}
              />
            ))}
            {/* O modal fica fora do map */}
            {editUser && (
              <EditUserModal
                isOpen={!!editUser}
                onClose={() => setEditUser(null)}
                user={editUser}
                onSave={handleSaveEdit}
              />
            )}
          </div>
        )}
      </div>
    </div>
  </div>
  );
}