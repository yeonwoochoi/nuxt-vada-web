<template>
  <v-menu
    bottom
    max-width="280px"
    offset-y
    nudge-top="-10"
    z-index="0"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        large
        v-on="on"
      >
        <v-avatar>
          <v-icon large :style="`color: ${isActive ? 'rgb(0, 36, 69)' : 'white'};`">mdi-account</v-icon>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-center">
        <div class="text-center pa-4" style="max-width: 95%">
          <p class="mt-1 mb-0 subtitle-1 ellipsis"><strong class="title">{{ userInfo.email }}</strong> 님 </p>
          <p class="subtitle-1">환영합니다.</p>
          <p class="mb-0">포인트 <strong>{{ userInfo.leftReport }}</strong></p>
        </div>
        <div class="text-center">
          <v-divider class="my-3"/>
          <v-btn
            width="100%"
            text
            color="rgb(0, 36, 69)"
            :ripple="false"
            class="no-background-hover subtitle-1 font-weight-bold"
            to="/my-page"
          >
            회원정보 수정
          </v-btn>
          <v-divider class="my-3"/>
          <v-btn
            width="100%"
            text
            color="rgb(0, 36, 69)"
            :ripple="false"
            class="no-background-hover subtitle-1 font-weight-bold"
            @click="logout"
          >
            로그아웃
          </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "AvartarMenu",
  props: {
    isActive: {
      type: Boolean
    },
    userInfo: {
      type: Object,
      default: () => {
        return {
          email: '',
          leftReport: ''
        }
      }
    },
  },
  methods: {
    logout() {
      this.$emit('logout')
    }
  }
}
</script>

<style scoped>
p {
  color: rgb(0, 36, 69);
}

.no-background-hover::before {
  background-color: transparent !important;
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
