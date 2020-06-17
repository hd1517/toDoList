$(document).ready(function () {
  $("#dismiss, .overlay").on("click", function () {
    // hide sidebar
    $("#sidebar").removeClass("active");
    // hide overlay
    $(".overlay").removeClass("active");
  });

  $("#sidebarBtn").on("click", function () {
    // open sidebar
    $("#sidebar").addClass("active");
    // fade in the overlay
    $(".overlay").addClass("active");
    $(".collapse.in").toggleClass("in");
    $("a[aria-expanded=true]").attr("aria-expanded", "false");
  });

  $("#addNewListLink").on("click", function () {
    // hide sidebar
    $("#sidebar").removeClass("active");
    // hide overlay
    $(".overlay").removeClass("active");
  });

  if ($(".errorMsg").text() != "") {
    $("#errorModal").modal("show");
  }

  if (!$(".doneItems")[0]) {
    $(".doneBox").hide();
  }

  $(".item").hover(
    function () {
      $(this).find(".close").show();
    },
    function () {
      $(this).find(".close").hide();
    }
  );
});
