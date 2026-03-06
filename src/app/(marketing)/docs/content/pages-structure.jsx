const PagesStructure = () => {
  return (
    <div>
      <h2 id="creating-pages">Creating Pages</h2>
      <p>
        Pages in Lenzro are structured documents you can embed on the Blackboard
        or access from the sidebar. Each page has a title, an optional icon or
        cover, and a body that can contain rich content, structured fields, or a
        mix of both.
      </p>
      <p>To create a page:</p>
      <ol>
        <li>
          Press <code>/</code> anywhere on the canvas or click{" "}
          <strong>+ New Page</strong> in the sidebar.
        </li>
        <li>Choose a page type (Document, Table, Board, Gallery, or Form).</li>
        <li>Give the page a name and start adding content.</li>
      </ol>

      <h2 id="nesting-pages">Nesting Pages</h2>
      <p>
        Pages can be nested inside other pages — creating a hierarchy that
        mirrors your project structure. For example:
      </p>
      <pre>
        <code>{`Projects/
  ├── Website Redesign/
  │   ├── Brief
  │   ├── Designs
  │   └── Feedback
  └── Brand Identity/
      ├── Logo Options
      └── Style Guide`}</code>
      </pre>
      <p>
        Nesting is unlimited — you can go as deep as your project structure
        requires.
      </p>

      <h2 id="schemas">Schemas &amp; Fields</h2>
      <p>
        Structured pages have a <strong>schema</strong> — a set of typed fields
        that apply to every entry in the page:
      </p>
      <ul>
        <li>
          <strong>Text</strong> — Short or long text fields.
        </li>
        <li>
          <strong>Number</strong> — Integer, decimal, or currency.
        </li>
        <li>
          <strong>Select</strong> — Single or multi-select from a list of
          options.
        </li>
        <li>
          <strong>Date</strong> — Date or date range.
        </li>
        <li>
          <strong>Person</strong> — Link to a team member.
        </li>
        <li>
          <strong>Relation</strong> — Link to an entry in another page.
        </li>
        <li>
          <strong>Files</strong> — Attach one or more files.
        </li>
        <li>
          <strong>Formula</strong> — Calculated field based on other fields.
        </li>
      </ul>
    </div>
  );
};

export default PagesStructure;
