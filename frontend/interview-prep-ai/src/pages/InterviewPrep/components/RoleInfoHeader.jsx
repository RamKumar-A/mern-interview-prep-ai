function RoleInfoHeader({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) {
  return (
    <div className="bg-white relative">
      <div className="container mx-auto px-5 sm:px-10 md:px-0 xl:max-w-[80rem]">
        <div className="h-[200px] flex flex-col justify-center relative z-10">
          <div className="flex items-start">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-medium">{role}</h2>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {topicsToFocus}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-xl md:rounded-2xl xl:rounded-full">
              Experience: {experience != 0 && experience}{' '}
              {experience == 0 ? 'Fresher' : experience == 1 ? 'Year' : 'Years'}
            </div>
            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-xl md:rounded-2xl xl:rounded-full">
              {questions} Q&A
            </div>
            <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-xl md:rounded-2xl xl:rounded-full">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center bg-white overflow-hidden absolute top-0 right-0">
          <div className="w-16 h-16 bg-lime-400 blur-[65px] animate-blob1" />
          <div className="w-16 h-16 bg-teal-400 blur-[65px] animate-blob2" />
          <div className="w-16 h-16 bg-cyan-400 blur-[65px] animate-blob3" />
          <div className="w-16 h-16 bg-fuchsia-400 blur-[65px] animate-blob1" />
        </div>
      </div>
    </div>
  );
}

export default RoleInfoHeader;
