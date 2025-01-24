import React from "react";

// const VideoLayout = ({ videoGrid, controls }) => {
//   return (
//     <div className="video-layout">
//       <div className="video-grid">{videoGrid}</div>
//       <div className="video-controls">{controls}</div>
//     </div>
//   );
// };




export const VideoLayout = ({ children }) => {
  return (
    <div>
      <nav>
        <h3>Video Conference Layout</h3>
        {/* Navigation links or header */}
      </nav>
      <main>{children}</main>
    </div>
  );
};




export default VideoLayout;
