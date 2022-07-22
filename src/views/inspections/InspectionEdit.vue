<template>
  <div>
    <h1>Details:</h1>
    <p>{{ id }}</p>
  </div>
</template>

<script>
export default {
  name: "InspectionEdit",
  props: ['id']
};
</script>
