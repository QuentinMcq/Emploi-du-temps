<template>
    <div>
        <div>
            <b-container>
                <b-button v-if="!created"
                          v-on:click="create"
                          variant="success"
                >Ajouter un créneau
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
                        <b-form id="form">
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

                            <b-button type="submit" v-b-modal.modal-1 v-on:click="onSubmit" variant="primary">Créer
                            </b-button>
                        </b-form>
                    </b-col>
                </b-row>
            </b-container>
        </div>

        <br>
        <div>
            <h1>SEMAINE 1</h1>
            <table class="table table-striped table-bordered" id="element-id-1">

                <thead class="thead-dark">
                <tr>
                    <td></td>
                    <th class="day-cell" colspan="15"> Lundi 04 Novembre</th>
                    <th class="day-cell" colspan="15"> Mardi 05 Novembre</th>
                    <th class="day-cell" colspan="15"> Mercredi 06 Novembre</th>
                    <th class="day-cell" colspan="15"> Jeudi 07 Novembre</th>
                    <th class="day-cell" colspan="15"> Vendredi 08 Novembre</th>
                    <th class="day-cell" colspan="15"> Samedi 09 Novembre</th>
                </tr>
                </thead>

                <tbody>

                <tr class="year-cell">
                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>

                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>

                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>

                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>

                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>

                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>
                </tr>

                <tr class="mainGroup-cell">
                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>

                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>

                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>

                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>

                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>

                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>
                </tr>

                <tr class="group-cell">
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                </tr>

                <tr :key="index" v-for="(hour, index) in hours">
                    <th class="hour-cell"> {{ hour }}</th>

                    <td :key="val.id"
                        class="board"
                        v-for="val in 89">
                    </td>

                </tr>
                </tbody>
            </table>

            <br>
            <br>
            <br>


            <h1>SEMAINE 2</h1>

            <table class="table table-striped table-bordered" id="element-id-2">
                <thead class="thead-dark">
                <tr>
                    <td></td>
                    <th class="day-cell" colspan="15"> Lundi 06 Janvier</th>
                    <th class="day-cell" colspan="15"> Mardi 07 Janvier</th>
                    <th class="day-cell" colspan="15"> Mercredi 08 Janvier</th>
                    <th class="day-cell" colspan="15"> Jeudi 09 Janvier</th>
                    <th class="day-cell" colspan="15"> Vendredi 10 Janvier</th>
                    <th class="day-cell" colspan="15"> Samedi 11 Janvier</th>
                </tr>
                </thead>

                <tbody>

                <tr class="year-cell">
                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>

                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>

                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>

                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>

                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>

                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>
                </tr>

                <tr class="mainGroup-cell">
                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>

                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>

                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>

                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>

                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>

                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>
                </tr>

                <tr class="group-cell">
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                </tr>

                <tr :key="index" v-for="(hour, index) in hours">
                    <th class="hour-cell"> {{ hour }}</th>

                    <td :id="id"
                        :key="val.id"
                        class="board"
                        v-for="val in 89">
                    </td>

                </tr>
                </tbody>
            </table>


            <br>
            <br>
            <br>


            <h1>SEMAINE 3</h1>

            <table class="table table-striped table-bordered" id="element-id-3">
                <thead class="thead-dark">
                <tr>
                    <td></td>
                    <th class="day-cell" colspan="15"> Lundi 13 Janvier</th>
                    <th class="day-cell" colspan="15"> Mardi 14 Janvier</th>
                    <th class="day-cell" colspan="15"> Mercredi 15 Janvier</th>
                    <th class="day-cell" colspan="15"> Jeudi 16 Janvier</th>
                    <th class="day-cell" colspan="15"> Vendredi 17 Janvier</th>
                    <th class="day-cell" colspan="15"> Samedi 18 Janvier</th>
                </tr>
                </thead>

                <tbody>

                <tr class="year-cell">
                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>

                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>

                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>

                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>

                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>

                    <td></td>
                    <th class="year-color" colspan="6"> {{ "INFO 1" }}</th>
                    <th class="year-color" colspan="8"> {{ "INFO 2" }}</th>
                </tr>

                <tr class="mainGroup-cell">
                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>

                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>

                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>

                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>

                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>

                    <td></td>
                    <th :key="mainGroup.id" colspan="2" v-for="mainGroup in mainGroups"> {{ mainGroup }}</th>
                </tr>

                <tr class="group-cell">
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                    <th :key="group.id" v-for="group in groups"> {{ group }}</th>
                </tr>

                <tr :key="index" v-for="(hour, index) in hours">
                    <th class="hour-cell"> {{ hour }}</th>

                    <td :id="id"
                        :key="val.id"
                        class="board"
                        v-for="val in 89">
                    </td>

                </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Tableau',
        props: ['id'],

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

                durees: [{text: '1:30', value: '1:30'}, '3:00', '4:30'],
                tabForOneGroupes: null,
                tabForTwoGroupes: null,
                tabForThreeGroupes: null,
                oneGroup: true,
                twoGroup: false,
                threeGroup: false,
                created: false,
                idCard: 1,
                idType: 0,
                idMatiere: 0,
                idSalle: 0,
                idProf: 0,

                types: ['TD', 'TP', 'CM', 'DS'],
                matieres: null,
                profs: null,
                salles: null,

                groups: [
                    " ", "Groupe 1-A-1", "Groupe 1-A-2", "Groupe 1-B-1", "Groupe 1-B-2", "Groupe 1-C-1", "Groupe 1-C-2",
                    "Groupe 2-A-1", "Groupe 2-A-2", "Groupe 2-B-1", "Groupe 2-B-2", "Groupe 2-C-1", "Groupe 2-C-2",
                    "LP DIOC A", "LP DIOC B"
                ],

                mainGroups: [
                    "Groupe 1-A", "Groupe 1-B", "Groupe 1-C", "Groupe 2-A", "Groupe 2-B", "Groupe 2-C", "LP DIOC"
                ],

                days: [
                    "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"
                ],

                hours: [
                    "8h00", "8h15", "9h45", "10h00", "11h30", "12h30", "12h45", "14h15", "15h45", "16h", "17h30"
                ]
            }
        },
        methods: {
            /*dragStart: e => {
                e.dataTransfer.setData("card_id", e.target.id);

                setTimeout(() => {
                    e.target.style.display = 'none';
                }, 0);
            },

            drop: e => {
                const card_id = e.dataTransfer.getData("card_id");
                const card = document.getElementById(card_id);
                card.style.display = "block";
                e.target.appendChild(card);
            },*/

            onSubmit() {
                let data = require('../data.json');
                let create = true
                let heure = this.form.date + " " + this.form.heure
                let totalGroup = [this.form.groupeOne, this.form.groupeTwo, this.form.groupeThree]
                for (let i = 0; i < totalGroup.length; i++) {
                    if (totalGroup[i] != null) {
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
                            if (data["edt"][j]["heure"] === heure && data["edt"][j]["idgroupe"] === idGroupe) {
                                create = false;
                            }
                            j++
                        }
                        if (create) {
                            let horaire = this.form.heure
                            let row = null
                            if (horaire === '08:15:00') {
                                row = 5
                            } else if (horaire === '10:00:00') {
                                row = 7
                            } else if (horaire === '11:30:00') {
                                row = 8
                            } else if (horaire === '12:45:00') {
                                row = 10
                            } else if (horaire === '14:15:00') {
                                row = 11
                            } else if (horaire === '16:00:00') {
                                row = 13
                            }

                            console.log(totalGroup[i])
                            let cell = null
                            let width = null
                            if (totalGroup[i] === 'groupe 1-A-1') {
                                cell = 1
                                width = 100
                            } else if (totalGroup[i] === 'groupe 1-A-2') {
                                cell = 2
                                width = 100
                            } else if (totalGroup[i] === 'groupe 1-B-1') {
                                cell = 3
                                width = 100
                            } else if (totalGroup[i] === 'groupe 1-B-2') {
                                cell = 4
                                width = 100
                            } else if (totalGroup[i] === 'groupe 1-C-1') {
                                cell = 5
                                width = 100
                            } else if (totalGroup[i] === 'groupe 1-C-2') {
                                cell = 6
                                width = 100
                            } else if (totalGroup[i] === 'groupe 2-A-1') {
                                cell = 7
                                width = 100
                            } else if (totalGroup[i] === 'groupe 2-A-2') {
                                cell = 8
                                width = 100
                            } else if (totalGroup[i] === 'groupe 2-B-1') {
                                cell = 9
                                width = 100
                            } else if (totalGroup[i] === 'groupe 2-B-2') {
                                cell = 10
                                width = 100
                            } else if (totalGroup[i] === 'groupe 2-C-1') {
                                cell = 11
                                width = 100
                            } else if (totalGroup[i] === 'groupe 2-C-2') {
                                cell = 12
                                width = 100
                            } else if (totalGroup[i] === 'LP DIOC A') {
                                cell = 13
                                width = 100
                            } else if (totalGroup[i] === 'LP DIOC B') {
                                cell = 14
                                width = 100
                            } else if (totalGroup[i] === 'INFO 1') {
                                cell = 1
                                width = 608
                            }else if (totalGroup[i] === 'INFO 2') {
                                cell = 7
                                width = 608
                            }else if (totalGroup[i] === 'groupe 1-A') {
                                cell = 1
                                width = 201
                            }
                            else if (totalGroup[i] === 'groupe 1-B') {
                                cell = 3
                                width = 201
                            }else if (totalGroup[i] === 'groupe 1-C') {
                                cell = 5
                                width = 201
                            }else if (totalGroup[i] === 'groupe 2-A') {
                                cell = 7
                                width = 201
                            }else if (totalGroup[i] === 'groupe 2-B') {
                                cell = 9
                                width = 201
                            }else if (totalGroup[i] === 'groupe 2-C') {
                                cell = 11
                                width = 201
                            }else if (totalGroup[i] === 'LP DIOC') {
                                cell = 13
                                width = 201
                            }

                            let height = 0
                            if(this.form.duree === "1:30"){
                                height = 100
                            }else if(this.form.duree === "3:00"){
                                height = 280
                            }else{
                                height = 430
                            }
                            let dataMatiere = require("../matieres.json")
                            let idMat = null
                            for (let i = 0; i < dataMatiere["matieres"].length; i++) {
                                if (dataMatiere["matieres"][i]["nom"] === this.form.matiere) {
                                    idMat = i
                                }
                            }

                            let dataSalle = require("../salles.json")
                            let idSalle = null
                            for (let i = 0; i < dataSalle["salles"].length; i++) {
                                if (dataSalle["salles"][i]["nom"] === this.form.salle) {
                                    idSalle = i
                                }
                            }

                            let dataProf = require("../profs.json")
                            let idProf = null
                            for (let i = 0; i < dataProf["profs"].length; i++) {
                                if (dataProf["profs"][i]["nom"] === this.form.prof) {
                                    idProf = i
                                }
                            }
                            console.log(idMat, idSalle, idProf)

                            this.addCard(2, this.form.type, idMat, idSalle, idProf, row, cell, width, height)
                            let submitId = document.getElementById("form");

                            submitId.addEventListener("click", (event) => {
                                event.preventDefault();
                            });
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
            },


            // Ajout d'une carte dans une cellule précise du tableau
            addCard(table, cours, matiere, salle, prof, row, cell, width, height) {
                let data = require('../data.json');

                // Ajout d'une div qui consitue la carte
                let div = document.createElement("div");

                // Ajoute le bon cours parmis plusieurs pour donner une certaine couleur à la carte
                switch (cours) {
                    case "TD": div.style.backgroundColor = '#fff68f'; break;
                    case "TP": div.style.backgroundColor = '#f0d76f'; break;
                    case "CM": div.style.backgroundColor = '#dbca86'; break;
                    case "DS": div.style.backgroundColor = '#c9bf95'; break;
                    default: div.style.backgroundColor = '#ffb960';
                }

                // div.setAttribute(":id", "card_" + this.idCard++);
                // div.setAttribute("draggable", "true");
                div.setAttribute("class", "card");

                div.style.display = "table";
                div.style.textAlign = "center";
                div.style.width = width + "%";
                div.style.height = height + "%";

                // Ajout d'une deuxième div qui contiendra le texte de la carte
                let div2 = document.createElement("div");

                div2.style.display = "table-cell";
                div2.style.verticalAlign = "middle";
                div.appendChild(div2);

                // Ajout balise span pour styliser le type de cours
                if (cours !== "") {
                    let spanCours = document.createElement("span");
                    spanCours.appendChild(document.createTextNode(cours + " - "))
                    spanCours.style.fontWeight = "bold";
                    spanCours.style.fontSize = "10px";
                    div2.appendChild(spanCours);
                }

                // Ajout balise span pour styliser le nom de la matière
                if (matiere !== "") {
                    let spanMatiere = document.createElement("span");
                    spanMatiere.appendChild(document.createTextNode(data['matieres'][matiere]['nom']));
                    spanMatiere.style.fontWeight = "bold";
                    spanMatiere.style.fontSize = "10px";
                    div2.appendChild(spanMatiere);
                    div2.appendChild(document.createElement("br"));
                }

                // Ajout balise span pour styliser le nom de la salle
                if (salle !== "") {
                    let spanSalle = document.createElement("span");
                    spanSalle.appendChild(document.createTextNode(data['salles'][salle]['nom']));
                    spanSalle.style.fontStyle = "italic";
                    spanSalle.style.fontSize = "11px";
                    spanSalle.style.paddingRight = "14px";
                    div2.appendChild(spanSalle);
                }

                // Ajout balise span pour styliser le nom du prof
                if (prof !== "") {
                    let spanProf = document.createElement("span");
                    spanProf.appendChild(document.createTextNode(data["profs"][prof]["nom"]));
                    spanProf.style.color = '#626cda';
                    spanProf.style.fontSize = "11px";
                    div2.appendChild(spanProf);
                }

                // Position de la carte dans une cellule du tableau
                let element = document.getElementById("element-id-" + table).rows[row].cells[cell];
                element.appendChild(div);
            },
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
        },

        beforeMount() {
            this.getDataByJson();
        },

        mounted() {
            // Semaine 1 - LUNDI
            this.addCard(1, "TP", 10, 10, 23, 5, 1, 100, 100);
            this.addCard(1, "TP", 13, 0, 27, 5, 2, 100, 100);
            this.addCard(1, "TD", 34, 8, 7, 5, 9, 201, 100);
            this.addCard(1, "TD", 9, 18, 30, 5, 13, 201, 100);

            this.addCard(1, "TD", 11, 2, 1, 7, 1, 201, 100);
            this.addCard(1, "TD", 11, 1, 12, 7, 3, 201, 100);
            this.addCard(1, "TP", 13, 0, 27, 7, 5, 100, 100);
            this.addCard(1, "TP", 18, 12, 15, 7, 6, 100, 100);
            this.addCard(1, "TP", 21, 16, 26, 7, 7, 201, 100);
            this.addCard(1, "TP", 34, 8, 7, 7, 9, 201, 100);
            this.addCard(1, "TP", 21, 9, 22, 7, 11, 201, 100);
            this.addCard(1, "TD", 9, 18, 30, 7, 13, 201, 100);

            this.addCard(1, "TD", 12, 3, 31, 10, 1, 201, 100);
            this.addCard(1, "TP", 11, 10, 12, 10, 3, 100, 100);
            this.addCard(1, "TP", 13, 0, 27, 10, 4, 100, 100);
            this.addCard(1, "TD", 35, 2, 5, 10, 5, 201, 100);
            this.addCard(1, "TP", 34, 16, 26, 10, 7, 201, 100);
            this.addCard(1, "TD", 2, 9, 15, 10, 9, 201, 100);
            this.addCard(1, "TD", 19, 4, 28, 10, 11, 201, 100);
            this.addCard(1, "TD", 9, 18, 30, 10, 13, 201, 100);

            this.addCard(1, "TD", 12, 3, 31, 11, 1, 201, 100);
            this.addCard(1, "TD", 35, 2, 5, 11, 3, 201, 100);
            this.addCard(1, "TP", 11, 10, 12, 11, 5, 100, 100);
            this.addCard(1, "TP", 13, 0, 27, 11, 6, 100, 100);
            this.addCard(1, "TD", 34, 16, 26, 11, 7, 201, 100);
            this.addCard(1, "TD", 20, 9, 15, 11, 9, 201, 100);
            this.addCard(1, "TP", 31, 4, 28, 11, 11, 201, 100);
            this.addCard(1, "TD", 9, 18, 30, 11, 13, 201, 100);

            this.addCard(1, "TD", 35, 2, 5, 13, 1, 201, 100);
            this.addCard(1, "TP", 19, 4, 28, 13, 3, 100, 100);
            this.addCard(1, "TP", 18, 10, 15, 13, 4, 100, 100);
            this.addCard(1, "TP", 11, 12, 12, 13, 6, 100, 100);
            this.addCard(1, "TP", 22, 11, 1, 13, 8, 100, 100);
            this.addCard(1, "TP", 21, 9, 7, 13, 9, 201, 100);
            this.addCard(1, "TD", 9, 18, 30, 13, 13, 201, 100);


            // Semaine 1 - MARDI
            this.addCard(1, "TD", 33, 10, 19, 5, 16, 201, 100);
            this.addCard(1, "TP", 13, 0, 27, 5, 18, 100, 100);
            this.addCard(1, "TP", 21, 12, 17, 5, 19, 100, 100);
            this.addCard(1, "TD", 17, 3, 8, 5, 20, 201, 100);
            this.addCard(1, "TD", 2, 8, 15, 5, 22, 201, 100);
            this.addCard(1, "TP", 25, 9, 7, 5, 24, 201, 100);
            this.addCard(1, "TP", 22, 11, 14, 5, 27, 100, 100);
            this.addCard(1, "TD", 9, 18, 30, 5, 28, 201, 100);

            this.addCard(1, "TP", 13, 0, 27, 7, 16, 100, 100);
            this.addCard(1, "TP", 21, 12, 17, 7, 17, 100, 100);
            this.addCard(1, "TP", 11, 13, 12, 7, 18, 100, 100);
            this.addCard(1, "TP", 15, 11, 29, 7, 19, 100, 100);
            this.addCard(1, "TD", 12, 3, 14, 7, 20, 201, 100);
            this.addCard(1, "TP", 26, 1, 16, 7, 22, 201, 100);
            this.addCard(1, "TP", 31, 4, 28, 7, 24, 201, 100);
            this.addCard(1, "TD", 2, 9, 15, 7, 26, 201, 100);
            this.addCard(1, "TD", 9, 18, 30, 7, 28, 201, 100);

            this.addCard(1, "TP", 19, 4, 28, 10, 16, 100, 100);
            this.addCard(1, "TP", 15, 10, 29, 10, 17, 100, 100);
            this.addCard(1, "TD", 12, 3, 31, 10, 18, 201, 100);
            this.addCard(1, "TP", 11, 12, 12, 10, 20, 100, 100);
            this.addCard(1, "TP", 16, 1, 16, 10, 21, 100, 100);
            this.addCard(1, "TP", 23, 8, 4, 10, 22, 201, 100);
            this.addCard(1, "TP", 22, 11, 14, 10, 24, 100, 100);
            this.addCard(1, "TD", 34, 9, 25, 10, 26, 201, 100);
            this.addCard(1, "TD", 9, 18, 30, 10, 28, 201, 100);

            this.addCard(1, "CM", 12, 14, 31, 11, 16, 608, 100);
            this.addCard(1, "TD", 31, 4, 28, 11, 22, 201, 100);
            this.addCard(1, "TP", 26, 1, 16, 11, 24, 201, 100);
            this.addCard(1, "TP", 34, 9, 25, 11, 26, 201, 100);
            this.addCard(1, "TD", 9, 18, 30, 11, 28, 201, 100);

            this.addCard(1, "TD", 12, 3, 31, 13, 18, 201, 100);
            this.addCard(1, "TP", 19, 4, 28, 13, 20, 100, 100);
            this.addCard(1, "TP", 15, 10, 29, 13, 21, 100, 100);
            this.addCard(1, "TP", 3, 8, 8, 13, 22, 201, 100);
            this.addCard(1, "TP", 27, 9, 13, 13, 26, 201, 100);
            this.addCard(1, "TD", 9, 18, 30, 13, 28, 201, 100);


            // Semaine 1 - MERCREDI
            this.addCard(1, "CM", 27, 14, 29, 5, 31, 608, 100);
            this.addCard(1, "TP", 31, 4, 28, 5, 37, 201, 100);
            this.addCard(1, "TP", 3, 8, 8, 5, 39, 201, 100);
            this.addCard(1, "TP", 22, 11, 14, 5, 41, 100, 100);
            this.addCard(1, "DS", 4, 3, 1, 5, 43, 201, 100);

            this.addCard(1, "CM", 17, 14, 8, 7, 31, 608, 100);
            this.addCard(1, "TP", 27, 8, 13, 7, 37, 201, 100);
            this.addCard(1, "TP", 27, 9, 29, 7, 39, 201, 100);
            this.addCard(1, "TP", 23, 16, 12, 7, 41, 201, 100);
            this.addCard(1, "TD", 31, 4, 28, 7, 43, 201, 100);

            this.addCard(1, "TD", 21, 3, 23, 10, 31, 201, 100);
            this.addCard(1, "TD", 33, 8, 24, 10, 33, 201, 100);
            this.addCard(1, "TP", 27, 10, 29, 10, 35, 100, 100);
            this.addCard(1, "TP", 11, 12, 12, 10, 36, 100, 100);
            this.addCard(1, "TP", 21, 9, 7, 10, 39, 201, 100);
            this.addCard(1, "TP", 3, 16, 8, 10, 41, 201, 100);
            this.addCard(1, "TD", 2, 5, 15, 10, 43, 201, 100);

            this.addCard(1, "TD", 17, 3, 8, 11, 31, 201, 100);
            this.addCard(1, "TD", 18, 8, 24, 11, 33, 201, 100);
            this.addCard(1, "TD", 12, 2, 14, 11, 35, 201, 100);
            this.addCard(1, "CM", 25, 14, 23, 11, 37, 608, 100);
            this.addCard(1, "CM", 3, 17, 20, 11, 43, 201, 100);

            this.addCard(1, "TP", 27, 10, 29, 13, 31, 100, 100);
            this.addCard(1, "TP", 18, 12, 15, 13, 32, 100, 100);
            this.addCard(1, "TD", 17, 3, 8, 13, 33, 201, 100);
            this.addCard(1, "TD", 33, 4, 24, 13, 35, 201, 100);
            this.addCard(1, "TP", 22, 11, 14, 13, 40, 100, 100);
            this.addCard(1, "TP", 25, 8, 23, 13, 41, 201, 100);
            this.addCard(1, "CM", 3, 17, 20, 13, 43, 201, 50);
            this.addCard(1, "TD", 3, 17, 20, 13, 43, 201, 50);


            // Semaine 1 - JEUDI
            this.addCard(1, "CM", 11, 14, 1, 5, 46, 608, 100);
            this.addCard(1, "TD", 20, 8, 15, 5, 52, 201, 100);
            this.addCard(1, "TD", 31, 4, 28, 5, 54, 201, 100);
            this.addCard(1, "TP", 26, 1, 16, 5, 56, 201, 100);
            this.addCard(1, "CM", 6, 16, 6, 5, 58, 201, 100);

            this.addCard(1, "TP", 11, 10, 1, 7, 46, 100, 100);
            this.addCard(1, "TP", 16, 1, 16, 7, 47, 100, 100);
            this.addCard(1, "TP", 15, 13, 13, 7, 48, 100, 100);
            this.addCard(1, "TP", 31, 4, 28, 7, 49, 100, 100);
            this.addCard(1, "TD", 11, 3, 12, 7, 50, 200, 100);
            this.addCard(1, "TP", 21, 8, 26, 7, 52, 201, 100);
            this.addCard(1, "TD", 20, 16, 15, 7, 56, 201, 100);
            this.addCard(1, "CM", 6, 6, 6, 7, 58, 201, 100);

            this.addCard(1, "TP", 12, 10, 26, 10, 46, 100, 100);
            this.addCard(1, "TP", 12, 13, 14, 10, 47, 100, 100);
            this.addCard(1, "TP", 12, 12, 31, 10, 48, 100, 100);
            this.addCard(1, "TP", 12, 11, 1, 10, 49, 100, 100);
            this.addCard(1, "TP", 12, 8, 14, 10, 50, 100, 100);
            this.addCard(1, "TP", 12, 9, 21, 10, 51, 100, 100);
            this.addCard(1, "CM", 26, 14, 16, 10, 52, 608, 100);
            this.addCard(1, "CM", 6, 6, 6, 10, 58, 201, 50);
            this.addCard(1, "TD", 6, 6, 6, 10, 58, 201, 50);


            // Semaine 1 - VENDREDI
            this.addCard(1, "TD", 18, 3, 24, 5, 61, 201, 100);
            this.addCard(1, "TP", 16, 1, 16, 5, 65, 100, 100);
            this.addCard(1, "TP", 19, 4, 28, 5, 66, 100, 100);
            this.addCard(1, "TD", 34, 16, 26, 5, 67, 201, 100);
            this.addCard(1, "TD", 22, 9, 18, 5, 73, 201, 100);

            this.addCard(1, "TP", 11, 10, 1, 7, 61, 100, 100);
            this.addCard(1, "TP", 19, 4, 28, 7, 62, 100, 100);
            this.addCard(1, "TP", 21, 12, 11, 7, 63, 100, 100);
            this.addCard(1, "TP", 16, 1, 16, 7, 64, 100, 100);
            this.addCard(1, "TD", 18, 3, 24, 7, 65, 201, 100);
            this.addCard(1, "CM", 29, 14, 18, 7, 67, 608, 100);

            this.addCard(1, "TP", 16, 1, 16, 10, 61, 100, 100);
            this.addCard(1, "TP", 11, 12, 2, 10, 62, 100, 100);
            this.addCard(1, "TD", 21, 3, 11, 10, 63, 201, 100);
            this.addCard(1, "TD", 13, 8, 5, 10, 65, 201, 100);
            this.addCard(1, "TP", 29, 9, 18, 10, 67, 201, 100);
            this.addCard(1, "TP", 21, 16, 22, 10, 71, 201, 100);
            this.addCard(1, "CM", 24, 6, 9, 10, 73, 201, 100);

            this.addCard(1, "TD", 13, 8, 5, 11, 61, 201, 100);
            this.addCard(1, "TP", 16, 1, 16, 11, 63, 100, 100);
            this.addCard(1, "TP", 11, 12, 2, 11, 64, 100, 100);
            this.addCard(1, "TD", 21, 2, 11, 11, 65, 201, 100);
            this.addCard(1, "TP", 23, 6, 1, 11, 69, 201, 100);
            this.addCard(1, "TP", 29, 9, 18, 11, 71, 201, 100);
            this.addCard(1, "CM", 24, 16, 9, 11, 73, 201, 100);

            this.addCard(1, "TD", 13, 8, 5, 13, 63, 201, 100);
            this.addCard(1, "TP", 21, 10, 11, 13, 65, 100, 100);
            this.addCard(1, "TP", 21, 12, 3, 13, 66, 100, 100);
            this.addCard(1, "TP", 22, 11, 0, 13, 67, 100, 100);
            this.addCard(1, "TP", 29, 9, 18, 13, 69, 201, 100);
            this.addCard(1, "CM", 24, 16, 9, 13, 73, 201, 100);


            // Semaine 2 - VENDREDI
            this.addCard(2, "TP", 16, 10, 16, 5, 61, 100, 100);
            this.addCard(2, "TP", 19, 4, 28, 5, 66, 100, 100);
            this.addCard(2, "CM", 34, 14, 7, 5, 67, 608, 100);
            this.addCard(2, "TD", 8, 8, "", 5, 73, 201, 50);

            this.addCard(2, "CM", 11, 14, 1, 7, 61, 608, 100);
            this.addCard(2, "TD", 22, 9, 0, 7, 67, 201, 100);
            this.addCard(2, "TP", 26, 16, 16, 7, 69, 201, 100);
            this.addCard(2, "TD", 31, 4, 28, 7, 71, 201, 100);

            this.addCard(2, "TP", 16, 12, 16, 10, 62, 100, 100);
            this.addCard(2, "TD", 21, 3, 11, 10, 63, 201, 100);
            this.addCard(2, "CM", 21, 14, 22, 10, 67, 608, 100);

            this.addCard(2, "TP", 11, 12, 2, 11, 62, 100, 100);
            this.addCard(2, "TP", 21, 13, 11, 11, 63, 100, 100);
            this.addCard(2, "TP", 11, 11, 12, 11, 66, 100, 100);
            this.addCard(2, "TP", 26, 8, 16, 11, 67, 201, 100);
            this.addCard(2, "TP", 22, 7, 14, 11, 72, 100, 100);

            this.addCard(2, "TD", 8, "", "", 11, 73, 201, 50);
            this.addCard(2, "TP", 21, 10, 3, 13, 66, 100, 100);
            this.addCard(2, "TP", 26, 8, 16, 13, 67, 201, 100);


            // Semaine 3 - LUNDI
            this.addCard(3, "DS", 21, 14, 23, 5, 1, 608, 100);
            this.addCard(3, "TD", 29, 9, 18, 5, 11, 201, 100)

            this.addCard(3, "DS", 11, 14, 1, 7, 1, 608, 100);
            this.addCard(3, "TD", 29, 8, 18, 7, 9, 201, 100);
            this.addCard(3, "TP", 20, 9, 15, 7, 11, 201, 100);

            this.addCard(3, "TP", 19, 4, 28, 10, 1, 100, 100);
            this.addCard(3, "TD", 13, 6, 5, 10, 3, 201, 100);
            this.addCard(3, "TD", 29, 8, 18, 10, 7, 201, 100);
            this.addCard(3, "TD", 2, 16, 15, 10, 9, 201, 100);

            this.addCard(3, "TD", 35, 2, 5, 11, 1, 201, 100);
            this.addCard(3, "TP", 18, 10, 15, 11, 5, 100, 100);
            this.addCard(3, "TP", 19, 4, 28, 11, 6, 100, 100);
            this.addCard(3, "DS", 23, 14, 4, 11, 7, 608, 100);

            this.addCard(3, "TD", 13, 8, 5, 13, 1, 201, 100);
            this.addCard(3, "", 36, "", "", 13, 7, 608, 100);


            // Semaine 3 - MARDI
            this.addCard(3, "", 37, 16, "", 5, 16, 201, 100);
            this.addCard(3, "", 37, 8, "", 5, 18, 201, 100);
            this.addCard(3, "", 37, 9, "", 5, 20, 201, 100);
            this.addCard(3, "DS", 21, 14, 22, 5, 22, 608, 100);

            this.addCard(3, "DS", 12, 14, 31, 7, 16, 608, 100);
            this.addCard(3, "CM", 29, 15, 18, 7, 22, 608, 100);

            this.addCard(3, "", 36, "", "", 10, 16, 608, 100);
            this.addCard(3, "TD", 32, 2, 10, 10, 24, 201, 100);
            this.addCard(3, "TP", 29, 9, 18, 10, 26, 201, 100);

            this.addCard(3, "", 36, "", "", 11, 16, 608, 100);
            this.addCard(3, "TD", 32, 3, 10, 11, 22, 201, 100);
            this.addCard(3, "TP", 29, 8, 18, 11, 24, 201, 100);

            this.addCard(3, "", 36, "", "", 13, 16, 608, 100);
            this.addCard(3, "TP", 29, 9, 18, 13, 22, 201, 100);
            this.addCard(3, "TD", 32, 3, 10, 13, 26, 201, 100);


            // Semaine 3 - MERCREDI
            this.addCard(3, "CM", 34, 14, 26, 5, 37, 608, 100);

            this.addCard(3, "TD", 27, 8, 29, 7, 31, 201, 100);
            this.addCard(3, "TD", 27, 9, 13, 7, 33, 201, 100);
            this.addCard(3, "TD", 27, 16, 0, 7, 35, 201, 100);
            this.addCard(3, "DS", 25, 14, 23, 7, 37, 608, 100);

            this.addCard(3, "", 0, "", "", 10, 31, 608, 506);
            this.addCard(3, "TD", 27, 8, 29, 10, 37, 201, 100);
            this.addCard(3, "TD", 27, 9, 13, 10, 39, 201, 100);
            this.addCard(3, "TD", 27, 16, 0, 10, 41, 201, 100);

            this.addCard(3, "", 36, "", "", 11, 37, 201, 100);

            this.addCard(3, "", 36, "", "", 12, 37, 201, 100);
        }
    }
</script>

<style>
    .card {
        cursor: pointer;
        opacity: 1;
        font-size: 11px;
        white-space: normal;
    }

    .card:hover {
        opacity: 0.45;
        border-color: black;
        border-width: 2px;
    }

    .board {
        width: 0;
        height: 0;
        margin: 0;
        padding: 0
    }

    .table td {
        padding: 0;
        margin: 0;
    }

    .table th {
        margin: 0;
    }

    .year-color {
        color: #626cda;
    }

    .day-cell {
        font-size: 17px;
        text-align: center;
    }

    .year-cell {
        text-align: center;
        font-weight: bold;
        font-size: 15px;
    }

    .mainGroup-cell {
        font-size: 12px;
        text-align: center;
    }

    .group-cell {
        text-align: center;
        font-weight: bold;
        font-size: 11px;
        white-space: nowrap;
    }

    .hour-cell {
        font-size: 11px;
        left: 0;
        position: sticky;
        text-align: center;
        display: table-cell;
        z-index: 1;
        background-color: whitesmoke;
    }
</style>
