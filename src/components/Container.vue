<template>
    <div id="app">
        <div class="sidebar"
             id="mySidebar"
        >
            <a @click="closeNav" class="closebtn" href="javascript:void(0)">x</a>
        </div>

        <div id="main">
            <button @click="openNav" class="openbtn">&#9776; Afficher la zone de drop</button>
            <Tableau/>
        </div>
    </div>
</template>

<script>
    import Tableau from "../components/Tableau";

    export default {
        name: "Container",
        components: {Tableau},
        methods: {
            // Afficher la barre
            openNav() {
                document.getElementById("mySidebar").style.width = "230px";
                document.getElementById("main").style.marginLeft = "230px";
            },

            // Mettre la largeur de la barre à 0 pour cacher la barre
            closeNav() {
                document.getElementById("mySidebar").style.width = "0";
                document.getElementById("main").style.marginLeft = "0";
            },
            /*drop: e => {
                const card_id = e.dataTransfer.getData('card_id');
                const card = document.getElementById(card_id);
                card.style.display = "block";
                e.target.appendChild(card);
            },*/
        }
    }
</script>

<style>
    #app h1 {
        font-weight: bold;
        text-align: center;
    }

    .sidebar {
        height: 100%;
        width: 0;
        position: fixed;
        z-index: 2;
        top: 0;
        left: 0;
        background-color: #343a40;
        overflow-x: hidden;
        overflow-y: auto;
        transition: 0.5s;
        padding-top: 60px;
    }

    .sidebar a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: gray;
        display: block;
        transition: 0.3s;
    }

    .sidebar a:hover {
        color: #f1f1f1;
    }

    .sidebar .closebtn {
        position: absolute;
        top: 0;
        right: 25px;
        font-size: 36px;
        margin-left: 50px;
    }

    .openbtn {
        font-size: 17px;
        cursor: pointer;
        background-color: #343a40;
        color: white;
        padding: 10px 15px;
        margin-bottom: 15px;
        border-radius: 5px;
        border: none;
        position: relative;
        left: 0;
    }

    .openbtn:hover {
        background-color: gray;
    }

    #main {
        transition: margin-left .5s;
        padding: 30px;
    }
</style>
