export default async function WorkspaceHomePage({ params }) {
  const { workspaceId } = await params;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        Welcome to {workspaceId}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Your workspace is ready. Pick a section from the sidebar to get
        started.
      </p>
    </div>
  );
}
