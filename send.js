require('dotenv').config();
const { TelegramClient, Api } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input');

const TL_API_ID = Number(process.env.VUE_APP_TL_API_ID);
const TL_API_HASH = process.env.VUE_APP_TL_API_HASH;

const mappedDC = {
  1: {
    id: 1,
    ipAddress: '149.154.175.52',
    port: 443,
  },
  2: {
    id: 2,
    ipAddress: '149.154.167.41',
    port: 443,
  },
  3: {
    id: 3,
    ipAddress: '149.154.175.100',
    port: 443,
  },
  4: {
    id: 4,
    ipAddress: '149.154.167.92',
    port: 443,
  },
  5: {
    id: 5,
    ipAddress: '91.108.56.176',
    port: 443,
  },
};

async function main() {
  const inputSession = await input.text('session:');
  const stringSession = new StringSession(inputSession);
  const correctDC = mappedDC[stringSession.dcId];
  stringSession.setDC(correctDC.id, correctDC.ipAddress, correctDC.port);

  const client = new TelegramClient(stringSession, TL_API_ID, TL_API_HASH, { connectionRetries: 5 });
  await client.connect();

  console.log(client.session.save());

  await client.sendMessage('me', { message: "test from me" });
}

main();
