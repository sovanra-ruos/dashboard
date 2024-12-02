"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2, Clock, Info, RefreshCcw, Rocket, XCircle } from 'lucide-react'

interface Log {
    id: string
    timestamp: string
    type: 'build' | 'deploy'
    status: 'success' | 'error' | 'warning' | 'info'
    message: string
    duration?: number
}

const mockLogs: Log[] = [
    { id: '1', timestamp: '2023-11-29T10:00:00Z', type: 'build', status: 'info', message: 'Starting build process...', duration: 0 },
    { id: '2', timestamp: '2023-11-29T10:01:00Z', type: 'build', status: 'info', message: 'Installing dependencies...', duration: 60 },
    { id: '3', timestamp: '2023-11-29T10:02:00Z', type: 'build', status: 'success', message: 'Dependencies installed successfully.', duration: 60 },
    { id: '4', timestamp: '2023-11-29T10:03:00Z', type: 'build', status: 'info', message: 'Compiling project...', duration: 60 },
    { id: '5', timestamp: '2023-11-29T10:04:00Z', type: 'build', status: 'warning', message: 'Detected unused variables in src/components/Header.tsx', duration: 60 },
    { id: '6', timestamp: '2023-11-29T10:05:00Z', type: 'build', status: 'success', message: 'Build completed successfully.', duration: 60 },
    { id: '7', timestamp: '2023-11-29T10:06:00Z', type: 'deploy', status: 'info', message: 'Starting deployment process...', duration: 0 },
    { id: '8', timestamp: '2023-11-29T10:07:00Z', type: 'deploy', status: 'info', message: 'Uploading build artifacts...', duration: 60 },
    { id: '9', timestamp: '2023-11-29T10:08:00Z', type: 'deploy', status: 'success', message: 'Artifacts uploaded successfully.', duration: 60 },
    { id: '10', timestamp: '2023-11-29T10:09:00Z', type: 'deploy', status: 'error', message: 'Failed to update database schema. Rolling back changes.', duration: 60 },
    { id: '11', timestamp: '2023-11-29T10:10:00Z', type: 'deploy', status: 'info', message: 'Rollback completed. Deployment failed.', duration: 60 },
]

function getStatusIcon(status: Log['status']) {
    switch (status) {
        case 'success':
            return <CheckCircle2 className="h-5 w-5 text-green-500" />
        case 'error':
            return <XCircle className="h-5 w-5 text-red-500" />
        case 'warning':
            return <AlertCircle className="h-5 w-5 text-yellow-500" />
        default:
            return <Info className="h-5 w-5 text-blue-500" />
    }
}

function LogEntry({ log }: { log: Log }) {
    return (
        <div className="mb-4 last:mb-0 p-4 bg-card hover:bg-accent/50 rounded-lg transition-colors">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    {getStatusIcon(log.status)}
                    <Badge variant="outline" className="ml-2 mr-2">
                        {log.type}
                    </Badge>
                    <span className="text-sm font-medium">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <Badge variant="secondary">{log.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{log.message}</p>
            {log.duration !== undefined && (
                <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    Duration: {log.duration}s
                </div>
            )}
        </div>
    )
}

export default function BuildDeployLogs() {
    const [activeTab, setActiveTab] = useState<'all' | 'build' | 'deploy'>('all')
    const [isRefreshing, setIsRefreshing] = useState(false)

    const filteredLogs = activeTab === 'all'
        ? mockLogs
        : mockLogs.filter(log => log.type === activeTab)

    const buildDuration = mockLogs
        .filter(log => log.type === 'build')
        .reduce((total, log) => total + (log.duration || 0), 0)

    const deployDuration = mockLogs
        .filter(log => log.type === 'deploy')
        .reduce((total, log) => total + (log.duration || 0), 0)

    const refreshLogs = () => {
        setIsRefreshing(true)
        // Simulate API call
        setTimeout(() => {
            setIsRefreshing(false)
        }, 1000)
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Build and Deploy Logs</h1>
                <Button onClick={refreshLogs} disabled={isRefreshing}>
                    <RefreshCcw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh Logs
                </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Build Time</CardTitle>
                        <Rocket className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{buildDuration}s</div>
                        <Progress value={(buildDuration / (buildDuration + deployDuration)) * 100} className="mt-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Deploy Time</CardTitle>
                        <Rocket className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{deployDuration}s</div>
                        <Progress value={(deployDuration / (buildDuration + deployDuration)) * 100} className="mt-2" />
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Latest Logs</CardTitle>
                    <CardDescription>View the most recent build and deployment activities</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
                        <TabsList className="mb-4">
                            <TabsTrigger value="all">All Logs</TabsTrigger>
                            <TabsTrigger value="build">Build Logs</TabsTrigger>
                            <TabsTrigger value="deploy">Deploy Logs</TabsTrigger>
                        </TabsList>
                        <TabsContent value={activeTab}>
                            <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                                {filteredLogs.map((log) => (
                                    <LogEntry key={log.id} log={log} />
                                ))}
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}

