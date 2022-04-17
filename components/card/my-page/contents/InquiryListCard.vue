<template>
  <v-scroll-y-transition mode="out-in">
    <v-card
      flat
      style="width: 100%; height: fit-content;"
    >
      <v-card-title class="pb-0">
        <p class="font-weight-medium display-1">
          {{ header }}
        </p>
      </v-card-title>
      <v-divider style="background-color:#555555; border-width: 1px !important;"/>
      <v-data-table
        :headers="headers"
        :items="inquiryList"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        :items-per-page="inquiryList.length"
        mobile-breakpoint="0"
        item-key="id"
        show-expand
        hide-default-header
        hide-default-footer
        class='row-height-100'
        style="width: 100%"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-card flat width="100%" height="fit-content" style="background-color: rgb(245, 245, 245);" class="py-8 px-6">
              <p>Q. {{item.data.content}}</p>
              <v-divider v-if="item.isAnswered" class="my-6"/>
              <div v-if="item.isAnswered">
                <pre class="card-content mb-6" v-html="`A. ${item.data.answer.data}`"/>
                <pre>{{item.data.answer.created_at}}</pre>
              </div>
            </v-card>
          </td>
        </template>
        <template v-slot:item.isAnswered="{item}">
          <td class="px-0">
            <p
              class="mb-0 text-center"
              :class="`${item.isAnswered ? 'font-weight-bold' : 'font-weight-thin'}`"
            >
              {{ !item.isAnswered ? '답변대기' : '답변완료' }}
            </p>
          </td>
        </template>
        <template v-slot:item.data="{item}">
          <td class="text-start">
            <div class="font-weight-bold mb-2">
              {{item.data.title}}
            </div>
            <div>
              {{item.data.created_at}}
            </div>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-scroll-y-transition>
</template>

<script>
export default {
  name: "InquiryListCard",
  props: {
    // TODO (Sample)
    inquiryList: {
      type: Array,
      default: () => []
    },
    header: {
      type: String,
      default: () => ''
    }
  },
  data: () => ({
    headers: [
      {
        text: '답변여부',
        value: 'isAnswered',
        align: 'center',
      },
      {
        text: '내용',
        value: 'data',
        align: 'center'
      },
      {
        text: '',
        value: 'data-table-expand',
        align: 'center'
      },
    ],
    expanded: [],
    singleExpand: false,
  }),
  computed: {

  }
}
</script>

<style lang="scss">
.v-data-table__expanded.v-data-table__expanded__content {
  box-shadow: none !important;
  background-color: rgb(245, 245, 245);
}
.card-content {
  white-space: pre-wrap;
  overflow: auto;
}

.v-data-table.row-height-100 td {
  height: 100px !important;
}
</style>
