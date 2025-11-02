import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

interface YouTubeVideosProps {
  topic: string;
}

export const YouTubeVideos = ({ topic }: YouTubeVideosProps) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('search-youtube', {
          body: { query: topic, maxResults: 3 }
        });

        if (error) throw error;
        if (data?.success && data?.videos) {
          setVideos(data.videos);
        }
      } catch (error) {
        console.error("YouTube search error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (topic) {
      fetchVideos();
    }
  }, [topic]);

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Loading video resources...</p>
        </CardContent>
      </Card>
    );
  }

  if (videos.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube className="h-5 w-5 text-red-500" />
          Video Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 p-2 rounded-lg hover:bg-accent transition-colors group"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-32 h-20 object-cover rounded flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium group-hover:text-primary line-clamp-2">
                  {video.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {video.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
