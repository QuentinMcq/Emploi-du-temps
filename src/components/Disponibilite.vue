<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col col lg="9">
        <b-form id="form">
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
          <b-button
            v-b-modal.modal-1
            type="submit"
            variant="primary"
            @click="onSubmit"
            >Rechercher</b-button
          >
        </b-form>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col col lg="5">
        <h3>Professeurs disponible</h3>
        <ul>
          <li v-for="prof in profsDispo" :key="prof">
            {{ prof }}
          </li>
        </ul>
      </b-col>
      <b-col col lg="5">
        <h3>Salles disponible</h3>
        <ul>
          <li v-for="salle in sallesDispo" :key="salle">
            {{ salle }}
          </li>
        </ul>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Disponibilite',
  data() {
    return {
      form: {
        date: '',
        heure: ''
      },
      sallesDispo: [],
      profsDispo: []
    };
  },
  methods: {
    getData() {
      this.profsDispo = [];
      this.sallesDispo = [];
      let data = require('../data.json');
      let heure = this.form.date + ' ' + this.form.heure;

      let profsAbsent = [];
      let sallesAbsent = [];

      for (let i = 0; i < data['edt'].length; i++) {
        if (data['edt'][i]['heure'] === heure) {
          profsAbsent.push(data['edt'][i]['idprof']);
          sallesAbsent.push(data['edt'][i]['idsalle']);
        }
      }

      let profsDispo = [];
      let sallesDispo = [];
      let dispo = true;
      dispo = true;
      for (let i = 0; i < data['profs'].length; i++) {
        dispo = true;
        for (let j = 0; j < profsAbsent.length; j++) {
          if (data['profs'][i]['id'] === profsAbsent[j]) {
            dispo = false;
          }
        }
        if (dispo) {
          profsDispo.push(data['profs'][i]['nom']);
        }
      }

      for (let i = 0; i < data['salles'].length; i++) {
        dispo = true;
        for (let j = 0; j < sallesAbsent.length; j++) {
          if (data['salles'][i]['id'] === sallesAbsent[j]) {
            dispo = false;
          }
        }
        if (dispo) {
          sallesDispo.push(data['salles'][i]['nom']);
        }
      }

      this.profsDispo = profsDispo;
      this.sallesDispo = sallesDispo;
    },

    onSubmit() {
      this.getData();

      let submitId = document.getElementById('form');

      submitId.addEventListener('click', (event) => {
        event.preventDefault();
      });
    }
  }
};
</script>
