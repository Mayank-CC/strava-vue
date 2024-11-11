<template>
  <div>
    <button @click="loginWithStrava">Login with Strava</button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['saveToken']),
    loginWithStrava() {
      const clientId = '139442';
      const redirectUri = 'http://localhost:8080/redirect';
      const responseType = 'code';
      const scope = 'activity:read_all,activity:write';

      const stravaLoginUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
      window.location.href = stravaLoginUrl;
    },
    async exchangeCodeForToken(code) {
      const clientId = '139442';
      const clientSecret = '37ae2114e675f2e8af254024d0c232c4c637f3fe';

      try {
        const response = await axios.post('https://www.strava.com/oauth/token', {
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          grant_type: 'authorization_code',
        });
        const token = response.data.access_token;
        this.saveToken(token);
        this.$router.push({ name: 'Activities' });
      } catch (error) {
        console.error('Error exchanging code for token:', error);
      }
    },
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) this.exchangeCodeForToken(code);
  },
};
</script>
