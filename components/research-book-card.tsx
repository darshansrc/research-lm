"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fromNow, generateGradient } from "@/utils";
import { Loader, MoreVertical, Pencil, Trash, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { deleteResearchBook, updateResearchBook } from "@/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ResearchBook {
  id: string;
  name: string;
  description: string;
  lastEdited: string;
}

export function ResearchBookCard({ book }: { book: ResearchBook }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editName, setEditName] = useState(book.name);
  const [editDescription, setEditDescription] = useState(book.description);
  const router = useRouter();

  const gradientStyle = {
    background: generateGradient(book.name),
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await deleteResearchBook(book.id);
    if (result.success) {
      toast.success(result.message);
      setIsDeleteDialogOpen(false);
      // You might want to refresh the list of books here or remove this card from the UI
    } else {
      toast.error("Failed to delete the research book");
    }
    setIsLoading(false);
  };

  const handleEdit = async () => {
    setIsLoading(true);
    const result = await updateResearchBook(book.id, editName, editDescription);
    if (result.success) {
      toast.success(result.message);
      setIsEditDialogOpen(false);
      // You might want to update the book data in the UI here
    } else {
      toast.error("Failed to update the research book");
    }
    setIsLoading(false);
  };

  return (
    <Card className="overflow-hidden bg-muted/40">
      <div className="h-32" style={gradientStyle}></div>
      <CardHeader className="mb-0 pb-2 flex flex-row justify-between items-center">
        <CardTitle>{book.name}</CardTitle>
      </CardHeader>
      <CardContent className="pz-0">
        <p className="text-sm text-muted-foreground">{book.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">
            Edited {fromNow(book.lastEdited)}
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="border dark:border-neutral-700"
              onClick={() => router.push(`/note/${book.id}`)}
            >
              Open
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="border dark:border-neutral-700"
                  size="icon"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:bg-neutral-900">
                <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setIsDeleteDialogOpen(true)}>
                  <Trash2 className="mr-2 h-4 w-4 " />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="dark:bg-neutral-900">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this research book?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              research book and remove its data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="dark:bg-neutral-900"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={handleDelete}
            >
              {isLoading && <Loader className="h-5 w-5 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="dark:bg-neutral-900">
          <DialogHeader>
            <DialogTitle>Edit Research Book</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="dark:bg-neutral-900"
            >
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={handleEdit}>
              {isLoading && <Loader className="h-5 w-5 animate-spin" />}Save
              changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
