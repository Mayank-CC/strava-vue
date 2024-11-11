<template>
    <div>Redirecting...</div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup() {
        const router = useRouter();
        const store = useStore();

        async function fetchAccessToken(code) {
            try {
                const response = await axios.post('https://www.strava.com/oauth/token', {
                    client_id: '139442',
                    client_secret: '37ae2114e675f2e8af254024d0c232c4c637f3fe',
                    code: code,
                    grant_type: 'authorization_code',
                });

                const accessToken = response.data.access_token;
                const refreshToken = response.data.refresh_token;

                store.dispatch('saveTokens', { accessToken, refreshToken });

                router.push('/activities');
            } catch (error) {
                console.error('Error fetching access token:', error);
                router.push('/');
            }
        }

        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            fetchAccessToken(code);
        } else {
            console.error('No authorization code found.');
            router.push('/');
        }
    },
};
</script>