const data = [];
let months = [];
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let counter = null;
let currentSelection;


document.getElementById("visibleFileUpload").addEventListener("click", function () {
  document.getElementById("realFileUpload").click();
});

const input = document.getElementById("realFileUpload");

input.addEventListener("change", (event) => {
  document.getElementById("grid").innerHTML = "";
  months = [];

  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    const csvData = event.target.result;
    const lines = csvData.split("\n");

    for (const line of lines) {
      const row = line.split(",");
      data.push(row);
    }

    
    document.getElementById('monthSelect').style.display = 'flex';
    document.getElementById('search').style.display = 'flex';
    document.getElementById('visibleFileUpload').style.display = 'none';


    for (i = 0; i < data.length; i++) {
      if (i !== 0) {
        if (data[i].length !== 1) {
          let monthIdentifier =
            data[i][1].split(" ")[1] + ", " + data[i][0].split("-")[0];

          if (!months.includes(monthIdentifier)) {
            months.push(monthIdentifier); console.log(months)
          }
        }
      }
    }
    applyDropdown()
    applySearch()

    const currentDate = new Date();
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    currentSelection = month + ", " + year;

    showMonth(month, year);
  };

  reader.readAsText(file);
});

function showMonth(month, year, searchTerm) {

  // Clears 
  document.getElementById("grid").innerHTML = "";
  document.getElementById("search").textContent = "";
  counter = null;

  
  if (month === "All time") {

    document.getElementById('monthSelect').querySelector('#month').textContent = "All time";
    document.getElementById('monthSelect').querySelector('#year').textContent = "";

    for (i = 0; i < data.length; i++) {
  
      // Checks to ensure proper data
      if (i !== 0) {
        if (data[i].length !== 1) {
  
          if (data[i][1]) {
            const grid = document.getElementById("grid");
  
            if (counter === null) {
              counter = Number(data[i][0].split('-')[2]);
            }
  
            if (Number(data[i][0].split('-')[2]) === counter) {
              console.log(counter)
              counter--;
            } else {
              console.error(counter)
  
              console.log(
                "Current: " + Number(data[(i - 1)][0].split('-')[2]) +
                " Next: " + Number(data[i][0].split('-')[2]) +
                " Steps: " + ((Number(data[(i - 1)][0].split('-')[2]) - Number(data[i][0].split('-')[2])) - 1)
              );
  
              for (j = ((Number(data[(i - 1)][0].split('-')[2]) - Number(data[i][0].split('-')[2])) - 1); j > 0; j--) {
  
                let missingCell = document.createElement("div");
                missingCell.classList.add("missingCell");
  
                grid.insertBefore(missingCell, grid.firstChild);
  
                counter--;
  
              }
              counter--;
  
            }
  
            let dataArray = data[i];
  
            let newCell = document.createElement("div");
            newCell.classList.add("cell");
            newCell.classList.add(data[i][4]);
  
            if (newCell.classList.contains("undefined")) {
              newCell.remove();
            }
  
          
  
  
            newCell.addEventListener("mouseenter", function (e) {
  
              const details = document.getElementById("details");
              details.style.opacity = "1";
              details.style.left = `${e.clientX}px`;
              details.style.top = `${e.clientY}px`;
  
              details.querySelector("#time").textContent =
                dataArray[1] + " " + dataArray[2] + ", " + dataArray[3];
  
              details
                .querySelector("#emoji")
                .querySelector("img")
                .setAttribute("src", "" + dataArray[4] + ".png");
              details.querySelector("#emoji").className = "";
              details.querySelector("#emoji").classList.add(dataArray[4] + "BG");
  
              details.querySelector("#activities").textContent = dataArray[5]
                .split(" | ")
                .join(", ");
  
              if (dataArray[7] === '""\r' || dataArray[7] === undefined) {
                details.querySelector("#note").textContent = "No note.";
                details.querySelector("#note").style.textDecoration = "italic";
                details.querySelector("#note").style.opacity = 0.5;
              } else {
                details.querySelector("#note").textContent = dataArray[7].replace(
                  /\r/g,
                  ""
                );
  
                if (
                  dataArray[7]
                    .replace(/\r/g, "")
                    .charAt(dataArray[7].replace(/\r/g, "").length - 1) === `"`
                ) {
                  details.querySelector("#note").textContent = dataArray[7].replace(
                    /\r/g,
                    ""
                  );
                } else {
                  details.querySelector("#note").textContent =
                    dataArray[7].replace(/\r/g, "") + `"`;
                }
  
                details.querySelector("#note").style.textDecoration = "";
                details.querySelector("#note").style.opacity = 1;
              }
            });
  
            newCell.addEventListener("mouseleave", function (e) {
              details.style.opacity = "0";
            });
  
            
            if (searchTerm) {
              if (
                dataArray[0].toLowerCase().includes(searchTerm) || 
                dataArray[1].toLowerCase().includes(searchTerm) || 
                dataArray[2].toLowerCase().includes(searchTerm) || 
                dataArray[3].toLowerCase().includes(searchTerm) || 
                dataArray[4].toLowerCase().includes(searchTerm) || 
                dataArray[5].toLowerCase().includes(searchTerm) || 
                dataArray[7].toLowerCase().includes(searchTerm)) 
                {
  
              }else {
                newCell.style.opacity = 0.2
              }
            }
  
  
            grid.insertBefore(newCell, grid.firstChild);
          }
  
        }
      }
    }

  } else {
    document.getElementById('monthSelect').querySelector('#month').textContent = currentSelection.split(', ')[0] + ','
    document.getElementById('monthSelect').querySelector('#year').textContent = currentSelection.split(', ')[1]
  
    for (i = 0; i < data.length; i++) {
  
      // Checks to ensure proper data
      if (i !== 0) {
        if (data[i].length !== 1) {
  
          if (data[i][1].includes(month) && data[i][0].includes(year)) {
            const grid = document.getElementById("grid");
  
            if (counter === null) {
              counter = Number(data[i][0].split('-')[2]);
            }
  
            if (Number(data[i][0].split('-')[2]) === counter) {
              console.log(counter)
              counter--;
            } else {
              console.error(counter)
  
              console.log(
                "Current: " + Number(data[(i - 1)][0].split('-')[2]) +
                " Next: " + Number(data[i][0].split('-')[2]) +
                " Steps: " + ((Number(data[(i - 1)][0].split('-')[2]) - Number(data[i][0].split('-')[2])) - 1)
              );
  
              for (j = ((Number(data[(i - 1)][0].split('-')[2]) - Number(data[i][0].split('-')[2])) - 1); j > 0; j--) {
  
                let missingCell = document.createElement("div");
                missingCell.classList.add("missingCell");
  
                grid.insertBefore(missingCell, grid.firstChild);
  
                counter--;
  
              }
              counter--;
  
            }
  
            let dataArray = data[i];
  
            let newCell = document.createElement("div");
            newCell.classList.add("cell");
            newCell.classList.add(data[i][4]);
  
            if (newCell.classList.contains("undefined")) {
              newCell.remove();
            }
  
          
  
  
            newCell.addEventListener("mouseenter", function (e) {
  
              const details = document.getElementById("details");
              details.style.opacity = "1";
              details.style.left = `${e.clientX}px`;
              details.style.top = `${e.clientY}px`;
  
              details.querySelector("#time").textContent =
                dataArray[1] + " " + dataArray[2] + ", " + dataArray[3];
  
              details
                .querySelector("#emoji")
                .querySelector("img")
                .setAttribute("src", "" + dataArray[4] + ".png");
              details.querySelector("#emoji").className = "";
              details.querySelector("#emoji").classList.add(dataArray[4] + "BG");
  
              details.querySelector("#activities").textContent = dataArray[5]
                .split(" | ")
                .join(", ");
  
              if (dataArray[7] === '""\r' || dataArray[7] === undefined) {
                details.querySelector("#note").textContent = "No note.";
                details.querySelector("#note").style.textDecoration = "italic";
                details.querySelector("#note").style.opacity = 0.5;
              } else {
                details.querySelector("#note").textContent = dataArray[7].replace(
                  /\r/g,
                  ""
                );
  
                if (
                  dataArray[7]
                    .replace(/\r/g, "")
                    .charAt(dataArray[7].replace(/\r/g, "").length - 1) === `"`
                ) {
                  details.querySelector("#note").textContent = dataArray[7].replace(
                    /\r/g,
                    ""
                  );
                } else {
                  details.querySelector("#note").textContent =
                    dataArray[7].replace(/\r/g, "") + `"`;
                }
  
                details.querySelector("#note").style.textDecoration = "";
                details.querySelector("#note").style.opacity = 1;
              }
            });
  
            newCell.addEventListener("mouseleave", function (e) {
              details.style.opacity = "0";
            });
  
            
            if (searchTerm) {
              if (
                dataArray[0].toLowerCase().includes(searchTerm) || 
                dataArray[1].toLowerCase().includes(searchTerm) || 
                dataArray[2].toLowerCase().includes(searchTerm) || 
                dataArray[3].toLowerCase().includes(searchTerm) || 
                dataArray[4].toLowerCase().includes(searchTerm) || 
                dataArray[5].toLowerCase().includes(searchTerm) || 
                dataArray[7].toLowerCase().includes(searchTerm)) 
                {
  
              }else {
                newCell.style.opacity = 0.2
              }
            }
  
  
            grid.insertBefore(newCell, grid.firstChild);
          }
  
        }
      }
    }
  }


}

