// ===============================
// Job Portal
// script.js
// ===============================

// Login Check
if (
    window.location.pathname.includes("dashboard.html") &&
    localStorage.getItem("login") !== "true"
) {
    window.location = "index.html";
}

// Demo Jobs
const jobs = [
    {
        id: 1,
        title: "Web Developer",
        company: "Tech Solutions",
        location: "Pune",
        salary: "₹30,000 / Month"
    },
    {
        id: 2,
        title: "Java Developer",
        company: "Infosys",
        location: "Bangalore",
        salary: "₹45,000 / Month"
    },
    {
        id: 3,
        title: "Python Developer",
        company: "TCS",
        location: "Mumbai",
        salary: "₹40,000 / Month"
    },
    {
        id: 4,
        title: "Frontend Developer",
        company: "Wipro",
        location: "Hyderabad",
        salary: "₹35,000 / Month"
    },
    {
        id: 5,
        title: "Data Analyst",
        company: "Capgemini",
        location: "Pune",
        salary: "₹38,000 / Month"
    }
];

let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

// Display Jobs
function displayJobs(list = jobs) {

    const jobList = document.getElementById("jobList");

    if (!jobList) return;

    jobList.innerHTML = "";

    list.forEach(job => {

        jobList.innerHTML += `
        <div class="job-card">

            <h3>${job.title}</h3>

            <p><strong>Company :</strong> ${job.company}</p>

            <p><strong>Location :</strong> ${job.location}</p>

            <p><strong>Salary :</strong> ${job.salary}</p>

            <button class="save-btn"
            onclick="saveJob(${job.id})">
            Save Job
            </button>

            <button class="apply-btn"
            onclick="applyJob('${job.title}')">
            Apply
            </button>

        </div>
        `;

    });

}

// Save Job
function saveJob(id){

    let job = jobs.find(j => j.id === id);

    let exists = savedJobs.find(j => j.id === id);

    if(exists){

        alert("Job already saved.");

        return;

    }

    savedJobs.push(job);

    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

    displaySavedJobs();

    alert("Job Saved Successfully.");

}

// Display Saved Jobs
function displaySavedJobs(){

    const saved = document.getElementById("savedJobs");

    if(!saved) return;

    saved.innerHTML = "";

    if(savedJobs.length === 0){

        saved.innerHTML = "<p>No Saved Jobs.</p>";

        return;

    }

    savedJobs.forEach((job,index)=>{

        saved.innerHTML += `

        <div class="job-card">

            <h3>${job.title}</h3>

            <p><strong>${job.company}</strong></p>

            <p>${job.location}</p>

            <button class="apply-btn"
            onclick="applyJob('${job.title}')">
            Apply
            </button>

            <button class="logout-btn"
            onclick="removeJob(${index})">
            Remove
            </button>

        </div>

        `;

    });

}

// Remove Saved Job
function removeJob(index){

    savedJobs.splice(index,1);

    localStorage.setItem("savedJobs",JSON.stringify(savedJobs));

    displaySavedJobs();

}

// Apply Job
function applyJob(jobTitle){

    alert("Application submitted for " + jobTitle);

}

// Search Job
function searchJobs(){

    let value = document.getElementById("search").value.toLowerCase();

    let filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(value) ||
        job.company.toLowerCase().includes(value) ||
        job.location.toLowerCase().includes(value)
    );

    displayJobs(filtered);

}

// Logout
function logout(){

    localStorage.removeItem("login");

    window.location = "index.html";

}

// Load Dashboard
displayJobs();
displaySavedJobs();