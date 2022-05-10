<template>
  <client-only>
    <v-row align="start" justify="center" class="mb-6 py-6 pl-4 pr-md-8" style="width: 100%; min-height: 650px;">
      <v-col
        cols="12"
        sm="10"
        md="3"
        class="mt-4"
        style="border: 1px #DCDCDC solid; background-color: #F5F5F5"
        :style="`height: ${$vuetify.breakpoint.smAndDown ? '265' : '650'}px;`"
      >
        <v-btn
          v-for="(tab, index) in tabItems"
          :key="`tab-item-${index}`"
          class="elevation-0"
          style="min-height: 60px; width: 100%; background-color: transparent; border-radius: 0;"
          :style="`justify-content: ${$vuetify.breakpoint.smAndDown ? 'center': 'start'}; ${index + 1 < tabItems.length ? 'border-bottom: 1px #DCDCDC solid;' : ''}`"
          @click="onClickTabBtn(index)"
        >
          <v-icon v-if="$vuetify.breakpoint.mdAndUp" left>{{tab.icon}}</v-icon>
          <v-icon v-else>{{tab.icon}}</v-icon>
          <p class="mb-0 mt-1 subtitle-1 font-weight-medium">
            {{tab.text}}
          </p>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="10" md="9" class="pl-md-12 mt-4 pa-0">
        <slot name="body"/>
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
export default {
  name: "MyPageCard",
  props: {
    tabItems: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    header: '마이페이지',
  }),
  methods: {
    onClickTabBtn(index) {
      this.$emit('openTabContent', index)
    }
  }
}
</script>

<style scoped>
</style>
