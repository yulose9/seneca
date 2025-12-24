/**
 * Seneca Design System - "Stoic/Liquid Glass" Palette
 * 
 * Based on Apple HIG with custom brand semantics:
 * - "Stoic Paper" warm backgrounds
 * - "Liquid Glass" translucent cards
 * - Brand gradients for interactive elements
 * - Colored shadows for depth
 */

// ============================================
// BRAND FOUNDATION
// ============================================

// Seneca Blue - Discipline / Focus / Studying
export const SenecaBlue = {
    start: '#2E5C8A', // Deep Slate Blue
    end: '#4A7FB0',   // Soft Steel Blue
};

// Wealth Teal - Savings / Safety
export const WealthTeal = {
    start: '#0F766E', // Deep Jade
    end: '#14B8A6',   // Liquid Teal
};

// Empire Gold - Investment / Growth / Success
export const EmpireGold = {
    start: '#B45309', // Burnished Copper
    end: '#F59E0B',   // Amber Light
};

// Destructive Red - Errors / Debt / Missed
export const DestructiveRed = '#9F3E3E'; // Muted Brick Red

// ============================================
// LIGHT MODE PALETTE
// ============================================
export const LightColors = {
    // Canvas: "Stoic Paper"
    background: '#F9F8F5',        // High-quality resume paper
    secondaryBackground: '#FFFFFF',

    // Glass Material
    glass: 'rgba(255, 255, 255, 0.65)',
    glassBorder: 'rgba(255, 255, 255, 0.4)',
    glassBlur: 20,

    // Typography: "The Ink"
    text: '#1C1C1E',              // Primary - Headings, numbers
    textSecondary: '#666668',     // Secondary - Subtitles, dates
    textMuted: '#98989D',         // Tertiary - Placeholders, inactive

    // Brand Tint
    tint: '#2E5C8A',              // Seneca Blue (start)

    // Semantic Colors
    success: '#0F766E',           // Wealth Teal (start)
    warning: '#B45309',           // Empire Gold (start)
    destructive: '#9F3E3E',       // Muted Brick Red

    // UI Elements
    separator: '#E5E5EA',
    fill: 'rgba(120, 120, 128, 0.12)',
    secondaryFill: 'rgba(120, 120, 128, 0.08)',

    // Shadows (Colored - "Secret Sauce")
    shadow: '#2E5C8A',
    shadowOpacity: 0.08,
};

// ============================================
// DARK MODE PALETTE
// ============================================
export const DarkColors = {
    // Canvas
    background: '#121212',         // Warm dark charcoal (not OLED black)
    secondaryBackground: '#1C1C1E',

    // Glass Material
    glass: 'rgba(30, 30, 30, 0.60)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    glassBlur: 20,

    // Typography
    text: '#F2F2F7',
    textSecondary: '#AEAEB2',
    textMuted: '#636366',

    // Brand Tint
    tint: '#5A9BD5',

    // Semantic Colors
    success: '#14B8A6',
    warning: '#F59E0B',
    destructive: '#EF4444',

    // UI Elements
    separator: '#38383A',
    fill: 'rgba(120, 120, 128, 0.24)',
    secondaryFill: 'rgba(120, 120, 128, 0.16)',

    // Shadows
    shadow: '#000000',
    shadowOpacity: 0.3,
};

// ============================================
// CONSOLIDATED EXPORT (Light Mode Default)
// ============================================
export const Colors = {
    // Canvas
    background: LightColors.background,
    secondaryBackground: LightColors.secondaryBackground,

    // Glass
    glass: LightColors.glass,
    glassBorder: LightColors.glassBorder,
    glassBlur: LightColors.glassBlur,

    // Typography
    text: LightColors.text,
    textSecondary: LightColors.textSecondary,
    textMuted: LightColors.textMuted,

    // Primary/Tint
    primary: SenecaBlue.start,
    primaryForeground: '#FFFFFF',
    tint: LightColors.tint,

    // Semantic
    success: LightColors.success,
    warning: LightColors.warning,
    destructive: LightColors.destructive,

    // UI
    separator: LightColors.separator,
    fill: LightColors.fill,
    secondaryFill: LightColors.secondaryFill,

    // Shadows
    shadow: LightColors.shadow,
    shadowOpacity: LightColors.shadowOpacity,

    // Legacy compatibility
    link: SenecaBlue.start,
    quaternaryFill: 'rgba(120, 120, 128, 0.06)',
    separatorOpaque: '#E5E5EA',
};

// ============================================
// GRADIENTS (For "Liquid" Elements)
// ============================================
export const Gradients = {
    // Seneca Blue - Main buttons, toggles, study progress
    senecaBlue: [SenecaBlue.start, SenecaBlue.end],

    // Wealth Teal - Emergency fund, savings
    wealthTeal: [WealthTeal.start, WealthTeal.end],

    // Empire Gold - Stocks, streaks, AI
    empireGold: [EmpireGold.start, EmpireGold.end],
};

// ============================================
// TYPOGRAPHY SCALE (SF Pro Equivalent)
// ============================================
export const Typography = {
    largeTitle: {
        fontSize: 34,
        fontWeight: '700' as const,
        letterSpacing: 0.37,
        lineHeight: 41,
    },
    title1: {
        fontSize: 28,
        fontWeight: '700' as const,
        letterSpacing: 0.36,
        lineHeight: 34,
    },
    title2: {
        fontSize: 22,
        fontWeight: '700' as const,
        letterSpacing: 0.35,
        lineHeight: 28,
    },
    title3: {
        fontSize: 20,
        fontWeight: '600' as const,
        letterSpacing: 0.38,
        lineHeight: 25,
    },
    headline: {
        fontSize: 17,
        fontWeight: '600' as const,
        letterSpacing: -0.41,
        lineHeight: 22,
    },
    body: {
        fontSize: 17,
        fontWeight: '400' as const,
        letterSpacing: -0.41,
        lineHeight: 22,
    },
    callout: {
        fontSize: 16,
        fontWeight: '400' as const,
        letterSpacing: -0.32,
        lineHeight: 21,
    },
    subheadline: {
        fontSize: 15,
        fontWeight: '400' as const,
        letterSpacing: -0.24,
        lineHeight: 20,
    },
    footnote: {
        fontSize: 13,
        fontWeight: '400' as const,
        letterSpacing: -0.08,
        lineHeight: 18,
    },
    caption1: {
        fontSize: 12,
        fontWeight: '400' as const,
        letterSpacing: 0,
        lineHeight: 16,
    },
    caption2: {
        fontSize: 11,
        fontWeight: '400' as const,
        letterSpacing: 0.07,
        lineHeight: 13,
    },
};

// ============================================
// SPACING (8pt Grid)
// ============================================
export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 48,
};

// ============================================
// RADII
// ============================================
export const Radii = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    full: 9999,
};
