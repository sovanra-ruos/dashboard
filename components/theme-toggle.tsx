"use client"

import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {useEffect, useState} from "react";



export function ThemeToggle() {
    // const { setTheme, theme } = useTheme()

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    // Only run the theme logic after component mounts
    useEffect(() => {
        setMounted(true); // Set mounted to true after the component has mounted
    }, []);

    // Don't render anything until the component has mounted
    if (!mounted) return null;

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="h-10 w-10"
        >
            <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}

