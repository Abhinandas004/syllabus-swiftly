import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";

import { YouTubeVideos } from "@/components/YouTubeVideos";
import { downloadPdf, type NoteContent } from "@/utils/pdfGenerator";
import { useToast } from "@/hooks/use-toast";

const EnhancedNotes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const noteData = location.state?.noteData as NoteContent | undefined;

  if (!noteData) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">No notes data found</h1>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  const handleDownload = () => {
    downloadPdf(noteData);
    toast({
      title: "PDF Downloaded Successfully",
      description: "Please note: This content is AI-generated and may contain inaccuracies. We recommend reviewing and verifying the information before use for academic purposes.",
      duration: 8000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <Button variant="hero" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{noteData.title}</h1>
          <p className="text-xl text-muted-foreground">{noteData.subject}</p>
        </div>

        {/* Main Content */}
        {noteData.modules ? (
          <div className="space-y-8">
            {noteData.modules.map((module, moduleIdx) => (
              <div key={moduleIdx} className="bg-card rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{module.name}</h2>
                {module.description && (
                  <p className="text-muted-foreground mb-6">{module.description}</p>
                )}

                <div className="space-y-8">
                  {module.chapters.map((chapter, chapterIdx) => (
                    <div key={chapterIdx} className="border-l-4 border-primary pl-6">
                      <h3 className="text-xl font-semibold mb-3">{chapter.name}</h3>
                      
                      {chapter.description && (
                        <p className="text-muted-foreground mb-4">{chapter.description}</p>
                      )}

                      {chapter.definition && (
                        <div className="bg-accent/50 p-4 rounded-lg mb-4">
                          <p className="font-medium">{chapter.definition}</p>
                        </div>
                      )}

                      {chapter.keyPoints && chapter.keyPoints.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Key Points:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {chapter.keyPoints.map((point, idx) => (
                              <li key={idx} className="text-sm">{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Additional Resources */}
                      <div className="mt-6">
                        <YouTubeVideos topic={chapter.name} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : noteData.topics ? (
          <div className="space-y-4">
            {noteData.topics.map((topic, idx) => (
              <div key={idx} className="bg-card rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">{topic}</h3>
                
                <div>
                  <YouTubeVideos topic={topic} />
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EnhancedNotes;
