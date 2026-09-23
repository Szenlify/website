import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ReviewAudioCache, reviewAudioUrl, reviewAudioText, selectReviewVoice } from './review-audio.ts';
test('CDN keys match existing backend recordings, including case and language', async () => {
  // Fixtures captured from the backend's existing audioCacheKey implementation.
  for (const [text, lang, hash] of [
    [' Żółć 世界 ', 'PL', '311395288aaf70c80542d96c793db2894dec8edcb0500dfe3a53e7a978fe6319'],
    ['DOM', 'pl', '5033d54b23b3762958f2a1b8b71c74bb7844722a9ec8d9eb933145c9ec47da2d'],
    ['Dom', 'pl', '1111d58688186b7c2fce4f4d7f4d9316d408ccbfd7b8f29b57ae6600a3126ea9'],
    ['Hello. Hello world!', 'en-US', '8bdb272861de7f8f57f1dad58e96c47fefafd835edf475e32cc50c00bc796ea6'],
  ]) {
    const url = await reviewAudioUrl(text, lang);
    assert.equal(new URL(url).pathname, `/audio/gemini/gemini-2.5-flash-preview-tts/v1/Sulafat/${lang.toLowerCase()}/${hash}.wav`);
  }
  assert.equal(reviewAudioText('hello', 'HELLO'), 'hello');
  assert.equal(reviewAudioText('hello', 'Hello world'), 'hello. Hello world');
});

test('prefetch and repeated playback share one CDN download; clear releases audio', async () => {
  const original = globalThis.fetch;
  const cache = new ReviewAudioCache();
  let calls = 0;
  globalThis.fetch = async (url, options) => {
    calls++;
    assert.equal(new URL(url).hostname, 'pub-ee4534784e534bd9af38ba8022bc5e1e.r2.dev');
    assert.equal(options.method, undefined);
    assert.equal(options.priority, 'low');
    return new Response(new Blob(['recording'], {type: 'audio/wav'}));
  };
  try {
    const [a, b] = await Promise.all([cache.get('Hello', 'en', true), cache.get('Hello', 'en')]);
    assert.equal(a, b);
    assert.equal(calls, 1);
    assert.ok(a.startsWith('blob:'));
    cache.clear();
    await assert.rejects(original(a));
  } finally { cache.clear(); globalThis.fetch = original; }
});

test('missing recordings never generate speech and are not repeatedly downloaded', async () => {
  const original = globalThis.fetch;
  const cache = new ReviewAudioCache();
  let calls = 0;
  globalThis.fetch = async (_, options) => {
    calls++;
    assert.equal(options.method, undefined);
    return new Response(null, {status: 404});
  };
  try {
    assert.equal(await cache.get('Missing', 'en'), null);
    assert.equal(await cache.get('Missing', 'en'), null);
    assert.equal(cache.isMissing('Missing', 'en'), true);
    assert.equal(calls, 1);
  } finally { cache.clear(); globalThis.fetch = original; }
});


test('free voice selection prefers Google in the correct language and enhanced voices otherwise', () => {
  const voice = (name, lang, isDefault = false) => ({name, lang, default: isDefault, voiceURI: name});
  const compact = voice('Polish compact', 'pl-PL', true);
  const enhanced = voice('Polish enhanced', 'pl-PL');
  const google = voice('Google polski', 'pl-PL');
  const wrong = voice('Google US English', 'en-US', true);
  assert.equal(selectReviewVoice([wrong, compact, enhanced, google], 'pl'), google);
  assert.equal(selectReviewVoice([wrong, compact, enhanced], 'pl'), enhanced);
  assert.equal(selectReviewVoice([wrong], 'pl'), undefined);
  assert.equal(selectReviewVoice([], 'pl'), undefined);
  assert.equal(selectReviewVoice([voice('Google UK English', 'en-GB'), wrong], 'en-US'), wrong);
});
