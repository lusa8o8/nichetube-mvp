export const COLORS = {
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    secondary: '#8b5cf6',
    background: '#0f172a',
    surface: '#1e293b',
    surfaceLight: '#334155',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    accent: '#06b6d4',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const TYPOGRAPHY = {
    h1: {
        fontSize: 32,
        fontWeight: 'bold' as const,
        color: COLORS.text,
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold' as const,
        color: COLORS.text,
    },
    h3: {
        fontSize: 20,
        fontWeight: '600' as const,
        color: COLORS.text,
    },
    body: {
        fontSize: 16,
        fontWeight: 'normal' as const,
        color: COLORS.text,
    },
    bodySecondary: {
        fontSize: 14,
        fontWeight: 'normal' as const,
        color: COLORS.textSecondary,
    },
    caption: {
        fontSize: 12,
        fontWeight: 'normal' as const,
        color: COLORS.textSecondary,
    },
};

export const BORDER_RADIUS = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
};
