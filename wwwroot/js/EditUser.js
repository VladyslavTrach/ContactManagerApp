// Select all edit buttons
var editButtons = document.querySelectorAll(".edit-btn");

// Attach click event listener to each edit button
editButtons.forEach(function (editButton) {
    editButton.addEventListener("click", function () {
        var userId = editButton.getAttribute("data-id");

        // Redirect to the edit page or perform any other editing action
        window.location.href = '/Home/EditUser/' + userId;
    });
});
