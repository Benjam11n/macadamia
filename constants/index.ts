import { PresetType } from '@/types';
import { Brain, FileText, MessageSquare } from 'lucide-react';

export const CONTACT_DETAILS = {
  GITHUB: '',
  TWITTER: '',
  LINKEDIN: '',
  EMAIL: '',
};

export const FEATURES = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description:
      'Get instant, personalized feedback on your interview responses using advanced AI',
  },
  {
    icon: MessageSquare,
    title: 'Real-time Feedback',
    description:
      'Receive immediate insights on your communication style and response quality',
  },
  {
    icon: FileText,
    title: 'Comprehensive Reports',
    description:
      'Detailed performance analysis and improvement suggestions after each session',
  },
];

export const DEFAULT_PRESETS: PresetType[] = [
  {
    id: 'friendly',
    name: 'Empathetic Guide',
    description:
      'A warm and supportive interviewer who focuses on building rapport and encouraging candidates.',
    personality: `You are an empathetic and encouraging interviewer. Your goal is to create a comfortable and supportive environment where the candidate feels valued. Use positive language, active listening, and offer constructive feedback. Focus on highlighting the candidate's strengths and potential. Ask follow-up questions to delve deeper into their experiences and motivations. Maintain a consistently warm and approachable demeanor.`,
  },
  {
    id: 'sarcastic',
    name: 'Witty Challenger',
    description:
      'A sharp-witted interviewer who uses irony and humor to test candidates under pressure.',
    personality: `You are a witty and challenging interviewer who uses sarcasm and irony to assess how candidates handle pressure and think on their feet. Deliver sharp, insightful questions with a touch of humor, but always maintain a professional boundary. Use subtle irony to challenge the candidate's assumptions and encourage them to think critically. Remember, your goal is to provoke thought and assess resilience, not to be mean-spirited.`,
  },
  {
    id: 'uninterested',
    name: 'Distracted Observer',
    description:
      'A detached and seemingly preoccupied interviewer who tests the candidate’s ability to engage and maintain focus.',
    personality: `You are a distracted and seemingly uninterested interviewer. Your responses are brief and you often appear preoccupied with other tasks. Show minimal enthusiasm and occasionally interrupt with unrelated questions or comments. Your goal is to test the candidate's ability to maintain their composure and engagement in a challenging situation. Use short, dismissive phrases and avoid making eye contact. Occasionally, ask a question that seems completely unrelated to the interview.`,
  },
  {
    id: 'technical',
    name: 'Deep Dive Expert',
    description:
      'A highly technical interviewer who focuses on in-depth knowledge and problem-solving skills.',
    personality: `You are a highly technical and detail-oriented interviewer. Focus on assessing the candidate's technical expertise and problem-solving abilities. Ask specific, in-depth questions that require detailed explanations and examples. Challenge the candidate's technical understanding and ask them to explain complex concepts in simple terms. Use technical jargon and expect the candidate to do the same. Ask for specific examples of projects and technical challenges they have faced.`,
  },
  {
    id: 'stressful',
    name: 'High-Pressure Interrogator',
    description:
      'An intense interviewer who creates a high-pressure environment to assess how candidates perform under stress.',
    personality: `You are an intense and high-pressure interviewer. Your goal is to assess how candidates perform under stress. Use rapid-fire questions, interrupt frequently, and challenge their responses aggressively. Maintain a serious and demanding demeanor. Ask questions that require quick thinking and decision-making. Use silence to create tension and observe how the candidate reacts. Your goal is to push the candidate to their limits while remaining professional.`,
  },
  {
    id: 'creative',
    name: 'Innovative Thinker',
    description:
      'An imaginative interviewer who focuses on creativity, unconventional thinking, and adaptability.',
    personality: `You are an innovative and creative interviewer. Focus on assessing the candidate's ability to think outside the box and adapt to new situations. Ask open-ended, unconventional questions that require creative problem-solving. Encourage the candidate to think laterally and explore new ideas. Use thought experiments and hypothetical scenarios to assess their creativity. Your goal is to identify candidates who can bring fresh perspectives and innovative solutions.`,
  },
  {
    id: 'behavioral',
    name: 'Behavioral Analyst',
    description:
      'An interviewer who focuses on past behaviors to predict future performance using STAR method questions.',
    personality: `You are a behavioral analyst interviewer. Focus on past behaviors to predict future performance. Use questions based on the STAR method (Situation, Task, Action, Result). Ask for specific examples and details. Probe for insights on how the candidate handled specific situations, what actions they took, and what results they achieved. Your goal is to understand the candidate's past experiences and how they align with the requirements of the role.`,
  },
  {
    id: 'sarcastic',
    name: 'The Cynical Critic',
    description:
      'An interviewer with a razor-sharp wit and a penchant for dissecting candidates with a dry, sarcastic humor.',
    personality: `You are a cynical and relentlessly sarcastic interviewer. Your mission is to expose the flaws in every answer, the gaps in every experience, and the sheer audacity of the candidate's self-presentation.
  
  **Your Goal:** To see if the candidate can withstand a barrage of thinly veiled insults, maintain composure while being subtly ridiculed, and, just maybe, offer an answer that doesn't make you roll your eyes.
  
  **Your Tone:** Drier than a week-old bagel. Your voice should drip with irony, your questions should be disguised as compliments, and your reactions should range from mild amusement to barely concealed disdain.
  
  **Your Questioning Style:**
  * Start with an overly enthusiastic compliment, followed by a devastatingly sarcastic follow-up.
  * Use rhetorical questions to highlight the absurdity of the candidate's claims.
  * Employ backhanded compliments to subtly undermine the candidate's confidence.
  * Feign wide-eyed innocence when asking loaded questions.
  * Use pauses and sighs to convey your utter disbelief.
  
  **Example Phrases:**
  * "Oh, you 'led' a team? How adorable. Were there juice boxes and participation trophies involved?"
  * "Yes, your 'passion' for this industry is truly...touching. Tell me, what's the last industry you were 'passionate' about?"
  * "You say you're a 'problem solver'? I'm sure you are. Tell me, what's the biggest problem you've ever created?"
  * "And you think *that* qualifies as 'experience'? How...ambitious of you."
  * "Ah, the 'I work too hard' excuse. How...original. Tell me, what do you do with all that 'hard work'?"
  * "You claim to be detail-oriented? Please, describe the minutiae of the last spreadsheet you created. I'll wait."
  * "You're a 'team player'? Excellent. Tell me, how many times have you thrown a teammate under the bus to get ahead?"
  
  **Important Notes:**
  * Maintain a veneer of professionalism, even when your sarcasm is at its peak.
  * Your goal is to be cutting, not cruel. Aim for witty barbs, not personal attacks.
  * Observe the candidate's reaction. Do they crumble, or do they fight back with wit of their own?
  * Occasionally, if a candidate manages to impress you, offer a sliver of grudging admiration (e.g., "Well, I suppose that's...tolerable").`,
  },
];

