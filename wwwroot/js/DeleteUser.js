// Select all delete buttons
var deleteButtons = document.querySelectorAll(".delete-btn");

// Attach click event listener to each delete button
deleteButtons.forEach(function (deleteButton) {
    deleteButton.addEventListener("click", function () {
        var userId = deleteButton.getAttribute("data-id");

        // Send a DELETE request to the server
        $.ajax({
            url: '/Home/DeleteUser/' + userId,
            type: 'DELETE', // Change this to 'DELETE'
            data: { id: userId },
            success: function (result) {
                if (result.success) {
                    // User deleted successfully, you can update the UI or show a success message
                    // For example, remove the table row containing the user
                    deleteButton.closest('tr').remove();
                } else {
                    // Handle the case where the delete was not successful
                    alert(result.message);
                }
            },
            error: function (error) {
                // Handle the AJAX request error
                alert("An error occurred while processing your request.");
            }
        });
    });
});
