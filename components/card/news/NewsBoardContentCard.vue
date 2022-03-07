<template>
  <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
    <v-col cols="12" class="mb-4">
      <pre class="roboto-font title font-weight-black" v-text="contents.title"/>
    </v-col>
    <v-col cols="12" style="background-color: #F5F5F5;">
      <div :style="`display: ${isMobile ? 'block' : 'flex'};`">
        <pre class="caption font-weight-bold mx-6 my-1">작성자 <span class="subtitle-2 content-grey-font pl-3">{{ contents.author }}</span></pre>
        <pre class="caption font-weight-bold mx-6 my-1">작성일 <span class="subtitle-2 content-grey-font pl-3">{{ contents.created_at }}</span></pre>
        <pre class="caption font-weight-bold mx-6 my-1">조회 <span class="subtitle-2 content-grey-font pl-3">{{ contents.view_count }}</span></pre>
      </div>
    </v-col>
    <v-col cols="12" class="pa-6">
      <pre class="subtitle-2 content-grey-font card-content" v-html="contents.content" />
    </v-col>
    <v-col cols="12">
      <v-divider class="mb-3"/>
      <div style="display: flex; flex-flow: row wrap;" v-if="hasAttach">
        <div v-for="(attach, index) in contents.attach" :key="index" style="height: fit-content;">
          <button
            type="button"
            class="download-button mx-2"
            :onclick="`window.open('http://${attach.link}', '_blank')`"
            formtarget="_blank"
            :title="attach.name"
          >
            <pre class="ellipsis content-grey-font" style="max-width: 200px;">{{ attach.name }}</pre>
          </button>
        </div>
      </div>
    </v-col>
    <v-col cols="12" align="end" class="mt-6">
      <v-btn :to="path" large class="elevation-0 button-border-grey" style="color: #CCCCCC;" outlined>
        <p class="my-0 font-weight-bold grey--text text--darken-4">목록보기</p>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "NewsBoardContentCard",
  props: {
    contents: {
      type: Object,
      // TODO (Sample)
      default: () => {
        return {
          no: 1,
          title: '[Paper Review] Semi-SuperviReview] Semi-Supervised Text Classification with Balanced Deep Representation  Review] Semi-Supervised Text Classification with Balanced Deep Representation Distributions',
          content: '1. Topic\n' +
            '\n' +
            '\n' +
            '\n' +
            '딥러닝 모델(BERT)에 Self-Training을 효과적으로 적용시킬 수 있는 방법을 연구\n' +
            '\n' +
            '\n' +
            '\n' +
            '2. Overview\n' +
            '\n' +
            'Pretraining, Finetuning에 대한 downstream 목적이 서로 다를 경우 성능 개선이 어렵습니다.\n' +
            '이 문제를 semi-supervised learning의 self-training을 이용하여 문제를 해결하고자 하였습니다.\n' +
            'Contribution\n' +
            'sphere의 공간에서 손실 함수를 정의할 수 있는 angular margin loss를 사용\n' +
            '각 class별로 등분산성을 가지는 Gaussian 분포에서 angle을 샘플링하는 방식으로 사용하여 라벨 불균형 완화\n' +
            '3. 참고자료\n' +
            '\n' +
            '[1] 발표자료 [link]\n' +
            '\n' +
            '[2] 발표영상 [link]',
          author: 'user01',
          created_at: '2020-11-11',
          view_count: 0,
          attach: [
            {link: 'ai.kunsan.ac.kr:3000/uploads/files-1637042697203.pdf', name: 'sample1.jpg'},
            {link: 'ai.kunsan.ac.kr:3000/uploads/files-1637042697203.pdf', name: 'sample2.jpg'}
          ],
        }
      }
    },
    path: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
      }
    },
    hasAttach() {
      return this.contents.attach.length > 0;
    },
  }
}
</script>

<style scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.roboto-font {
  font-family: "Roboto", sans-serif;
  color: rgba(1, 1, 1, 0.8);
  white-space: pre-wrap;
}

.content-grey-font {
  font-family: "Roboto", sans-serif;
  font-weight: normal;
  color: rgba(1, 1, 1, 0.75);
}

p {
  display: flex;
  align-items: center;
  white-space: pre-wrap;
}

pre {
  white-space: pre-wrap;
  overflow: hidden;
}

v-divider {
  background-color:rgb(150, 150, 150);
  border-width: 1px !important;
}

.download-button {
  margin: 0 0 5px 0;
  padding: 4px 5px;
  font-size: 12px;
  font-weight: normal;
  line-height: 12px;
  text-align: left;
  border: 1px solid #ededed;
  background: white none;
  border-radius: 2px;
  letter-spacing: normal;
  cursor: pointer;
  vertical-align: middle;
  text-shadow: none;
  box-shadow: none;
}
</style>
