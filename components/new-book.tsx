import { createNewResearchBook } from "@/actions";
import { Button } from "@/components/ui/button";
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
import { generateRandomName } from "@/utils";
import { ArrowRight, Loader, PlusCircle } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export function NewResearchBook() {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(generateRandomName());
  const [description, setDescription] = React.useState("");
  const handleCreateNewResearchBook = async () => {
    console.log("handleCreateNewResearchBook");
    setLoading(true);
    const assistantId = await createNewResearchBook({
      name,
      description: description || "No description",
    });
    if (assistantId) {
      toast.success("New research book created successfully!");
      setOpen(false);
      setName(generateRandomName());
      setDescription("");
    }
    setLoading(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle size={16} />
          New Research Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-neutral-900">
        <DialogHeader>
          <DialogTitle>Create new research book</DialogTitle>
          <DialogDescription>
            Create a new research book to start your research journey.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className=" items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="  items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={loading}
            onClick={async () => await handleCreateNewResearchBook()}
          >
            {loading && <Loader className="h-5 w-5 animate-spin" />}
            Create Research Book
            {!loading && <ArrowRight className="h-5 w-5" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
