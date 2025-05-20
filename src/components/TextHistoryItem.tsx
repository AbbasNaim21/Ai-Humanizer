import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatDistanceToNow } from '../utils/date';

type TextHistoryItemProps = {
  item: {
    id: string;
    created_at: string;
    original_text: string;
    humanized_text: string;
  };
};

export default function TextHistoryItem({ item }: TextHistoryItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const timeAgo = formatDistanceToNow(new Date(item.created_at));
  
  // Truncate text for preview
  const originalPreview = item.original_text.length > 100 
    ? `${item.original_text.substring(0, 100)}...` 
    : item.original_text;
    
  const humanizedPreview = item.humanized_text.length > 100 
    ? `${item.humanized_text.substring(0, 100)}...` 
    : item.humanized_text;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              {timeAgo}
            </span>
            <button 
              className="ml-2 text-gray-400 hover:text-gray-500 transition-colors duration-150"
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500 line-clamp-1">
            {originalPreview}
          </p>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500 mb-2">Original Text</h4>
              <div className="p-3 bg-gray-50 rounded text-sm text-gray-700 whitespace-pre-line">
                {item.original_text}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-medium uppercase text-gray-500 mb-2">Humanized Text</h4>
              <div className="p-3 bg-gray-50 rounded text-sm text-gray-700 whitespace-pre-line">
                {item.humanized_text}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}