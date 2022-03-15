<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <news-board-card
              :table-contents="newsData"
              :total-page="1"
              :is-loading="isLoading"
            />
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import {mapState} from "vuex";
import NewsBoardCard from "../../../components/card/news/NewsBoardCard";
import MainCard from "../../../components/card/MainCard";
export default {
  name: "index",
  components: {NewsBoardCard, MainCard},
  created() {
    let refreshRoute = false;
    let page = this.$route.query.page;
    if (!page) {
      page = 1
      refreshRoute = true;
    }
    let itemsPerPage = this.$route.query.items_per_page
    if (!itemsPerPage) {
      itemsPerPage = 10
      refreshRoute = true;
    }
    let sort = this.$route.query.board_list_sort
    if (!sort) {
      sort = 'no'
      refreshRoute = true;
    }
    if (refreshRoute) {
      this.$router.push({
        path: this.$router.currentRoute.path,
        query: {
          page: page,
          items_per_page: itemsPerPage,
          board_list_sort: sort,
          target: this.$route.query.target,
          keyword: this.$route.query.keyword
        }
      })
    }
  },
  mounted() {
    this.fetchData()
  },
  data: () => ({
    header: '공지사항',
    isLoading: true,
    newsData: [],
    sampleData: [
      {
        idx: 1,
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
        author: '최연우',
        created_at: '2021-11-17',
        view_count: 0
      },
      {
        idx: 2,
        no: 2,
        title: '[2019.12.13 - 양우식 석사과정] Visual Commonsense Reasoning & VilBERT',
        content: '1. Topic\n' +
          '\n' +
          'Recognition to cognition : Visual Commonsense Reasoning\n' +
          '\n' +
          'Vilbert : Pretraining task-agnostic visionlinguistic representations for vision-and-language tasks\n' +
          '\n' +
          '\n' +
          '\n' +
          '2. Overview\n' +
          '\n' +
          'Visual Question Answering에 대한 두 개의 논문에 대하여 발표했습니다. 첫번째는 Visual Commonsense Reasoning Dataset 구축을 다룬 논문으로 기존의 Question과 이미지를 넘어서 Reasoning의 이유가 되는 논리적 이유, 즉 상식까지 학습하고자 구축된 데이터셋을 소개했습니다. 주요 contribution의 첫 부분은 객관식으로 구성된 질문과 답변을 구축하기 위해서 고품질의 오답을 구성하는 방식을 다루고 있으며 추가로 인간의 사고 과정을 Grounding-Contextualization-Reasoning으로 설명하고 딥러닝 학습 과정에 적합하게 반영하여 강건하고 높은 성능을 보였습니다.\n' +
          '\n' +
          '두번째 논문은 VilBERT이며 최근 딥러닝 환경에서 대세가 되는 BERT기반 방법론을 VQA에서도 사용한 모델입니다. Multimodal joint representation을 위해서 BERT와 유사한 방법론을 적용시켜서 멀티 모달에서의 높은 성능을 갖는 PreTraining 모델을 소개하고 있습니다.\n' +
          '\n' +
          '\n' +
          '\n' +
          '3. 발표자료 및 발표영상\n' +
          '\n' +
          '\n' +
          '\n' +
          '[1] 발표자료\n' +
          '\n' +
          '[2] 발표영상(업로드 예정)\n' +
          '\n' +
          '\n' +
          '\n' +
          '4. 참고문헌\n' +
          '\n' +
          '[1] Zellers, Rowan, et al. "From recognition to cognition: Visual commonsense reasoning." Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition. 2019.\n' +
          '\n' +
          '[2] Lu, Jiasen, et al. "Vilbert: Pretraining task-agnostic visiolinguistic representations for vision-and-language tasks." Advances in Neural Information Processing Systems. 2019.',
        author: '양우식',
        created_at: '2021-11-30',
        view_count: 1
      },
      {
        idx: 3,
        no: 3,
        title: '[Paper Review] HOTPOTQA: A Dataset for Diverse, Explainable Multi-hop Question Answering',
        content: '1. Topic\n' +
          '\n' +
          '\n' +
          '\n' +
          '해당 논문은 ENMLP 2018에 기재된 논문입니다.\n' +
          '\n' +
          '도출한 answer가 왜 정답인지도 알려주는 Explainable Question Answering task를 위해 Multi-hop question을 논리적으로 생생하고, RNN과 어텐션 기법을 사용하여 Question answering task에 맞는 모델을 구축합니다.\n' +
          '\n' +
          '\n' +
          '\n' +
          '2. Overview\n' +
          '\n' +
          '\n' +
          '\n' +
          '1) HOTPOTQA 데이터셋 생성\n' +
          '\n' +
          '\n' +
          '\n' +
          '-Hyperlink Graph을 사용하여 관계가 있는 candidate paragraph pair을 선정하고, 각 paragraph pair에 맞는 multi-hop question을 생성합니다.\n' +
          '\n' +
          '\n' +
          '\n' +
          '- XQA task를 위해 supporting fact도 함께 제공해주는 데이터셋을 생성합니다.\n' +
          '\n' +
          '\n' +
          '\n' +
          '2) 모델 구축\n' +
          '\n' +
          '\n' +
          '\n' +
          '- Question answering task을 위해 context와 question을 각각 word embedding과 character embedding 해줌\n' +
          '\n' +
          '\n' +
          '\n' +
          '- Question-Context attention 과 Self-attention을 통해 answer span을 도출\n' +
          '\n' +
          '\n' +
          '\n' +
          '- XQA의 핵심인 supporting fact를 도출한 다음, answer span을 구하는데 strong supervision이 되게 함\n' +
          '\n' +
          '\n' +
          '\n' +
          ' \n' +
          '\n' +
          '\n' +
          '\n' +
          '3. 발표자료 및 발표영상\n' +
          '\n' +
          '\n' +
          '\n' +
          '[1] 발표자료 : 하단첨부\n' +
          '\n' +
          '\n' +
          '\n' +
          '[2] 발표영상 : 추후 업로드 예정\n' +
          '\n' +
          '\n' +
          '\n' +
          '4. 참고 문헌\n' +
          '\n' +
          '\n' +
          '\n' +
          '[1] https://aclanthology.org/D18-1259.pdf',
        author: '이찬희',
        created_at: '2021-11-16',
        view_count: 4
      },
      {
        idx: 4,
        no: 4,
        title: '[Paper Review]Attacking Adversarial Attack as A Defense',
        content: '1. Topic\n' +
          '\n' +
          'Adversarial Training 기법과 더불어 Denoising 기반의 Adversarial Defense 방법론을 제안함\n' +
          '\n' +
          '\n' +
          '\n' +
          '2. Overview\n' +
          '\n' +
          'Adversarial Training은 학습 과정 중에 Adversarial Example을 생성하여 이를 학습에 포함시키는 방법론입니다. 본 논문은 이 방법론을 통해 학습한 모델에 Denosing 기법을 추가로 적용하였습니다. 본 논문에서는 Adversarial Noise가 robust 하지 않음을 지적하며 이를 공격하기 위해 Adversarial Attack 기법을 활용하는 Hedge Defense라는 방법론을 제안하여 CIFAR 10, 100 그리고 IMGAENET 데이터 셋에 대하여 Adversarial Defense 분야에서 SOTA의 성능을 달성하였습니다.\n' +
          '\n' +
          '\n' +
          '\n' +
          '3. 참고자료\n' +
          '\n' +
          '[1] 발표자료 [첨부파일]\n' +
          '\n' +
          '[2] 발표영상 [추후 업로드 예정]',
        author: '김기명',
        created_at: '2021-11-3',
        view_count: 10
      },
    ]
  }),
  methods: {
    fetchData() {
      this.isLoading = true;
      // Fetch Data!
      setTimeout(() => {
        this.newsData = this.sampleData
        this.isLoading = false;
      }, 1000)
    },
  }
}
</script>

<style scoped>
</style>
