export type Hobby = {
  id: string;
  technologies: string[];
  githubLink: string;
  noteLink?: string;
};

export const hobbiesData: Hobby[] = [
  {
    id: "kakeibo",
    technologies: [
      "TypeScript",
      "Node.js",
      "Google Cloud Functions",
      "Firestore",
      "Gemini API",
      "LINE Messaging API",
      "Google Calendar API",
      "Cloud Scheduler",
    ],
    githubLink: "https://github.com/Yuisei-Maruyama/kakeibo-tukeru-kun",
    noteLink: "https://note.com/y_metro/n/n4f7bba78706c",
  },
];
