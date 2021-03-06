<template>
  <div :class="$style.container">
    <div v-for="(item, i) in days" :key="i" :class="$style.times">
      <TextComponent
        type="body3"
        color="grey"
        :class="$style.time"
        align="center"
      >{{ i % 12 || 12 }} {{ i >= 12 ? 'PM' : 'AM' }}</TextComponent>
    </div>
    <div :class="$style.events">
      <div
        v-for="(event, i) in data"
        @click="event.description ? showDetails(event) : undefined"
        :key="i"
        :class="[
          $style[`box--color-${eventTypes[event.category.slug]}`],
          $style.box,
        ]"
        :style="getPosition(event)"
      >
        <div :class="[$style.event, event.description && $style[`event--clickable`]]">
          <div :class="$style.content">
            <div :class="$style.label">
              <span :class="$style.dot"/>
              <TextComponent as='h4' type='body2'>{{ event.label }}</TextComponent>
            </div>
            <TextComponent type='body2'>
              {{ formatTime(event.start) + (event.nonRange ? '' : ` - ${formatTime(event.end)}`)}}
            </TextComponent>
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="event" v-model="show" :label="event.label">
      <Renderer :data='event.description'/>
    </Modal>
  </div>
</template>

<script>
import TextComponent from "@hackthe6ix/vue-ui/Text";
import Stack from "@hackthe6ix/vue-ui/Stack";
import Modal from '@hackthe6ix/vue-ui/Modal';
import moment from 'moment';

export default {
  name: "ScheduleEvents",
  components: {
    TextComponent,
    Modal,
    Stack,
    Renderer: {
      functional: true,
      render: (h, ctx) => {
        const context = [];
        let count = 0;
        return h('div', ctx.props.data.split('\n\n').map(par => h(
          'div',
          { attrs: { class: 'schedule__section' } },
          par
          // Parse bold
          .replace(/__.*__/g, s => {
            const i = context.length;
            context.push([`BOLD`, s.slice(2, -2)]);
            return `###${i}###`;
          })
          // Parse link
          .replace(/\[.*\]\(.*\)/g, s => {
            const i = context.length;
            context.push([`LINK`, s.slice(1, -1).split('](')]);
            return `###${i}###`;
          })
          .split('\n')
          .map(line => h(
            TextComponent,
            { props: { type: 'body1' } },
            line.split(/###\d*###/g).map((l, i, { length }) => {
              if (i === length - 1) return l;
              const [ type, val ] = context[count++] || [0, 0];
              switch(type) {
                case `BOLD`:
                  return [h('span', l), h('strong', val)];
                case `LINK`:
                  return [h('span', l), h('a', { attrs: { href: val[1] } }, val[0])];
                default:
                  return l;
              }
            })
          ))
        )));
      },
    },
  },
  computed: {
    bigRip() {
      return this.data
        .reduce((acc, curr) => {
          let s = this.bigRipIndex(curr.start);
          const e = this.bigRipIndex(curr.end);

          for (s; s < e; s++) {
            acc[s]++;
          }
          return acc;
        }, new Array(48).fill(0))
        .map(i => [i, new Array(i).fill(false)]);
    },
  },
  methods: {
    formatTime(date) {
      return moment(date).format(`LT`);
    },
    bigRipIndex(date) {
      const d = moment(date);
      return (d.hours() * 2) + (d.minutes() ? 1 : 0);
    },
    showDetails(data) {
      this.event = data;
      this.show = true;
    },
    getPosition({ start, end }) {
      const s = moment(start);
      const e = moment(end);

      const si = this.bigRipIndex(start);
      const ei = this.bigRipIndex(end) || 48;
      const range = this.bigRip.slice(si, ei);

      const [split, slide] = range.reduce((acc, curr) => {
        const slot = curr[1].indexOf(false);
        if (acc[0] < curr[0]) acc[0] = curr[0];
        if (acc[1] < slot) acc[1] = slot;
        return acc;
      }, [0, 0]);

      range.forEach(curr => curr[1][slide] = true);
      return `--lines: ${(ei - si) / 2}; --offset: ${si/ 2}; --split: ${split}; --slide: ${slide}`;
    },
  },
  beforeUpdate() {
    this.bigRip.forEach(i => i[1] = new Array(i[0]).fill(false));
  },
  props: {
    data: Array,
    eventTypes: Object,
  },
  data() {
    return {
      days: new Array(24).fill(),
      event: undefined,
      show: false,
    };
  },
};
</script>

<style src="./Events.module.scss" lang="scss" module/>