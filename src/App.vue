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

      this.stringSession = client.session.save();

      await client.sendMessage('me', { message: "test from me" });
    },
  },
}
</script>

<style>
</style>
