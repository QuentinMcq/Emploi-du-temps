<template>
    <div id="app">
        <div>
            <b-navbar toggleable="lg" type="dark" variant="dark">
                <b-navbar-brand to="/">Home</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item to="/container">Emploi du temps</b-nav-item>
                        <b-nav-item to="/dispo">Disponibilité</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
            <br>
        </div>

        <router-view/>
    </div>

</template>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        text-align: center;
    }

    a {
        font-weight: bold;
        color: #2c3e50;
    }
</style>
