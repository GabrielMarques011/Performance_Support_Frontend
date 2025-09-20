import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Shield, 
  User, 
  MoreHorizontal,
  ArrowUpDown,
  Calendar,
  Mail,
  Building,
  CheckCircle,
  XCircle,
  UserCheck
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

// Mock data para usuários
const mockUsers = [
  {
    id: "maria-santos",
    name: "Maria Santos",
    email: "maria.santos@empresa.com",
    role: "Especialista em Suporte Técnico",
    team: "Suporte Nível 2",
    type: "admin",
    status: "active",
    startDate: "2022-03-15",
    lastLogin: "2024-04-15T10:30:00Z",
    avatar: "MS"
  },
  {
    id: "joao-silva",
    name: "João Silva",
    email: "joao.silva@empresa.com",
    role: "Analista de Suporte",
    team: "Suporte Nível 1",
    type: "user",
    status: "active",
    startDate: "2021-08-10",
    lastLogin: "2024-04-15T09:15:00Z",
    avatar: "JS"
  },
  {
    id: "carlos-rocha",
    name: "Carlos Rocha",
    email: "carlos.rocha@empresa.com",
    role: "Especialista Sênior",
    team: "Suporte Nível 3",
    type: "admin",
    status: "active",
    startDate: "2020-01-15",
    lastLogin: "2024-04-15T11:45:00Z",
    avatar: "CR"
  },
  {
    id: "ana-oliveira",
    name: "Ana Oliveira",
    email: "ana.oliveira@empresa.com",
    role: "Desenvolvedora Pleno",
    team: "Desenvolvimento",
    type: "user",
    status: "inactive",
    startDate: "2023-02-20",
    lastLogin: "2024-04-10T16:20:00Z",
    avatar: "AO"
  },
  {
    id: "pedro-costa",
    name: "Pedro Costa",
    email: "pedro.costa@empresa.com",
    role: "Gerente de Suporte",
    team: "Suporte Nível 2",
    type: "admin",
    status: "active",
    startDate: "2021-11-05",
    lastLogin: "2024-04-15T08:30:00Z",
    avatar: "PC"
  },
  {
    id: "lucia-fernandes",
    name: "Lúcia Fernandes",
    email: "lucia.fernandes@empresa.com",
    role: "Analista de Vendas",
    team: "Vendas",
    type: "user",
    status: "active",
    startDate: "2023-06-12",
    lastLogin: "2024-04-14T17:10:00Z",
    avatar: "LF"
  }
];

const teams = ["Todos", "Suporte Nível 1", "Suporte Nível 2", "Suporte Nível 3", "Desenvolvimento", "Vendas", "Marketing", "RH", "Financeiro"];
const userTypes = ["Todos", "user", "admin"];
const statusOptions = ["Todos", "active", "inactive"];

function UserCard({ user, onView, onEdit, onDelete }: {
  user: any;
  onView: (user: any) => void;
  onEdit: (user: any) => void;
  onDelete: (user: any) => void;
}) {
  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Agora mesmo";
    if (diffInHours < 24) return `Há ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Há ${diffInDays}d`;
    
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <Card className="group bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-blue-400/30 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{user.avatar}</span>
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
                user.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent truncate">
                {user.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={user.type === 'admin' ? 'default' : 'secondary'} className="text-xs">
                  {user.type === 'admin' ? (
                    <><Shield className="w-3 h-3 mr-1" />Admin</>
                  ) : (
                    <><User className="w-3 h-3 mr-1" />Usuário</>
                  )}
                </Badge>
                <Badge variant={user.status === 'active' ? 'default' : 'destructive'} className="text-xs">
                  {user.status === 'active' ? 'Ativo' : 'Inativo'}
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
              <DropdownMenuItem onClick={() => onView(user)} className="text-white hover:bg-slate-700">
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(user)} className="text-white hover:bg-slate-700">
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(user)} 
                className="text-red-400 hover:bg-red-500/20 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-slate-400">
            <Building className="w-4 h-4 mr-2" />
            <span className="truncate">{user.role}</span>
          </div>
          <div className="flex items-center text-sm text-slate-400">
            <Users className="w-4 h-4 mr-2" />
            <span className="truncate">{user.team}</span>
          </div>
          <div className="flex items-center text-sm text-slate-400">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Início: {new Date(user.startDate).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex items-center text-sm text-slate-400">
            <UserCheck className="w-4 h-4 mr-2" />
            <span>Último acesso: {formatLastLogin(user.lastLogin)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DeleteConfirmDialog({ isOpen, onClose, onConfirm, user }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: any;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onConfirm();
    setIsDeleting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800/95 backdrop-blur-sm border-slate-700/50">
        <DialogHeader>
          <DialogTitle className="text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Excluir Usuário
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Tem certeza que deseja excluir o usuário <span className="font-semibold text-white">{user?.name}</span>?
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="bg-slate-700/50 border-slate-600/50 hover:bg-slate-600/50"
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Excluindo...</span>
              </div>
            ) : (
              "Excluir"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ManageUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("Todos");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [deleteUser, setDeleteUser] = useState(null);

  // Filter and sort users
  useEffect(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTeam = selectedTeam === "Todos" || user.team === selectedTeam;
      const matchesType = selectedType === "Todos" || user.type === selectedType;
      const matchesStatus = selectedStatus === "Todos" || user.status === selectedStatus;
      
      return matchesSearch && matchesTeam && matchesType && matchesStatus;
    });

    // Sort users
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'startDate' || sortBy === 'lastLogin') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedTeam, selectedType, selectedStatus, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleView = (user) => {
    navigate(`/?user=${user.id}`);
  };

  const handleEdit = (user) => {
    toast({
      title: "Editar usuário",
      description: `Funcionalidade de edição para ${user.name} será implementada em breve.`,
    });
  };

  const handleDeleteConfirm = () => {
    setUsers(prev => prev.filter(u => u.id !== deleteUser.id));
    toast({
      title: "Usuário excluído",
      description: `${deleteUser.name} foi removido do sistema.`,
    });
    setDeleteUser(null);
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    admins: users.filter(u => u.type === 'admin').length
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
              onClick={() => navigate("/create-user")}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/25"
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
                        {status === "Todos" ? "Todos" : status === "active" ? "Ativo" : "Inativo"}
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
                    onClick={() => navigate("/create-user")}
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
                  onDelete={setDeleteUser}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        onConfirm={handleDeleteConfirm}
        user={deleteUser}
      />
    </div>
  );
}