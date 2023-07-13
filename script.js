// Get the projects toggle button and the contact list
var projectsToggle = document.getElementById("projects-toggle");
var contactList = document.getElementById("contact-list");

// Add an event listener to the projects toggle button
projectsToggle.addEventListener("click", function() {
  // Hide the contact list if it's visible
  contactList.classList.add("hidden");
  
  // Open the project URL in a new tab
  window.open("https://github.com/TRHarsha/TRHarsha.github.io/blob/main/project/proj1/index.html", "_blank");
});
