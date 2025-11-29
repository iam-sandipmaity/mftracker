import { Metadata } from 'next';
import AIAssistant from '@/components/AIAssistant';

export const metadata: Metadata = {
    title: 'AI Portfolio Assistant - MFTracker',
    description: 'Chat with an AI assistant to get personalized portfolio recommendations, answer queries, and receive actionable investment insights.',
    alternates: {
        canonical: '/analyzer/ai-assistant'
    }
};

export default function AIAssistantPage() {
    return <AIAssistant />;
}
