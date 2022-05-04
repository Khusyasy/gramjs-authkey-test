require('dotenv').config();
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input');

const TL_API_ID = Number(process.env.VUE_APP_TL_API_ID);
const TL_API_HASH = process.env.VUE_APP_TL_API_HASH;

async function main() {
  const stringSession = await input.text('session:');
  const client = new TelegramClient(new StringSession(stringSession), TL_API_ID, TL_API_HASH, { connectionRetries: 5 });
  await client.connect();

  await client.sendMessage('me', { message: "test from me" });
}

main();
