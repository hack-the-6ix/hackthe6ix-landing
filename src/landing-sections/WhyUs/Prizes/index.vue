<template>
  <div>
    <Stack direction='column'>
      <TextComponent
        transform='uppercase'
        type='heading2'
        tag='h2'
      >
        Win prizes
      </TextComponent>
      <TextComponent
        color='yellow'
        type='heading3'
        tag='p'
      >
        There’s something for everyone.
      </TextComponent>
    </Stack>

    <div :class="$style.prizes">
      <!--
      <Prize :class="$style['prizes--left']" graphic="04_d_Why_Us_Win_Prizes/Medal_First_Place.svg" placeName="First Place" :prizes="['Coming Soon', '...', '...']" />
      <Prize :class="$style['prizes--right']" graphic="04_d_Why_Us_Win_Prizes/Medal_Second_Place.svg" placeName="Second Place" :prizes="['Coming Soon', '...', '...']" />
      <Prize :class="$style['prizes--left']" graphic="04_d_Why_Us_Win_Prizes/Medal_Third_Place.svg" placeName="Third Place" :prizes="['Coming Soon', '...', '...']" />
      <Prize :class="$style['prizes--right']" graphic="04_d_Why_Us_Win_Prizes/Medal_Participation.svg" placeName="Participation" :prizes="['Physical swag bags', '*Canada only', '...']" />
      -->

      <div :class="[$style.prize, $style['prize--left']]">
        <img src="@assets/04_d_Why_Us_Win_Prizes/1st_no_plant.svg">
      </div>
      <div :class="[$style.prize, $style['prize--right']]">
        <img src="@assets/04_d_Why_Us_Win_Prizes/2nd_no_plant.svg">
      </div>
      <div :class="[$style.prize, $style['prize--left']]">
        <img src="@assets/04_d_Why_Us_Win_Prizes/3rd_no_plant.svg">
      </div>
      <div :class="[$style.prize, $style['prize--right']]">
        <img src="@assets/04_d_Why_Us_Win_Prizes/Participation_no_plant.svg">
      </div>
    </div>
  </div>
</template>

<script>
import TextComponent from '@hackthe6ix/vue-ui/Text';
import Stack from '@hackthe6ix/vue-ui/Stack';
import Prize from '../Prize/index';

export default {
  components: {
    TextComponent,
    Stack,
    Prize
  },
}
</script>

<style src='./Prizes.module.scss' lang="scss" module/>
