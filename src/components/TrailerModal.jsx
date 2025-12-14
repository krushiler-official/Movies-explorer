export default function TrailerModal({ videoKey, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-black rounded-lg max-w-4xl w-full aspect-video relative">
        <button onClick={onClose} className="absolute right-2 top-2 text-white bg-gray-800 px-3 py-1 rounded">Close</button>
        <iframe
          title="Trailer"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          className="w-full h-full rounded-lg"
          allow="autoplay; encrypted-media"
        />
      </div>
    </div>
  );
}
