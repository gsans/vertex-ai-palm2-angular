// Source: https://cloud.google.com/vertex-ai/docs/generative-ai

export function createPrompt(
  prompt: string = "What is the largest number with a name?",
  temperature: number = 0,
  maxOutputTokens: number = 100,
  topP: number = 0.70,
  topK: number = 40
): TextRequest {
  const request : TextRequest = {
    "instances": [
      {
        "prompt": `${prompt}`
      }
    ],
    "parameters": {
      "temperature": temperature,
      "maxOutputTokens": maxOutputTokens,
      "topP": topP,
      "topK": topK
    }
  }
  return request;
}  

// Text API
export interface TextRequest {
  instances: TextInstance[];
  parameters: Parameters;
}

export interface TextInstance {
  prompt: string;
}

export interface TextResponse {
  predictions: TextPrediction[];
  metadata: Metadata;
}

export interface TextPrediction {
  content: string;
  citationMetadata: CitationMetadata;
  safetyAttributes: SafetyAttributes;
}

// Shared types
export interface Parameters {
  temperature: number;
  maxOutputTokens: number;
  topP: number;
  topK: number;
}

export interface Candidate {
  author: string;
  content: string;
}

export interface CitationMetadata {
  citations: any[];
}

export interface SafetyAttributes {
  categories: string[];
  blocked: boolean;
  scores: number[];
}

export interface Metadata {
  tokenMetadata: TokenMetadata;
}

export interface TokenMetadata {
  inputTokenCount: InputTokenCount;
  outputTokenCount: InputTokenCount;
}

export interface InputTokenCount {
  totalBillableCharacters: number;
  totalTokens: number;
}