var editButtons = document.querySelectorAll(".edit-btn");

editButtons.forEach(function (editButton) {
    editButton.addEventListener("click", function () {
        var userId = editButton.getAttribute("data-id");

        window.location.href = '/Home/EditUser/' + userId;
    });
});
