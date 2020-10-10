<template>
    <div
            :draggable="draggable"
            :id="id"
            @dragover.stop
            @dragstart="dragStart"
            class="card"
    >
        <slot/>
    </div>
</template>

<script>

    export default {
        name: "Card",
        props: ['id', 'draggable'],
        methods: {
            dragStart: e => {
                e.dataTransfer.setData('id', e.target.id);

                setTimeout(() => {
                    e.target.style.display = 'none';
                }, 0);
            },
        }
    }
</script>

<style>
    /*.card {
        font-size: 11px;
        font-weight: bold;
        cursor: pointer;
        margin: auto auto;
        width: available;
        height: 150px;
        background-color: whitesmoke;
    }

    .card:hover {
        opacity: 0.6;
        border: solid;
    }*/
</style>
