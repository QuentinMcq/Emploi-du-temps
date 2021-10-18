<template>
  <div>
    <b-container>
      <b-button v-if="!created" variant="success" @click="create">+ </b-button>
      <b-button v-if="created" variant="danger" @click="create">- </b-button>
    </b-container>
    <b-container v-if="created">
      <b-row class="justify-content-md-center">
        <b-col col lg="9">
          <b-form @submit="onSubmit">
            <!--Créneau du cours (date)-->
            <b-form-group
              id="input-group-heure"
              label="Créneau du cours:"
              label-for="input-heure"
            >
              <b-form-datepicker
                id="input-date"
                v-model="form.date"
                class="mb-2"
                placeholder="Choisissez une date"
                required
              ></b-form-datepicker>
            </b-form-group>

            <!--Créneau du cours (heure)-->
            <b-input-group class="mb-3">
              <b-form-input
                id="example-input"
                v-model="form.heure"
                pattern="[0-9][0-9]:[0-9][0-9]:[0-9][0-9]"
                placeholder="Choisissez une heure HH:mm:ss"
                required
                type="text"
              ></b-form-input>
              <b-input-group-append>
                <b-form-timepicker
                  v-model="form.heure"
                  aria-controls="example-input"
                  button-only
                  locale="fr"
                  right
                ></b-form-timepicker>
              </b-input-group-append>
            </b-input-group>

            <br />
            <!--Time-->
            <b-form-group
              id="input-group-time"
              label="Durée du cours"
              label-for="input-time"
            >
              <b-form-select
                id="input-time"
                v-model="form.duree"
                :options="durees"
              ></b-form-select>
            </b-form-group>

            <br />
            <!--Type de cours-->
            <b-form-group
              id="input-group-type"
              label="Type de cours:"
              label-for="input-type"
            >
              <b-form-select
                id="input-type"
                v-model="form.type"
                :options="types"
                required
              ></b-form-select>
            </b-form-group>

            <br />
            <!--Matière-->
            <b-form-group
              id="input-group-matiere"
              label="Matière:"
              label-for="input-matiere"
            >
              <b-form-select
                id="input-matiere"
                v-model="form.matiere"
                :options="matieres"
                required
              ></b-form-select>
              <b-form-input
                v-if="form.matiere === 'Autre cours'"
                v-model="form.matiere_autre"
                placeholder="Autre"
                required
                style="margin-top: 1%"
              ></b-form-input>
            </b-form-group>

            <br />

            <!--Groupe-->
            <b-form-group
              id="input-group-groupe"
              label="Groupe:"
              label-for="input-groupe"
            >
              <b-form-select
                id="input-groupe"
                v-model="form.groupeOne"
                :options="tabForOneGroupes"
                required
              ></b-form-select>
              <b-form-select
                v-if="twoGroup"
                id="input-groupe"
                v-model="form.groupeTwo"
                :options="tabForTwoGroupes"
                required
                style="margin-top: 1%"
              ></b-form-select>
              <b-form-select
                v-if="threeGroup"
                id="input-groupe"
                v-model="form.groupeThree"
                :options="tabForThreeGroupes"
                required
                style="margin-top: 1%"
              ></b-form-select>
            </b-form-group>

            <!-- One Group -->
            <b-button
              v-if="oneGroup & !twoGroup & !threeGroup"
              variant="warning"
              @click="TwoGroup"
            >
              Ajouter un autre groupe
            </b-button>

            <!-- Two Group -->
            <b-button
              v-if="oneGroup & twoGroup & !threeGroup"
              variant="warning"
              @click="ThreeGroup"
            >
              Ajouter un autre groupe
            </b-button>

            <b-button
              v-if="oneGroup & twoGroup & !threeGroup"
              style="margin-left: 1%"
              variant="danger"
              @click="OneGroup"
            >
              Supprimer le 2ème groupe
            </b-button>

            <!-- Three Group -->
            <b-button
              v-if="oneGroup & twoGroup & threeGroup"
              variant="danger"
              @click="TwoGroup"
            >
              Supprimer le 3ème groupe
            </b-button>
            <br />
            <!--Professeur-->
            <b-form-group
              id="input-group-prof"
              label="Professeur:"
              label-for="input-prof"
            >
              <b-form-select
                id="input-prof"
                v-model="form.prof"
                :options="profs"
                required
              ></b-form-select>
            </b-form-group>

            <br />
            <!--Salle-->
            <b-form-group
              id="input-group-salle"
              label="Salle:"
              label-for="input-salle"
            >
              <b-form-select
                id="input-salle"
                v-model="form.salle"
                :options="salles"
                required
              ></b-form-select>
            </b-form-group>

            <br />

            <b-button v-b-modal.modal-1 type="submit" variant="primary"
              >Créer</b-button
            >
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Tableau from './Tableau';

