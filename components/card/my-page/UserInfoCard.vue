<template>
  <v-scroll-y-transition mode="out-in">
    <v-card
      class="pt-6 mx-auto"
      flat
      max-width="400"
    >
      <v-card-text>
        <v-avatar
          size="88"
        >
          <v-img
            src="https://avataaars.io/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban"
            class="mb-6"
          ></v-img>
        </v-avatar>
        <h3 class="text-h5 mb-2">
          rud527
        </h3>
        <div class="blue--text mb-2">
          chldusdn20@gmail.com
        </div>
        <div class="blue--text subheading font-weight-bold">
          최연우
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-row
        class="text-left"
        tag="v-card-text"
      >
        <v-col
          class="text-right mr-4 mb-2"
          tag="strong"
          cols="5"
        >
          Company:
        </v-col>
        <v-col>Run-i Studio</v-col>
        <v-col
          class="text-right mr-4 mb-2"
          tag="strong"
          cols="5"
        >
          Website:
        </v-col>
        <v-col>
          <a
            href="https://vuetifyjs.com/en/components/treeview/#selected-color"
            target="_blank"
          >바로가기</a>
        </v-col>
        <v-col
          class="text-right mr-4 mb-2"
          tag="strong"
          cols="5"
        >
          Phone:
        </v-col>
        <v-col>010-8560-3465</v-col>
      </v-row>
    </v-card>
  </v-scroll-y-transition>
</template>

<script>
export default {
  name: "UserInfoCard",
}
</script>

<style scoped>

</style>
