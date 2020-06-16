$(document).ready(function () {

    $('#sidebarCollapse').on('click', function() {
        $('#sidebar').toggleClass('active');
    });

    if ($('.errorMsg').text() != "") {
        $('#errorModal').modal("show");
      }

    

});