export default {
  name: 'AjoutCreneau',
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
      created: false
    };
  },
  beforeMount() {
    this.getDataByJson();
  },
  methods: {
    getDataByJson() {
      let data = require('../data.json');
      let matieres = [];
      let profs = [];
      let groupes = [];
      let salles = [];

      for (let i = 0; i < data['matieres'].length; i++) {
        matieres.push(data['matieres'][i]['nom']);
      }

      for (let i = 0; i < data['profs'].length; i++) {
        profs.push(data['profs'][i]['nom']);
      }
      for (let i = 0; i < data['groupes'].length; i++) {
        groupes.push(data['groupes'][i]['nom']);
      }
      for (let i = 0; i < data['salles'].length; i++) {
        salles.push(data['salles'][i]['nom']);
      }

      this.matieres = [...matieres, 'Autre cours'];
      this.profs = profs;
      this.tabForOneGroupes = groupes;
      this.tabForTwoGroupes = groupes;
      this.tabForThreeGroupes = groupes;
      this.backGroupes = groupes;
      this.salles = salles;
    },

    onSubmit() {
      let data = require('../data.json');
      let create = true;
      let heure = this.form.date + ' ' + this.form.heure;
      let textForJson;
      let textForModal;
      let totalGroup = [
        this.form.groupeOne,
        this.form.groupeTwo,
        this.form.groupeThree
      ];
      for (let i = 0; i < totalGroup.length; i++) {
        if (totalGroup[i] !== null) {
          textForModal =
            this.form.matiere +
            ' le ' +
            this.form.date +
            ' à ' +
            this.form.heure +
            ' pour ' +
            totalGroup[i];
          let idGroupe;
          let trouve = false;
          let j = 0;
          while (j < data['groupes'].length && !trouve) {
            if (data['groupes'][j]['nom'] === totalGroup[i]) {
              trouve = true;
              idGroupe = data['groupes'][j]['id'];
            }
            j++;
          }
          j = 0;
          while (j < data['edt'].length && create) {
            if (
              data['edt'][j]['heure'] === heure &&
              data['edt'][j]['idgroupe'] === idGroupe
            ) {
              create = false;
            }
            j++;
          }
          if (create) {
            if (this.form.matiere_autre !== null) {
              textForJson =
                '{"heure":"' +
                heure +
                '","type":"' +
                this.form.type +
                '","matiere":"' +
                this.form.matiere_autre +
                '","groupe":"' +
                totalGroup[i] +
                '","prof":"' +
                this.form.prof +
                '","salle":"' +
                this.form.salle +
                '"}';
            } else {
              textForJson =
                '{"heure":"' +
                heure +
                '","type":"' +
                this.form.type +
                '","matiere":"' +
                this.form.matiere +
                '","groupe":"' +
                totalGroup[i] +
                '","prof":"' +
                this.form.prof +
                '","salle":"' +
                this.form.salle +
                '"}';
            }

            //Tableau.methods.addCard(this.form.matiere, this.form.salle, this.form.prof, this.form.type, 1, 3)
            Tableau.methods.addCard(
              data['matieres'][0]['nom'] + ' ',
              data['salles'][6]['nom'] + ' | ',
              data['profs'][0]['nom'],
              'CM',
              2,
              3
            );

            return confirm('Do you want confirm this form ?');
          } else {
            textForModal += ': UN COURS EST DEJA PROGRAMME A CET HORAIRE \n';
            alert(textForModal);
          }
        }
      }
    },

    OneGroup() {
      this.oneGroup = true;
      this.twoGroup = false;
      this.threeGroup = false;
      if (this.form.groupeTwo != null) {
        this.tabForOneGroupes.push(this.form.groupeTwo);
      }
      this.groupes = this.backGroupes;
      this.form.groupeTwo = null;
    },

    TwoGroup() {
      this.oneGroup = true;
      this.twoGroup = true;
      this.threeGroup = false;
      if (this.form.groupeThree != null) {
        this.tabForTwoGroupes.push(this.form.groupeThree);
      }
      this.tabForTwoGroupes = this.tabForOneGroupes.filter(
        (item) => item !== this.form.groupeOne
      );
      this.form.groupeThree = null;
    },

    ThreeGroup() {
      this.oneGroup = true;
      this.twoGroup = true;
      this.threeGroup = true;
      this.tabForThreeGroupes = this.tabForTwoGroupes.filter(
        (item) => item !== this.form.groupeTwo
      );
    },

    create() {
      this.created = !this.created;
    }
  }
};
</script>

<style scoped>
button {
  margin-bottom: 50px;
}
</style>
