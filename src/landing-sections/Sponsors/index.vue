<template>
  <Container id="sponsors" :block="$style.container" as="section">
    <Stack direction='column' :class='$style.text'>
      <img :class="$style.leaf" src="@assets/05_Sponsors/Deco_Plants_01.svg">
      <TextComponent
        transform='uppercase'
        type='heading2'
        as='h2'
      >
        {{$static.data.edges[0].node.title}}
      </TextComponent>
      <TextComponent type='body1'>
        {{$static.data.edges[0].node.description}}
      </TextComponent>
    </Stack>
    <Stack
      :class='$style.logos'
      direction='column'
      spacing='element'
      align='center'
    >
      <Stack
        v-for='sponsors in $static.data.edges[0].node.categories'
        :style='`--width: ${sponsors.size}rem; --max-width: calc(90vw * ${sponsors.size} / 35)`'
        :key='sponsors.slug'
        :class="$style.logoStack"
        spacing='section'
        justify='center'
        align='center'
        wrap
      >
        <a v-for='(logo, i) in sponsors.logos' :href='logo.description' target="_blank">
          <img
            :class='$style.logo'
            :src='logo.file.url'
            :alt='logo.title'
            :key='i'
          />
        </a>
      </Stack>
    </Stack>
  </Container>
</template>

<script>
import TextComponent from '@hackthe6ix/vue-ui/Text';
import Button from '@hackthe6ix/vue-ui/Button';
import Stack from '@hackthe6ix/vue-ui/Stack';
import {Container} from '@components';

export default {
  components: {
    TextComponent,
    Container,
    Button,
    Stack,
  },
}
</script>

<static-query>
  {
    data: allContentfulSponsors(filter: {
      slug: { eq: "meet-our-sponsors" }
    }) {
      edges {
        node {
          title
          description
          categories {
            slug
            size
            logos {
              title
              description
              file {
                url
              }
            }
          }
        }
      }
    }
  }
</static-query>

<style src="./Sponsors.module.scss" lang="scss" module />
