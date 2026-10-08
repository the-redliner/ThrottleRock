// Landing-page popup announcing the next scheduled event (currently: Anjur Hill Enduro).
// Shows once per browser session, and only until the event's start time has passed.
document.addEventListener('DOMContentLoaded', function () {
    var EVENT_START = new Date('2026-10-11T08:00:00+05:30').getTime();
    var STORAGE_KEY = 'trEventPopupSeen:anjur-enduro-2026-10-11';

    if (Date.now() >= EVENT_START) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    var overlay = document.createElement('div');
    overlay.className = 'event-popup-overlay';
    overlay.innerHTML =
        '<div class="event-popup" role="dialog" aria-modal="true" aria-labelledby="event-popup-title">' +
            '<button class="event-popup-close" aria-label="Close">&times;</button>' +
            '<img src="assets/events/anjur-ride.jpg" alt="Enduro rider on a red motorcycle beside a rocky hillside trail">' +
            '<div class="event-popup-body">' +
                '<p class="event-popup-kicker">This Sunday</p>' +
                '<h3 id="event-popup-title">Anjur Hill Enduro</h3>' +
                '<p class="event-popup-meta">Sunday, 11 October &middot; 8:00 AM IST<br>Anjur Hill Sunset Point</p>' +
                '<div class="event-popup-actions">' +
                    '<a href="events.html" class="btn">View Event Details</a>' +
                    '<a href="https://wa.me/919840671730?text=Hi!%20I\'d%20like%20to%20join%20the%20Throttle%20Rock%20Enduro%20event%20at%20Anjur%20Hill%20Sunset%20Point%20on%20Sunday%2C%2011%20October%202026%20at%208%3A00%20AM.%20Please%20share%20the%20ride%20details." target="_blank" rel="noopener noreferrer" class="event-popup-link">Join via WhatsApp &#8599;</a>' +
                '</div>' +
            '</div>' +
        '</div>';
    document.body.appendChild(overlay);

    function closePopup() {
        overlay.classList.remove('active');
        document.body.classList.remove('modal-open');
        sessionStorage.setItem(STORAGE_KEY, '1');
        setTimeout(function () { overlay.remove(); }, 350);
    }

    overlay.querySelector('.event-popup-close').addEventListener('click', closePopup);
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closePopup();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closePopup();
    });

    // Double rAF: guarantees the browser has painted the popup's initial
    // (scaled-down, transparent) state before the "active" class flips it,
    // so the zoom-in transition reliably plays instead of snapping in.
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            overlay.classList.add('active');
            document.body.classList.add('modal-open');
        });
    });
});
