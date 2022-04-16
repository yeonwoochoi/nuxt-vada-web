<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card style="width: 1200px; height:fit-content;" class="elevation-0">
        <main-card :header="header">
          <template v-slot:body>
            <v-row align="start" justify="space-around" class="mb-6 px-4" style="width: 100%;">
              <v-col cols="12">
                <v-card class="elevation-0 px-md-12 px-6 py-12" style="background-color: #F5F5F5; width: 100%">
                  <div class="mb-6">
                    <v-card-title class="font-weight-medium mb-4" style="font-size: 25px;">
                      • 건별 요금제
                    </v-card-title>
                    <simple-data-table
                      :table-header="incidentPlanHeader"
                      :table-content="incidentPlanData"
                    />
                  </div>
                  <div class="my-6">
                    <v-card-title class="font-weight-medium mb-4" style="font-size: 25px;">
                      • 연간 요금제
                    </v-card-title>
                    <simple-data-table
                      :table-header="annualPlanHeader"
                      :table-content="annualPlanData"
                    />
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </main-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import MainCard from "../../components/card/MainCard";
import SimpleDataTable from "../../components/table/SimpleDataTable";
export default {
  name: "fee",
  auth: false,
  components: {SimpleDataTable, MainCard},
  created() {
    this.$store.commit('setSheetTitle', '요금안내')
  },
  data: () => ({
    header: '요금안내',
    incidentPlanHeader: [
      {
        text: '유형',
        value: 'type',
        sortable: false,
        align: 'center'
      },
      {
        text: '가치평가 수',
        value: 'number',
        sortable: false,
        align: 'center'
      },
      {
        text: '가격(부가세 포함)',
        value: 'price',
        sortable: false,
        align: 'center'
      },
    ],
    incidentPlanData: [
      {
        type: 'VADA1',
        number: 1,
        price: '200,000'
      },
      {
        type: 'VADA2',
        number: 5,
        price: '800,000'
      },
    ],
    annualPlanHeader: [
      {
        text: '유형',
        value: 'type',
        sortable: false,
        align: 'center'
      },
      {
        text: '기간',
        value: 'period',
        sortable: false,
        align: 'center'
      },
      {
        text: '가격(부가세 포함)',
        value: 'price',
        sortable: false,
        align: 'center'
      },
    ],
    annualPlanData: [
      {
        type: 'VADA1',
        period: '1년',
        price: '1,000,000'
      },
      {
        type: 'VADA2',
        period: '2년',
        price: '1,800,000'
      },
      {
        type: 'VADA3',
        period: '3년',
        price: '2,500,000'
      },
      {
        type: 'VADA4',
        period: '4년',
        price: '3,200,000'
      },
    ],
  })
}
</script>

<style lang="scss">
tbody {
  tr:hover {
    background-color: transparent !important;
  }
}
</style>
