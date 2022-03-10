<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card class="elevation-2 login-card">
        <v-row align="center" justify="center" style="width: 100%; height: 100%">
          <div>
            <div>
              <slot name="header"/>
            </div>
            <div class="pb-1">
              <slot name="body"/>
            </div>
            <div style="display: flex; justify-content: center">
              <slot name="button"/>
            </div>
          </div>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ResetPwdCard",
}
</script>

<style scoped>

.login-card {
  border-radius: 5px;
  border: 1px solid rgba(0.06, 0.13, 0.25, 0.25);
  width: 800px;
  height: 500px;
}
</style>
