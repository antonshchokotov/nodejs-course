function encrypt(text, shift) {
  let result = '';

  while (shift < 0) {
    shift += 26;
  }

  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (c >= 65 && c <= 90) {
      result += String.fromCharCode(((c - 65 + shift) % 26) + 65);
    } else if (c >= 97 && c <= 122) {
      result += String.fromCharCode(((c - 97 + shift) % 26) + 97);
    } else {
      result += text.charAt(i);
    }
  }
  return result;
}

function decrypt(text, shift) {
  let result = '';

  while (shift < 0) {
    shift += 26;
  }

  while (shift > 26) {
    shift -= 26;
  }

  shift = (26 - shift) % 26;
  result = encrypt(text, shift);
  return result;
}

module.exports = {
  encrypt,
  decrypt
};
