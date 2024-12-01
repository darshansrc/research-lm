"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, File, Trash2 } from "lucide-react";

type FileItem = {
  id: string;
  name: string;
  selected: boolean;
};

export function Sidebar() {
  const [files, setFiles] = useState<FileItem[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      selected: true,
    }));
    setFiles([...files, ...newFiles]);
  };

  const toggleFileSelection = (id: string) => {
    setFiles(
      files.map((file) =>
        file.id === id ? { ...file, selected: !file.selected } : file,
      ),
    );
  };

  const deleteFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div className="w-64 hidden lg:flex border-r p-4  flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Files</h2>
      <div className="mb-4">
        <Input
          id="file-upload"
          type="file"
          multiple
          onChange={handleFileUpload}
        />
        <Label htmlFor="file-upload" className="cursor-pointer">
          <Button variant="outline" className="w-full">
            <Upload className="mr-2 h-4 w-4" /> Upload Files
          </Button>
        </Label>
      </div>
      <ScrollArea className="flex-grow">
        {files.map((file) => (
          <div key={file.id} className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Checkbox
                id={`file-${file.id}`}
                checked={file.selected}
                onCheckedChange={() => toggleFileSelection(file.id)}
              />
              <Label
                htmlFor={`file-${file.id}`}
                className="ml-2 cursor-pointer"
              >
                <File className="h-4 w-4 inline mr-2" />
                {file.name}
              </Label>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteFile(file.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
