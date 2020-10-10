<template>
    <div>
        <b-container>
            <b-button v-if="!created"
                      v-on:click="create"
                      variant="success"
            >+
            </b-button>
            <b-button v-if="created"
                      v-on:click="create"
                      variant="danger"
            >-
            </b-button>
        </b-container>
        <b-container v-if="created">
            <b-row class="justify-content-md-center">
                <b-col col lg="9">
                    <b-form @submit="onSubmit">
                        <!--Créneau du cours (date)-->
                        <b-form-group id="input-group-heure" label="Créneau du cours:" label-for="input-heure">
                            <b-form-datepicker
                                    class="mb-2"
                                    id="input-date"
                                    placeholder="Choisissez une date"
                                    required
                                    v-model="form.date"
                            ></b-form-datepicker>
                        </b-form-group>

                        <!--Créneau du cours (heure)-->
                        <b-input-group class="mb-3">
                            <b-form-input
                                    id="example-input"
                                    pattern="[0-9][0-9]:[0-9][0-9]:[0-9][0-9]"
                                    placeholder="Choisissez une heure HH:mm:ss"
                                    required
                                    type="text"
                                    v-model="form.heure"
                            ></b-form-input>
                            <b-input-group-append>
                                <b-form-timepicker
                                        aria-controls="example-input"
                                        button-only
                                        locale="fr"
                                        right
                                        v-model="form.heure"
                                ></b-form-timepicker>
                            </b-input-group-append>
                        </b-input-group>

                        <br>
                        <!--Time-->
                        <b-form-group id="input-group-time" label="Durée du cours" label-for="input-time">
                            <b-form-select
                                    :options="durees"
                                    id="input-time"
                                    v-model="form.duree"
                            ></b-form-select>
                        </b-form-group>

                        <br>
                        <!--Type de cours-->
                        <b-form-group id="input-group-type" label="Type de cours:" label-for="input-type">
                            <b-form-select
                                    :options="types"
                                    id="input-type"
                                    required
                                    v-model="form.type"
                            ></b-form-select>
                        </b-form-group>

                        <br>
                        <!--Matière-->
                        <b-form-group id="input-group-matiere" label="Matière:" label-for="input-matiere">
                            <b-form-select
                                    :options="matieres"
                                    id="input-matiere"
                                    required
                                    v-model="form.matiere"
                            ></b-form-select>
                            <b-form-input
                                    placeholder="Autre"
                                    required
                                    style="margin-top: 1%"
                                    v-if="this.form.matiere === 'Autre cours'"
                                    v-model="form.matiere_autre"
                            ></b-form-input>
                        </b-form-group>

                        <br>

                        <!--Groupe-->
                        <b-form-group id="input-group-groupe" label="Groupe:" label-for="input-groupe">
                            <b-form-select
                                    :options="tabForOneGroupes"
                                    id="input-groupe"
                                    required
                                    v-model="form.groupeOne"
                            ></b-form-select>
                            <b-form-select
                                    :options="tabForTwoGroupes"
                                    id="input-groupe"
                                    required
                                    style="margin-top: 1%"
                                    v-if="twoGroup"
                                    v-model="form.groupeTwo"
                            ></b-form-select>
                            <b-form-select
                                    :options="tabForThreeGroupes"
                                    id="input-groupe"
                                    required
                                    style="margin-top: 1%"
                                    v-if="threeGroup"
                                    v-model="form.groupeThree"
                            ></b-form-select>
                        </b-form-group>

                        <!-- One Group -->
                        <b-button v-if="oneGroup & !twoGroup & !threeGroup"
                                  v-on:click="TwoGroup"
                                  variant="warning">
                            Ajouter un autre groupe
                        </b-button>

                        <!-- Two Group -->
                        <b-button v-if="oneGroup & twoGroup & !threeGroup"
                                  v-on:click="ThreeGroup"
                                  variant="warning">
                            Ajouter un autre groupe
                        </b-button>

                        <b-button style="margin-left: 1%"
                                  v-if="oneGroup & twoGroup & !threeGroup"
                                  v-on:click="OneGroup"
                                  variant="danger">
                            Supprimer le 2ème groupe
                        </b-button>

                        <!-- Three Group -->
                        <b-button v-if="oneGroup & twoGroup & threeGroup"
                                  v-on:click="TwoGroup"
                                  variant="danger">
                            Supprimer le 3ème groupe
                        </b-button>
                        <br>
                        <!--Professeur-->
                        <b-form-group id="input-group-prof" label="Professeur:" label-for="input-prof">
                            <b-form-select
                                    :options="profs"
                                    id="input-prof"
                                    required
                                    v-model="form.prof"
                            ></b-form-select>
                        </b-form-group>

                        <br>
                        <!--Salle-->
                        <b-form-group id="input-group-salle" label="Salle:" label-for="input-salle">
                            <b-form-select
                                    :options="salles"
                                    id="input-salle"
                                    required
                                    v-model="form.salle"
                            ></b-form-select>
                        </b-form-group>

                        <br>

                        <b-button type="submit" v-b-modal.modal-1 variant="primary">Créer</b-button>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import Tableau from "./Tableau";

    export default {
        name: "AjoutCreneau",
        data() {
            return {
                form: {
                    date: '',
                    heure: '',
                    duree: '1:30',
                    type: null,
                    matiere: '',
                    matiere_autre: null,
                    groupeOne: null,
                    groupeTwo: null,
                    groupeThree: null,
                    prof: '',
                    salle: ''
                },
                types: ['CM', 'TD', 'TP', 'DS'],
                durees: [{ text: '1:30', value: '1:30' }, '3:00', '4:30'],
                matieres: null,
                profs: null,
                tabForOneGroupes: null,
                tabForTwoGroupes: null,
                tabForThreeGroupes: null,
                salles: null,
                oneGroup: true,
                twoGroup: false,
                threeGroup: false,
                created: false,
            }
        },
        methods: {
            getDataByJson() {
                let data = require('../data.json');
                let matieres = [];
                let profs = [];
                let groupes = [];
                let salles = [];

                for (let i = 0; i < data["matieres"].length; i++) {
                    matieres.push(data['matieres'][i]['nom'])
                }

                for (let i = 0; i < data["profs"].length; i++) {
                    profs.push(data['profs'][i]['nom'])
                }
                for (let i = 0; i < data["groupes"].length; i++) {
                    groupes.push(data['groupes'][i]['nom'])
                }
                for (let i = 0; i < data["salles"].length; i++) {
                    salles.push(data['salles'][i]['nom'])
                }

                this.matieres = [...matieres, "Autre cours"];
                this.profs = profs;
                this.tabForOneGroupes = groupes;
                this.tabForTwoGroupes = groupes;
                this.tabForThreeGroupes = groupes;
                this.backGroupes = groupes;
                this.salles = salles;
            },

            onSubmit() {
                let data = require('../data.json');
                let create = true
                let heure = this.form.date + " " + this.form.heure
                let textForJson
                let textForModal
                let totalGroup = [this.form.groupeOne, this.form.groupeTwo, this.form.groupeThree]
                for (let i = 0; i < totalGroup.length; i++) {
                    if (totalGroup[i] != null) {
                        textForModal = this.form.matiere + " le " + this.form.date + " à " + this.form.heure + " pour " + totalGroup[i]
                        let idGroupe;
                        let trouve = false;
                        let j = 0
                        while (j < data["groupes"].length && !trouve) {
                            if (data["groupes"][j]["nom"] === totalGroup[i]) {
                                trouve = true;
                                idGroupe = data["groupes"][j]["id"]
                            }
                            j++
                        }
                        j = 0;
                        while (j < data["edt"].length && create) {
                            if (data["edt"][j]["heure"] === heure & data["edt"][j]["idgroupe"] === idGroupe) {
                                create = false;
                            }
                            j++
                        }
                        if (create) {
                            if (this.form.matiere_autre != null) {
                                textForJson = '{"heure":"' + heure +
                                    '","type":"' + this.form.type +
                                    '","matiere":"' + this.form.matiere_autre +
                                    '","groupe":"' + totalGroup[i] +
                                    '","prof":"' + this.form.prof +
                                    '","salle":"' + this.form.salle + '"}'
                            } else {
                                textForJson = '{"heure":"' + heure +
                                    '","type":"' + this.form.type +
                                    '","matiere":"' + this.form.matiere +
                                    '","groupe":"' + totalGroup[i] +
                                    '","prof":"' + this.form.prof +
                                    '","salle":"' + this.form.salle + '"}'
                            }
                            console.log(textForJson);
                            //Tableau.methods.addCard(this.form.matiere, this.form.salle, this.form.prof, this.form.type, 1, 3)
                            Tableau.methods.addCard(data['matieres'][0]['nom'] + " ", data['salles'][6]['nom'] + " | ", data["profs"][0]["nom"], "CM", 2, 3)

                            return confirm("Do you want confirm this form ?")
                        } else {
                            textForModal += ": UN COURS EST DEJA PROGRAMME A CET HORAIRE \n"
                            alert(textForModal)
                        }
                    }
                }


            },

            OneGroup() {
                this.oneGroup = true;
                this.twoGroup = false;
                this.threeGroup = false;
                if (this.form.groupeTwo != null) {
                    this.tabForOneGroupes.push(this.form.groupeTwo)
                }
                this.groupes = this.backGroupes;
                this.form.groupeTwo = null;
            },

            TwoGroup() {
                this.oneGroup = true;
                this.twoGroup = true;
                this.threeGroup = false;
                if (this.form.groupeThree != null) {
                    this.tabForTwoGroupes.push(this.form.groupeThree)
                }
                this.tabForTwoGroupes = this.tabForOneGroupes.filter(item => item !== this.form.groupeOne)
                this.form.groupeThree = null
            },

            ThreeGroup() {
                this.oneGroup = true;
                this.twoGroup = true;
                this.threeGroup = true;
                this.tabForThreeGroupes = this.tabForTwoGroupes.filter(item => item !== this.form.groupeTwo)
            },

            create() {
                this.created = !this.created;
            }
        },
        beforeMount() {
            this.getDataByJson()
        }
    }
</script>

<style scoped>
    button {
        margin-bottom: 50px;
    }
</style>