function applyDropdown() {
  const dropdown = document.getElementById("monthDropdown");
  dropdown.innerHTML = "";

  document.getElementById("monthSelect").addEventListener("click", function () {
    if (document.getElementById("monthDropdown").style.display === "flex") {
      dropdown.style.display = "none";
      dropdown.innerHTML = "";
    } else {
      for (i = 0; i < months.length; i++) {

        let option = document.createElement("div");
        option.classList.add("dropdownOption");
        option.setAttribute('id', months[i]);

        let monthText = document.createElement('p');
        monthText.textContent = months[i].split(', ')[0] + ", ";

        let yearText = document.createElement('p');
        yearText.classList.add('yearText');
        yearText.textContent = months[i].split(', ')[1];

        option.appendChild(monthText);
        option.appendChild(yearText);

        option.addEventListener("click", function () {
          currentSelection = option.getAttribute('id');
          showMonth(option.getAttribute('id').split(', ')[0], option.getAttribute('id').split(', ')[1]);

          dropdown.style.display = "none";
          dropdown.innerHTML = "";
          
        });

        dropdown.insertBefore(option, dropdown.firstChild);

      }

      let allOption = document.createElement('div');
      allOption.classList.add("dropdownOption", "allDrop");
      allOption.setAttribute('id', 'all');
      
      let allText = document.createElement('p');
      allText.textContent = "All time";
      
      allOption.appendChild(allText);
      
      allOption.addEventListener("click", function () {
        currentSelection = "All time";
        showMonth("All time");

        dropdown.style.display = "none";
        dropdown.innerHTML = "";
      });

      dropdown.appendChild(allOption);

      dropdown.style.display = "flex";
    }
  });
}

function applySearch() {
  const searchBar = document.getElementById("search");

  searchBar.addEventListener("input", function () {
    const searchTerm = searchBar.value.toLowerCase();

    showMonth(currentSelection.split(', ')[0], currentSelection.split(', ')[1], searchTerm)
  });

}