const CoreConcepts = () => {
  return (
    <div>
      <h2 id="principles">Principles</h2>
      <p>
        Lenzro is built on three core principles that guide every design
        decision:
      </p>
      <ul>
        <li>
          <strong>Everything is spatial</strong> — Work is visual and spatial,
          not just lists of text. Lenzro embraces this by giving you an infinite
          canvas.
        </li>
        <li>
          <strong>Context is king</strong> — The right information should always
          be within reach, without switching apps or digging through folders.
        </li>
        <li>
          <strong>AI is a collaborator, not a feature</strong> — The AI
          assistant is deeply integrated — it understands your workspace, not
          just individual prompts.
        </li>
      </ul>

      <h2 id="workspaces">Workspaces</h2>
      <p>
        A <strong>Workspace</strong> is the top-level container in Lenzro. Think
        of it as your company, your project, or your personal operating system.
        Each workspace has:
      </p>
      <ul>
        <li>Its own Blackboard (canvas)</li>
        <li>Its own pages, schemas, and data</li>
        <li>Its own team members and permissions</li>
        <li>Its own AI context</li>
      </ul>
      <p>
        You can have multiple workspaces — one per client, one for personal
        projects, one for your company.
      </p>

      <h2 id="canvas-model">Canvas Model</h2>
      <p>
        The <strong>Blackboard</strong> is the main canvas of every workspace.
        Unlike traditional interfaces, the Blackboard is infinite — you can zoom
        out to see everything at once or zoom in to focus on a single section.
      </p>
      <p>On the canvas you can place:</p>
      <ul>
        <li>Pages — rich documents with structured data</li>
        <li>Widgets — reusable blocks (charts, files, embeds, etc.)</li>
        <li>Connections — visual lines linking related items</li>
        <li>Groups — labelled regions to organise related content</li>
      </ul>
    </div>
  );
};

export default CoreConcepts;
