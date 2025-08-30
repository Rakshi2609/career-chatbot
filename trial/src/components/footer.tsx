import Link from "next/link";
import { Bot, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
             <Link href="/" className="flex items-center gap-2">
                <Bot className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">MIRA AI</span>
            </Link>
            <p className="text-muted-foreground text-sm">A sophisticated, voice-enabled AI chatbot application.</p>
             <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="text-base text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link href="/about" className="text-base text-muted-foreground hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="text-base text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
           <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-base text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-base text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
           <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-base text-muted-foreground">123 AI Avenue</li>
              <li className="text-base text-muted-foreground">Innovate City, 12345</li>
              <li className="text-base text-muted-foreground">contact@mira-ai.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} MIRA AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
