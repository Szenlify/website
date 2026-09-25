import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ReviewAudioCache,
  reviewAudioUrl,
  reviewAudioText,
  edgeAudioUrl,
  selectReviewVoice,
  cleanSpeechText,
  getRecommendedSpeechRate,
  isMobileDevice,
  isSafariBrowser,
  OPENAI_VOICE_GAIN,
  stopActiveAudio,
  playBoostedAudioUrl,
} from './review-audio.ts';

test('CDN keys match existing backend recordings, including case and language', async () => {
  // Fixtures captured from the backend's existing audioCacheKey implementation.
  for (const [text, lang, hash] of [
    [' Żółć 世界 ', 'PL', '311395288aaf70c80542d96c793db2894dec8edcb0500dfe3a53e7a978fe6319'],
    ['DOM', 'pl', '5033d54b23b3762958f2a1b8b71c74bb7844722a9ec8d9eb933145c9ec47da2d'],
    ['Dom', 'pl', '1111d58688186b7c2fce4f4d7f4d9316d408ccbfd7b8f29b57ae6600a3126ea9'],
    ['Hello. Hello world!', 'en-US', '8bdb272861de7f8f57f1dad58e96c47fefafd835edf475e32cc50c00bc796ea6'],
  ]) {
    const url = await reviewAudioUrl(text, lang);
    assert.equal(new URL(url).pathname, `/audio/openai/tts-1/v1/nova/${lang.toLowerCase()}/${hash}.mp3`);
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

test('missing recordings never generate speech and are not repeatedly downloaded without synthesis options', async () => {
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

test('PC browsers strictly allow ONLY Google voices and return undefined otherwise', () => {
  const voice = (name, lang, isDefault = false) => ({ name, lang, default: isDefault, voiceURI: name });
  const compact = voice('Polish compact', 'pl-PL', true);
  const enhanced = voice('Polish enhanced', 'pl-PL');
  const google = voice('Google polski', 'pl-PL');
  const wrong = voice('Google US English', 'en-US', true);

  // In PC environment, Google voice is picked
  assert.equal(selectReviewVoice([wrong, compact, enhanced, google], 'pl'), google);

  // In PC environment, if no Google voice exists for the language, it strictly returns undefined
  assert.equal(selectReviewVoice([wrong, compact, enhanced], 'pl'), undefined);
  assert.equal(selectReviewVoice([wrong], 'pl'), undefined);
  assert.equal(selectReviewVoice([], 'pl'), undefined);
  assert.equal(selectReviewVoice([voice('Google UK English', 'en-GB'), wrong], 'en-US'), wrong);
});

test('cleanSpeechText strips pronunciation guides, markdown, brackets, and awkward slashes', () => {
  assert.equal(cleanSpeechText('take [verb] / grab'), 'take, grab');
  assert.equal(cleanSpeechText('**Hello** *world* #title `code`'), 'Hello world title code');
  assert.equal(cleanSpeechText('Wait... really???'), 'Wait. really???');
  assert.equal(cleanSpeechText(''), '');
});

test('Apple iOS speech rate is optimized and Siri/Enhanced voices are prioritized', () => {
  const origDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  try {
    Object.defineProperty(globalThis, 'navigator', {
      value: { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)', platform: 'iPhone' },
      configurable: true,
      writable: true,
    });
    // On iOS, default Apple voice rate is 0.89x for smooth cadence
    assert.equal(getRecommendedSpeechRate(1), 0.89);
    assert.equal(getRecommendedSpeechRate(0.75), 0.67);

    // If Google voice is specified, rate remains 1.0x
    assert.equal(getRecommendedSpeechRate(1, 'Google US English'), 1);

    // Voice selection on iOS prioritizes Siri, Enhanced and penalizes Compact
    const voice = (name, lang, isDefault = false) => ({ name, lang, default: isDefault, voiceURI: name });
    const zosiaCompact = voice('Zosia (Compact)', 'pl-PL', true);
    const zosiaEnhanced = voice('Zosia (Enhanced)', 'pl-PL');
    const selected = selectReviewVoice([zosiaCompact, zosiaEnhanced], 'pl');
    assert.equal(selected, zosiaEnhanced);

    const siri = voice('Siri Voice 1', 'en-US');
    const samantha = voice('Samantha (Enhanced)', 'en-US');
    const compact = voice('Samantha (Compact)', 'en-US', true);
    assert.equal(selectReviewVoice([compact, samantha, siri], 'en'), siri);
  } finally {
    if (origDescriptor) {
      Object.defineProperty(globalThis, 'navigator', origDescriptor);
    } else {
      delete globalThis.navigator;
    }
  }
});

test('PC browsers on Windows/Mac/Linux reject non-Google voices (no Microsoft/system fallbacks)', () => {
  const voice = (name, lang, isDefault = false) => ({ name, lang, default: isDefault, voiceURI: name });
  const origDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');

  try {
    Object.defineProperty(globalThis, 'navigator', {
      value: { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
      configurable: true,
      writable: true,
    });
    const edgeNatural = voice('Microsoft Jenny Online (Natural) - English (United States)', 'en-US');
    const basic = voice('Microsoft David - English (United States)', 'en-US');
    const google = voice('Google US English', 'en-US');

    // With Google voice present: strictly chooses Google
    assert.equal(selectReviewVoice([basic, edgeNatural, google], 'en'), google);

    // Without Google voice on PC: strictly returns undefined (no Microsoft voice fallback)
    assert.equal(selectReviewVoice([basic, edgeNatural], 'en'), undefined);
  } finally {
    if (origDescriptor) Object.defineProperty(globalThis, 'navigator', origDescriptor);
    else delete globalThis.navigator;
  }
});

test('edgeAudioUrl builds correct path and getEdge fetches and caches audio blob', async () => {
  assert.equal(edgeAudioUrl('Dzień dobry', 'pl'), '/api/tts?text=Dzie%C5%84%20dobry&lang=pl');

  const original = globalThis.fetch;
  const cache = new ReviewAudioCache();
  let calls = 0;
  globalThis.fetch = async (url) => {
    calls++;
    assert.ok(url.startsWith('/api/tts'));
    return new Response(new Blob(['mp3audio'], { type: 'audio/mpeg' }));
  };
  try {
    const a = await cache.getEdge('Hello', 'en');
    const b = await cache.getEdge('Hello', 'en');
    assert.equal(a, b);
    assert.equal(calls, 1);
    assert.ok(a.startsWith('blob:'));
  } finally {
    cache.clear();
    globalThis.fetch = original;
  }
});

test('isMobileDevice and isSafariBrowser accurately distinguish mobile and desktop browsers', () => {
  const origDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');

  try {
    // 1. Android phone
    Object.defineProperty(globalThis, 'navigator', {
      value: { userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36' },
      configurable: true,
      writable: true,
    });
    assert.equal(isMobileDevice(), true);
    assert.equal(isSafariBrowser(), false);

    // 2. iPhone
    Object.defineProperty(globalThis, 'navigator', {
      value: { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1' },
      configurable: true,
      writable: true,
    });
    assert.equal(isMobileDevice(), true);

    // 3. Desktop Mac Safari
    Object.defineProperty(globalThis, 'navigator', {
      value: { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15', vendor: 'Apple Computer, Inc.' },
      configurable: true,
      writable: true,
    });
    assert.equal(isMobileDevice(), false);
    assert.equal(isSafariBrowser(), true);

    // 4. Desktop Windows Chrome
    Object.defineProperty(globalThis, 'navigator', {
      value: { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', vendor: 'Google Inc.' },
      configurable: true,
      writable: true,
    });
    assert.equal(isMobileDevice(), false);
    assert.equal(isSafariBrowser(), false);
  } finally {
    if (origDescriptor) Object.defineProperty(globalThis, 'navigator', origDescriptor);
    else delete globalThis.navigator;
  }
});


test('getOpenAi fetches from R2 CDN or synthesizes via proxy', async () => {
  const original = globalThis.fetch;
  const cache = new ReviewAudioCache();
  let proxyCalled = false;

  globalThis.fetch = async (url, options) => {
    const urlStr = String(url);
    if (urlStr.includes('r2.dev')) {
      // simulate 404 cache miss on R2
      return new Response(null, { status: 404 });
    }
    if (urlStr.includes('geminiProxy')) {
      proxyCalled = true;
      assert.equal(options.method, 'POST');
      const body = JSON.parse(options.body);
      assert.equal(body.action, 'synthesizeOpenAiTts');
      assert.equal(body.voiceId, 'nova');
      return new Response(new Blob(['mp3audio'], { type: 'audio/mpeg' }));
    }
    return new Response(null, { status: 404 });
  };

  try {
    const audioUrl = await cache.getOpenAi('Good morning', 'en', 'nova', 'mock-token');
    assert.ok(audioUrl && audioUrl.startsWith('blob:'));
    assert.equal(proxyCalled, true);
  } finally {
    cache.clear();
    globalThis.fetch = original;
  }
});

test('OPENAI_VOICE_GAIN compensates Nova with higher gain than Onyx', () => {
  assert.ok(OPENAI_VOICE_GAIN.nova >= 1.7, 'Nova should be boosted by at least 1.7x to compensate for quiet RMS');
  assert.ok(OPENAI_VOICE_GAIN.onyx >= 1.2, 'Onyx should have balanced presence');
  assert.ok(OPENAI_VOICE_GAIN.nova > OPENAI_VOICE_GAIN.onyx, 'Nova should have higher boost than Onyx');
});

test('getOpenAi with onyx calls geminiProxy to count characters, and reuses local memory without recharging', async () => {
  const original = globalThis.fetch;
  const cache = new ReviewAudioCache();
  let proxyCallCount = 0;

  globalThis.fetch = async (url, options) => {
    const urlStr = String(url);
    if (urlStr.includes('geminiProxy')) {
      proxyCallCount++;
      const body = JSON.parse(options.body);
      assert.equal(body.voiceId, 'onyx');
      const headers = new Headers();
      headers.set('X-Lectoro-TTS-Used', '42');
      return new Response(new Blob(['mp3onyx'], { type: 'audio/mpeg' }), { headers });
    }
    return new Response(null, { status: 404 });
  };

  try {
    // First call: NOT in local memory -> calls geminiProxy to count characters
    const audioUrl1 = await cache.getOpenAi('Good morning', 'en', 'onyx', 'mock-token');
    assert.ok(audioUrl1 && audioUrl1.startsWith('blob:'));
    assert.equal(proxyCallCount, 1);

    // Second call: IN local memory -> must reuse memory, ZERO proxy calls!
    const audioUrl2 = await cache.getOpenAi('Good morning', 'en', 'onyx', 'mock-token');
    assert.equal(audioUrl2, audioUrl1);
    assert.equal(proxyCallCount, 1, 'Local memory must NOT count characters or call proxy again');
  } finally {
    cache.clear();
    globalThis.fetch = original;
  }
});
