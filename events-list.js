// Events listing: mark each card Upcoming/Completed from its own start time,
// so new cards just need a correct data-start — no manual status edits.
document.querySelectorAll('.event-card[data-start]').forEach(function (card) {
    var start = new Date(card.dataset.start).getTime();
    var isPast = Date.now() >= start;
    var statusEl = card.querySelector('.event-card-status');
    card.classList.toggle('is-completed', isPast);
    card.classList.toggle('is-upcoming', !isPast);
    if (statusEl) statusEl.textContent = isPast ? 'Completed' : 'Upcoming';
});
