<template>
  <div>
    <h1>Activities</h1>
    <button @click="$router.push({ name: 'CreateActivity' })">Create Activity</button>
    <ul>
      <li v-for="activity in activities" :key="activity.id">
        <p><strong>{{ activity.name }}</strong> - {{ activity.sport_type }}</p>
        <p>Distance: {{ activity.distance }} meters</p>
        <p>Average Speed: {{ activity.average_speed }} m/s</p>
        <p>Max Speed: {{ activity.max_speed }} m/s</p>
        <p>Heart Rate: {{ activity.average_heartrate || 'N/A' }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      activities: [],
    };
  },
  computed: {
    ...mapState(['accessToken']),
  },
  async created() {
    if (this.accessToken) {
      try {
        const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        });
        this.activities = response.data;
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    } else {
      this.$router.push({ name: 'Login' });
    }
  },
};
</script>
