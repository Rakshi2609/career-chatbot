import Image from 'next/image';
import { Bot, Cpu, Milestone } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">About MIRA AI</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              A sophisticated, voice-enabled AI chatbot application built to provide a seamless conversational experience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="mt-2 text-muted-foreground">
                To create intelligent, helpful, and accessible AI companions that enhance daily life and productivity through natural voice interaction.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Cpu className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Our Technology</h3>
              <p className="mt-2 text-muted-foreground">
                MIRA is built on a modern stack including Next.js, React, and cutting-edge AI models to deliver fast, reliable, and intelligent responses.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Milestone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Our Vision</h3>
              <p className="mt-2 text-muted-foreground">
                We envision a future where AI assistants are indistinguishable from human conversation, fostering a more connected and efficient world.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Meet the Team</h2>
            <p className="mt-3 max-w-xl mx-auto text-muted-foreground">
              The passionate minds behind MIRA AI.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
             <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 text-center">
                <Image
                    data-ai-hint="person portrait"
                    src="https://picsum.photos/200/200"
                    alt="Team Member 1"
                    width={100}
                    height={100}
                    className="mx-auto h-24 w-24 rounded-full"
                />
                <h4 className="mt-4 text-lg font-semibold">Alex Johnson</h4>
                <p className="text-primary">Lead AI Developer</p>
                <p className="mt-2 text-sm text-muted-foreground">Architect of the MIRA conversational engine.</p>
             </div>
             <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 text-center">
                <Image
                    data-ai-hint="person portrait"
                    src="https://picsum.photos/201/201"
                    alt="Team Member 2"
                    width={100}
                    height={100}
                    className="mx-auto h-24 w-24 rounded-full"
                />
                <h4 className="mt-4 text-lg font-semibold">Maria Garcia</h4>
                <p className="text-primary">UX/UI Designer</p>
                <p className="mt-2 text-sm text-muted-foreground">Crafting the intuitive and beautiful interface.</p>
             </div>
             <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 text-center">
                <Image
                    data-ai-hint="person portrait"
                    src="https://picsum.photos/202/202"
                    alt="Team Member 3"
                    width={100}
                    height={100}
                    className="mx-auto h-24 w-24 rounded-full"
                />
                <h4 className="mt-4 text-lg font-semibold">Sam Chen</h4>
                <p className="text-primary">Product Manager</p>
                <p className="mt-2 text-sm text-muted-foreground">Guiding the vision and features of MIRA.</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
