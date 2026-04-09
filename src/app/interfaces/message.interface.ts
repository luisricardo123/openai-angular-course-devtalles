export interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
  audio?: string;
  imageInfo?: {
    url: string;
    alt: string;
  }
}
