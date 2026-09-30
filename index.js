const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Page
app.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Incident - Client Script & UI Policy</title>

    <style>
        body {
            font-family: Arial;
            margin: 40px;
            background: #f4f6f8;
        }

        .container {
            background: white;
            padding: 25px;
            max-width: 600px;
            margin: auto;
            border-radius: 10px;
        }

        h1 {
            color: #333;
        }

        label {
            display: block;
            margin-top: 15px;
            font-weight: bold;
        }

        input, select, textarea {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            box-sizing: border-box;
        }

        button {
            margin-top: 20px;
            padding: 10px 20px;
            background: #333;
            color: white;
            border: none;
            cursor: pointer;
        }

        #result {
            margin-top: 20px;
            padding: 15px;
            background: #eef;
        }
    </style>
</head>

<body>

<div class="container">

    <h1>Incident Management</h1>

    <form id="incidentForm">

        <label>Incident Number</label>
        <input type="text" id="number" value="INC001001" readonly>

        <label>Short Description</label>
        <input type="text" id="description"
               placeholder="Enter incident description">

        <label>Priority</label>
        <select id="priority">
            <option value="">-- Select Priority --</option>
            <option value="1">1 - Critical</option>
            <option value="2">2 - High</option>
            <option value="3">3 - Moderate</option>
            <option value="4">4 - Low</option>
        </select>

        <label>Impact</label>
        <select id="impact">
            <option value="1">1 - High</option>
            <option value="2">2 - Medium</option>
            <option value="3">3 - Low</option>
        </select>

        <label>Urgency</label>
        <select id="urgency">
            <option value="1">1 - High</option>
            <option value="2">2 - Medium</option>
            <option value="3">3 - Low</option>
        </select>

        <label id="workLabel">Work Notes</label>
        <textarea id="workNotes"
                  placeholder="Enter work notes"></textarea>

        <button type="submit">Submit Incident</button>

    </form>

    <div id="result"></div>

</div>

<script>

// ================================
// CLIENT SCRIPT
// ================================

// Client Script:
// When Priority = Critical,
// Work Notes automatically becomes mandatory.

document.getElementById("priority").addEventListener("change", function () {

    const workNotes = document.getElementById("workNotes");
    const workLabel = document.getElementById("workLabel");

    if (this.value === "1") {

        workNotes.required = true;
        workLabel.innerHTML = "Work Notes *";

    } else {

        workNotes.required = false;
        workLabel.innerHTML = "Work Notes";
    }
});


// ================================
// UI POLICY
// ================================

// UI Policy:
// If Priority = Low,
// Work Notes becomes read-only.

document.getElementById("priority").addEventListener("change", function () {

    const workNotes = document.getElementById("workNotes");

    if (this.value === "4") {

        workNotes.readOnly = true;
        workNotes.value = "";

    } else {

        workNotes.readOnly = false;
    }
});


// ================================
// FORM SUBMISSION
// ================================

document.getElementById("incidentForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const description =
        document.getElementById("description").value;

    const priority =
        document.getElementById("priority").value;

    const workNotes =
        document.getElementById("workNotes").value;

    if (description === "") {

        alert("Short Description is required.");
        return;
    }

    if (priority === "1" && workNotes === "") {

        alert("Work Notes are mandatory for Critical incidents.");
        return;
    }

    document.getElementById("result").innerHTML =
        "<b>Incident submitted successfully!</b><br>" +
        "Incident: INC001001<br>" +
        "Description: " + description + "<br>" +
        "Priority: " + priority;

});

</script>

</body>
</html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});