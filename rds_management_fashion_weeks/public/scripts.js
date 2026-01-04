/*
 * These functions below are for various webpage functionalities. 
 * Each function serves to process data on the frontend:
 *      - Before sending requests to the backend.
 *      - After receiving responses from the backend.
 * 
 * To tailor them to your specific needs,
 * adjust or expand these functions to match both your 
 *   backend endpoints 
 * and 
 *   HTML structure.
 * 
 */



// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection', {
        method: "GET"
    });

    // Hide the loading GIF once the response is received.
    loadingGifElem.style.display = 'none';
    // Display the statusElem's text in the placeholder.
    statusElem.style.display = 'inline';

    response.text()
    .then((text) => {
        statusElem.textContent = text;
    })
    .catch((error) => {
        statusElem.textContent = 'connection timed out';  // Adjust error handling if required.
    });
}

// Fetches data from the demotable and displays it.
// async function fetchAndDisplayUsers() {
//     const tableElement = document.getElementById('demotable');
//     const tableBody = tableElement.querySelector('tbody');

//     const response = await fetch('/demotable', {
//         method: 'GET'
//     });

//     const responseData = await response.json();
//     const demotableContent = responseData.data;

//     // Always clear old, already fetched data before new fetching process.
//     if (tableBody) {
//         tableBody.innerHTML = '';
//     }

//     demotableContent.forEach(user => {
//         const row = tableBody.insertRow();
//         user.forEach((field, index) => {
//             const cell = row.insertCell(index);
//             cell.textContent = field;
//         });
//     });
// }

