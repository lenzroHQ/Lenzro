const Widgets = () => {
  return (
    <div>
      <h2 id="widget-types">Widget Types</h2>
      <p>
        Widgets are the building blocks of the Blackboard. Every piece of
        content you place on the canvas is a widget. Lenzro ships with a rich
        set of built-in widget types:
      </p>
      <ul>
        <li>
          <strong>Text</strong> — Headings, paragraphs, bullet lists, callouts.
        </li>
        <li>
          <strong>Image</strong> — Upload or embed images from a URL.
        </li>
        <li>
          <strong>Video</strong> — Embed YouTube, Vimeo, or upload a video file.
        </li>
        <li>
          <strong>Chart</strong> — Bar, line, pie, and scatter charts connected
          to page data.
        </li>
        <li>
          <strong>Table</strong> — A mini spreadsheet or a live view of a
          structured page.
        </li>
        <li>
          <strong>Kanban Board</strong> — Drag-and-drop task board.
        </li>
        <li>
          <strong>Embed</strong> — Embed any URL using an iframe.
        </li>
        <li>
          <strong>File</strong> — Preview or download an attached file.
        </li>
        <li>
          <strong>Code</strong> — Syntax-highlighted code blocks.
        </li>
        <li>
          <strong>Divider</strong> — Visual section separators.
        </li>
      </ul>

      <h2 id="adding-widgets">Adding Widgets</h2>
      <p>There are three ways to add a widget to the Blackboard:</p>
      <ol>
        <li>
          Press the <code>+</code> button in the toolbar and choose a widget
          type.
        </li>
        <li>
          Press <code>/</code> on the canvas to open the command palette and
          type a widget name.
        </li>
        <li>Drag a widget from the widget panel on the right edge.</li>
      </ol>

      <h2 id="configuring-widgets">Configuring Widgets</h2>
      <p>
        Every widget has a settings panel accessible by clicking the{" "}
        <code>⚙</code> icon when the widget is selected. Common settings
        include:
      </p>
      <ul>
        <li>
          <strong>Size &amp; Position</strong> — Exact pixel controls or free
          drag.
        </li>
        <li>
          <strong>Style</strong> — Background colour, border, padding, shadow.
        </li>
        <li>
          <strong>Data Source</strong> (for chart/table widgets) — link to a
          page schema.
        </li>
        <li>
          <strong>Visibility</strong> — Show/hide the widget based on
          conditions.
        </li>
        <li>
          <strong>Lock</strong> — Prevent accidental editing or moving.
        </li>
      </ul>
    </div>
  );
};

export default Widgets;
