import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WikipediaInfoProps {
  topic: string;
}

export const WikipediaInfo = ({ topic }: WikipediaInfoProps) => {
  const [info, setInfo] = useState<{ extract: string; url: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWikipedia = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`
        );
        const data = await response.json();
        
        if (data.extract) {
          setInfo({
            extract: data.extract,
            url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(topic)}`,
          });
        }
      } catch (error) {
        console.error("Wikipedia fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (topic) {
      fetchWikipedia();
    }
  }, [topic]);

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Loading information...</p>
        </CardContent>
      </Card>
    );
  }

  if (!info) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Quick Info: {topic}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{info.extract}</p>
        <Button variant="outline" size="sm" asChild>
          <a href={info.url} target="_blank" rel="noopener noreferrer">
            Read More on Wikipedia
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};
