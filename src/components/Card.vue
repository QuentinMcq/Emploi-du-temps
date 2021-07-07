<!--<template>-->
<!--  <div-->
<!--    :id="id"-->
<!--    :draggable="draggable"-->
<!--    class="card"-->
<!--    @dragover.stop-->
<!--    @dragstart="dragStart"-->
<!--  >-->
<!--    <slot />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'Card',-->
<!--  props: {-->
<!--    id: {-->
<!--      type: Number,-->
<!--      required: true-->
<!--    },-->
<!--    draggable: {-->
<!--      type: Boolean,-->
<!--      required: false,-->
<!--      default: true-->
<!--    }-->
<!--  },-->

<!--  methods: {-->
<!--    dragStart: (e) => {-->
<!--      e.dataTransfer.setData('id', e.target.id);-->

<!--      setTimeout(() => {-->
<!--        e.target.style.display = 'none';-->
<!--      }, 0);-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style>-->
<!--.card {-->
<!--  font-size: 11px;-->
<!--  font-weight: bold;-->
<!--  cursor: pointer;-->
<!--  margin: auto auto;-->
<!--  width: available;-->
<!--  height: 150px;-->
<!--  background-color: whitesmoke;-->
<!--}-->

<!--.card:hover {-->
<!--  opacity: 0.6;-->
<!--  border: solid;-->
<!--}-->
<!--</style>-->
