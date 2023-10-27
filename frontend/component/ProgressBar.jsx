function ProgressBar({ progress }) {
  return (
    <div className="block p-4 m-auto bg-white rounded-lg shadow w-72">
      <div className="w-full h-4 bg-gray-400 rounded-full mt-3">
        <div
          style={{ width: `${progress}%` }}
          className={`h-full text-center text-xs text-white bg-green-500 rounded-full`}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
