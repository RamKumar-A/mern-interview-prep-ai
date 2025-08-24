import { useEffect, useRef, useState } from 'react';
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from 'react-icons/lu';
import AIResponsePreview from '../../pages/InterviewPrep/components/AIResponsePreview';

function QuestionCard({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
  isPinLoading,
  isLearnMoreLoading,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  function toggleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <>
      <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-3 md:px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group">
        <div className="flex items-start justify-between cursor-pointer">
          <div className="flex items-center gap-3.5">
            <span className="text-xs md:text-[14px] font-semibold text-gray-400 ">
              Q
            </span>
            <h3
              className="text-xs md:text-[14px] font-medium text-gray-800 mr-0 md:mr-20"
              onClick={toggleExpand}
            >
              {question}
            </h3>
          </div>
          <div className="flex items-center justify-end ml-2 md:ml-4 relative">
            <div
              className={`flex gap-3 ${
                isExpanded ? 'md:flex' : 'md:hidden group-hover:flex'
              }`}
            >
              <button
                className={`flex items-center gap-2 text-xs md:text-[12px]  font-medium  px-1 sm:px-3 py-1 md:py-[1px] rounded text-nowrap  text-orange-700 bg-orange-100 border border-orange-200 hover:border-orange-400 cursor-pointer ${
                  isPinLoading && 'opacity-65'
                }`}
                onClick={onTogglePin}
                disabled={isPinLoading}
              >
                {isPinned ? <LuPinOff className="" /> : <LuPin className="" />}
              </button>
              <button
                className={`flex items-center gap-2 text-xs md:text-[11px] text-orange-700 font-medium bg-orange-100 px-1 sm:px-3 py-1 rounded text-nowrap border border-orange-200 hover:border-orange-400 cursor-pointer md:py-[1px] ${
                  isLearnMoreLoading && 'opacity-65'
                }`}
                onClick={() => {
                  setIsExpanded(true);
                  onLearnMore();
                }}
              >
                <LuSparkles className="" />
                <span className="hidden md:block">
                  {isLearnMoreLoading ? 'Loading' : 'Learn More'}
                </span>
              </button>
            </div>
            <button
              className="text-gray-400 hover:text-gray-500 cursor-pointer ml-2"
              onClick={toggleExpand}
            >
              <LuChevronDown
                size={20}
                className={`transform transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: `${height}px` }}
        >
          <div
            ref={contentRef}
            className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg"
          >
            <AIResponsePreview content={answer} />
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionCard;
