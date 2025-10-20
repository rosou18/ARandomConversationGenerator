# Interactive Voting Chart

A smooth, modern, and interactive voting visualization built with p5.js that asks the thought-provoking question: "Would you rather be homeless or in prison?"

## Features

- **Smooth Animations**: All transitions use lerp (linear interpolation) for buttery-smooth motion
- **Interactive Pie Chart**: Responds to mouse movement with subtle parallax effects
- **Real-time Updates**: Vote counts and percentages update instantly with smooth transitions
- **Hover Effects**: Segments highlight when you hover over them
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional design with gradient backgrounds and smooth button interactions
- **Donut Chart Style**: Center circle shows total vote count

## Technical Highlights

### Smooth Animations
- Uses `lerp()` for smooth value transitions
- Separate animation speeds for different elements
- Mouse-based parallax offset for depth

### Visual Design
- Gradient backgrounds
- Shadow effects for depth
- Hover state highlighting
- Animated button clicks
- Professional color scheme (Blue vs Red)

### Code Quality
- Clean, well-organized code structure
- Commented sections
- Efficient rendering with minimal redraws
- Smooth percentage calculations

## How to Use

1. Open `index.html` in a modern web browser
2. Click either "🏠 Be Homeless" or "🔒 Be in Prison" to cast your vote
3. Move your mouse around to see the interactive parallax effect
4. Watch the smooth animations as votes are tallied

## File Structure

```
├── index.html    # Main HTML structure
├── sketch.js     # p5.js visualization logic
├── style.css     # Modern styling and animations
└── README.md     # This file
```

## Technologies Used

- **p5.js**: Creative coding library for canvas rendering
- **HTML5**: Modern semantic markup
- **CSS3**: Advanced styling with gradients and animations
- **JavaScript**: Interactive functionality

## Browser Support

Works in all modern browsers that support:
- HTML5 Canvas
- CSS3 Animations
- ES6 JavaScript

## Customization

You can easily customize:
- Colors in `sketch.js` (lines with `color()` function)
- Animation speed by adjusting `LERP_SPEED`
- Hover amplitude with `HOVER_AMPLITUDE`
- Button text and emojis
- Chart dimensions and positioning

## Credits

Created with p5.js - a JavaScript library for creative coding
