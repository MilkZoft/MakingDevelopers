import { isDefined } from './is';

export function clean(str) {
  if (isDefined(str)) {
    return removeHTML(str).replace(/[`ª´·¨Ç~¿!#$%^&*()|+\-=?;'",<>\{\}\[\]\\]/gi, '');
  }

  return false;
}

export function escapeString(str) {
  if (isDefined(str)) {
    return str
      .replace(/'/g, '\\\'')
      .replace(/"/g, '\\\\"')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  return false;
}

export function randomCode(max, charSet) {
  let randomCode = '';
  let randomPoz;

  max = max || 12;
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < max; i++) {
    randomPoz = Math.floor(Math.random() * charSet.length);
    randomCode += charSet.substring(randomPoz, randomPoz + 1);
  }

  return randomCode;
}

export function removeHTML(str) {
  if (isDefined(str)) {
    return str.replace(/(<([^>]+)>)/ig, '');
  }

  return false;
}
