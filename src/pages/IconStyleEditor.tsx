import { ChevronRight } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { IconStyleEditorContent } from '@/components/ui/IconStyleEditorContent';

interface IconStyleEditorProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function IconStyleEditor({ isOpen: externalIsOpen, onOpenChange }: IconStyleEditorProps = {}) {
  const internalIsOpen = externalIsOpen !== undefined ? externalIsOpen : false;
  const handleOpenChange = onOpenChange || (() => {});

  return (
    <>
      <button
        onClick={() => handleOpenChange(true)}
        className="w-full flex items-center justify-between p-4 bg-card hover:bg-muted rounded-lg border border-border"
        aria-label="Open Icon Styler"
      >
        <span className="font-medium">Icon Styles</span>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </button>

      <Dialog
        isOpen={internalIsOpen}
        onClose={() => handleOpenChange(false)}
        title="Icon Styles"
      >
        <IconStyleEditorContent />
      </Dialog>
    </>
  );
}
