import { Encoding } from 'crypto';
import { describe, expect, test } from 'vitest';

import Cryptr from '../src/utils/cryptr';

const testSecret = 'myTotalySecretKey';
const testData = 'bacon';

describe('Cryptr', () => {
  test('encrypts and decrypts a string', () => {
    const cryptr = new Cryptr(testSecret);
    const encryptedString = cryptr.encrypt(testData);
    const decryptedString = cryptr.decrypt(encryptedString);

    expect(decryptedString).toBe(testData);
  });

  test('handles encrypting and decrypting strings with special characters', () => {
    const specialCharsString = '!@#$%^&*()_+[]{}|;:,.<>?';
    const cryptr = new Cryptr(testSecret);
    const encryptedString = cryptr.encrypt(specialCharsString);
    const decryptedString = cryptr.decrypt(encryptedString);

    expect(decryptedString).toBe(specialCharsString);
  });

  test('handles encrypting and decrypting strings with non-Latin characters', () => {
    const nonLatinString = 'こんにちは世界';
    const cryptr = new Cryptr(testSecret);
    const encryptedString = cryptr.encrypt(nonLatinString);
    const decryptedString = cryptr.decrypt(encryptedString);

    expect(decryptedString).toBe(nonLatinString);
  });

  test('encrypts and decrypts a Buffer', () => {
    const cryptr = new Cryptr(testSecret);
    const plaintextBuffer = Buffer.from(testData);
    const encrypted = cryptr.encrypt(plaintextBuffer);
    const decrypted = cryptr.decrypt(encrypted);

    expect(decrypted).toBe(plaintextBuffer.toString());
  });

  test('works with custom encoding', () => {
    const encodings: Encoding[] = ['hex', 'base64', 'latin1'];

    encodings.forEach((encoding) => {
      const cryptr = new Cryptr(testSecret, { encoding });
      const encryptedString = cryptr.encrypt(testData);
      const decryptedString = cryptr.decrypt(encryptedString);

      expect(decryptedString).toBe(testData);
    });
  });

  test('custom encoding affects output length', () => {
    const cryptr = new Cryptr(testSecret, { encoding: 'base64' });
    const cryptr2 = new Cryptr(testSecret);
    const encryptedString = cryptr.encrypt(testData);
    const encryptedString2 = cryptr2.encrypt(testData);

    expect(encryptedString.length).toBeLessThan(encryptedString2.length);
  });

  test('works with custom pbkdf2Iterations', () => {
    const cryptr = new Cryptr(testSecret, { pbkdf2Iterations: 10000 });
    const encryptedString = cryptr.encrypt(testData);
    const decryptedString = cryptr.decrypt(encryptedString);

    expect(decryptedString).toBe(testData);
  });

  test('works with custom saltLength', () => {
    const cryptr = new Cryptr(testSecret, { saltLength: 10 });
    const encryptedString = cryptr.encrypt(testData);
    const decryptedString = cryptr.decrypt(encryptedString);

    expect(decryptedString).toBe(testData);
  });

  test('custom saltLength affects output length', () => {
    const customSaltLength = 30;
    const cryptr = new Cryptr(testSecret, { saltLength: customSaltLength });
    const cryptr2 = new Cryptr(testSecret);
    const encryptedString = cryptr.encrypt(testData);
    const encryptedString2 = cryptr2.encrypt(testData);

    expect(encryptedString2.length - encryptedString.length).toBe(
      (64 - customSaltLength) * 2
    );
  });

  test('throws an error for bad secret', () => {
    const badSecrets = [
      null,
      undefined,
      0,
      987654321,
      '',
      Buffer.from('buffer'),
      {}
    ];

    badSecrets.forEach((badSecret) => {
      expect(() => new Cryptr(badSecret as any)).toThrow(
        /Cryptr: secret must be a non-0-length string/
      );
    });
  });

  test('throws an error if encrypt  value is null or undefined', () => {
    const cryptr = new Cryptr(testSecret);
    const badValues = [null, undefined];

    badValues.forEach((badValue) => {
      expect(() => cryptr.encrypt(badValue as any)).toThrow(
        /value must not be null or undefined/
      );
    });
  });
  test('throws an error if decrypting an invalid string', () => {
    const cryptr = new Cryptr(testSecret);
    const invalidString = 'invalid_encrypted_string';

    expect(() => cryptr.decrypt(invalidString)).toThrow(
      /Cryptr decryption failed: TypeError: Invalid initialization vector/
    );
  });

  test('throws an error if the encrypted string is modified', () => {
    const cryptr = new Cryptr(testSecret);
    let encryptedString = cryptr.encrypt(testData);
    encryptedString = encryptedString.slice(0, -1) + '0'; // Modify the last character

    expect(() => cryptr.decrypt(encryptedString)).toThrow(
      /Unsupported state or unable to authenticate data/
    );
  });
  test('correctly handle encrypting and decrypting binary data', () => {
    const binaryData = Buffer.from([0x00, 0xff, 0x88, 0x77]);
    const cryptr = new Cryptr(testSecret);
    const encryptedString = cryptr.encrypt(binaryData.toString('base64'));
    const decryptedString = cryptr.decrypt(encryptedString);
    const decryptedBinaryData = Buffer.from(decryptedString, 'base64');

    expect(decryptedBinaryData).toEqual(binaryData);
  });
});
