<template>
  <div id="app">
    <p>{{ stringSession }}</p>
  </div>
</template>

<script>
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';

const TL_API_ID = Number(process.env.VUE_APP_TL_API_ID);
const TL_API_HASH = process.env.VUE_APP_TL_API_HASH;

// data center map Web API => IP address
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

export default {
  name: 'App',
  data() {
    return {
      stringSession: null,
    };
  },
  mounted() {
    this.test();
  },
  methods: {
    async test() {
      const client = new TelegramClient(new StringSession(''), TL_API_ID, TL_API_HASH, { connectionRetries: 5 });
      await client.start({
        phoneNumber: async () => prompt('phone'),
        password: async () => prompt('password'),
        phoneCode: async () => prompt('code'),
        onError: (err) => console.error(err),
      });
      await client.connect();

      const correctDC = mappedDC[client.session.dcId];
      client.session.setDC(correctDC.id, correctDC.ipAddress, correctDC.port);

      this.stringSession = client.session.save();

      await client.sendMessage('me', { message: "test from vue" });
    },
  },
}
</script>

<style>
</style>
