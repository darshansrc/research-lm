"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, Download } from "lucide-react";

type Note = {
  id: string;
  title: string;
  content: string;
};

export function NotesInterface() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");

  const addNote = () => {
    if (newNoteTitle && newNoteContent) {
      const newNote: Note = {
        id: Math.random().toString(36).substr(2, 9),
        title: newNoteTitle,
        content: newNoteContent,
      };
      setNotes([...notes, newNote]);
      setNewNoteTitle("");
      setNewNoteContent("");
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const downloadNote = (note: Note) => {
    const element = document.createElement("a");
    const file = new Blob([note.content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${note.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div className="mb-4">
        <Input
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          placeholder="Note title"
          className="mb-2"
        />
        <Textarea
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          placeholder="Note content"
          className="mb-2"
        />
        <Button onClick={addNote}>Add Note</Button>
      </div>
      <ScrollArea className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{note.content}</p>
              </CardContent>
              <CardFooter className="justify-between">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteNote(note.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => downloadNote(note)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
