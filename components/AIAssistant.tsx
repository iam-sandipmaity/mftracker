'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Trash2 } from 'lucide-react';
import { Message } from '@/types/aiTypes';
import { generateAIResponse, getExamplePrompts } from '@/lib/aiService';
import Link from 'next/link';

export default function AIAssistant() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load conversation from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('mf_tracker_ai_conversation');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Convert timestamp strings back to Date objects
                const messagesWithDates = parsed.map((msg: any) => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }));
                setMessages(messagesWithDates);
            } else {
                // Welcome message for first-time users
                const welcomeMessage: Message = {
                    id: crypto.randomUUID(),
                    role: 'assistant',
                    content: `Hello! 👋 I'm your AI Portfolio Assistant.\n\nI can help you with:\n\n📊 **Portfolio Analysis** - Risk assessment and insights\n🎯 **Goal Planning** - Retirement, education, and more\n💰 **Tax Optimization** - Save on capital gains\n⚖️ **Rebalancing** - Optimize your allocation\n🧮 **SIP Calculations** - Plan your investments\n\nHow can I assist you today?`,
                    timestamp: new Date(),
                    suggestions: [
                        'Analyze my portfolio',
                        'Plan for retirement',
                        'Calculate SIP returns',
                        'How to save tax?'
                    ]
                };
                setMessages([welcomeMessage]);
            }
        } catch (error) {
            console.error('Failed to load conversation:', error);
        }
    }, []);

    // Save conversation to localStorage
    useEffect(() => {
        if (messages.length > 0) {
            try {
                localStorage.setItem('mf_tracker_ai_conversation', JSON.stringify(messages));
            } catch (error) {
                console.error('Failed to save conversation:', error);
            }
        }
    }, [messages]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSendMessage = async (messageText?: string) => {
        const textToSend = messageText || inputMessage.trim();
        if (!textToSend) return;

        // Add user message
        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content: textToSend,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simulate AI thinking delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Generate AI response
        const aiResponse = generateAIResponse(textToSend);

        const assistantMessage: Message = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: aiResponse.message,
            timestamp: new Date(),
            suggestions: aiResponse.suggestions
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);

        // Focus input after response
        inputRef.current?.focus();
    };

    const handleClearConversation = () => {
        if (confirm('Are you sure you want to clear the conversation history?')) {
            localStorage.removeItem('mf_tracker_ai_conversation');
            setMessages([]);
            // Add welcome message again
            const welcomeMessage: Message = {
                id: crypto.randomUUID(),
                role: 'assistant',
                content: `Hello! 👋 I'm your AI Portfolio Assistant.\n\nI can help you with:\n\n📊 **Portfolio Analysis** - Risk assessment and insights\n🎯 **Goal Planning** - Retirement, education, and more\n💰 **Tax Optimization** - Save on capital gains\n⚖️ **Rebalancing** - Optimize your allocation\n🧮 **SIP Calculations** - Plan your investments\n\nHow can I assist you today?`,
                timestamp: new Date(),
                suggestions: [
                    'Analyze my portfolio',
                    'Plan for retirement',
                    'Calculate SIP returns',
                    'How to save tax?'
                ]
            };
            setMessages([welcomeMessage]);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const examplePrompts = getExamplePrompts();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-2xl shadow-lg">
                                <Bot className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                                    AI Portfolio Assistant
                                </h1>
                                <p className="text-slate-400 text-sm">Smart advice for your investments</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClearConversation}
                            className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 text-sm"
                            title="Clear conversation"
                        >
                            <Trash2 className="w-4 h-4" />
                            Clear
                        </button>
                    </div>

                    {/* Info Banner */}
                    <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-indigo-200">
                            <p className="font-medium mb-1">100% Private & Secure</p>
                            <p className="text-indigo-300">All responses are generated locally in your browser. No data is sent to external servers.</p>
                        </div>
                    </div>
                </div>

                {/* Chat Container */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
                    {/* Messages Area */}
                    <div className="h-[600px] overflow-y-auto p-6 space-y-6">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.role === 'assistant' && (
                                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-full flex items-center justify-center">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                )}

                                <div className={`flex flex-col max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div
                                        className={`rounded-2xl px-5 py-3 ${message.role === 'user'
                                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                                : 'bg-slate-700/50 border border-slate-600 text-slate-100'
                                            }`}
                                    >
                                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                            {message.content}
                                        </div>
                                    </div>

                                    {/* Suggestions */}
                                    {message.role === 'assistant' && message.suggestions && message.suggestions.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {message.suggestions.map((suggestion, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleSendMessage(suggestion)}
                                                    className="px-3 py-1.5 bg-slate-700/50 border border-slate-600 rounded-lg text-xs text-slate-300 hover:bg-slate-700 hover:border-indigo-500/50 hover:text-indigo-300 transition-all"
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    <span className="text-xs text-slate-500 mt-1">
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>

                                {message.role === 'user' && (
                                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex gap-3 justify-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-full flex items-center justify-center">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div className="bg-slate-700/50 border border-slate-600 rounded-2xl px-5 py-3">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-slate-700 p-4 bg-slate-800/30">
                        <div className="flex gap-3">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything about your portfolio..."
                                className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                disabled={isTyping}
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={!inputMessage.trim() || isTyping}
                                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-indigo-500/30"
                            >
                                {isTyping ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {/* Example Prompts (show when no messages) */}
                        {messages.length <= 1 && (
                            <div className="mt-4">
                                <p className="text-xs text-slate-400 mb-2">Try asking:</p>
                                <div className="flex flex-wrap gap-2">
                                    {examplePrompts.slice(0, 4).map((prompt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSendMessage(prompt)}
                                            className="px-3 py-1.5 bg-slate-700/30 border border-slate-600 rounded-lg text-xs text-slate-300 hover:bg-slate-700 hover:border-indigo-500/50 transition-all"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mt-8 grid md:grid-cols-3 gap-4">
                    <Link
                        href="/analyzer/tracker"
                        className="block bg-slate-800/50 border border-slate-700 rounded-2xl p-4 hover:border-indigo-500/50 transition-all group"
                    >
                        <h3 className="font-semibold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                            Portfolio Tracker
                        </h3>
                        <p className="text-sm text-slate-400">Analyze your portfolio health</p>
                    </Link>

                    <Link
                        href="/analyzer/goals"
                        className="block bg-slate-800/50 border border-slate-700 rounded-2xl p-4 hover:border-purple-500/50 transition-all group"
                    >
                        <h3 className="font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
                            Goal Planning
                        </h3>
                        <p className="text-sm text-slate-400">Plan your financial goals</p>
                    </Link>

                    <Link
                        href="/analyzer/calculator"
                        className="block bg-slate-800/50 border border-slate-700 rounded-2xl p-4 hover:border-pink-500/50 transition-all group"
                    >
                        <h3 className="font-semibold text-white mb-1 group-hover:text-pink-400 transition-colors">
                            SIP Calculator
                        </h3>
                        <p className="text-sm text-slate-400">Calculate your returns</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
