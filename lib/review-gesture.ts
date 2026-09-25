// A rating requires deliberate horizontal travel, never velocity alone.
export const reviewSwipeThreshold = (width: number) =>
  Math.max(80, Math.min(120, width * 0.28));

export class ReviewGesture {
  private active: {
    pointerId: number;
    startX: number;
    startY: number;
    startedAt: number;
    width: number;
    horizontal: boolean;
    maxTravel: number;
    x: number;
  } | null = null;

  get pointerId() { return this.active?.pointerId ?? null; }
  get deltaX() { return this.active?.horizontal ? this.active.x : 0; }
  get dragging() { return this.active?.horizontal ?? false; }

  start(pointerId: number, x: number, y: number, width: number, now: number) {
    this.active = { pointerId, startX: x, startY: y, width, startedAt: now,
      horizontal: false, maxTravel: 0, x: 0 };
  }

  cancel() { this.active = null; }

  move(pointerId: number, x: number, y: number) {
    const active = this.active;
    if (!active || active.pointerId !== pointerId) return;
    const dx = x - active.startX;
    const dy = y - active.startY;
    active.maxTravel = Math.max(active.maxTravel, Math.hypot(dx, dy));
    // Choose the axis once, like native scrolling. A thumb naturally follows
    // an arc: vertical drift must not cancel an already established swipe.
    if (!active.horizontal) {
      if (Math.abs(dx) >= 10 && Math.abs(dx) >= Math.abs(dy) * 1.2) {
        active.horizontal = true;
      } else if (
        (Math.abs(dy) >= 10 && Math.abs(dy) >= Math.abs(dx) * 1.2) ||
        Math.max(Math.abs(dx), Math.abs(dy)) >= 24
      ) {
        // Give small diagonal starts time to resolve, but never rate an
        // established vertical or ambiguous gesture.
        this.cancel();
        return;
      }
    }
    active.x = dx;
  }

  finish(pointerId: number, x: number, y: number, now: number): "tap" | 1 | 2 | null {
    if (this.pointerId !== pointerId) return null;
    // Use release coordinates: the last move can be stale or coalesced on mobile.
    this.move(pointerId, x, y);
    const active = this.active;
    this.cancel();
    if (!active) return null;
    if (active.horizontal && Math.abs(active.x) >= reviewSwipeThreshold(active.width)) {
      return active.x < 0 ? 1 : 2;
    }
    if (active.maxTravel < 10 && now - active.startedAt < 380) return "tap";
    return null;
  }
}
