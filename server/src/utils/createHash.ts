import crypto from 'crypto';

function createHash(data: string) {
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  return hash;
}

export default createHash;
