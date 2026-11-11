import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read = path => readFileSync(path, 'utf8');
const home = read('index.html');
const privacy = read('public/privacy.html');
const terms = read('public/terms.html');
const privacyUrl = 'https://sylarchan91.github.io/little-gift-finder/privacy.html';
const termsUrl = 'https://sylarchan91.github.io/little-gift-finder/terms.html';

test('homepage names hong keyword tool and links to the public policy pages', () => {
  assert.match(home, /lang="en"/);
  assert.match(home, /id="hong-keyword-tool"/);
  assert.match(home, /hong keyword tool/);
  assert.match(home, /Google Ads API \(Keyword Planner\)/);
  assert.match(home, /signed-in user’s own Google Ads account data/);
  assert.match(home, /does not share or sell Google user data/);
  assert.match(home, new RegExp(`href="${privacyUrl}"`));
  assert.match(home, new RegExp(`href="${termsUrl}"`));
  assert.match(home, />Privacy Policy</);
  assert.match(home, />Terms of Service</);
  assert.match(home, /hongze2030@gmail.com/);
});

test('privacy policy covers Google Ads access, limited use, storage, and revoke', () => {
  assert.match(privacy, /lang="en"/);
  assert.match(privacy, /Privacy Policy/);
  assert.match(privacy, /hong keyword tool/);
  assert.match(privacy, /https:\/\/www\.googleapis\.com\/auth\/adwords/);
  assert.match(privacy, /Google Ads API/);
  assert.match(privacy, /keyword research only/);
  assert.match(privacy, /stored locally on the owner’s machine only/);
  assert.match(privacy, /does not store Google user data or tokens on a server/);
  assert.match(privacy, /does not share Google user data with third parties/);
  assert.match(privacy, /does not sell Google user data/);
  assert.match(privacy, /Google API Services User Data Policy/);
  assert.match(privacy, /Limited Use/);
  assert.match(privacy, /https:\/\/myaccount\.google\.com\/permissions/);
  assert.match(privacy, /hongze2030@gmail.com/);
  assert.match(privacy, new RegExp(`href="${termsUrl}"`));
});

test('terms of service are in English and point back to the privacy policy', () => {
  assert.match(terms, /lang="en"/);
  assert.match(terms, /Terms of Service/);
  assert.match(terms, /hong keyword tool/);
  assert.match(terms, /hongze2030@gmail.com/);
  assert.match(terms, /https:\/\/www\.googleapis\.com\/auth\/adwords/);
  assert.match(terms, new RegExp(`href="${privacyUrl}"`));
  assert.match(terms, /https:\/\/myaccount\.google\.com\/permissions/);
});