// Fetches data from the collections and displays it.
async function fetchAndDisplayCollections() {
    const tableElement = document.getElementById('collections');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/collections', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}





// Calls function below
document.addEventListener("DOMContentLoaded", function() {
    CollectionProjection();
});


// Applies projection to Collections table
function CollectionProjection() {
    // Year
    var yearChecked = document.getElementById("col-year").checked;
    var yearHeader = document.getElementById("yearId");

    document.getElementById("col-year").addEventListener("change", function() {
        yearChecked = this.checked;
    });

    document.getElementById("submitProjection").addEventListener("click", function() {
        buttonPressed = true;
      
        if (yearChecked && buttonPressed) {
            // do nothing
        } else {
            // we want this column to disappear if it hasn't been checked;
            yearHeader.style.display = 'none';

            // get position of the Year column in table (year col is 0)
            var yearColIndex = yearHeader.cellIndex;

            // for each row in this col, make it invisible
            document.querySelectorAll("#collections tbody tr").forEach(row => {
                row.cells[yearColIndex].style.display = "none";
            })
        }
    });




    // Season
    var seasonChecked = document.getElementById("col-season").checked;
    var seasonHeader = document.getElementById("seasonId");

    document.getElementById("col-season").addEventListener("change", function() {
        seasonChecked = this.checked;
    });

    document.getElementById("submitProjection").addEventListener("click", function() {
        buttonPressed = true;
    
        if (seasonChecked && buttonPressed) {
        } else {
            seasonHeader.style.display = 'none';

            var seasonColIndex = seasonHeader.cellIndex;

            document.querySelectorAll("#collections tbody tr").forEach(row => {
                row.cells[seasonColIndex].style.display = "none";
            })
        }
    });



    // Name
    var nameChecked = document.getElementById("col-name").checked;
    var nameHeader = document.getElementById("nameId");

    document.getElementById("col-name").addEventListener("change", function() {
        nameChecked = this.checked;
    });

    document.getElementById("submitProjection").addEventListener("click", function() {
        buttonPressed = true;
        
        if (nameChecked && buttonPressed) {
            //
        } else {
            nameHeader.style.display = 'none';

            var nameColIndex = nameHeader.cellIndex;
            
            document.querySelectorAll("#collections tbody tr").forEach(row => {
                row.cells[nameColIndex].style.display = "none";
            })
        }
    });



    // Items
    var itemChecked = document.getElementById("col-items").checked;
    var itemHeader = document.getElementById("itemId");

    document.getElementById("col-items").addEventListener("change", function() {
        itemChecked = this.checked;
    });

    document.getElementById("submitProjection").addEventListener("click", function() {
        buttonPressed = true;
        
        if (itemChecked && buttonPressed) {
            //
        } else {
            itemHeader.style.display = 'none';

            var itemColIndex = itemHeader.cellIndex;
            
            document.querySelectorAll("#collections tbody tr").forEach(row => {
                row.cells[itemColIndex].style.display = "none";
            })
        }
    });


    // Shows
    var showsChecked = document.getElementById("col-showId").checked;
    var showsHeader = document.getElementById("showId");

    document.getElementById("col-showId").addEventListener("change", function() {
        showsChecked = this.checked;
    });

    document.getElementById("submitProjection").addEventListener("click", function() {
        buttonPressed = true;
        
        if (showsChecked && buttonPressed) {
            //
        } else {
            showsHeader.style.display = 'none';

            var showsColIndex = showsHeader.cellIndex;
            
            document.querySelectorAll("#collections tbody tr").forEach(row => {
                row.cells[showsColIndex].style.display = "none";
            })
        }
    });



    // LegalName
    var legalNameChecked = document.getElementById("col-legalName").checked;
    var legalNameHeader = document.getElementById("legalNameId");

    document.getElementById("col-legalName").addEventListener("change", function() {
        legalNameChecked = this.checked;
    });

    document.getElementById("submitProjection").addEventListener("click", function() {
        buttonPressed = true;
        
        if (legalNameChecked && buttonPressed) {
            //
        } else {
        //    legalNameHeader.style.display = 'none';

         //   var legalNameColIndex = legalNameHeader.cellIndex;
            
            document.querySelectorAll("#collections tbody tr").forEach(row => {
                row.cells[legalNameColIndex].style.display = "none";
            })
        }
    });


      // countryOfOrigin
      var countryOfOriginChecked = document.getElementById("col-countryOfOrigin").checked;
      var countryOfOriginHeader = document.getElementById("countryOfOriginId");
  
      document.getElementById("col-countryOfOrigin").addEventListener("change", function() {
        countryOfOriginChecked = this.checked;
      });
  
      document.getElementById("submitProjection").addEventListener("click", function() {
          buttonPressed = true;
          
          if (countryOfOriginChecked && buttonPressed) {
              //
          } else {
            countryOfOriginHeader.style.display = 'none';
  
              var countryOfOriginColIndex = countryOfOriginHeader.cellIndex;
              
              document.querySelectorAll("#collections tbody tr").forEach(row => {
                  row.cells[countryOfOriginColIndex].style.display = "none";
              })
          }
      });





}





// Fetches data from the items and displays it.
async function fetchAndDisplayItems() {
    const tableElement = document.getElementById('items');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/items', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}


// Fetches data from the designers and displays it.
async function fetchAndDisplayDesigners() {
    const tableElement = document.getElementById('designers');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/designers', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}


// Fetches data from the creative directors and displays it.
async function fetchAndDisplaCreativeDirectors() {
    const tableElement = document.getElementById('creativedirector');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/creativedirector', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// Fetches data from the demotable and displays it.
async function fetchAndDisplayFW1() {
    const tableElement = document.getElementById('fw1');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/fw1', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// Fetches data from the demotable and displays it.
async function fetchAndDisplayFW2() {
    const tableElement = document.getElementById('fw2');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/fw2', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// Fetches data from the demotable and displays it.
async function fetchAndDisplayShows() {
    const tableElement = document.getElementById('show');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/show', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// // This function resets or initializes the fashion db.
// async function resetDemotable() {
//     const response = await fetch("/initiate-demotable", {
//         method: 'POST'
//     });
//     const responseData = await response.json();

//     if (responseData.success) {
//         const messageElement = document.getElementById('resetResultMsg');
//         messageElement.textContent = "Fashion database initiated successfully!";
//         location.reload(); 
//     } else {
//         alert("Error initiating table!");
//     }
// }

// // Inserts new records into the demotable.
// async function insertDemotable(event) {
//     event.preventDefault();

//     const idValue = document.getElementById('insertId').value;
//     const nameValue = document.getElementById('insertName').value;

//     const response = await fetch('/insert-demotable', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             id: idValue,
//             name: nameValue
//         })
//     });

//     const responseData = await response.json();
//     const messageElement = document.getElementById('insertResultMsg');

//     if (responseData.success) {
//         messageElement.textContent = "Data inserted successfully!";
//         fetchTableData();
//     } else {
//         messageElement.textContent = "Error inserting data!";
//     }
// }








// // Updates names in the demotable.
// async function updateNameDemotable(event) {
//     event.preventDefault();

//     const oldNameValue = document.getElementById('updateOldName').value;
//     const newNameValue = document.getElementById('updateNewName').value;

//     const response = await fetch('/update-name-demotable', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             oldName: oldNameValue,
//             newName: newNameValue
//         })
//     });

//     const responseData = await response.json();
//     const messageElement = document.getElementById('updateNameResultMsg');

//     if (responseData.success) {
//         messageElement.textContent = "Name updated successfully!";
//         fetchTableData();
//     } else {
//         messageElement.textContent = "Error updating name!";
//     }
// }
// _________________________________________________________________________

// Updates emails in the Designer table.
async function updateEmailDesignerTable(event) {
    event.preventDefault();

    console.log("HERE");

    const DesignerIdValue = document.getElementById('DesignerId').value;
    const newDesignerEmailValue = document.getElementById('updateNewDesignerEmail').value;

    console.log(DesignerIdValue);
    console.log(newDesignerEmailValue);

    const response = await fetch('/update-email-designer-table', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            DesignerId: DesignerIdValue,
            NewDesignerEmail: newDesignerEmailValue
        })
    });

    console.log("BEFORE");
    const responseData = await response.json();
    console.log("AFTER");

    const messageElement = document.getElementById('updateEmailResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Designer Email updated successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error updating Designer Email!";
    }
}


// Counts rows in the demotable.
// Modify the function accordingly if using different aggregate functions or procedures.
// async function countDemotable() {
//     const response = await fetch("/count-demotable", {
//         method: 'GET'
//     });

//     const responseData = await response.json();
//     const messageElement = document.getElementById('countResultMsg');

//     if (responseData.success) {
//         const tupleCount = responseData.count;
//         messageElement.textContent = `The number of tuples in demotable: ${tupleCount}`;
//     } else {
//         alert("Error in count demotable!");
//     }
// }


async function onCountSeasons(event) {
    event.preventDefault();

    const numItems = Number(document.getElementById("specifyNumItems").value);
    console.log("numitems: ", numItems);

    const response = await fetch("/count-seasons", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numItems: numItems,
        })
    });
    const responseData = await response.json();
    
    console.log("response ", response);
    console.log("response ", responseData);
    // console.log(responseData.count[0]['COUNT(*)']);


    const messageElement = document.getElementById('countSeasonsResultMsg');

    if (responseData.success) {
        const seasonsCount = responseData.seasonCount;

        messageElement.textContent = `The number of seasons with more than specified items is ${seasonsCount}`;
    } else {
        alert("Error in count seasons!");
    }
}




//Delets row from Collections (and all its items)
async function deleteFromCollections(event) {
    event.preventDefault();

    const yearValue = document.getElementById('insertYear').value;
    const seasonValue = document.getElementById('insertSeason').value;
    const nameValue = document.getElementById('insertColName').value;

    const response = await fetch('/delete-collection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            year: yearValue,
            season: seasonValue,
            name: nameValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('deleteCollectionResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Data deleted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error deleting data!";
    }
}


//Joins creative directors and designers filtering on min salary
async function joinCreativeDirWithDesigner(event) {
    event.preventDefault();

    const salaryValue = document.getElementById('insertSalary').value;

    const response = await fetch('/join-creative-director-designer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            salary: salaryValue,
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('joinCreativeDirWithDesignerResultMsg');

    const tableBody = document.querySelector('#creativedirectorjoined tbody');

    if (responseData.success) {
        messageElement.textContent = "Tables joined successfully!";

        // clear any old rows
        tableBody.innerHTML = "";

        // fill with new rows
        responseData.rows.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.DESIGNER_ID}</td>
                <td>${row.SALARY}</td>
                <td>${row.WORKING_SINCE}</td>
                <td>${row.EMAIL}</td>
                <td>${row.FIRST_NAME}</td>
                <td>${row.LAST_NAME}</td>
                <td>${row.EDUCATION}</td>
            `;
            tableBody.appendChild(tr);
        });

        if (responseData.rows.length === 0) {
            messageElement.textContent = "No creative directors found for this salary.";
        }
    } else {
        messageElement.textContent = "Error joining tables!";
    }
}

//Finds top fashion weeks based on show count per year
async function findTopShowFashionWeeks(event) {
   const response = await fetch("/get-top-fw", {
        method: 'GET'
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('topfwsResultMsg');

    const tableBody = document.querySelector('#topfwsrevealed tbody');

    if (responseData.success) {
        messageElement.textContent = "Calculated successfuly!";
        // Always clear old, already fetched data before new fetching process.
        if (tableBody) {
            tableBody.innerHTML = '';
        }        
        // fill with new rows
        responseData.rows.forEach(row => {
            const tr = document.createElement('tr');

            const tdCity = document.createElement('td');
            tdCity.textContent = row.CITY;

            const tdAvg = document.createElement('td');
            tdAvg.textContent = row.AVG_SHOWS_PER_YEAR;

            tr.appendChild(tdCity);
            tr.appendChild(tdAvg);

            tableBody.appendChild(tr);
        });

        if (responseData.rows.length === 0) {
            messageElement.textContent = "No fashion weeks found:(.";
        }
    } else {
        messageElement.textContent = "Error finding fashion week tables!";
    }
}


// Insert Show
async function insertShow(event) {
    event.preventDefault();

    const showIdValue = document.getElementById('insertShowId').value;
    const startTimeValue = document.getElementById('insertStartTime').value;
    const endTimeValue = document.getElementById('insertEndTime').value;
    const venueValue = document.getElementById('insertVenue').value;
    const startDateValue = document.getElementById('insertStartDate').value;
    const fashionWeekIdValue = document.getElementById('insertFashionWeekId').value;

    const response = await fetch('/insert-show', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            show_id: showIdValue,
            start_time: startTimeValue,
            end_time: endTimeValue,
            venue: venueValue,
            start_date: startDateValue,
            fashion_week_2_id: fashionWeekIdValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertShowResultMsg');

    if (responseData.success) {
        messageElement.textContent = responseData.message;
        messageElement.style.color = 'green';
        fetchTableData();
    } else {
        messageElement.textContent = responseData.message;
        messageElement.style.color = 'red';
    }
}

// Insert Model
async function insertModel(event) {
    event.preventDefault();

    const modelIdValue = document.getElementById('insertModelId').value;
    const compensationValue = document.getElementById('insertCompensation').value;
    const weightValue = document.getElementById('insertWeight').value || null;
    const heightValue = document.getElementById('insertHeight').value || null;
    const ageValue = document.getElementById('insertAge').value || null;
    const lastNameValue = document.getElementById('insertLastName').value || null;
    const firstNameValue = document.getElementById('insertFirstName').value;

    const response = await fetch('/insert-model', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model_id: modelIdValue,
            compensation: compensationValue,
            weight: weightValue,
            height: heightValue,
            age: ageValue,
            last_name: lastNameValue,
            first_name: firstNameValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertModelResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Model inserted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error inserting model!";
    }
}


// Show Model
async function fetchAndDisplayModel() {
    const tableElement = document.getElementById('model');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/model', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}


// Select Model
let modelConditions = [];

// Adding new conditions
function addModelCondition() {
    const logic = document.getElementById('modelLogic').value;
    const attribute = document.getElementById('modelAttribute').value;
    const operator = document.getElementById('modelOperator').value;
    const value = document.getElementById('modelValue').value;

    if (!value){
        alert("Please enter the value!");
        return;
    }

    modelConditions.push({
        logic: logic, 
        attribute : attribute,
        operator: operator,
        value : value
    });

    displayModelConditions();
    document.getElementById('modelValue').value = "";
}

// Show conditions to the user
function displayModelConditions() {
    const container = document.getElementById('modelConditionsList');
    container.innerHTML = "";

    modelConditions.forEach((cond, index) => {
        let text;

        if (index === 0) {
            text = `${cond.attribute} ${cond.operator} ${cond.value}`;
        } else {
            text = `${cond.logic} ${cond.attribute} ${cond.operator} ${cond.value}`;
        } 

        const div = document.createElement("div");
        div.textContent = text;
        container.appendChild(div);
    });
}

// Remove all conditions
function clearModelConditions(){
    modelConditions = [];
    displayModelConditions();

    document.querySelector('#modelSelectResults tbody').innerHTML = "";
    document.getElementById('selectModelResultMsg').textContent = "";
}

// Send conditions to backend and get results
async function executeModelSelect(){
    // POST request to backend
    const response = await fetch("/select-model", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({conditions: modelConditions})
    });

    const data = await response.json();

    const msg = document.getElementById('selectModelResultMsg'); 
    const tableBody = document.querySelector('#modelSelectResults tbody');

    if (data.success) {
        msg.textContent = `Found ${data.rows.length} result`;
        tableBody.innerHTML = "";
        
        data.rows.forEach(row => {
            const tr = document.createElement("tr");
            // Creating table row
            tr.innerHTML = `
                <td>${row.MODEL_ID}</td>
                <td>${row.COMPENSATION}</td>
                <td>${row.WEIGHT}</td>
                <td>${row.HEIGHT}</td>
                <td>${row.AGE}</td>
                <td>${row.LAST_NAME}</td>
                <td>${row.FIRST_NAME}</td>
            `;

            tableBody.appendChild(tr);
        });
    } else {
        msg.textContent = "Error running select";
    }
}

// Group Guest Designer
async function groupGuestDesignerByBrand(event) {
    const response = await fetch("/group-guest-designer", {
        method: 'GET'
    });
    const data = await response.json();

    const message = document.getElementById('groupGuestDesignerResultMsg');
    const tableBody = document.querySelector('#guestDesignerGrouped tbody');

    if (tableBody) {
        tableBody.innerHTML = "";
    }

    if (!data.success) {
        message.textContent = "Error calculating!";
        return;
    }
    
    message.textContent = "Aggregation calculation successful";

    data.rows.forEach((row, index) => {
        const rating = index + 1;
        const starts = 
            rating === 1 ? "⭐⭐⭐⭐⭐ (Top Paid)" :
            rating === 2 ? "⭐⭐⭐⭐" :
            rating === 3 ? "⭐⭐⭐" :
            rating <= 5 ? "⭐⭐" : "⭐";

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${rating}</td>
            <td>${row.ASSOCIATED_BRAND}</td>
            <td>${row.NUM_GUEST_DESIGNERS}</td>
            <td>$${parseFloat(row.AVG_COMPENSATION).toFixed(2)}</td>
            <td>$${row.MAX_COMPENSATION}</td>
            <td>$${row.MIN_COMPENSATION}</td>
            <td>${starts}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// Show GuestDesigner
async function fetchAndDisplayGuestDesigner1() {
    const tableElement = document.getElementById('guestdesigner1');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/guestdesigner1', {
        method: 'GET'
    });

    const responseData = await response.json();
    const tableContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    tableContent.forEach(row => {
        const tr = tableBody.insertRow();
        row.forEach((field, index) => {
            const cell = tr.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function fetchAndDisplayGuestDesigner2() {
    const tableElement = document.getElementById('guestdesigner2');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/guestdesigner2', {
        method: 'GET'
    });

    const responseData = await response.json();
    const tableContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    tableContent.forEach(row => {
        const tr = tableBody.insertRow();
        row.forEach((field, index) => {
            const cell = tr.insertCell(index);
            cell.textContent = field;
        });
    });
}


// Division Models
async function findAllModelsInAllShows(event) {
    event.preventDefault();
    
    const fashionWeekId = document.getElementById('divisionFashionWeekId').value;

    if (!fashionWeekId){
        alert("Please enter the value!");
        return;
    }

    const response = await fetch("/division-models-all-shows", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fashionWeekId })
    });
    
    const data = await response.json();
    const message = document.getElementById('divisionResultMsg');
    const tableBody = document.querySelector('#divisionResults tbody');

    if (tableBody) {
        tableBody.innerHTML = "";
    }

    if (!data.success) {
        message.textContent = "Error in division!";
        return;
    }

    if (!data.rows || data.rows.length === 0) {
        message.textContent = `No models walked in all shows at ${fashionWeekId}`;
    } else {
        message.textContent = `Found ${data.rows.length} models who walked in all shows at this fashion week!`;
        
        data.rows.forEach(row => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${row.MODEL_ID}</td>
                <td>${row.FIRST_NAME}</td>
                <td>${row.LAST_NAME}</td>
                <td>$${row.COMPENSATION.toLocaleString()}</td>
            `;
            tableBody.appendChild(tr);
        });
    }
}

