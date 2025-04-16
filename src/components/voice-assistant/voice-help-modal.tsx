"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { HelpCircle } from 'lucide-react'

const VoiceHelpModal = () => {
  const [open, setOpen] = useState(false)
  
  const commands = [
    { command: "Go to home", description: "Navigate to the home page" },
    { command: "Open about", description: "Navigate to the about page" },
    { command: "Go to services", description: "Navigate to the services page" },
    { command: "Open portfolio", description: "Navigate to the portfolio page" },
    { command: "Go to blog", description: "Navigate to the blog page" },
    { command: "Open skills", description: "Navigate to the skills page" },
    { command: "Go to contact", description: "Navigate to the contact page" },
    { command: "Who are you", description: "Learn about the voice assistant" },
    { command: "What can you do", description: "Get help with available commands" },
  ]
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed bottom-4 left-4 z-50 rounded-full h-12 w-12 shadow-lg"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Voice Assistant Help</DialogTitle>
          <DialogDescription>
            Use these voice commands to navigate the website
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="rounded-md border">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-10 px-4 text-left font-medium">Command</th>
                  <th className="h-10 px-4 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {commands.map((item, index) => (
                  <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle font-medium">{item.command}</td>
                    <td className="p-4 align-middle">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default VoiceHelpModal