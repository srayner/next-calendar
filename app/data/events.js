const events = [
    {
        "id": 1,
        "name": "A new event",
        "start": "2023-07-30 03:00:00",
        "end": "2023-07-30 03:30:00",
        "colour": "#4287f5"
    },
    {
        "id": 2,
        "name": "Second event",
        "start": "2023-07-30 04:00:00",
        "end": "2023-07-30 04:05:00",
        "colour": "#c242f5"
    },
    {
        "id": 3,
        "name": "Upload to GitHub",
        "start": "2023-07-23 11:00:00",
        "end": "2023-07-23 11:30:00",
        "colour": "#f5d442"
    },
    {
        "id": 4,
        "name": "Run Unit Testst",
        "start": "2023-07-23 12:00:00",
        "end": "2023-07-23 13:00:00",
        "colour": "#f54242"
    },
    {
        "id": 5,
        "name": "A new event",
        "start": "2023-07-23 17:00:00",
        "end": "2023-08-23 18:00:00",
        "colour": "#222222"
    }

];

export function filterEventsByDate(date) {

    // Extract the year, month, and day from the specified date
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
  
    // Filter events with the same year, month, and day as the specified date
    const filteredEvents = events.filter(event => {
        const eventStart = new Date(event.start);
        const eventYear = eventStart.getFullYear();
        const eventMonth = eventStart.getMonth();
        const eventDay = eventStart.getDate();
  
        return eventYear === year && eventMonth === month && eventDay === day;
    });
  
    return filteredEvents;
  }