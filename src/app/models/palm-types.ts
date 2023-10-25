export function createPrompt(
    text: string,
    temperature: number = 0,
    candidateCount: number = 1,
    maxOutputTokens: number = 1024,
    topP: number = 0.70,
    topK: number = 40,
    safetySettings?: SafetySetting[],
    stopSequences?: string[],
  ): TextRequest {
    const request: TextRequest = {
      "model": "text-bison-001",
      "prompt": {
        "text": text
      },
      temperature,
      candidateCount,
      maxOutputTokens,
      topP,
      topK
    }
    /// Example [{ "category": "HARM_CATEGORY_DEROGATORY", "threshold": 1 }, { "category": "HARM_CATEGORY_TOXICITY", "threshold": 1 }, { "category": "HARM_CATEGORY_VIOLENCE", "threshold": 2 }, { "category": "HARM_CATEGORY_SEXUAL", "threshold": 2 }, { "category": "HARM_CATEGORY_MEDICAL", "threshold": 2 }, { "category": "HARM_CATEGORY_DANGEROUS", "threshold": 2 }]
    if (safetySettings) {
      request.safetySettings = safetySettings
    }
    if (stopSequences) {
      request.stopSequences = stopSequences
    }
    return request;
  }
  
  export interface SafetySetting {
    category: HarmCategory;
    threshold: SafetySetting.HarmBlockThreshold;
  }
  
  export enum HarmCategory {
    HARM_CATEGORY_UNSPECIFIED = 0,
    HARM_CATEGORY_DEROGATORY = 1,
    HARM_CATEGORY_TOXICITY = 2,
    HARM_CATEGORY_VIOLENCE = 3,
    HARM_CATEGORY_SEXUAL = 4,
    HARM_CATEGORY_MEDICAL = 5,
    HARM_CATEGORY_DANGEROUS = 6
  }
  
  export interface SafetySetting {
    category: HarmCategory;
    threshold: SafetySetting.HarmBlockThreshold;
  }
  
  export namespace SafetySetting {
    export enum HarmBlockThreshold {
      HARM_BLOCK_THRESHOLD_UNSPECIFIED = 0,
      BLOCK_LOW_AND_ABOVE = 1,
      BLOCK_MEDIUM_AND_ABOVE = 2,
      BLOCK_ONLY_HIGH = 3,
      BLOCK_NONE = 4
    }
  }
  
  export interface TextRequest {
    model: string;
    prompt?: TextPrompt;
    temperature?: number;
    candidateCount?: number;
    maxOutputTokens?: number;
    topP?: number;
    topK?: number;
    safetySettings?: SafetySetting[];
    stopSequences?: string[];
  }
  
  export interface TextResponse {
    candidates?: TextCompletion[];
    filters?: ContentFilter[];
    safetyFeedback?: SafetyFeedback[];
  }
  
  export interface TextPrompt {
    text: string;
  }
  
  export interface TextCompletion {
    output?: string;
    safetyRatings?: SafetyRating[];
    citationMetadata?: CitationMetadata;
  }
  
  export interface ContentFilter {
    reason?: ContentFilter.BlockedReason;
    message?: string;
  }
  
  export namespace ContentFilter {
    export enum BlockedReason {
      BLOCKED_REASON_UNSPECIFIED = 0,
      SAFETY = 1,
      OTHER = 2
    }
  }
  
  export interface SafetyFeedback {
    rating?: SafetyRating;
    setting?: SafetySetting;
  }
  
  export interface SafetyRating {
    category: HarmCategory;
    probability: SafetyRating.HarmProbability;
  }
  
  export namespace SafetyRating {
    export enum HarmProbability {
      HARM_PROBABILITY_UNSPECIFIED = 0,
      NEGLIGIBLE = 1,
      LOW = 2,
      MEDIUM = 3,
      HIGH = 4
    }
  }
  
  export interface CitationMetadata {
    citationSources?: CitationSource[];
  }
  
  export interface CitationSource {
    startIndex?: number;
    endIndex?: number;
    uri?: string;
    license?: string;
  }