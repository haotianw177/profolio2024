// hand-made by Haotian Wang, 05/03/2024

const textContainer = document.querySelector('.rightScreenContainer');
const textItems = textContainer.querySelectorAll('.rightScreenContent');
const toggleButtons = document.querySelectorAll('.categoriesMenuButton');
const toggleButton = document.getElementById('toggleButton');
const dropdownMenu = document.getElementById('dropdownMenu');

let currentActiveText = 0;

// Set initial active text content
textItems[currentActiveText].classList.add('active');

window.setActiveText = function (index) {
    textItems.forEach(item => item.classList.remove('active'));

    if (textItems[index]) {
        currentActiveText = index;
        textItems[currentActiveText].classList.add('active');
    }
    // Hide dropdown if in phone mode after selecting an item
    if (window.innerWidth <= 768) { 
        dropdownMenu.style.display = 'none';
    }
}

for (let i = 0; i < toggleButtons.length; i++) {
    toggleButtons[i].addEventListener('click', function() {
        setActiveText(i);
    });
}

toggleButton.addEventListener('click', () => {
    if (dropdownMenu.style.display === 'block' || dropdownMenu.style.display === '') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
});

// Adjust display based on viewport size
function displayButtonsAccordingToViewport() {
    if (window.innerWidth > 768) {  // Laptop view
        dropdownMenu.style.display = 'block';  // Always show menu
    } else {
        dropdownMenu.style.display = 'none';  // Mobile view, hide menu initially
    }
}

window.addEventListener('load', displayButtonsAccordingToViewport);
window.addEventListener('resize', displayButtonsAccordingToViewport);

for (let i = 0; i < toggleButtons.length; i++) {
  toggleButtons[i].addEventListener('click', function() {
      // Hide all content sections before showing the selected one
      textItems.forEach(item => {
          item.style.display = 'none';  // Hide all content sections
      });

      setActiveText(i); // Set the clicked one as active

      if (window.innerWidth <= 768) {  // Check if it's in mobile view
          document.querySelectorAll('.leftContainer .headerInfo, .leftContainer .footerInfo').forEach(elem => {
              elem.style.display = 'none';  // Hide text elements in the leftContainer
          });
          textItems[i].style.display = 'block';  // Display only the clicked content
      }
  });
}

toggleButton.addEventListener('click', () => {
  let isMenuOpen = dropdownMenu.style.display === 'block' || dropdownMenu.style.display === '';
  dropdownMenu.style.display = isMenuOpen ? 'none' : 'block';

  if (isMenuOpen) {
      document.querySelectorAll('.leftContainer .headerInfo, .leftContainer .footerInfo').forEach(elem => {
          elem.style.display = 'block';  // Show text elements when menu is closed
      });
      textItems.forEach(item => item.style.display = 'none');  // Hide all content sections when closing menu
  } else {
      document.querySelectorAll('.leftContainer .headerInfo, .leftContainer .footerInfo').forEach(elem => {
          elem.style.display = 'none';  // Hide text elements when menu is open
      });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const toggleButtons = document.querySelectorAll('.categoriesMenuButton');
  const textItems = document.querySelectorAll('.rightScreenContent');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const toggleButton = document.getElementById('toggleButton');

  // Function to control visibility of content sections
  function setActiveText(index) {
    textItems.forEach((item, idx) => {
      item.style.display = idx === index ? 'block' : 'none'; // Show only the active item
    });
  }

  // Set the default visibility for desktop
  if (window.innerWidth > 768) {
    setActiveText(0); // Display the first item by default on desktop
  } else {
    setActiveText(null); // No content displayed by default on mobile
  }

  // Button click events
  toggleButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      setActiveText(index);
      if (window.innerWidth <= 768) {
        dropdownMenu.style.display = 'none'; // Hide the menu after selection on mobile
      }
    });
  });

  // Toggle menu visibility on mobile
  toggleButton.addEventListener('click', function() {
    if (dropdownMenu.style.display === 'block' || dropdownMenu.style.display === '') {
      dropdownMenu.style.display = 'none';
    } else {
      dropdownMenu.style.display = 'block';
    }
  });

  // Ensure correct display on resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      // Desktop-specific adjustments
      dropdownMenu.style.display = 'block'; // Ensure the dropdown is always visible on desktop
      document.querySelectorAll('.leftContainer .headerInfo, .leftContainer .footerInfo').forEach(elem => {
        elem.style.display = 'block'; // Ensure all leftContainer elements are visible on desktop
      });
  
      // Ensure that the appropriate rightScreenContent is displayed
      if (!textItems[currentActiveText] || textItems[currentActiveText].style.display === 'none') {
        setActiveText(currentActiveText); // Ensure current or default content is visible
      }
    } else {
      // Mobile-specific adjustments
      dropdownMenu.style.display = 'none'; // Keep the dropdown hidden until toggled on mobile
      textItems.forEach(item => item.style.display = 'none'); // Hide all right screen content on mobile initially
    }
  });
  
  // Function to set active text, improved to ensure visibility handling
  function setActiveText(index) {
    textItems.forEach((item, idx) => {
      item.style.display = 'none'; // Hide all first
    });
    if (textItems[index]) {
      textItems[index].style.display = 'block'; // Show only the active item
    }
  }  
});

