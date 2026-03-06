const AiAssistant = () => {
  return (
    <div>
      <h2 id="capabilities">Capabilities</h2>
      <p>
        The Lenzro AI assistant is not a generic chatbot — it is a
        workspace-aware agent that knows the structure, content, and context of
        your entire workspace. It can:
      </p>
      <ul>
        <li>
          Answer questions about any page, project, or client in your workspace
        </li>
        <li>Draft and edit content directly in pages or widgets</li>
        <li>
          Create new pages, schemas, or widgets based on your instructions
        </li>
        <li>Summarise long documents or data tables</li>
        <li>Generate reports from your structured data</li>
        <li>Suggest next actions based on your current workload</li>
        <li>Send updates to team members or clients on your behalf</li>
      </ul>

      <h2 id="how-it-works">How It Works</h2>
      <p>
        The AI assistant builds a real-time context window from your workspace
        data — pages, schemas, recent edits, team activity, and your current
        canvas view. When you send a message, the AI has full visibility into
        what is happening in your workspace and can act accordingly.
      </p>
      <p>
        The AI is triggered via the Edge Panel chat, the <code>/ai</code>{" "}
        command on the canvas, or inline within any page using the{" "}
        <code>@AI</code> mention.
      </p>

      <h2 id="ai-actions">AI Actions</h2>
      <p>
        Beyond answering questions, the AI can perform <strong>actions</strong>{" "}
        — real changes to your workspace:
      </p>
      <ul>
        <li>
          <strong>Create</strong> —{" "}
          <em>
            &quot;Create a new client page for Acme Corp with contact
            fields.&quot;
          </em>
        </li>
        <li>
          <strong>Update</strong> —{" "}
          <em>
            &quot;Mark all overdue tasks in the Sprint board as blocked.&quot;
          </em>
        </li>
        <li>
          <strong>Summarise</strong> —{" "}
          <em>
            &quot;Summarise this week&apos;s activity into a bullet list.&quot;
          </em>
        </li>
        <li>
          <strong>Generate</strong> —{" "}
          <em>
            &quot;Generate a project brief for the homepage redesign.&quot;
          </em>
        </li>
        <li>
          <strong>Organise</strong> —{" "}
          <em>
            &quot;Group all draft pages into a new section called Backlog.&quot;
          </em>
        </li>
      </ul>
      <p>
        All AI actions are reversible — you can undo any change the AI makes
        from the activity log.
      </p>
    </div>
  );
};

export default AiAssistant;
