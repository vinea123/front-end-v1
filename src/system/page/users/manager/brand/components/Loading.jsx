export default function Loading({ fullScreen = false }) {
  return (
    <div className={`flex flex-col items-center justify-center ${fullScreen ? 'h-screen w-screen' : ''}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-800"></div>
      <p className="mt-4 text-gray-600">Loading​​ ...</p>
    </div>
  );
}