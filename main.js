class Data {
  constructor() {
    this.data = [];
  }

  addData(name, age, budget) {
    this.data.push({ name, age, budget });
  }

  getAgeAverage() {
    const ageSum = this.data.reduce((total, current) => total + current.age, 0);
    return ageSum / this.data.length;
  }

  getBudgetAverage() {
    const budgetSum = this.data.reduce(
      (total, current) => total + current.budget,
      0
    );
    return budgetSum / this.data.length;
  }
}

class FormHandler {
  constructor(
    formElement,
    dataTableElement,
    ageAverageElement,
    budgetAverageElement
  ) {
    this.form = formElement;
    this.dataTable = dataTableElement;
    this.ageAverage = ageAverageElement;
    this.budgetAverage = budgetAverageElement;
    this.data = new Data();
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    // mendapatkan nilai input
    const name = this.form.elements["name"].value;
    const age = parseInt(this.form.elements["age"].value);
    const budget = parseInt(this.form.elements["budget"].value);

    // menambahkan data ke array data
    this.data.addData(name, age, budget);

    // menampilkan data pada tabel
    this.dataTable.innerHTML += `
      <tr>
        <td>${name}</td>
        <td>${age}</td>
        <td>Rp${budget.toLocaleString()}</td>
      </tr>
    `;

    // menghitung rata-rata umur dan budget
    const ageAvg = await this.getAgeAverage();
    const budgetAvg = await this.getBudgetAverage();

    // menampilkan rata-rata umur dan budget
    this.ageAverage.textContent = `${ageAvg.toFixed(1)} tahun`;
    this.budgetAverage.textContent = `Rp${budgetAvg.toLocaleString()}`;

    // reset form
    this.form.reset();
  };

  getAgeAverage() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const ageAvg = this.data.getAgeAverage();
        resolve(ageAvg);
      }, 100);
    });
  }

  getBudgetAverage() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const budgetAvg = this.data.getBudgetAverage();
        resolve(budgetAvg);
      }, 100);
    });
  }

  init() {
    // event listener untuk form submit
    this.form.addEventListener("submit", this.handleSubmit);
  }
}

// membuat objek FormHandler
const formHandler = new FormHandler(
  document.getElementById("form"),
  document.getElementById("data-table"),
  document.querySelector(".age"),
  document.querySelector(".budget")
);

// menginisialisasi FormHandler
formHandler.init();

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
