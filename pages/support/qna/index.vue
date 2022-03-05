<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <v-form v-model="valid" ref="form">
              <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
                <v-col cols="12">
                  <v-card class="elevation-0 px-12 py-12" style="background-color: #F5F5F5; width: 100%">
                    <v-container fluid>
                      <v-row align="center" justify="start">
                        <v-col cols="2" v-if="!isMobile">
                          <v-subheader>문의유형</v-subheader>
                        </v-col>
                        <v-col cols="12" md="9">
                          <v-select
                            v-model="type"
                            :items="typeList"
                            :rules="[rules.required]"
                            label="문의유형"
                            required
                            menu-props="auto"
                            :single-line="!isMobile"
                          />
                        </v-col>
                        <v-col cols="2" v-if="!isMobile" align-self="start">
                          <v-subheader>이메일</v-subheader>
                        </v-col>
                        <v-col cols="12" md="9">
                          <v-text-field
                            v-model="email"
                            label="Email"
                            ref="email"
                            outlined
                            dense
                            required
                            :rules="[rules.required, rules.email]"
                          />
                        </v-col>
                        <v-col cols="2" v-if="!isMobile" align-self="start">
                          <v-subheader>문의내용</v-subheader>
                        </v-col>
                        <v-col cols="12" md="9">
                          <v-textarea
                            v-model="content"
                            ref="content"
                            label="문의내용"
                            rows="8"
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
                </v-col>
                <v-col cols="12">
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
import MainCard from "../../../components/MainCard";
export default {
  name: "index",
  components: {MainCard},
  data: () => ({
    valid: false,
    header: '1:1 문의',
    type: '사용방법 문의',
    typeList: ['사용방법 문의', '기타'],
    email: '',
    title: '',
    content: '',
  }),
  computed: {
    isMobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        default: return false
      }
    },
    rules() {
      return {
        required: value => !!value || '값을 입력해주세요',
        email: value => {
          const replaceV = value.replace(/(\s*)/g, '')
          const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
          return pattern.test(replaceV) || '이메일 형식으로 입력해주세요'
        }
      }
    },
  },
  methods: {
    reset() {
      this.email = '';
      this.type = '사용방법 문의';
      this.title = '';
      this.content = '';
    },

    submit () {
      if (!this.valid) {
        if (!!this.email) {
          alert("올바른 형식의 값을 입력하세요")
          return;
        }
        alert("모든 값을 입력하세요")
      }
      else {
        //TODO (서버 통신)
        this.$router.push('/');
        this.reset();
      }
    },

    cancel() {
      this.$router.push('/');
      this.reset();
    }
  }
}
</script>

<style scoped>
.no-hover-button::before {
  display: none;
}
</style>
