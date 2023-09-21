$(document).ready(function () {
    let currentSortColumn = 'Name';
    let isAscending = true;

    function sortTable(column) {
        let $tableBody = $('#userTable tbody');
        let $rows = $tableBody.find('tr').toArray();

        $rows.sort(function (a, b) {
            let aValue = $(a).find('td[data-field="' + column + '"]').text();
            let bValue = $(b).find('td[data-field="' + column + '"]').text();

            if (column === 'DateOfBirth') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            } else if (column === 'Salary') {
                aValue = parseFloat(aValue.replace('$', '').replace(',', ''));
                bValue = parseFloat(bValue.replace('$', '').replace(',', ''));
            }

            if (isAscending) {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        $tableBody.empty().append($rows);
    }

    $('.sortable').click(function () {
        let clickedColumn = $(this).data('sort');
        if (clickedColumn === currentSortColumn) {
            isAscending = !isAscending;
        } else {
            currentSortColumn = clickedColumn;
            isAscending = true;
        }

        $('.sortable i').removeClass('fa-sort-up fa-sort-down');
        $(this).find('i').addClass(isAscending ? 'fa-sort-up' : 'fa-sort-down');

        sortTable(currentSortColumn);
    });

    sortTable(currentSortColumn);
});
