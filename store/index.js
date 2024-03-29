export const state = () => ({
  company: 'VADA PARTNERS',
  vuetifyVersion: '2.6.1',
  companyDefaultLogo: require('assets/logo/logo_vada_default.png'),
  companyWhiteLogo: require('assets/logo/logo_vada_white.png'),
  googleMap: require('assets/google_map.png'),
  toolbarItems: [],
  sheetTitle: '',
  drawer: false,
  drawerItems: [
    { title: '메인', icon: 'mdi-home', link: '/', items:[] },
    { title: '기업소개', icon: 'mdi-office-building', link: '/about', items: []},
    { title: '서비스', icon: 'mdi-desktop-mac', link: '/service/fee', items: [
        { title: '이용신청', icon: 'mdi-currency-usd', link: '/service/fee' },
        { title: '특허검색', icon: 'mdi-book-open-blank-variant', link: '/service/search' },
        { title: '특허평가', icon: 'mdi-chart-bar', link: '/service/evaluation' },
        { title: '평가조회', icon: 'mdi-clipboard-list', link: '/service/evaluation/list' },
      ]},
    { title: '고객센터', icon: 'mdi-account-tie-voice', link: '/support/news', items: [
        { title: '공지사항', icon: 'mdi-newspaper-variant-multiple', link: '/support/news' },
        { title: 'FAQ', icon: 'mdi-frequently-asked-questions', link: '/support/faq' },
        { title: '문의하기', icon: 'mdi-message-question', link: '/support/qna' },
        { title: '오시는 길', icon: 'mdi-map', link: '/support/location' },
      ]
    },
    { title: '마이페이지', icon: 'mdi-account', link: '/my-page', items: []},
  ],
  footerBtnInfo: [
    {
      text: '이용약관',
      link: '/terms-of-use'
    },
    {
      text: '개인정보처리방침',
      link: '/policy'
    }
  ],
  userInfo: {email: '', leftReport: 0, enterprisePass: '-',}
})

export const getters = {
  getDrawer: state => state.drawer,
  toolbarItems: state => {
    let result = [];
    for (let i = 1; i < state.drawerItems.length; i++) {
      result.push({
        ...state.drawerItems[i]
      })
    }
    return result;
  },
  getSheetTitle: state => state.sheetTitle,
  getUserInfo: state => state.userInfo,
}

export const mutations = {
  setDrawer: (state, data) => {
    state.drawer = data
  },

  setSheetTitle: (state, data) => {
    state.sheetTitle = data
  },

  setUserInfo: (state, data) => {
    state.userInfo = data
  },

  logout(state) {
    state.auth.user = {}
    state.auth.loggedIn = false;
  },
}

export const actions = {
  async nuxtServerInit({commit, dispatch, state}) {
    await dispatch('refreshPointData')
  },
  async refreshPointData({commit, dispatch, state}) {
    if (!state.auth.loggedIn){
      commit("setUserInfo", {
        email: '',
        leftReport: -1,
        enterprisePass: '-',
      })
    }
    else {
      if (state.auth.user['roles'].includes("ROLE_ENTERPRISE_MANAGER_USER") || state.auth.user['roles'].includes("ROLE_ENTERPRISE_USER")) {
        let payload = {
          enterpriseId: state.auth.user['enterprise']['enterpriseId']
        }
        let enterpriseInfo = await dispatch('user/getEnterpriseAssetInfo', payload)
        let pass = '-'
        if (enterpriseInfo.hasOwnProperty('enterprisePass')) {
          pass = enterpriseInfo['enterprisePass']['expired'] ? '-' : enterpriseInfo['enterprisePass']['expiredAt'].split("T")[0]
        }
        commit("setUserInfo", {
          email: state.auth.user.email,
          leftReport: enterpriseInfo['enterpriseLeftReport'],
          enterprisePass: pass,
        })
      }
      else {
        commit("setUserInfo", {
          email: state.auth.user.email,
          leftReport: state.auth.user.leftReport,
          enterprisePass: '-',
        })
      }
    }
  }
}

