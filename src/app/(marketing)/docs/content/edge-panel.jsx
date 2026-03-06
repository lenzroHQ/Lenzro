const EdgePanel = () => {
  return (
    <div>
      <h2 id="panel-overview">Panel Overview</h2>
      <p>
        The Edge Panel is a collapsible side panel that lives at the right edge
        of the Blackboard. It provides quick access to tools and context without
        leaving the canvas.
      </p>
      <p>
        You can open the Edge Panel by clicking the thin handle on the right
        side of the screen, or by pressing <code>E</code> on your keyboard.
      </p>

      <h2 id="panel-features">Panel Features</h2>
      <p>The Edge Panel has several tabs:</p>
      <ul>
        <li>
          <strong>Pages</strong> — A tree view of all pages in the workspace.
          Click any page to open it as a panel without leaving the canvas.
        </li>
        <li>
          <strong>Assets</strong> — Your file library: images, videos,
          documents. Drag assets directly onto the Blackboard.
        </li>
        <li>
          <strong>AI Chat</strong> — A persistent chat with your AI assistant,
          aware of the current canvas context.
        </li>
        <li>
          <strong>Notifications</strong> — Comments, mentions, and activity
          updates from your team.
        </li>
        <li>
          <strong>Search</strong> — Full-text search across all pages and
          widgets in the workspace. Press <code>⌘K</code> to open the global
          search overlay.
        </li>
      </ul>
      <p>
        The Edge Panel is designed to be non-intrusive — it overlays the canvas
        so you never lose your spatial context while accessing supporting tools.
      </p>
    </div>
  );
};

export default EdgePanel;