// jquery for image preview
// $(document).ready(function() {
//   // When any image is clicked
//   $('img').on('click', function(e) {
//       e.stopPropagation(); // Prevent the click from bubbling up
//       var src = $(this).attr('src'); // Get the source of the clicked image
//       $('#imagePreviewModal img').attr('src', src); // Set the src for the modal image
//       $('#imagePreviewModal').fadeIn(300); // Fade in the modal
//       $('#imagePreviewModal').css('display', 'flex'); // Ensure it is displayed as flex
//   });

//   // Click on the modal background to close
//   $('#imagePreviewModal').on('click', function() {
//       $(this).fadeOut(300, function() {
//           $('#imagePreviewModal img').attr('src', ''); // Clear the src
//       }); // Fade out the modal
//   });

//   // Stop propagation when clicking on the modal image
//   $('#imagePreviewModal img').on('click', function(e) {
//       e.stopPropagation(); // Prevent the click from closing the modal
//   });
// });

function fetchLastUpdated() {
  const repoOwner = 'wanghveganjerky'; 
  const repoName = 'profolio2023';  
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(commits => {
      if (commits.length > 0) {
        const lastCommitDate = new Date(commits[0].commit.committer.date);
        updateLastUpdated(lastCommitDate);
      }
    })
    .catch(error => console.error('Failed to fetch last commit date', error));
}

function updateLastUpdated(lastCommitDate) {
  const today = new Date();
  const timeSince = today - lastCommitDate;
  const minuteMs = 60000;
  const hourMs = 3600000;
  const dayMs = 86400000;
  const monthMs = 2628000000;

  let timePhrase;

  if (timeSince < minuteMs) {
    timePhrase = "few moments ago";
  } else if (timeSince < hourMs) {
    timePhrase = "few minutes ago";
  } else if (timeSince < dayMs) {
    timePhrase = "few hours ago";
  } else if (timeSince < monthMs) {
    timePhrase = "few days ago";
  } else {
    timePhrase = "few months ago";
  }

  document.querySelector(".lastUpdatedBox").innerText = "Updated @" + timePhrase;
}

document.addEventListener('DOMContentLoaded', function() {
  function updateDateTime() {
    const now = new Date();
    const month = now.getMonth() + 1; // JavaScript months are 0-based.
    const day = now.getDate();
    const year = now.getFullYear();
    const dateString = `${month}/${day}/${year}`; // No leading zeros

    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const timeString = now.toLocaleTimeString([], timeOptions);
    const dateTimeString = `${dateString}, ${timeString}`;

    document.querySelector('#currentDateTime .currentTime').textContent = dateTimeString;
  }
  fetchLastUpdated();
  updateDateTime(); // Update date and time immediately when the page loads
  setInterval(updateDateTime, 1000); // Update the date and time every second
});

// document.addEventListener('DOMContentLoaded', function() {
//   const linkOfTheWeek = document.getElementById('linkOfTheWeek');
  
//   if (linkOfTheWeek) {
//     linkOfTheWeek.href = 'https://thisismold.com/mold-magazine/flavor-chemistry-flavorama-arielle-johnson'; 
//   }
// });

