let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let total = document.getElementById("total");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");
let totalJobCountDisplay = document.getElementById("totalJobCount");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const allCardSection = document.getElementById("allCards");
const mainContainer = document.querySelector('main');
const notAvailableSection = document.getElementById("not-available-section");
const filterSection = document.getElementById('filtered-section');

// Initial setup
function calculateCount() {
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
    
    // Update the "Available Job" count based on current view
    if (currentStatus === 'all-filter-btn' || currentStatus === 'all') {
        totalJobCountDisplay.innerText = allCardSection.children.length;
    } else if (currentStatus === 'interview-filter-btn') {
        totalJobCountDisplay.innerText = interviewList.length;
    } else if (currentStatus === 'rejected-filter-btn') {
        totalJobCountDisplay.innerText = rejectedList.length;
    }
}
calculateCount();

function toggleStyle(id) {
    // Reset button styles
    allFilterBtn.classList.add('bg-white', 'text-black');
    interviewFilterBtn.classList.add('bg-white', 'text-black');
    rejectedFilterBtn.classList.add('bg-white', 'text-black');

    allFilterBtn.classList.remove('bg-blue-500', 'text-white');
    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white');
    rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white');

    const selected = document.getElementById(id);
    currentStatus = id;

    selected.classList.remove('bg-white', 'text-black');
    selected.classList.add('bg-blue-500', 'text-white');

    // Section Visibility Logic
    allCardSection.classList.add('hidden');
    filterSection.classList.add('hidden');
    notAvailableSection.classList.add('hidden');

    if (id == 'interview-filter-btn') {
        if (interviewList.length === 0) {
            notAvailableSection.classList.remove('hidden');
            renderNotAvailable();
        } else {
            filterSection.classList.remove('hidden');
            renderInterview();
        }
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
    } else if (id == 'rejected-filter-btn') {
        if (rejectedList.length === 0) {
            notAvailableSection.classList.remove('hidden');
            renderNotAvailable();
        } else {
            filterSection.classList.remove('hidden');
            renderRejected();
        }
    }
    calculateCount();
}

mainContainer.addEventListener('click', function (event) {
    // INTERVIEW BUTTON CLICK
    if (event.target.classList.contains('interview-Btn')) {
        const parenNode = event.target.closest('.flex.justify-between');

        const jobName = parenNode.querySelector('.job-Name').innerText;
        const jobTitle = parenNode.querySelector('.job-Title').innerText;
        const jobSalary = parenNode.querySelector('.job-Salary').innerText;
        const jobDescription = parenNode.querySelector('.job-Description').innerText;

        // Change badge text and color
        const badge = parenNode.querySelector('.status-Badge');
        badge.innerText = 'Interview';
        badge.style.backgroundColor = '#dcfce7';
        badge.style.color = '#166534';

        const cardInfo = {
            jobName: jobName,
            jobTitle: jobTitle,
            jobSalary: jobSalary,
            statusBadge: 'Interview',
            jobDescription: jobDescription
        };

        let jobExist = false;
        for (const item of interviewList) {
            if (item.jobName === cardInfo.jobName) {
                jobExist = true;
                break;
            }
        }

        if (!jobExist) {
            interviewList.push(cardInfo);
        }

        // Remove from rejected list
        let newRejectedList = [];
        for (const item of rejectedList) {
            if (item.jobName !== cardInfo.jobName) {
                newRejectedList.push(item);
            }
        }
        rejectedList = newRejectedList;

        if (currentStatus == 'rejected-filter-btn') {
            renderRejected();
            if (rejectedList.length === 0) toggleStyle('rejected-filter-btn');
        }
        calculateCount();

    // REJECTED BUTTON CLICK
    } else if (event.target.classList.contains('rejected-Btn')) {
        const parenNode = event.target.closest('.flex.justify-between');

        const jobName = parenNode.querySelector('.job-Name').innerText;
        const jobTitle = parenNode.querySelector('.job-Title').innerText;
        const jobSalary = parenNode.querySelector('.job-Salary').innerText;
        const jobDescription = parenNode.querySelector('.job-Description').innerText;

        // Change badge text and color
        const badge = parenNode.querySelector('.status-Badge');
        badge.innerText = 'Rejected';
        badge.style.backgroundColor = '#fee2e2';
        badge.style.color = '#991b1b';

        const cardInfo = {
            jobName: jobName,
            jobTitle: jobTitle,
            jobSalary: jobSalary,
            statusBadge: 'Rejected',
            jobDescription: jobDescription
        };

        let jobExist = false;
        for (const item of rejectedList) {
            if (item.jobName === cardInfo.jobName) {
                jobExist = true;
                break;
            }
        }

        if (!jobExist) {
            rejectedList.push(cardInfo);
        }

        // Remove from interview list
        let newInterviewList = [];
        for (const item of interviewList) {
            if (item.jobName !== cardInfo.jobName) {
                newInterviewList.push(item);
            }
        }
        interviewList = newInterviewList;

        if (currentStatus == "interview-filter-btn") {
            renderInterview();
            if (interviewList.length === 0) toggleStyle('interview-filter-btn');
        }
        calculateCount();
    }
});

