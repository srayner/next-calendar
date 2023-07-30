
import { differenceInMinutes, startOfDay } from "date-fns";

function getTextColorForBackground(bgColor) {

    const hexToRgb = (hex) => {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return [r, g, b];
    };

    const getRelativeLuminance = (color) => {
        const gamma = (value) => {
            value /= 255;

            return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
        };
  
        const [r, g, b] = color.map(gamma);

        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
  
    const bgColorRgb = hexToRgb(bgColor);
    const bgColorLuminance = getRelativeLuminance(bgColorRgb);

    return bgColorLuminance > 0.5 ? "dark" : "light";
}

// Function to calculate the height and top position of the event visual display on screen
function calculateEventPosition(start, end) {
    const durationInMinutes = differenceInMinutes(end, start);
  
    // Calculate the height by rounding up the duration to the nearest 15 minutes
    let height = Math.ceil(durationInMinutes / 15) * 15;
  
    // Calculate the top position in minutes from the start of the day
    const top = differenceInMinutes(start, startOfDay(start));
  
    // Ensure the height does not exceed the maximum allowed height (1440 minutes)
    if (height + top > 1440) {
      height = 1440 - top;
    }

    return { height: height - 1, top, left: 0, right: 0 };
}
  
/**
 * Add events to the hours array
 */
export const populateHours = (hours, day, events) => {
    events.forEach(event => {
        const start = new Date(event.start);
        const end = new Date(event.end);
        const eventHour = start.getHours();
        hours[eventHour][day].events.push({
            id: event.id,
            name: event.name,
            position: calculateEventPosition(start, end),
            backgroundColor: event.colour,
            color: getTextColorForBackground(event.colour),
            duration: differenceInMinutes(end, start)
        });
    });
};