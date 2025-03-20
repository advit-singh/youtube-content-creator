'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GeneratedContent {
  title: string;
  description: string;
  outline: string;
  talkingPoints: string[];
  tags: string[];
}

export default function GeneratedContentPage() {
  const router = useRouter();
  const [content, setContent] = useState<string>('');
  const [parsedContent, setParsedContent] = useState<GeneratedContent | null>(null);

  useEffect(() => {
    const storedContent = localStorage.getItem('generatedContent');
    if (!storedContent) {
      router.push('/');
      return;
    }

    setContent(storedContent);
    try {
      // Parse the content into sections
      const sections = storedContent.split('\n\n');
      const parsed: GeneratedContent = {
        title: '',
        description: '',
        outline: '',
        talkingPoints: [],
        tags: []
      };

      sections.forEach(section => {
        if (section.startsWith('1. ')) {
          parsed.title = section.replace('1. ', '');
        } else if (section.startsWith('2. ')) {
          parsed.description = section.replace('2. ', '');
        } else if (section.startsWith('3. ')) {
          parsed.outline = section.replace('3. ', '');
        } else if (section.startsWith('4. ')) {
          parsed.talkingPoints = section
            .replace('4. ', '')
            .split('\n')
            .filter(point => point.trim() !== '')
            .map(point => point.trim());
        } else if (section.startsWith('5. ')) {
          parsed.tags = section
            .replace('5. ', '')
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag !== '');
        }
      });

      setParsedContent(parsed);
    } catch (error) {
      console.error('Error parsing content:', error);
    }
  }, [router]);

  const handleBack = () => {
    router.push('/');
  };

  if (!parsedContent) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Generating Your Content...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{parsedContent.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Video Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line">{parsedContent.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Outline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none text-muted-foreground whitespace-pre-line">
                    {parsedContent.outline}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Talking Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {parsedContent.talkingPoints.map((point, index) => (
                      <li key={index} className="text-muted-foreground">{point}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Suggested Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {parsedContent.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleBack}
                variant="default"
              >
                Back to Form
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