// Show ModelWalksShow
async function showModelWalksShow() {
    const tableElement = document.getElementById('modelWalksShow');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/modelWalksShow', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}


// Reset
async function resetFashionDatabase() {
    const response = await fetch("/initiate-fashion-database", {
        method: 'POST'
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('resetResultMsg');
        messageElement.textContent = "Fashion database initiated successfully.";
        location.reload(); 
    } else {
        alert("Error initiating fashion database.");
    }
}

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();
    fetchTableData();
    // document.getElementById("resetDemotable").addEventListener("click", resetDemotable);
    // document.getElementById("insertDemotable").addEventListener("submit", insertDemotable);
    document.getElementById("updateEmailDesignerTable").addEventListener("submit", updateEmailDesignerTable);
    // document.getElementById("countDemotable").addEventListener("click", countDemotable);
    // document.getElementById("countDemotable").addEventListener("click", countDemotable);

    document.getElementById("countSeasonsButton").addEventListener("click", onCountSeasons);

    document.getElementById("deleteCollection").addEventListener("submit", deleteFromCollections);
    document.getElementById("joinCreativeDirWithDesigner").addEventListener("submit", joinCreativeDirWithDesigner);
    document.getElementById("topfws").addEventListener("click", findTopShowFashionWeeks);

    document.getElementById('insertShowForm').addEventListener('submit', insertShow); // Insert Show
    document.getElementById('insertModelForm').addEventListener('submit', insertModel); // Insert Model

    document.getElementById('addModelCondition').addEventListener('click', addModelCondition); // Select Model
    document.getElementById('clearModelConditions').addEventListener('click', clearModelConditions); // Select Model
    document.getElementById('executeModelSelect').addEventListener('click', executeModelSelect); // Select Model
    
    document.getElementById('groupGuestDesigner').addEventListener('click', groupGuestDesignerByBrand); // Group Guest Designer

    document.getElementById('divisionQuery').addEventListener('submit', findAllModelsInAllShows); // Division Models
    
    document.getElementById("resetFashionDatabase").addEventListener("click", resetFashionDatabase); // Reset

};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
async function fetchTableData() {
    // await fetchAndDisplayUsers();
    await fetchAndDisplayCollections();
    await fetchAndDisplayItems();
    await fetchAndDisplayDesigners();
    await fetchAndDisplaCreativeDirectors();
    await fetchAndDisplayFW1();
    await fetchAndDisplayFW2();
    await fetchAndDisplayShows();
    
    await fetchAndDisplayModel(); // Show Model
    await displayModelConditions(); // Select Model


    fetchAndDisplayGuestDesigner1(); // Show GuestDesigner
    fetchAndDisplayGuestDesigner2(); // Show GuestDesigner

    showModelWalksShow(); // Show ModelWalksShow
}







// Calls function below
// document.addEventListener("DOMContentLoaded", function() {
//     CollectionProjection();
// });


//
// Applies projection to Collections table
async function CollectionProjection() {

    document.getElementById("submitProjection").addEventListener("click", async function() {

        console.log("SETTING UP HANDLER");

        // will get ID's of the table headers that have been checked
        const checkedIds = Array.from(document.querySelectorAll('#collections input[type="checkbox"]:checked')).map(input=>input.id); 
        // .map(input => input.id) will go through each checkbox in the array and return the "id" of the checkbox
        // will return stuff like ["col-year", "col-genre"]

        map = {
            "col-year": "year",
            "col-season": "season",
            "col-name": "name", 
            "col-items": "number_of_items",
            "col-showId": "show_id",
            "col-legalName": "legal_name",
            "col-countryOfOrigin": "country_of_origin"
        }
        // ^^Translates the id's from checkedId's into names
        // e.g map["col-year"] returns "Year"

        checkedColumnNames = checkedIds.map(id => map[id]);
        // ^^ Goes through each ID and returns the mapped value of that object

            const response = await fetch("/project-collections", {
            method: 'POST',
            headers: {"Content-Type": "application/json"}, // sending json data
            body: JSON.stringify({checkedColumnNames:checkedColumnNames})
            }); // body^^ creating an object containing selected column names, converting it, etc.
            // POST is a sending to the server which checkboxes were selected


            const responseData = await response.json();
            // Converst the backend's JSON response into a js object

            if (responseData.success) {
                const colData = responseData.response;

                const table = document.getElementById("collections");
                table.innerHTML = "";
                //^^Clears the entire table 

                const thead = document.createElement("thead");
                const headerRow = document.createElement("tr");

                checkedColumnNames.forEach(columnName => {
                    const th = 
                    document.createElement("th");
                    th.textContent = columnName;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
                table.appendChild(thead);
                // ^^Creating table header rows based on columns that the user selected

                // Below creates table body from data in backend
                const tbody = document.createElement("tbody");
                colData.forEach(row => {
                    const tr = 
                    document.createElement("tr");
                    row.forEach(value => {
                        const td = 
                        document.createElement("td");
                        // ^^ Loop through each row value
                        // Create table cell
                        td.textContent = value;
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);
                    // After finishing the row, attach it to the body
                });
                table.appendChild(tbody);
            } else {
                alert("error in applying projection!!")
            }

    });


}