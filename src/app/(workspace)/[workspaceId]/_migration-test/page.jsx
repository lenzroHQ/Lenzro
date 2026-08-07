export default async function MigrationTestPage({ params }) {
  const { workspaceId } = await params;
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-zinc-400 text-sm">
        Migration Test — Workspace{" "}
        <span className="text-white font-mono">{workspaceId}</span>
      </p>
    </div>
  );
}
