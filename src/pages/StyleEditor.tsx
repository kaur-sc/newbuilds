import { GolfPropertiesModern } from "./GolfPropertiesModern";
import { IconStyleEditor } from "./IconStyleEditor";

export function StyleEditor() {
  return (
    <div>
      <h1>Style Editor Loaded Successfully</h1>
      <div className="grid grid-cols-[384px_1fr] h-screen bg-background text-foreground">
        {/* Left Column: Controls */}
        <div className="bg-card border-r border-border p-6 overflow-y-auto h-screen">
          <div className="mb-8">
              <h2 className="h2 mb-2">Style Editor</h2>
              <p className="body text-muted-foreground">Live-edit your site's components.</p>
          </div>

          <div className="space-y-6">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Icon Styles</div>
            <IconStyleEditor />
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="overflow-auto h-screen relative">
          <GolfPropertiesModern />
        </div>
      </div>
    </div>
  );
}
