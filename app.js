const $searchInput = document.getElementById('searchInput');
const $table = document.getElementById('table');

async function fetchData() {
    const date = new Date();
    const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${date.getFullYear()}/${$searchInput.value}`);
    const data = await res.json();
    console.log(data);
    data.map(item => {
        const tableItem = document.createElement("tr");
        tableItem.innerHTML = `
        <td>${item.localName}</td>
        <td>${item.name}</td>
        <td>${item.date}</td>
        <td>${item.countryCode}</td>
        `
        $table.appendChild(tableItem);
    });
  }

  $searchInput.addEventListener('change', () => {
    $table.innerHTML = '';
    fetchData();
  })