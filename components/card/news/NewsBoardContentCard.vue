<template>
  <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
    <v-col cols="12" class="mb-4">
      <pre class="roboto-font title font-weight-black" v-text="contents.title"/>
    </v-col>
    <v-col cols="12" style="background-color: #F5F5F5;">
      <div :style="`display: ${$vuetify.breakpoint.smAndDown ? 'block' : 'flex'};`">
        <pre class="caption font-weight-bold mx-6 my-1">작성일 <span class="subtitle-2 content-grey-font pl-3">{{ contents.created_at }}</span></pre>
        <pre class="caption font-weight-bold mx-6 my-1">조회 <span class="subtitle-2 content-grey-font pl-3">{{ contents.view_count }}</span></pre>
      </div>
    </v-col>
    <v-col cols="12" class="pa-6">
      <pre class="subtitle-2 content-grey-font card-content" v-html="contents.content" />
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
      default: () => {
        return {}
      }
    },
    path: {
      type: String,
      default: () => ''
    }
  },
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
