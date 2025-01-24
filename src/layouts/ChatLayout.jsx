import React from "react";

// const ChatLayout = ({ sidebar, chatWindow }) => {
//   return (
//     <div className="chat-layout">
//       <aside className="chat-sidebar">{sidebar}</aside>
//       <section className="chat-window">{chatWindow}</section>
//     </div>
//   );
// };

export const ChatLayout = ({ children }) => {
  return (
    <div>
      <nav>
        <h3>Chat Layout</h3>
        {/* Navigation links or header */}
      </nav>
      <main>{children}</main>
    </div>
  );
};




export default ChatLayout;
