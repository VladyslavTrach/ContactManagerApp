var deleteButtons = document.querySelectorAll(".delete-btn");

deleteButtons.forEach(function (deleteButton) {
    deleteButton.addEventListener("click", function () {
        var userId = deleteButton.getAttribute("data-id");

        $.ajax({
            url: '/Home/DeleteUser/' + userId,
            type: 'DELETE',
            data: { id: userId },
            success: function (result) {
                if (result.success) {
                    deleteButton.closest('tr').remove();
                } else {
                    alert(result.message);
                }
            },
            error: function (error) {
                alert("An error occurred while processing your request.");
            }
        });
    });
});
