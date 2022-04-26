<template>
  <v-card class="rounded-0" style="color: transparent; height: fit-content;" flat>
    <v-app-bar
      app
      flat
      fixed
      :color="getColor"
      style="transition: all 0.6s ease;"
      v-scroll="onScroll"
      :height="appBarHeight"
      @mouseenter="setIsHovered(true)"
      @mouseleave="setIsHovered(false)"
    >
      <v-container fluid>
        <v-row
          v-if="$vuetify.breakpoint.mdAndUp"
          align="center"
          justify="center"
        >
          <v-col cols="2" align="center" style="cursor:pointer;" @click="goToMain">
            <v-img
              :src="getLogo"
              :style="`max-width: ${160}px;`"
              contain
            >
              <v-btn
                style="min-height: 100%; min-width: 100%; background-color: transparent; color: transparent"
                to="/"
                class="no-background-hover"
                :ripple="false"
              />
            </v-img>
          </v-col>
          <v-col cols="8" align="center" style="width: fit-content;" class="ma-0 pa-0">
            <v-menu
              open-on-hover
              bottom
              tile
              offset-y
              v-for="(content, i) in toolbarItems"
              :key="`toolbar-${i}`"
              content-class="elevation-0"
              transition="slide-y-reverse-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="no-background-hover"
                  :class="`elevation-0 font-weight-bold menu-button left ${appBarPaddingSize} px-0`"
                  :active-class="`font-weight-bold menu-button ${isActive ? 'active-black' : 'active-white'}`"
                  :ripple="false"
                  :to="content.link"
                  v-bind="attrs"
                  v-on="on"
                  style="font-size: 18px; letter-spacing: -0.5px; width: 150px;"
                  :style="`height: 100px; color: ${isActive ? 'rgb(0, 36, 69)' : 'white'}`"
                  text
                  tile
                >
                  {{ content.title }}
                </v-btn>
              </template>

              <v-list-item
                v-for="(item, index) in content.items"
                :key="`toolbarItem-${index}`"
                style="background-color: white;"
              >
                <v-btn
                  class="no-background-hover"
                  :class="`elevation-0 font-weight-bold`"
                  active-class="font-weight-bold"
                  :ripple="false"
                  :to="item.link"
                  :style="`color: rgb(0, 36, 69); font-size: 17px; letter-spacing: -0.5px; min-height: 55px;`"
                  text
                >
                  {{item.title}}
                </v-btn>
              </v-list-item>
            </v-menu>
          </v-col>
          <v-col cols="2" align="center">
            <v-btn
              v-if="!this.$auth.loggedIn"
              class="no-background-hover elevation-0 font-weight-bold"
              :ripple="false"
              @click="onClickLogIn"
              :style="`padding: 20px; font-size: 18px; width: 120px; color: ${isActive ? 'rgb(0, 36, 69)' : 'white'}; border: ${isActive ? 'rgb(0, 36, 69)' : 'white'} 0.15em solid; border-radius: 5px;`"
              text
            >
              {{loginBtnText}}
            </v-btn>
            <avartar-menu v-else @logout="onClickLogIn" :is-active="isActive" :email="'rud527@naver.com'" :point="10"/>
          </v-col>
        </v-row>
        <v-row
          v-else
          align="center"
          justify="space-between"
        >
          <v-col cols="8">
            <v-app-bar-nav-icon @click="drawer = !drawer"  :style="`${isActive ? 'color: black' : 'color: white'}`"/>
          </v-col>
          <v-col cols="4" align="end">
            <v-btn
              v-if="!this.$auth.loggedIn"
              class="no-background-hover"
              :class="`elevation-0 subtitle-1 ${isActive ? 'black--text' : 'white--text'} font-weight-medium`"
              :ripple="false"
              @click="onClickLogIn"
              :style="`border: ${isActive ? 'rgb(0, 36, 69)' : 'white'} 0.15em solid; border-radius: 5px; background-color: transparent; width: 100px;`"
              text
              tile
            >
              {{ loginBtnText }}
            </v-btn>
            <avartar-menu v-else @logout="onClickLogIn" :is-active="isActive" :user-info="this.$auth.user"/>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <app-bar-sheet-view
      v-if="this.$route.path !== '/'"
      :is-mobile="$vuetify.breakpoint.smAndDown"
      :header-title="appBarSheetTitle"
      :img-src="sheetImage"
    />
    <app-bar-main-sheet-view v-else/>
  </v-card>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import CompanyLogoBtn from "../../../components/button/CompanyLogoBtn";
import AppBarSheetView from "../../../components/sheet/appBar/AppBarSheetView";
import AppBarMainSheetView from "../../../components/sheet/appBar/AppBarMainSheetView";
import AvartarMenu from "../../../components/dropdown/AvartarMenu";
export default {
  name: "DefaultAppBar",
  components: {
    AvartarMenu,
    AppBarMainSheetView,
    AppBarSheetView,
    CompanyLogoBtn
  },
  data: () => ({
    isScrolled: false,
    isHovered: false,
    isLogin: false,
    appBarHeight: 100,
    loginBtnText: '로그인'
  }),
  computed: {
    ...mapState({
      companyDefaultLogo: 'companyDefaultLogo',
      companyWhiteLogo: 'companyWhiteLogo'
    }),
    ...mapGetters({
      toolbarItems: 'toolbarItems',
      sheetTitle: 'getSheetTitle'
    }),
    getColor() {
      return this.isActive ? 'rgba(255, 255, 255, 255)' : 'rgba(255, 255, 255, 0)'
    },
    getLogo() {
      return this.isActive ? this.companyDefaultLogo : this.companyWhiteLogo
    },
    isActive () {
      return this.isScrolled || this.isHovered;
    },
    drawer: {
      get () {
        return this.$store.getters['getDrawer']
      },
      set (value) {
        return this.$store.commit('setDrawer', value)
      }
    },
    appBarPaddingSize () {
      return this.$vuetify.breakpoint.name === 'md' ? 'pr-1' : ''
    },
    sheetImage () {
      // TODO (route): current path에 맞게 sheet title이랑 img 어떻게 return할지 고민하자
      // 이기춘 말대로 싱글톤 생각해보셈
    },
    appBarSheetTitle() {
      //TODO (appBarSheetTitle)
      return this.sheetTitle
    },
  },
  methods: {
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.isScrolled = top > 0
    },
    setIsHovered (flag) {
      this.isHovered = flag
    },
    onClickLogIn(){
      if (this.$auth.loggedIn) {
        this.$store.commit('logout')
        this.$auth.strategy.token.reset();
        this.$auth.strategy.refreshToken.reset();
        this.$router.go(0)
        return;
      }
      this.$router.push('/membership/login')
    },
    goToMain() {
      if (this.$router.currentRoute.path === '/') {
        this.$router.go(this.$router.currentRoute);
      } else {
        this.$router.push('/')
      }
    },
  }
}
</script>

<style scoped>
.no-background-hover::before {
  background-color: transparent !important;
}
.menu-button {
  background: linear-gradient(currentColor, currentColor) bottom / 0 .1em no-repeat;
  transition: 1s background-size;
}
.menu-button:hover {
  background-size: 100% .1em;
}
/* Variations */
.menu-button.left {
  background-position: left bottom;
}
.menu-button:active {
  background-size: 100% .1em;
}
.menu-button.active-black {
  transition: none;
  border-bottom-style: solid;
  border-bottom-color: black;
  border-bottom-width: thin;
}
.menu-button.active-white {
  transition: none;
  border-bottom-style: solid;
  border-bottom-color: white;
  border-bottom-width: thin;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
