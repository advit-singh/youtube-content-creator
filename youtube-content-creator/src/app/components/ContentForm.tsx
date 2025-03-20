'use client';

import { useState } from 'react';

type FormStep = 'channel' | 'content' | 'output';

interface FormData {
  channel: {
    name: string;
    description: string;
    category: string;
  };
  content: {
    style: string;
    tone: string;
    targetAudience: string;
  };
  output: {
    videoLength: string;
    format: string;
    frequency: string;
  };
}

const initialFormData: FormData = {
  channel: {
    name: '',
    description: '',
    category: '',
  },
  content: {
    style: '',
    tone: '',
    targetAudience: '',
  },
  output: {
    videoLength: '',
    format: '',
    frequency: '',
  },
};

export default function ContentForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>('channel');
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const steps: FormStep[] = ['channel', 'content', 'output'];

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission and API integration
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step) => (
            <div
              key={step}
              className={`flex-1 text-center ${currentStep === step ? 'text-blue-600 font-bold' : 'text-gray-400'}`}
            >
              {step.charAt(0).toUpperCase() + step.slice(1)}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <div key={step} className="flex-1 relative">
              <div
                className={`h-2 ${currentStep === step ? 'bg-blue-600' : 'bg-gray-200'}`}
              />
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-0 h-2 w-2 bg-gray-200 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 'channel' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="channelName" className="block text-sm font-medium mb-2">
                Channel Name
              </label>
              <input
                type="text"
                id="channelName"
                value={formData.channel.name}
                onChange={(e) => setFormData({
                  ...formData,
                  channel: { ...formData.channel, name: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your channel name"
              />
            </div>
            <div>
              <label htmlFor="channelDescription" className="block text-sm font-medium mb-2">
                Channel Description
              </label>
              <textarea
                id="channelDescription"
                value={formData.channel.description}
                onChange={(e) => setFormData({
                  ...formData,
                  channel: { ...formData.channel, description: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                placeholder="Describe your channel's purpose and content"
              />
            </div>
            <div>
              <label htmlFor="channelCategory" className="block text-sm font-medium mb-2">
                Channel Category
              </label>
              <select
                id="channelCategory"
                value={formData.channel.category}
                onChange={(e) => setFormData({
                  ...formData,
                  channel: { ...formData.channel, category: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                <option value="education">Education</option>
                <option value="entertainment">Entertainment</option>
                <option value="gaming">Gaming</option>
                <option value="music">Music</option>
                <option value="tech">Technology</option>
                <option value="vlog">Vlog</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 'content' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="contentStyle" className="block text-sm font-medium mb-2">
                Content Style
              </label>
              <select
                id="contentStyle"
                value={formData.content.style}
                onChange={(e) => setFormData({
                  ...formData,
                  content: { ...formData.content, style: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a style</option>
                <option value="tutorial">Tutorial</option>
                <option value="review">Review</option>
                <option value="commentary">Commentary</option>
                <option value="storytelling">Storytelling</option>
                <option value="interview">Interview</option>
              </select>
            </div>
            <div>
              <label htmlFor="contentTone" className="block text-sm font-medium mb-2">
                Content Tone
              </label>
              <select
                id="contentTone"
                value={formData.content.tone}
                onChange={(e) => setFormData({
                  ...formData,
                  content: { ...formData.content, tone: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a tone</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="humorous">Humorous</option>
                <option value="educational">Educational</option>
                <option value="inspirational">Inspirational</option>
              </select>
            </div>
            <div>
              <label htmlFor="targetAudience" className="block text-sm font-medium mb-2">
                Target Audience
              </label>
              <input
                type="text"
                id="targetAudience"
                value={formData.content.targetAudience}
                onChange={(e) => setFormData({
                  ...formData,
                  content: { ...formData.content, targetAudience: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your target audience"
              />
            </div>
          </div>
        )}

        {currentStep === 'output' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="videoLength" className="block text-sm font-medium mb-2">
                Video Length
              </label>
              <select
                id="videoLength"
                value={formData.output.videoLength}
                onChange={(e) => setFormData({
                  ...formData,
                  output: { ...formData.output, videoLength: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select video length</option>
                <option value="short">Short (< 5 minutes)</option>
                <option value="medium">Medium (5-15 minutes)</option>
                <option value="long">Long (> 15 minutes)</option>
              </select>
            </div>
            <div>
              <label htmlFor="format" className="block text-sm font-medium mb-2">
                Content Format
              </label>
              <select
                id="format"
                value={formData.output.format}
                onChange={(e) => setFormData({
                  ...formData,
                  output: { ...formData.output, format: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select format</option>
                <option value="script">Full Script</option>
                <option value="outline">Detailed Outline</option>
                <option value="talking-points">Talking Points</option>
              </select>
            </div>
            <div>
              <label htmlFor="frequency" className="block text-sm font-medium mb-2">
                Upload Frequency
              </label>
              <select
                id="frequency"
                value={formData.output.frequency}
                onChange={(e) => setFormData({
                  ...formData,
                  output: { ...formData.output, frequency: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select frequency</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg ${currentStep === 'channel' ? 'invisible' : ''}`}
          >
            Previous
          </button>
          {currentStep === 'output' ? (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Generate Content
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
