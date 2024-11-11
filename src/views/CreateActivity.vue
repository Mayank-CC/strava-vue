<template>
  <div>
    <h1>Create Activity</h1>
    <form @submit.prevent="createActivity">
      <input v-model="activity.name" placeholder="Name" required />
      <input v-model="activity.sport_type" placeholder="Type" required />
      <input v-model="activity.start_date_local" placeholder="Start Date (YYYY-MM-DDTHH:MM:SSZ)" type="date" required />
      <input v-model="activity.elapsed_time" placeholder="Elapsed Time (in seconds)" type="number" required />
      <input v-model="activity.description" placeholder="Description" />
      <input v-model="activity.distance" placeholder="Distance (in meters)" type="number" required />
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      activity: {
        name: '',
        sport_type: '',
        start_date_local: '',
        elapsed_time: '',
        description: '',
        distance: '',
      },
    };
  },
  computed: {
    ...mapState(['accessToken']),
  },
  methods: {
    async createActivity() {
      try {
        await axios.post('https://www.strava.com/api/v3/activities', this.activity, {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        });
        this.$router.push({ name: 'Activities' });
      } catch (error) {
        console.error('Error creating activity:', error);
      }
    },
  },
};
</script>
