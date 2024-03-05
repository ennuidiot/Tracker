export function hexToRGB(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
}

function numberToHex(number) {
    let hex = number.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

export function RGBToHex(color) {
    return `#${numberToHex(color.r)}${numberToHex(color.g)}${numberToHex(color.b)}`
}

export function colorGradientSteps(startColor, stopColor, steps) {
    let colors = [];
    let startRGB = hexToRGB(startColor);
    let stopRGB = hexToRGB(stopColor);
    for (let i = 0; i < steps; i++) {
      let colorPercentage = i / (steps - 1);
      let rgb = {
        r: Math.round(
          stopRGB.r * colorPercentage + startRGB.r * (1 - colorPercentage),
        ),
        g: Math.round(
          stopRGB.g * colorPercentage + startRGB.g * (1 - colorPercentage),
        ),
        b: Math.round(
          stopRGB.b * colorPercentage + startRGB.b * (1 - colorPercentage),
        ),
        };
      colors.push(rgb);
    }
    return colors
  }