import { useState, useEffect } from 'react';
import { Settings, ChevronRight, Check, RotateCcw } from 'lucide-react';
import { extractPagesFromRoutes, getAvailableThemes, applyThemeToPage, getPageThemeAssignments, type PageInfo } from '@/lib/pageThemeManager';
import type { ThemeKey } from '@/themes';

export const PageThemeSelector = () => {
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [availableThemes, setAvailableThemes] = useState<Array<{ id: ThemeKey; name: string }>>([]);
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>('golf');
  const [assignments, setAssignments] = useState<Array<{ pagePath: string; themeId: ThemeKey }>>([]);

  // Load data on component mount
  useEffect(() => {
    console.log('PageThemeSelector: Loading data...');
    const loadedPages = extractPagesFromRoutes();
    console.log('PageThemeSelector: Loaded pages:', loadedPages);
    const loadedThemes = getAvailableThemes();
    console.log('PageThemeSelector: Loaded themes:', loadedThemes);
    const loadedAssignments = getPageThemeAssignments();
    console.log('PageThemeSelector: Loaded assignments:', loadedAssignments);
    
    setPages(loadedPages);
    setAvailableThemes(loadedThemes);
    setAssignments(loadedAssignments);
    
    // Set initial selections
    if (loadedPages.length > 0) {
      setSelectedPage(loadedPages[0].path);
      const pageAssignment = loadedAssignments.find(a => a.pagePath === loadedPages[0].path);
      if (pageAssignment) {
        setSelectedTheme(pageAssignment.themeId);
      } else if (loadedPages[0].currentTheme) {
        setSelectedTheme(loadedPages[0].currentTheme);
      }
    }
  }, []);

  // Update selected theme when page changes
  useEffect(() => {
    if (selectedPage) {
      const pageAssignment = assignments.find(a => a.pagePath === selectedPage);
      if (pageAssignment) {
        setSelectedTheme(pageAssignment.themeId);
      } else {
        const page = pages.find(p => p.path === selectedPage);
        if (page?.currentTheme) {
          setSelectedTheme(page.currentTheme);
        } else {
          setSelectedTheme('golf'); // default
        }
      }
    }
  }, [selectedPage, assignments, pages]);

  const handleApplyTheme = () => {
    if (selectedPage && selectedTheme) {
      applyThemeToPage(selectedPage, selectedTheme);
      
      // Update local state to reflect the change immediately
      const newAssignments = [...assignments];
      const existingIndex = newAssignments.findIndex(a => a.pagePath === selectedPage);
      
      if (existingIndex >= 0) {
        newAssignments[existingIndex].themeId = selectedTheme;
      } else {
        newAssignments.push({ pagePath: selectedPage, themeId: selectedTheme });
      }
      
      setAssignments(newAssignments);
      
      // Check if theme was applied to current page for feedback
      const currentPath = window.location.pathname;
      const isCurrentPage = selectedPage === '/' && currentPath === '/' ||
                           selectedPage.includes('new-build-golf-properties') && currentPath.includes('new-build-golf-properties');
      
      if (isCurrentPage) {
        // Show success feedback
        const themeName = availableThemes.find(t => t.id === selectedTheme)?.name;
        console.log(`✅ Theme "${themeName}" applied successfully!`);
      }
    }
  };

  const handleResetAll = () => {
    localStorage.removeItem('pageThemeAssignments');
    setAssignments([]);
    console.log('All page theme assignments have been reset');
  };

  const getCurrentThemeForPage = (pagePath: string): ThemeKey | undefined => {
    const assignment = assignments.find(a => a.pagePath === pagePath);
    return assignment?.themeId || pages.find(p => p.path === pagePath)?.currentTheme;
  };

  return (
    <div className="space-y-6 p-6 bg-card border rounded-xl shadow-lg">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold">Page Theme Manager</h3>
        </div>
        <button
          onClick={handleResetAll}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          title="Reset all theme assignments"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Page Selection */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Select Page
        </label>
        <div className="relative">
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 pr-10 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/30 transition-all"
          >
            {pages.length > 0 ? (
              pages.map((page) => (
                <option key={page.path} value={page.path}>
                  {page.name}
                </option>
              ))
            ) : (
              <option value="">No pages found</option>
            )}
          </select>
          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none rotate-90" />
        </div>
      </div>

      {/* Theme Selection */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Select Theme
        </label>
        <div className="relative">
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value as ThemeKey)}
            className="w-full bg-background border border-border rounded-lg px-4 py-3 pr-10 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/30 transition-all"
          >
            {availableThemes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none rotate-90" />
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={handleApplyTheme}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95"
      >
        <Check className="w-4 h-4" />
        Apply Theme to Page
      </button>

      {/* Current Assignments */}
      <div className="space-y-3 pt-4 border-t">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Current Assignments
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {assignments.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-4 border border-dashed border-border rounded-lg">
              No theme assignments yet. Select a page and theme above to get started.
            </div>
          ) : (
            assignments.map((assignment) => {
              const page = pages.find(p => p.path === assignment.pagePath);
              const theme = availableThemes.find(t => t.id === assignment.themeId);
              
              if (!page || !theme) return null;
              
              return (
                <div
                  key={assignment.pagePath}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{page.name}</span>
                    <span className="text-xs text-muted-foreground">{assignment.pagePath}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-primary">{theme.name}</span>
                    <div
                      className="w-3 h-3 rounded-full border border-border"
                      style={{
                        backgroundColor: theme.id === 'midnight' ? '#8b5cf6' : '#10b981'
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
        <div className="text-xs text-blue-800 leading-relaxed">
          <strong>How it works:</strong> Select a page from the dropdown, choose a theme, and click "Apply Theme to Page". 
          The theme assignments are stored locally and will be reflected in the navigation. 
          For permanent changes, you'll need to update the routes configuration.
        </div>
      </div>
    </div>
  );
};
