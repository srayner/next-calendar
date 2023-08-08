function save(events) {
    localStorage.setItem('events', JSON.stringify(events));
}

function load() {
    const savedData = localStorage.getItem('events');

    return savedData ? JSON.parse(savedData) : [];
}

export const saveEvent = (event) => {
    const events = load();
    events.push(event);
    save(events);
}

export const filterEventsByDate = (date) => {

    const events = load();

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
