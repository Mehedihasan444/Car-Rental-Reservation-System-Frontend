import { Moon, Sun, Laptop } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative dark:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300 border-0 shadow-none hover:shadow-lg"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-500" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-2 border-gray-200/50 dark:border-gray-700/50 shadow-xl"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={`cursor-pointer hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-yellow-500/20 transition-all duration-200 ${
            theme === "light" ? "bg-amber-500/10 font-semibold" : ""
          }`}
        >
          <Sun className="mr-2 h-4 w-4 text-amber-500" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={`cursor-pointer hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-indigo-500/20 transition-all duration-200 ${
            theme === "dark" ? "bg-blue-500/10 font-semibold" : ""
          }`}
        >
          <Moon className="mr-2 h-4 w-4 text-blue-500" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={`cursor-pointer hover:bg-gradient-to-r hover:from-gray-500/20 hover:to-slate-500/20 transition-all duration-200 ${
            theme === "system" ? "bg-gray-500/10 font-semibold" : ""
          }`}
        >
          <Laptop className="mr-2 h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
