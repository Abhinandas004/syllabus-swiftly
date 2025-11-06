import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Trash2, Download, Eye, BookOpen } from "lucide-react";
import { downloadPdf, type NoteContent } from "@/utils/pdfGenerator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SavedNote {
  id: string;
  title: string;
  subject: string;
  content: NoteContent;
  created_at: string;
  updated_at: string;
}

const SavedNotes = () => {
  const [notes, setNotes] = useState<SavedNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadSavedNotes();
  }, []);

  const loadSavedNotes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to view saved notes.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      const { data, error } = await supabase
        .from("saved_notes")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setNotes((data as any) || []);
    } catch (error) {
      console.error("Error loading saved notes:", error);
      toast({
        title: "Error",
        description: "Failed to load saved notes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("saved_notes")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Note deleted",
        description: "The note has been removed from your library.",
      });
      
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Error",
        description: "Failed to delete note.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = (note: SavedNote) => {
    downloadPdf(note.content);
    toast({
      title: "PDF Downloaded",
      description: `${note.title} has been downloaded successfully.`,
    });
  };

  const handleView = (note: SavedNote) => {
    navigate("/notes", { state: { noteData: note.content } });
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
            <p className="text-lg text-muted-foreground">Loading your saved notes...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">My Saved Notes</h1>
            <p className="text-lg text-muted-foreground">
              Access and manage all your generated study notes
            </p>
          </div>

          {notes.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">No saved notes yet</h2>
              <p className="text-muted-foreground mb-6">
                Start by generating your first study notes from a syllabus
              </p>
              <Button onClick={() => navigate("/")} variant="hero">
                Generate Notes
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <Card key={note.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(note.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    {note.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    Subject: {note.subject}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Updated: {new Date(note.updated_at).toLocaleDateString()}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleView(note)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDownload(note)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SavedNotes;
