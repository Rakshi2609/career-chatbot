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
             {/* Nirvik */}
             <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 text-center">
                <Image
                    src="https://picsum.photos/210/210"
                    alt="Nirvik"
                    width={100}
                    height={100}
                    className="mx-auto h-24 w-24 rounded-full"
                />
                <h4 className="mt-4 text-lg font-semibold">Nirvik</h4>
                <p className="text-primary">ML & Web Engineer</p>
                <p className="mt-2 text-sm text-muted-foreground">Focused on building scalable ML models and web integration.</p>
             </div>
             {/* Soumya */}
             <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 text-center">
                <Image
                    src="https://picsum.photos/211/211"
                    alt="Soumya Gupta"
                    width={100}
                    height={100}
                    className="mx-auto h-24 w-24 rounded-full"
                />
                <h4 className="mt-4 text-lg font-semibold">Soumya Gupta</h4>
                <p className="text-primary">ML & Backend Engineer</p>
                <p className="mt-2 text-sm text-muted-foreground">Designs backend systems and powers AI with ML pipelines.</p>
             </div>
             {/* Rakshith */}
             <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 text-center">
                <Image
                    src="https://picsum.photos/212/212"
                    alt="Rakshith Ganjimut"
                    width={100}
                    height={100}
                    className="mx-auto h-24 w-24 rounded-full"
                />
                <h4 className="mt-4 text-lg font-semibold">Rakshith Ganjimut</h4>
                <p className="text-primary">MERN Developer</p>
                <p className="mt-2 text-sm text-muted-foreground">Full-stack developer bringing MIRA AI to life with MERN & Next.js.</p>
                <div className="mt-3 flex justify-center space-x-4">
                  <a href="https://github.com/Rakshi2609" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/rakshith-ganjimut/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                    LinkedIn
                  </a>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
