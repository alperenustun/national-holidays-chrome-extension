const $searchInput = document.getElementById("searchInput");
const $table = document.getElementById("table");
const $searchWarning = document.getElementById("searchWarning");

async function fetchData() {
  const date = new Date();
  const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${date.getFullYear()}/${$searchInput.value}`);
  console.log(res);
  if(res.status !== 200 && $searchInput.value === ''){
    $table.innerHTML = '';
    $searchWarning.innerHTML = '';
  } else if(res.status !== 200){
    $searchWarning.innerHTML = `I can't find your country (${res.status})`
  } else {
    $searchWarning.innerHTML = ''
    const data = await res.json();
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
}

$searchInput.addEventListener("change", () => {
  $table.innerHTML = "";
  fetchData();
});
