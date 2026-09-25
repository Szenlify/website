import { test } from 'node:test';
import assert from 'node:assert/strict';
import { attachReviewTouch } from './review-touch.ts';
import { ReviewGesture } from './review-gesture.ts';

function harness(accept = true) {
  const card = new EventTarget();
  const gesture = new ReviewGesture();
  const actions = [];
  const dispose = attachReviewTouch(card, {
    start: (p) => {
      if (!accept) return false;
      gesture.start(p.identifier, p.clientX, p.clientY, 320, 0);
      return true;
    },
    move: (p) => {
      gesture.move(p.identifier, p.clientX, p.clientY);
      return gesture.dragging;
    },
    end: (p) => {
      const result = gesture.finish(p.identifier, p.clientX, p.clientY, 200);
      if (result !== null) actions.push(result);
    },
    cancel: () => gesture.cancel(),
  });
  const send = (type, x = 150, y = 200, options = {}) => {
    const point = { identifier: 7, clientX: x, clientY: y };
    const event = new Event(type, { cancelable: options.cancelable ?? true });
    Object.assign(event, {
      touches: options.touches ?? (type === 'touchend' ? [] : [point]),
      changedTouches: [point],
    });
    card.dispatchEvent(event);
    return event;
  };
  return { actions, send, dispose };
}

test('horizontal touch prevents native scrolling and rates exactly once', () => {
  const h = harness();
  h.send('touchstart');
  assert.equal(h.send('touchmove', 172, 210).defaultPrevented, true);
  h.send('touchmove', 260, 240);
  h.send('touchend', 260, 240);
  h.send('touchend', 260, 240);
  assert.deepEqual(h.actions, [2]);
  h.dispose();
});

test('vertical touch preserves native scrolling without rating or flipping', () => {
  const h = harness();
  h.send('touchstart');
  assert.equal(h.send('touchmove', 154, 225).defaultPrevented, false);
  h.send('scroll');
  h.send('touchend', 280, 240);
  assert.deepEqual(h.actions, []);
  h.dispose();
});

test('tap flips once, while a short drag does not flip', () => {
  const h = harness();
  h.send('touchstart');
  h.send('touchend');
  h.send('touchstart');
  h.send('touchmove', 180, 201);
  h.send('touchend', 180, 201);
  assert.deepEqual(h.actions, ['tap']);
  h.dispose();
});

test('native scrolling, cancellation and a second finger discard a pending swipe', () => {
  for (const interrupt of [
    (h) => h.send('touchmove', 250, 210, { cancelable: false }),
    (h) => h.send('touchcancel'),
    (h) => h.send('scroll'),
    (h) => h.send('touchstart', 170, 210, { touches: [{ identifier: 7 }, { identifier: 8 }] }),
  ]) {
    const h = harness();
    h.send('touchstart');
    h.send('touchmove', 180, 201);
    interrupt(h);
    h.send('touchend', 280, 210);
    assert.deepEqual(h.actions, []);
    h.dispose();
  }
});

test('excluded controls and unmounted cards cannot trigger a gesture', () => {
  const excluded = harness(false);
  excluded.send('touchstart');
  assert.equal(excluded.send('touchmove', 280, 200).defaultPrevented, false);
  excluded.send('touchend', 280, 200);
  assert.deepEqual(excluded.actions, []);
  excluded.dispose();

  const h = harness();
  h.send('touchstart');
  h.send('touchmove', 180, 201);
  h.dispose();
  h.send('touchend', 280, 200);
  assert.deepEqual(h.actions, []);
});
