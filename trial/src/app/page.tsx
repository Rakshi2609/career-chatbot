import MiraChat from '@/components/mira-chat';

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-128px)] flex-col items-center justify-center p-2 sm:p-4 md:p-8 animated-gradient">
      <MiraChat />
    </div>
  );
}
