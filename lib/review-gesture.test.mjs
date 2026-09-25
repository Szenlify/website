import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ReviewGesture } from './review-gesture.ts';

const start = () => {
  const gesture = new ReviewGesture();
  gesture.start(1, 150, 200, 320, 0);
  return gesture;
};

test('a tap or small, fast finger jitter never rates a card', () => {
  const tap = start();
  tap.move(1, 154, 203);
  assert.equal(tap.dragging, false);
  assert.equal(tap.finish(1, 154, 203, 100), 'tap');
  for (const distance of [-35, 35, 79]) {
    const gesture = start();
    gesture.move(1, 150 + distance, 200);
    assert.equal(gesture.finish(1, 150 + distance, 200, 20), null);
  }
});

test('deliberate horizontal swipes rate once in the intended direction', () => {
  for (const [distance, grade] of [[-110, 1], [110, 2]]) {
    const gesture = start();
    gesture.move(1, 150 + distance, 205);
    assert.equal(gesture.dragging, true);
    assert.equal(gesture.finish(1, 150 + distance, 205, 300), grade);
    assert.equal(gesture.finish(1, 150 + distance, 205, 310), null);
  }
});

test('scrolling and diagonal movement cannot turn into a rating or flip', () => {
  for (const [x, y] of [[152, 220], [180, 230]]) {
    const gesture = start();
    gesture.move(1, x, y);
    gesture.move(1, 290, 220);
    assert.equal(gesture.finish(1, 290, 220, 300), null);
  }
});

test('release coordinates override stale movement and returning to center does not flip', () => {
  const gesture = start();
  gesture.move(1, 270, 200);
  assert.equal(gesture.finish(1, 150, 200, 300), null);
});

test('cancellation, capture loss, TTS contact or card transition discard pending input', () => {
  const gesture = start();
  gesture.move(1, 270, 200);
  gesture.cancel();
  assert.equal(gesture.deltaX, 0);
  assert.equal(gesture.finish(1, 270, 200, 300), null);
  gesture.start(2, 50, 50, 320, 400);
  assert.equal(gesture.finish(1, 270, 200, 410), null);
  assert.equal(gesture.finish(2, 50, 50, 500), 'tap');
});

test('another pointer cannot move or finish an active gesture', () => {
  const gesture = start();
  gesture.move(2, 400, 200);
  assert.equal(gesture.deltaX, 0);
  assert.equal(gesture.finish(2, 400, 200, 100), null);
  assert.equal(gesture.finish(1, 150, 200, 200), 'tap');
});

test('long press and large vertical release do not flip or rate', () => {
  assert.equal(start().finish(1, 150, 200, 1000), null);
  assert.equal(start().finish(1, 150, 300, 200), null);
});
