"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type FormStep = "channel" | "content" | "output";

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
    name: "",
    description: "",
    category: "",
  },
  content: {
    style: "",
    tone: "",
    targetAudience: "",
  },
  output: {
    videoLength: "",
    format: "",
    frequency: "",
  },
};

export default function ContentForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<FormStep>("channel");
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const steps: FormStep[] = ["channel", "content", "output"];

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
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const data = await response.json();
      // Store the generated content in localStorage for now
      localStorage.setItem("generatedContent", data.content);
      router.push("/generated-content");
    } catch (err) {
      setError("Failed to generate content. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step) => (
            <div
              key={step}
              className={`flex-1 text-center ${
                currentStep === step
                  ? "text-blue-600 font-bold"
                  : "text-gray-400"
              }`}
            >
              {step.charAt(0).toUpperCase() + step.slice(1)}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <div key={step} className="flex-1 relative">
              <div
                className={`h-2 ${
                  currentStep === step ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-0 h-2 w-2 bg-gray-200 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === "channel" && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="channelName"
                className="block text-sm font-medium mb-2"
              >
                Channel Name
              </label>
              <Input
                type="text"
                id="channelName"
                value={formData.channel.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    channel: { ...formData.channel, name: e.target.value },
                  })
                }
                placeholder="Enter your channel name"
              />
            </div>
            <div>
              <label
                htmlFor="channelDescription"
                className="block text-sm font-medium mb-2"
              >
                Channel Description
              </label>
              <Textarea
                id="channelDescription"
                value={formData.channel.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    channel: {
                      ...formData.channel,
                      description: e.target.value,
                    },
                  })
                }
                className="h-32"
                placeholder="Describe your channel's purpose and content"
              />
            </div>
            <div>
              <label
                htmlFor="channelCategory"
                className="block text-sm font-medium mb-2"
              >
                Channel Category
              </label>
              <Select
                value={formData.channel.category}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    channel: { ...formData.channel, category: value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="vlog">Vlog</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {currentStep === "content" && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="contentStyle"
                className="block text-sm font-medium mb-2"
              >
                Content Style
              </label>
              <Select
                value={formData.content.style}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, style: value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="commentary">Commentary</SelectItem>
                  <SelectItem value="storytelling">Storytelling</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="contentTone"
                className="block text-sm font-medium mb-2"
              >
                Content Tone
              </label>
              <Select
                value={formData.content.tone}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, tone: value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="humorous">Humorous</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="inspirational">Inspirational</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="targetAudience"
                className="block text-sm font-medium mb-2"
              >
                Target Audience
              </label>
              <Input
                type="text"
                id="targetAudience"
                value={formData.content.targetAudience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: {
                      ...formData.content,
                      targetAudience: e.target.value,
                    },
                  })
                }
                placeholder="Describe your target audience"
              />
            </div>
          </div>
        )}

        {currentStep === "output" && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="videoLength"
                className="block text-sm font-medium mb-2"
              >
                Video Length
              </label>
              <Select
                value={formData.output.videoLength}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    output: { ...formData.output, videoLength: value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select video length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (&lt; 5 minutes)</SelectItem>
                  <SelectItem value="medium">Medium (5-15 minutes)</SelectItem>
                  <SelectItem value="long">Long (&gt; 15 minutes)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="format"
                className="block text-sm font-medium mb-2"
              >
                Content Format
              </label>
              <Select
                value={formData.output.format}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    output: { ...formData.output, format: value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="script">Full Script</SelectItem>
                  <SelectItem value="outline">Detailed Outline</SelectItem>
                  <SelectItem value="talking-points">Talking Points</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="frequency"
                className="block text-sm font-medium mb-2"
              >
                Upload Frequency
              </label>
              <Select
                value={formData.output.frequency}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    output: { ...formData.output, frequency: value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            onClick={handlePrevious}
            variant="outline"
            className={`${currentStep === "channel" ? "invisible" : ""}`}
          >
            Previous
          </Button>
          {currentStep === "output" ? (
            <Button
              type="submit"
              disabled={isLoading}
              className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
            >
              {isLoading ? "Generating..." : "Generate Content"}
            </Button>
          ) : (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
