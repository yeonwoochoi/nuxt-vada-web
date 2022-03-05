export const state = () => ({
  company: 'VADA PARTNERS',
  vuetifyVersion: '2.6.1',
  companyDefaultLogo: require('assets/logo/logo_vada_black.png'),
  companyWhiteLogo: require('assets/logo/logo_vada_white.png'),
  toolbarItems: [],
  drawer: false,
  drawerItems: [
    { title: '메인', icon: 'mdi-home', link: '/', items:[] },
    { title: '기업소개', icon: 'mdi-office-building', link: '/about', items: []},
    { title: '서비스', icon: 'mdi-desktop-mac', link: '/service/fee', items: [
        { title: '요금안내', icon: 'mdi-currency-usd', link: '/service/fee' },
        { title: '특허검색', icon: 'mdi-book-open-blank-variant', link: '/service/search' },
        { title: '특허평가', icon: 'mdi-chart-bar', link: '/service/evaluation' },
      ]
    },
    { title: '고객센터', icon: 'mdi-account-tie-voice', link: '/support/news', items: [
        { title: '공지사항', icon: 'mdi-newspaper-variant-multiple', link: '/support/news' },
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
      link: '/privacy-policy'
    }
  ],
  copyright: 'COPYRIGHT 바다파트너스 2020. ALL RIGHTS RESERVED',
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
}

export const mutations = {
  setDrawer: (state, data) => {
    state.drawer = data
  }
}

export const actions = {

}

