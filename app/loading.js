// app/loading.js
import React from 'react';
import loadingImg from '../public/loading-img.gif'; // Adjust the path if necessary
import Image from 'next/image';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* Loading content with centered GIF */}
      <Image 
        src={loadingImg} 
        alt="Loading..." 
        width={100} // Set the desired width
        height={100} // Set the desired height
      />
    </div>
  );
};

export default Loading;
