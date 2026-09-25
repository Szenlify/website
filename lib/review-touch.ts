interface TouchPoint {
  identifier: number;
  clientX: number;
  clientY: number;
}

interface ReviewTouchHandlers {
  start: (point: TouchPoint, target: EventTarget | null) => boolean;
  move: (point: TouchPoint) => boolean;
  end: (point: TouchPoint) => void;
  cancel: () => void;
}

/** Keep horizontal swipes out of native scrolling without blocking vertical
 * scrolling or pinch zoom. Touch events survive pointer capture changes. */
export function attachReviewTouch(card: HTMLElement, handlers: ReviewTouchHandlers) {
  let identifier: number | null = null;
  const cancel = () => {
    if (identifier === null) return;
    identifier = null;
    handlers.cancel();
  };
  const start = (event: TouchEvent) => {
    cancel();
    if (event.touches.length !== 1) return;
    const point = event.changedTouches[0];
    if (point && handlers.start(point, event.target)) identifier = point.identifier;
  };
  const move = (event: TouchEvent) => {
    if (identifier === null) return;
    if (event.touches.length !== 1 || !event.cancelable) {
      cancel();
      return;
    }
    const point = Array.from(event.changedTouches).find((touch) => touch.identifier === identifier);
    if (point && handlers.move(point)) event.preventDefault();
  };
  const end = (event: TouchEvent) => {
    if (identifier === null) return;
    const point = Array.from(event.changedTouches).find((touch) => touch.identifier === identifier);
    if (!point) return;
    identifier = null;
    handlers.end(point);
  };

  card.addEventListener("touchstart", start, { passive: true });
  // React's delegated touchmove listener is passive; this listener must be able
  // to prevent native scrolling once a horizontal gesture has been identified.
  card.addEventListener("touchmove", move, { passive: false });
  card.addEventListener("touchend", end, { passive: true });
  card.addEventListener("touchcancel", cancel, { passive: true });
  card.addEventListener("scroll", cancel, true);
  return () => {
    card.removeEventListener("touchstart", start);
    card.removeEventListener("touchmove", move);
    card.removeEventListener("touchend", end);
    card.removeEventListener("touchcancel", cancel);
    card.removeEventListener("scroll", cancel, true);
    cancel();
  };
}
