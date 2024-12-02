"use client"

import { useState, useMemo } from "react"
import { MoreVertical, Rocket, Database, Code, GitBranch, Filter, Plus, Search } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Project {
    id: string
    name: string
    type: "frontend" | "backend" | "database" | "sub-workspace"
    updatedAt: string
    progress: number
    collaborators: number
}

interface Workspace {
    id: string
    name: string
    projects: Project[]
}

const workspaces: Workspace[] = [
    {
        id: "workspace01",
        name: "Workspace 01",
        projects: [
            { id: "1", name: "Voluminous Luisa", type: "frontend", updatedAt: "26 minutes ago", progress: 75, collaborators: 3 },
            { id: "2", name: "Fancy Rosalie", type: "backend", updatedAt: "40 minutes ago", progress: 30, collaborators: 2 },
            { id: "3", name: "Lost Ardys", type: "database", updatedAt: "15 hours ago", progress: 90, collaborators: 4 },
            { id: "4", name: "Quantum Nexus", type: "sub-workspace", updatedAt: "2 days ago", progress: 60, collaborators: 5 },
            { id: "5", name: "Stellar Forge", type: "frontend", updatedAt: "3 days ago", progress: 45, collaborators: 3 },
            { id: "6", name: "Data Dynamo", type: "database", updatedAt: "5 days ago", progress: 80, collaborators: 2 },
            { id: "7", name: "Code Crusader", type: "backend", updatedAt: "1 week ago", progress: 95, collaborators: 4 },
            { id: "8", name: "Nebula Network", type: "sub-workspace", updatedAt: "2 weeks ago", progress: 20, collaborators: 6 },
            { id: "9", name: "Pixel Perfect", type: "frontend", updatedAt: "3 weeks ago", progress: 70, collaborators: 3 },
        ]
    },
    {
        id: "workspace02",
        name: "Workspace 02",
        projects: [
            { id: "10", name: "Project Alpha", type: "frontend", updatedAt: "1 day ago", progress: 50, collaborators: 1 },
            { id: "11", name: "Project Beta", type: "backend", updatedAt: "3 days ago", progress: 25, collaborators: 2 },
            { id: "12", name: "Project Gamma", type: "database", updatedAt: "1 week ago", progress: 100, collaborators: 3 },
        ]
    },
    {
        id: "workspace03",
        name: "Workspace 03",
        projects: [
            { id: "13", name: "Project X", type: "sub-workspace", updatedAt: "2 days ago", progress: 85, collaborators: 4 },
            { id: "14", name: "Project Y", type: "frontend", updatedAt: "4 days ago", progress: 65, collaborators: 2 },
            { id: "15", name: "Project Z", type: "backend", updatedAt: "6 days ago", progress: 35, collaborators: 1 },
        ]
    },
    {
        id: "workspace04",
        name: "Workspace 04",
        projects: [
            { id: "16", name: "Data Hub", type: "database", updatedAt: "1 day ago", progress: 95, collaborators: 5 },
            { id: "17", name: "API Gateway", type: "backend", updatedAt: "3 days ago", progress: 75, collaborators: 3 },
            { id: "18", name: "User Dashboard", type: "frontend", updatedAt: "5 days ago", progress: 40, collaborators: 2 },
        ]
    }
]

const projectTypes: Project["type"][] = ["frontend", "backend", "database", "sub-workspace"]

function getProjectIcon(type: Project["type"]) {
    switch (type) {
        case "frontend":
            return <Rocket className="h-4 w-4" />
        case "backend":
            return <Code className="h-4 w-4" />
        case "database":
            return <Database className="h-4 w-4" />
        case "sub-workspace":
            return <GitBranch className="h-4 w-4" />
    }
}

export function WorkspaceDetails() {
    const [selectedWorkspace, setSelectedWorkspace] = useState<string>("workspace01")
    const [selectedTypes, setSelectedTypes] = useState<Project["type"][]>(projectTypes)
    const [searchQuery, setSearchQuery] = useState<string>("")

    const currentWorkspace = workspaces.find(ws => ws.id === selectedWorkspace) || workspaces[0]

    const filteredProjects = useMemo(() => {
        return currentWorkspace.projects.filter(project =>
            selectedTypes.includes(project.type) &&
            project.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [currentWorkspace.projects, selectedTypes, searchQuery])

    const handleTypeToggle = (type: Project["type"]) => {
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold text-primary">Workspace Projects</h2>
                <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> New Project
                </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Select value={selectedWorkspace} onValueChange={setSelectedWorkspace}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Select a workspace" />
                    </SelectTrigger>
                    <SelectContent>
                        {workspaces.map((workspace) => (
                            <SelectItem key={workspace.id} value={workspace.id}>
                                {workspace.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full sm:w-[200px]">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter Project Types
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        {projectTypes.map((type) => (
                            <DropdownMenuCheckboxItem
                                key={type}
                                checked={selectedTypes.includes(type)}
                                onCheckedChange={() => handleTypeToggle(type)}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative w-full sm:w-auto flex-1">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                    />
                </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                    <Card
                        key={project.id}
                        className="bg-card"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                        {getProjectIcon(project.type)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold leading-none">{project.name}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Updated {project.updatedAt}
                                        </p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-8 w-8 p-0"
                                        >
                                            <span className="sr-only">Open menu</span>
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View details</DropdownMenuItem>
                                        <DropdownMenuItem>Edit project</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">
                                            Delete project
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Progress</span>
                                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-2" />
                            </div>
                        </CardContent>
                        <CardFooter className="p-6 pt-0 flex justify-between items-center">
                            <Badge variant="secondary">
                                {project.type}
                            </Badge>
                            <div className="flex items-center space-x-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-muted-foreground"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                                <span className="text-sm text-muted-foreground">{project.collaborators}</span>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

