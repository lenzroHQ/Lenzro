const CreateWorkspace = () => {
  return (
    <div>
      <h2 id="workspace-types">Workspace Types</h2>
      <p>
        When you create a workspace in Lenzro, you choose a starting template
        that pre-configures the canvas and pages for your use case:
      </p>
      <ul>
        <li>
          <strong>Business</strong> — Full setup for teams and agencies, with
          client management, project tracking, and file storage.
        </li>
        <li>
          <strong>Personal</strong> — A lightweight workspace for solo creators
          and individual productivity.
        </li>
        <li>
          <strong>Product</strong> — Optimised for product teams, with sprint
          boards, design asset pages, and a roadmap canvas.
        </li>
        <li>
          <strong>Blank</strong> — Start from scratch and build exactly what you
          need.
        </li>
      </ul>

      <h2 id="setup-steps">Setup Steps</h2>
      <ol>
        <li>
          Click <strong>New Workspace</strong> from your dashboard.
        </li>
        <li>Choose a template or start blank.</li>
        <li>Give your workspace a name and optional description.</li>
        <li>Configure your workspace branding (logo, accent colour).</li>
        <li>Select your plan if required.</li>
        <li>
          Click <strong>Create</strong> — your Blackboard opens instantly.
        </li>
      </ol>

      <h2 id="inviting-members">Inviting Members</h2>
      <p>
        Once your workspace is created, you can invite collaborators from the
        workspace settings. Lenzro supports role-based access:
      </p>
      <ul>
        <li>
          <strong>Owner</strong> — Full control over the workspace and billing.
        </li>
        <li>
          <strong>Admin</strong> — Can manage members, settings, and all
          content.
        </li>
        <li>
          <strong>Editor</strong> — Can create and edit pages and widgets.
        </li>
        <li>
          <strong>Viewer</strong> — Read-only access to the workspace.
        </li>
      </ul>
      <p>
        Invite members by email or share a workspace invite link with an
        expiration window.
      </p>
    </div>
  );
};

export default CreateWorkspace;
