import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/sidebar";
import { ChatInterface } from "@/components/chat";
import { NotesInterface } from "@/components/notes";
import { getCurrentUser } from "@/actions";

export default async function ResearchLMPlayground() {
  const user = await getCurrentUser();
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">ResearchLM Playground</h1>
        <Tabs defaultValue="chat" className="w-full">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="chat">
            <ChatInterface user={user} />
          </TabsContent>
          <TabsContent value="notes">
            <NotesInterface />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
