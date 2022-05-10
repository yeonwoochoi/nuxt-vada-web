<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <v-form v-model="valid" ref="form">
              <v-row align="start" justify="space-around" class="mb-6 px-sm-4" style="width: 100%;">
                <v-col cols="12">
                  <v-card v-if="!success" class="elevation-0 px-12 py-12" style="background-color: #F5F5F5; width: 100%">
                    <v-container fluid>
                      <v-row align="center" justify="start">
                        <v-col cols="2" v-if="$vuetify.breakpoint.mdAndUp" align-self="start">
                          <v-subheader>제목</v-subheader>
                        </v-col>
                        <v-col cols="12" md="9">
                          <v-text-field
                            v-model="title"
                            label="제목"
                            outlined
                            dense
                            required
                            :rules="[rules.required]"
                          />
                        </v-col>
                        <v-col cols="2" v-if="$vuetify.breakpoint.mdAndUp" align-self="start">
                          <v-subheader>문의내용</v-subheader>
                        </v-col>
                        <v-col cols="12" md="9">
                          <v-textarea
                            v-model="content"
                            ref="content"
                            label="문의내용"
                            rows="12"
                            :rules="[rules.required]"
                            outlined
                            no-resize
                            auto-grow
                            counter
                            clearable
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                  <div v-else style="display: flex; align-items: center; justify-content: center">
                    <v-card class="elevation-0 px-12 py-12 text-center" style="background-color: transparent; border: #F5F5F5 1px solid;">
                      <v-card-title class="headline mb-2 font-weight-bold">문의하신 내용이 정상적으로 접수되었습니다.</v-card-title>
                      <v-card-subtitle class="subtitle-1 font-weight-bold">문의에 대한 답변은 마이페이지에서 확인 가능하십니다.</v-card-subtitle>
                      <div class="mt-4" style="display: flex; align-items: center; justify-content: center">
                        <custom-button
                          :width="`200`"
                          @submit="reset"
                          :color="'primary'"
                          :text="`확인`"
                          class="darken-1 mx-2"
                        />
                        <custom-button
                          :width="`200`"
                          @submit="$router.push('/my-page')"
                          :color="'primary'"
                          :text="`마이페이지`"
                          class="darken-1 mx-2"
                        />
                      </div>
                    </v-card>
                  </div>
                </v-col>
                <v-col cols="12" v-if="!success">
                  <div style="display: flex; width: 100%; justify-content: end">
                    <v-btn large @click="submit" class="mr-4 font-weight-bold elevation-0 button-border-grey" outlined>제출</v-btn>
                    <v-btn large @click="cancel" class="font-weight-bold elevation-0 button-border-grey" outlined>취소</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "../../../components/card/MainCard";
import CustomButton from "../../../components/button/CustomButton";
export default {
  name: "index",
  components: {CustomButton, MainCard},
  created() {
    this.$store.commit('setSheetTitle', '문의하기')
    this.reset();
  },
  data: () => ({
    valid: false,
    header: '1:1 문의',
    title: '',
    content: '',
    success: false,
    loading: false
  }),
  computed: {
    rules() {
      return {
        required: value => !!value || '값을 입력해주세요',
      }
    },
  },
  methods: {
    reset() {
      this.title = '';
      this.content = '';
      this.success = false;
      this.loading = false;
    },

    submit () {
      if (!this.valid) {
        this.$notifier.showMessage({
          content: '모든 값을 입력해주십시오.',
          color: 'error'
        })
      }
      else {
        this.loading = true;
        this.$store.dispatch('qna/createInquiry', { title: this.title, content: this.content, userId: this.$auth.user.id}).then(
          res => {
            this.loading = false;
            this.success = true;
          },
          err => {
            this.$errorHandler.showMessage(err)
            this.loading = false;
          }
        )
      }
    },

    cancel() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
</style>
