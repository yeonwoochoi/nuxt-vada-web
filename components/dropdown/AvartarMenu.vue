<template>
  <v-menu
    v-model="menu"
    bottom
    max-width="280px"
    offset-y
    nudge-top="-25"
    nudge-right="-115"
    z-index="0"
    :close-on-content-click="false"
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
        <div class="text-center px-4" :class="`${isEnterprise ? 'pb-0 pt-4' : 'py-4'}`" style="max-width: 95%">
          <p class="mt-1 mb-0 subtitle-1 ellipsis"><strong class="title">{{ userInfo.email }}</strong> 님 </p>
          <p class="subtitle-1">환영합니다.</p>
          <p class="mb-0">포인트: <strong class="ml-1">{{ userInfo.leftReport.toLocaleString() }}</strong></p>
          <div v-if="isEnterprise">
            <p class="mb-0 my-1">이용권: <strong class="ml-1">{{ `~ ${userInfo.enterprisePass}` }}</strong></p>
            <v-btn
              width="100%"
              text
              color="rgb(0, 36, 69)"
              :ripple="false"
              class="no-background-hover subtitle-1 font-weight-bold"
              @click="refreshData"
              :loading="isRefreshing"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="text-center">
          <v-divider class="my-3"/>
          <v-btn
            width="100%"
            text
            color="rgb(0, 36, 69)"
            :ripple="false"
            class="no-background-hover subtitle-1 font-weight-bold"
            @click="goToMyPage"
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
          leftReport: '',
          enterprisePass: '',
        }
      }
    },
    isEnterprise: {
      type: Boolean,
      default: () => {
        return false
      }
    },
  },
  data: () => ({
    isRefreshing: false,
    menu: false
  }),
  methods: {
    logout() {
      this.menu = false
      this.$emit('logout')
    },
    goToMyPage() {
      this.menu = false
      this.$router.push('/my-page')
    },
    async refreshData() {
      this.isRefreshing = true
      await this.$store.dispatch('refreshPointData')
      setTimeout(() => {
        this.isRefreshing = false
      }, 1000)
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
