const Blackboard = () => {
  return (
    <div>
      <h2 id="what-is-the-blackboard">What is the Blackboard</h2>
      <p>
        The Blackboard is Lenzro&apos;s infinite spatial canvas — the main
        surface where all your work lives. Unlike a document or a list, the
        Blackboard lets you place, arrange, and connect items freely in
        two-dimensional space.
      </p>
      <p>
        You can think of it as a wall in a war room: you pin things up, draw
        connections between them, zoom out for the big picture, and zoom in for
        the details.
      </p>

      <h2 id="canvas-tools">Canvas Tools</h2>
      <p>The Blackboard toolbar gives you access to:</p>
      <ul>
        <li>
          <strong>Select</strong> — Click and drag to move or resize items.
        </li>
        <li>
          <strong>Pan</strong> — Hold Space + drag to pan across the canvas.
        </li>
        <li>
          <strong>Zoom</strong> — Use scroll wheel or pinch-to-zoom. The minimap
          in the corner shows your position.
        </li>
        <li>
          <strong>Add Widget</strong> — Insert text blocks, images, charts,
          embeds, and more.
        </li>
        <li>
          <strong>Connect</strong> — Draw lines between items to show
          relationships.
        </li>
        <li>
          <strong>Group</strong> — Select multiple items and group them into a
          labelled region.
        </li>
      </ul>

      <h2 id="spatial-layout">Spatial Layout</h2>
      <p>
        The spatial nature of the Blackboard is a key productivity feature.
        Research shows that humans find and recall information faster when it
        has a consistent spatial position. By keeping related work in the same
        area of the canvas across sessions, your team builds a shared spatial
        memory of the workspace.
      </p>
      <p>Common patterns include:</p>
      <ul>
        <li>Top area for strategy and vision</li>
        <li>Left column for current sprint or active work</li>
        <li>Right side for reference material and assets</li>
        <li>Bottom area for archived or completed work</li>
      </ul>
    </div>
  );
};

export default Blackboard;