mainContainer.addEventListener('click', function (event) {

    // DELETE BUTTON CLICK
    // check for the button or the icon inside the button
    if (event.target.classList.contains('delete-Btn') || event.target.closest('.delete-Btn')) {
        const parenNode = event.target.closest('.flex.justify-between');
        const jobName = parenNode.querySelector('.job-Name').innerText;

        // 1. Remove from the DOM (the visual card)
        parenNode.remove();

        // 2. Remove from interviewList if present
        let newInterviewList = [];
        for (const item of interviewList) {
            if (item.jobName !== jobName) {
                newInterviewList.push(item);
            }
        }
        interviewList = newInterviewList;

        // 3. Remove from rejectedList if present
        let newRejectedList = [];
        for (const item of rejectedList) {
            if (item.jobName !== jobName) {
                newRejectedList.push(item);
            }
        }
        rejectedList = newRejectedList;

        // 4. Update the counts and handle "Empty States"
        calculateCount();

        // If in a filtered view and just deleted the last item, show the "Not Available" screen
        if (currentStatus === 'interview-filter-btn' && interviewList.length === 0) {
            toggleStyle('interview-filter-btn');
        } else if (currentStatus === 'rejected-filter-btn' && rejectedList.length === 0) {
            toggleStyle('rejected-filter-btn');
        }
    }
});

function renderInterview() {
    filterSection.innerHTML = '';
    for (const interview of interviewList) {
        let div = document.createElement('div');
        div.className = 'flex justify-between shadow p-8 rounded-md bg-white mb-6';
        div.innerHTML = `
          <div>
            <p class="job-Name font-semibold text-[18px]">${interview.jobName}</p>
            <p class="job-Title text-gray-500 mb-6">${interview.jobTitle}</p>
            <p class="job-Salary text-gray-500 text-[14px]">${interview.jobSalary}</p>
            <p class="status-Badge bg-green-100 text-green-800 rounded-md font-medium px-5 py-2 mt-4 mb-4 inline-block">
              ${interview.statusBadge}
            </p>
            <p class="job-Description text-[14px] text-gray-600 mb-10">${interview.jobDescription}</p>
            <div class="flex gap-3">
              <button class="interview-Btn btn bg-white border-2 border-green-500 text-green-600">INTERVIEW</button>
              <button class="rejected-Btn btn bg-white border-2 border-red-500 text-red-500">REJECTED</button>
            </div>
          </div>
          <div>
            <button class="delete-Btn btn rounded-full h-10 w-10 border border-gray-300 bg-white">
              <i class="fa-regular fa-trash-can text-gray-500"></i>
            </button>
          </div>
        `;
        filterSection.appendChild(div);
    }
}

// Rendering Part :
 
function renderRejected() {
    filterSection.innerHTML = '';
    for (const rejected of rejectedList) {
        let div = document.createElement('div');
        div.className = 'flex justify-between shadow p-8 rounded-md bg-white mb-6';
        div.innerHTML = `
          <div>
            <p class="job-Name font-semibold text-[18px]">${rejected.jobName}</p>
            <p class="job-Title text-gray-500 mb-6">${rejected.jobTitle}</p>
            <p class="job-Salary text-gray-500 text-[14px]">${rejected.jobSalary}</p>
            <p class="status-Badge bg-red-100 text-red-800 rounded-md font-medium px-5 py-2 mt-4 mb-4 inline-block">
              ${rejected.statusBadge}
            </p>
            <p class="job-Description text-[14px] text-gray-600 mb-10">${rejected.jobDescription}</p>
            <div class="flex gap-3">
              <button class="interview-Btn btn bg-white border-2 border-green-500 text-green-600">INTERVIEW</button>
              <button class="rejected-Btn btn bg-white border-2 border-red-500 text-red-500">REJECTED</button>
            </div>
          </div>
          <div>
            <button class="delete-Btn btn rounded-full h-10 w-10 border border-gray-300 bg-white">
              <i class="fa-regular fa-trash-can text-gray-500"></i>
            </button>
          </div>
        `;
        filterSection.appendChild(div);
    }
}

function renderNotAvailable() {
    notAvailableSection.innerHTML = '';
    const newSectionForNotAvailable = document.createElement("div");
    newSectionForNotAvailable.innerHTML = `
        <div class="bg-white shadow p-25 text-center py-20 rounded-md">
            <div class="w-[90px] inline-block"><img src="./assets/jobs.png" alt=""></div>
            <p class="text-2xl font-semibold">No jobs available</p>
            <p class="text-gray-500">Check back soon for new job opportunities</p>
        </div>
    `;
    notAvailableSection.appendChild(newSectionForNotAvailable);
}