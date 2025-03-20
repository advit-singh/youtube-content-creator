'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">{parsedContent.title}</h1>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Video Description</h2>
                <p className="text-gray-600 whitespace-pre-line">{parsedContent.description}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Outline</h2>
                <div className="prose max-w-none text-gray-600 whitespace-pre-line">
                  {parsedContent.outline}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Talking Points</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {parsedContent.talkingPoints.map((point, index) => (
                    <li key={index} className="text-gray-600">{point}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Suggested Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {parsedContent.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-8">
              <button
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
