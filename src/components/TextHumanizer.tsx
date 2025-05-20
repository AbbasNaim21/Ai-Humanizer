import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { humanizeText } from '../services/textService';
import { FileUp, Wand2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TextHumanizer() {
  const { user, profile } = useAuth();
  const [originalText, setOriginalText] = useState<string>('');
  const [humanizedText, setHumanizedText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleHumanize = async () => {
    if (!originalText.trim()) {
      toast.error('Please enter some text to humanize');
      return;
    }

    if (!user) {
      toast.error('Please log in to use this feature', {
        duration: 4000,
      });
      return;
    }

    setLoading(true);
    try {
      const result = await humanizeText(user.id, originalText);
      if (result) {
        setHumanizedText(result);
        toast.success('Text humanized successfully!');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/plain' && file.type !== 'application/pdf' && 
        file.type !== 'application/msword' && 
        file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      toast.error('Please upload a text, PDF, or Word document');
      return;
    }

    // For demo purposes, we'll just read text files
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setOriginalText(text);
      };
      reader.readAsText(file);
    } else {
      // Mock behavior for non-text files
      toast.success(`File "${file.name}" uploaded`);
      setOriginalText(`This is placeholder text extracted from your uploaded document "${file.name}". In a production environment, we would parse the actual content from your document.

We noticed some typical AI patterns in your text that we can improve to make it sound more natural and conversational. Our algorithm will adjust the phrasing, vary sentence structure, and add natural human touches while preserving your original message.`);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(humanizedText);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Original Text */}
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium text-gray-900">Original Text</h2>
            <div className="flex space-x-2">
              <label className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-150">
                <FileUp className="h-4 w-4 mr-1" />
                Upload File
                <input
                  type="file"
                  className="sr-only"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
          <textarea
            className="flex-grow p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 resize-none"
            placeholder="Paste your AI-generated text here..."
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            rows={10}
          ></textarea>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {user && profile ? (
                <span>Credits: {profile.credits}</span>
              ) : (
                <span>Sign in to start humanizing</span>
              )}
            </div>
            <button
              onClick={handleHumanize}
              disabled={loading || !originalText.trim() || !user}
              className={`${
                loading || !originalText.trim() || !user
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-600'
              } text-white px-6 py-2 rounded-md shadow-sm text-sm font-medium transition-colors duration-150 flex items-center`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Humanizing...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-1" />
                  Humanize Text
                </>
              )}
            </button>
          </div>
        </div>

        {/* Humanized Text */}
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium text-gray-900">Humanized Text</h2>
            {humanizedText && (
              <button
                onClick={handleCopyText}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-150"
              >
                Copy Text
              </button>
            )}
          </div>
          <div className={`flex-grow p-4 border border-gray-300 rounded-lg ${humanizedText ? 'bg-white' : 'bg-gray-50'} shadow-sm`}>
            {humanizedText ? (
              <p className="whitespace-pre-line">{humanizedText}</p>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center">
                <Wand2 className="h-12 w-12 mb-4" />
                <p className="text-lg">Your humanized text will appear here</p>
                <p className="text-sm mt-2">Our AI reduces robotic patterns while keeping your message intact</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-500 flex justify-end">
            {humanizedText && "Text successfully humanized!"}
          </div>
        </div>
      </div>
    </div>
  );
}