export type ElementConfig = {
    // Typography
    size?: string;
    weight?: string;
    lineHeight?: string;
    letterSpacing?: string;
    under?: string;
    // Color
    color?: string;
    // UI
    bg?: string;
    text?: string;
    radius?: string;
    px?: string;
    py?: string;
    border?: string;
    // States
    hoverBg?: string;
    hoverText?: string;
    hoverBorder?: string;
    hoverScale?: string;
    activeBg?: string;
    activeText?: string;
    activeBorder?: string;
    activeScale?: string;
    // Responsive variants
    mobile?: {
        size?: string;
        weight?: string;
        lineHeight?: string;
        letterSpacing?: string;
        color?: string;
        px?: string;
        py?: string;
        radius?: string;
    };
    desktop?: {
        size?: string;
        weight?: string;
        lineHeight?: string;
        letterSpacing?: string;
        color?: string;
        px?: string;
        py?: string;
        radius?: string;
    };
};

export type ElementMap = {
    [key: string]: ElementConfig;
};

export interface ThemeConfig {
    id: string;
    name: string;
    colors: { [key: string]: string };
    baseTypo: {
        fontSize: string;
        fontFamily: string;
    };
    elementStyles: ElementMap;
}

export interface RouteMetadata {
    theme?: string;
}
