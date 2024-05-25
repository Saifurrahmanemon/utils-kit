import {
  createCipheriv,
  createDecipheriv,
  Encoding,
  pbkdf2Sync,
  randomBytes
} from 'crypto';

interface CryptrOptions {
  encoding?: Encoding;
  pbkdf2Iterations?: number;
  saltLength?: number;
}

class Cryptr {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly IV_LENGTH = 16;
  private static readonly TAG_LENGTH = 16;
  private static readonly DEFAULT_ENCODING: Encoding = 'hex';
  private static readonly DEFAULT_SALT_LENGTH = 64;
  private static readonly DEFAULT_PBKDF2_ITERATIONS = 390000;

  private readonly encoding: Encoding;
  private readonly pbkdf2Iterations: number;
  private readonly saltLength: number;
  private readonly tagPosition: number;
  private readonly encryptedPosition: number;

  constructor(
    private readonly secret: string,
    options: CryptrOptions = {}
  ) {
    this.validateSecret(secret);

    this.encoding = options.encoding ?? Cryptr.DEFAULT_ENCODING;
    this.pbkdf2Iterations =
      options.pbkdf2Iterations ?? Cryptr.DEFAULT_PBKDF2_ITERATIONS;
    this.saltLength = options.saltLength ?? Cryptr.DEFAULT_SALT_LENGTH;

    this.tagPosition = this.saltLength + Cryptr.IV_LENGTH;
    this.encryptedPosition = this.tagPosition + Cryptr.TAG_LENGTH;
  }

  private validateSecret(secret: string): void {
    if (!secret || typeof secret !== 'string') {
      throw new Error('Cryptr: secret must be a non-0-length string');
    }
  }

  private validateValue(value: unknown): asserts value is string | Buffer {
    if (value == null) {
      throw new Error('value must not be null or undefined');
    }
  }

  private getKey(salt: Buffer): Buffer {
    return pbkdf2Sync(
      this.secret,
      salt,
      this.pbkdf2Iterations,
      32, // 32 bytes = 256 bits
      'sha512'
    );
  }

  /**
   * Encrypts the given value using the provided secret and encryption options.
   *
   * @param value - The value to encrypt.
   * @returns A base64-encoded string representing the encrypted value.
   */
  encrypt(value: string | Buffer): string {
    try {
      this.validateValue(value);

      const ivBuffer = randomBytes(Cryptr.IV_LENGTH);
      const saltBuffer = randomBytes(this.saltLength);

      const key = this.getKey(saltBuffer);
      const cipher = createCipheriv(Cryptr.ALGORITHM, key, ivBuffer);
      cipher.setAAD(saltBuffer);

      const encryptedBuffer = Buffer.concat([
        cipher.update(value),
        cipher.final()
      ]);
      const tag = cipher.getAuthTag();

      const encrypted = Buffer.concat([
        saltBuffer,
        ivBuffer,
        tag,
        encryptedBuffer
      ]);
      return encrypted.toString(this.encoding);
    } catch (error) {
      throw new Error(`Cryptr encryption failed: ${error}`);
    }
  }

  decrypt(value: string): string {
    try {
      this.validateValue(value);

      const stringValue = Buffer.from(value, this.encoding);

      const salt = stringValue.subarray(0, this.saltLength);
      const iv = stringValue.subarray(this.saltLength, this.tagPosition);
      const tag = stringValue.subarray(
        this.tagPosition,
        this.encryptedPosition
      );
      const encrypted = stringValue.subarray(this.encryptedPosition);

      const key = this.getKey(salt);

      const decipher = createDecipheriv(Cryptr.ALGORITHM, key, iv);
      decipher.setAAD(salt);
      decipher.setAuthTag(tag);

      return decipher.update(encrypted) + decipher.final('utf8');
    } catch (error) {
      throw new Error(`Cryptr decryption failed: ${error}`);
    }
  }
}

export default Cryptr;
