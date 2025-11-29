import { Metadata } from 'next';
import GoalPlanner from '@/components/GoalPlanner';

export const metadata: Metadata = {
    title: 'Goal Planning - MFTracker',
    description: 'Plan your financial goals and calculate required SIP investments.',
};

export default function GoalPlanningPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <GoalPlanner />
            </div>
        </div>
    );
}
