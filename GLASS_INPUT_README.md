# Glass Input Demo

This is a demonstration page showing a glass-styled text input component based on the Liquid Glass Studio effects.

## Features

- ✨ **Glass Morphism Effect**: Uses CSS `backdrop-filter` to create a beautiful glass effect
- 💎 **Semi-transparent Background**: Rgba-based transparency for depth
- 🎨 **Smooth Transitions**: Hover and focus states with smooth animations
- 📱 **Responsive Design**: Works on different screen sizes
- 🌈 **Elegant Border Glow**: Focus state with a subtle border glow effect

## How to Access

### Development Mode

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173/glass-input.html
   ```

### Production Build

The glass input demo is included in the production build with multiple entry points.

```bash
pnpm build
```

## Components

### GlassInput Component

Located at `src/components/GlassInput/`

**Usage:**
```tsx
import { GlassInput } from '@/components/GlassInput';

function MyComponent() {
  const [value, setValue] = useState('');
  
  return (
    <GlassInput
      placeholder="Type something..."
      value={value}
      onChange={setValue}
    />
  );
}
```

**Props:**
- `placeholder?: string` - Placeholder text for the input
- `value?: string` - Controlled value
- `onChange?: (value: string) => void` - Callback when value changes

## Technical Implementation

The glass effect is achieved using:
- CSS `backdrop-filter: blur(10px)` for the blur effect
- `rgba()` colors for transparency
- Box shadows for depth and elevation
- CSS transitions for smooth state changes

The implementation is pure CSS-based (no WebGL), making it lightweight and performant.
