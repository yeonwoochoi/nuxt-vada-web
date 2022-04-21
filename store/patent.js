export const state = () => ({
  selectedEval: [],
  businessScaleRef: [
    { original: '상장 기업', data: 'CAPM' },
    { original: '비상장 대기업', data: 'BIG' },
    { original: '비상장 중기업', data: 'MEDIUM' },
    { original: '비상장 소기업', data: 'SMALL' },
    { original: '비상장 창업기업', data: 'STARTUP' },
    { original: '학교, 기관', data: 'UNIVERSITY' },
  ],
  tempEvalData: {
    patentNumber: '',
    ksic: null,
    sales: null, // can be null
    businessScale: { original: '상장 기업', data: 'CAPM' },
  },
  evalData: null,
  downloadTypes: [ 'Report', 'MultiPatent', 'IpEmailPair' ]
})

export const getters = {
  getTempEvalData: (state) => state.tempEvalData,
  getSelectedEval: state => state.selectedEval,
  getBusinessScaleList: state => state.businessScaleRef,
}


export const mutations = {
  setPatentNumber: (state, data) => {
    state.tempEvalData.patentNumber = data
  },
  setKsic: (state, data) => {
    state.tempEvalData.ksic = data
  },
  setSalesData: (state, data) => {
    state.tempEvalData.sales = data
  },
  setBusinessScale: (state, data) => {
    state.tempEvalData.businessScale = data
  },
  resetTempEvalData: (state) => {
    state.tempEvalData = {
      patentNumber: '',
      ksic: '',
      sales: null, // can be null
      businessScale: { original: '상장 기업', data: 'CAPM' } // default value
    }
  },
  setSelectedEval: (state, data) => {
    state.selectedEval = data
  },
  resetSelectedEval: (state) => {
    state.selectedEval = []
  },
  setEvalData: (state, data) => {
    state.evalData = data
  },
  resetEvalData: (state) => {
    state.evalData = null
  },
}

export const actions = {
  async evaluate({commit, state}) {
    let params = {
      ...state.tempEvalData.sales,
      "companySize": state.tempEvalData.businessScale.data,
      "patentNumber": state.tempEvalData.patentNumber,
      "industryCode": state.tempEvalData.ksic.code,
    }
    return new Promise(((resolve, reject) => {
      this.$axios.$post('/patent/evaluation', params).then(res=> {
        commit('setEvalData', res.result)
        resolve(res.result)
      }).catch(err => {
        reject(err.response.data.message)
      })
    }))
  },
  async getEvaluationList({commit}) {
    return new Promise(((resolve, reject) => {
      this.$axios.$get('/patent/evaluation').then(res=> {
        resolve(res['patentEvaluations'])
      }).catch(err => {
        reject(err.response.data.message)
      })
    }))
  },
  async getEvaluationSummary({commit}, params) {
    return new Promise(((resolve, reject) => {
      this.$axios.$get('/patent/evaluation/' + params).then(res=> {
        resolve(res['patentEvaluations'])
      }).catch(err => {
        reject(err.response.data.message)
      })
    }))
  },
  async getIpcCode({commit}, params) {
    return new Promise(((resolve, reject) => {
      this.$axios.$post('/patent/search', params).then(res => {
        resolve(res.result[0]['ipcCode'])
      }).catch(err => {
        reject(err.response.data.message)
      })
    }))
  },
  async search({commit}, params) {
    return new Promise(((resolve, reject) => {
      this.$axios.$post('/patent/search', params).then(res => {
        resolve(res.result)
      }).catch(err => {
        reject(err.response.data.message)
      })
    }))
  },
  async searchByCsv({commit}, params) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/patent/search/file', params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
        .then(res => {
          resolve(res.result)
        }).catch(err => {
          reject(err.response.data.message)
      })
    })
  },
  // 보고서: Report
  // 기업회원가입시 IP Email: IpEmailPair
  // 특허검색 시 Template: MultiPatent
  async download({commit}, params) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: "blob",
    }
    return new Promise(((resolve, reject) => {
      this.$axios.$get('/file/template?type=' + params, config).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err.response.data.message)
      })
    }))
  }
}
