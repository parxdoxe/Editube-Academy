import React from "react";

function VideoSkeleton() {
  return (
    <div className="p-4">
      {/* Placeholder pour le lecteur vidéo */}
      <div className="bg-gray-300 animate-pulse rounded-md w-full h-56"></div>
      {/* Placeholder pour le titre de la vidéo */}
      <div className="mt-4 bg-gray-300 animate-pulse rounded-md w-3/4 h-4"></div>
      {/* Placeholder pour la description de la vidéo */}
      <div className="mt-2 bg-gray-300 animate-pulse rounded-md w-full h-4"></div>
      <div className="mt-2 bg-gray-300 animate-pulse rounded-md w-2/3 h-4"></div>
    </div>
  );
}

export default VideoSkeleton;
