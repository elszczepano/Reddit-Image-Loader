<template lang="html">
<div class="">
  <Menu></Menu>
  <Content></Content>
</div>
</template>

<script>
import Menu from '@/components/menu';
import Content from '@/components/content';
export default {
  name: 'Main',
  components: {
    'Menu': Menu,
    'Content' : Content
    }
}
</script>

<style lang="css">
</style>
