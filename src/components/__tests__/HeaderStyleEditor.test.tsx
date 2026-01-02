import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeaderStyleEditor } from './HeaderStyleEditor';

// Mock the ThemeColorPicker component
jest.mock('./HeaderStyleEditor', () => ({
  ...jest.requireActual('./HeaderStyleEditor'),
  ThemeColorPicker: ({ value, onChange }: { value: string; onChange: (color: string) => void; }) => (
    <div data-testid="theme-color-picker">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="theme-color-picker-input"
      />
    </div>
  ),
}));

describe('HeaderStyleEditor', () => {
  it('should render the "Open Header Styler" button initially', () => {
    render(<HeaderStyleEditor />);
    expect(screen.getByLabelText('Open Header Styler')).toBeInTheDocument();
    expect(screen.getByText('Header Styles')).toBeInTheDocument();
  });

  it('should open the modal when the "Open Header Styler" button is clicked', () => {
    render(<HeaderStyleEditor />);
    fireEvent.click(screen.getByLabelText('Open Header Styler'));
    expect(screen.getByText('Header Styles')).toBeInTheDocument();
    expect(screen.getByText('Background Color')).toBeInTheDocument();
    expect(screen.getByTestId('theme-color-picker')).toBeInTheDocument();
  });

  it('should close the modal when the close button is clicked', () => {
    render(<HeaderStyleEditor />);
    fireEvent.click(screen.getByLabelText('Open Header Styler'));
    expect(screen.getByText('Header Styles')).toBeInTheDocument();
    fireEvent.click(screen.getByText('×'));
    expect(screen.queryByText('Background Color')).not.toBeInTheDocument();
  });
});
