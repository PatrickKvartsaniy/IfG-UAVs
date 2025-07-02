"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Download,
  Settings,
  Database,
  Shield,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const users = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    email: "s.chen@research.org",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-25",
  },
  {
    id: 2,
    name: "Mike Johnson",
    email: "m.johnson@research.org",
    role: "Researcher",
    status: "Active",
    lastLogin: "2024-01-24",
  },
  {
    id: 3,
    name: "Lisa Wang",
    email: "l.wang@research.org",
    role: "Analyst",
    status: "Active",
    lastLogin: "2024-01-23",
  },
  {
    id: 4,
    name: "Tom Brown",
    email: "t.brown@research.org",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "2024-01-15",
  },
];

const dataEntries = [
  {
    id: 1,
    type: "Species",
    name: "European Kingfisher",
    status: "Published",
    author: "Dr. Chen",
    date: "2024-01-25",
  },
  {
    id: 2,
    type: "Flight Data",
    name: "January Survey #3",
    status: "Processing",
    author: "System",
    date: "2024-01-24",
  },
  {
    id: 3,
    type: "Story Map",
    name: "Seasonal Changes",
    status: "Draft",
    author: "Mike Johnson",
    date: "2024-01-23",
  },
  {
    id: 4,
    type: "Species",
    name: "Brown Trout",
    status: "Published",
    author: "Lisa Wang",
    date: "2024-01-22",
  },
];

export default function AdminPage() {
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(
    null,
  );
  const [isAddingUser, setIsAddingUser] = useState(false);
  const { toast } = useToast();

  const handleDeleteUser = (userId: number) => {
    toast({
      title: "User deleted",
      description: "The user has been successfully removed from the system.",
    });
  };

  const handleAddUser = () => {
    setIsAddingUser(false);
    toast({
      title: "User added",
      description: "New user has been successfully added to the system.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center gap-2 px-4 py-3 border-b">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          <Badge variant="destructive">Admin Access</Badge>
        </div>
      </header>

      <div className="flex-1 p-6">
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="system">System Settings</TabsTrigger>
            <TabsTrigger value="backup">Data & Backup</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">User Management</h2>
              <Button onClick={() => setIsAddingUser(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>System Users</CardTitle>
                <CardDescription>
                  Manage user accounts and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role === "Admin" ? "default" : "secondary"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "Active" ? "default" : "secondary"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete User
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete {user.name}?
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteUser(user.id)}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Add User Dialog */}
            {isAddingUser && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New User</CardTitle>
                  <CardDescription>Create a new user account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="researcher">Researcher</SelectItem>
                        <SelectItem value="analyst">Analyst</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddUser}>Add User</Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingUser(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Content Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Content Entries</CardTitle>
                <CardDescription>
                  Manage species data, flight records, and story maps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <Badge variant="outline">{entry.type}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {entry.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              entry.status === "Published"
                                ? "default"
                                : entry.status === "Processing"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {entry.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{entry.author}</TableCell>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <h2 className="text-2xl font-bold">System Settings</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    General Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable system maintenance mode
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto Backup</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatic daily backups
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        System alerts and updates
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Session Timeout (minutes)</Label>
                    <Input type="number" defaultValue="60" />
                  </div>
                  <div className="space-y-2">
                    <Label>Password Policy</Label>
                    <Select defaultValue="strong">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="strong">Strong</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for all users
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="backup" className="space-y-4">
            <h2 className="text-2xl font-bold">Data & Backup Management</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Database Management
                  </CardTitle>
                  <CardDescription>
                    Manage database operations and maintenance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Database Size</Label>
                    <p className="text-2xl font-bold">2.4 GB</p>
                    <p className="text-sm text-muted-foreground">
                      Last updated: 2024-01-25
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Data
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Backup History</CardTitle>
                  <CardDescription>Recent system backups</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-medium">Full System Backup</p>
                        <p className="text-sm text-muted-foreground">
                          2024-01-25 02:00 AM
                        </p>
                      </div>
                      <Badge>Success</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-medium">Database Backup</p>
                        <p className="text-sm text-muted-foreground">
                          2024-01-24 02:00 AM
                        </p>
                      </div>
                      <Badge>Success</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-medium">Media Files Backup</p>
                        <p className="text-sm text-muted-foreground">
                          2024-01-23 02:00 AM
                        </p>
                      </div>
                      <Badge variant="secondary">Partial</Badge>
                    </div>
                  </div>
                  <Button className="w-full mt-4">Create Manual Backup</Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>System Statistics</CardTitle>
                <CardDescription>
                  Overview of system usage and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">291</p>
                    <p className="text-sm text-muted-foreground">
                      Total Species
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">120</p>
                    <p className="text-sm text-muted-foreground">
                      Flight Records
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">6</p>
                    <p className="text-sm text-muted-foreground">Story Maps</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-sm text-muted-foreground">
                      Active Users
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