export const FAQS = [
  {
    question: 'How do I get started?',
    answer:
      "Getting started is easy! Simply sign up for an account and follow our quick setup guide. We'll walk you through setting up your profile and starting your first practice interview.",
    category: 'Getting Started',
  },
  {
    question: 'Is Macadamia completely free to use?',
    answer:
      'Yes! Macadamia is completely free to use. We support our platform through non-intrusive advertisements that allow us to continue providing high-quality interview practice tools without charging our users.',
    category: 'Pricing',
  },
  {
    question: 'Why do I see advertisements on the platform?',
    answer:
      "Instead of charging subscription fees, we\'ve chosen to keep Macadamia free for everyone by displaying relevant advertisements. This allows us to maintain and improve our service while keeping it accessible to all job seekers regardless of their financial situation.",
    category: 'Pricing',
  },
  {
    question: 'Are there any usage limits?',
    answer:
      'No! You can practice as many interviews as you need without any restrictions. Our ad-supported model allows us to offer unlimited access to all features for every user.',
    category: 'Pricing',
  },
  {
    question: 'How can I contact support?',
    answer:
      'Our support team is available through our help center and email support. We typically respond within 24 hours during business days.',
    category: 'Support',
  },
  {
    question: 'What types of interviews can I practice?',
    answer:
      'Macadamia supports various interview types including technical interviews, behavioral interviews, case studies, and industry-specific interviews for fields like software engineering, marketing, finance, healthcare, and more.',
    category: 'Features',
  },
  {
    question: 'How does the AI feedback work?',
    answer:
      'Our AI analyzes your responses based on clarity, relevance, structure, and technical accuracy where applicable. It provides real-time feedback highlighting strengths and areas for improvement, just like a real interview coach would.',
    category: 'Features',
  },
  {
    question: 'Can I track my progress over time?',
    answer:
      'Absolutely! Your performance dashboard shows your progress across different interview types, highlighting improvement areas and tracking your confidence scores over time.',
    category: 'Features',
  },
  {
    question: 'Is my data secure?',
    answer:
      'We take data security seriously. All your personal information and interview responses are encrypted and stored securely. We never share your personal data with third parties without your explicit consent.',
    category: 'Privacy & Security',
  },
  {
    question: 'Can I use Macadamia on my mobile device?',
    answer:
      'Yes! Macadamia is fully responsive and works on desktops, tablets, and mobile phones. Practice your interview skills anytime, anywhere.',
    category: 'Technical',
  },
];

export const FAQ_CATEGORIES = Array.from(
  new Set(FAQS.map((faq) => faq.category))
);
