$(document).ready(function () {
  // Focus on the newItem input on page load
   $(".newItem").focus();

  // Add active on sidebar link that has the same href as url pathname
  const path = window.location.pathname;
  $("a[href='" + path + "']")
    .parent()
    .addClass("active");

  // Hide sidebar
  $("#dismiss, .overlay").on("click", function () {
    // hide sidebar
    $("#sidebar").removeClass("active");
    // hide overlay
    $(".overlay").removeClass("active");
  });

  // Open sidebar
  $("#sidebarBtn").on("click", function () {
    // open sidebar
    $("#sidebar").addClass("active");
    // fade in the overlay
    $(".overlay").addClass("active");
    $(".collapse.in").toggleClass("in");
    $("a[aria-expanded=true]").attr("aria-expanded", "false");
  });

  // On mobile, hide sidebar after new list link is clicked
  $("#addNewListLink").on("click", function () {
    // hide sidebar
    $("#sidebar").removeClass("active");
    // hide overlay
    $(".overlay").removeClass("active");
  });

  // If list title already exists
  if ($(".errorMsg").text() != "") {
    $("#errorModal").modal("show");
  }

  // Show close icon on item hover
  $(".item").hover(
    function () {
      $(this).find(".close").show();
    },
    function () {
      $(this).find(".close").hide();
    }
  );

  // Show close icon on list title hover
  $(".listLink").hover(
    function () {
      $(this).find(".deleteList").show();
    },
    function () {
      $(this).find(".deleteList").hide();
    }
  );

  // If on mobile, unbind hover
  if ($(".mobileOn").css("display") != "none") {
    $(".item").unbind();
    $(".listLink").unbind();
    if ($(".overlay.active").length > 0) {
      $("#content").css("margin-right", "-250px");
    }
  }

  // Delete list on close icon click
  $(".deleteList").click(function () {
    // hide sidebar
    $("#sidebar").removeClass("active");
    // hide overlay
    $(".overlay").removeClass("active");
    let toDelete = $(this).siblings(".listID").val();
    let title = $(this).siblings(".titleOfList").text();
    $(".listToDelete").attr("value", toDelete);
    $("#titleToDelete").text(title);
    $("#confirmDelete").modal("show");
  });

  // Submit forms on input change
  $("input").change(function () {
    let inputArea = $(this).attr("class");

    switch (inputArea) {
      case "toDo":
        $(this).parent().attr("action", "/editToDo").submit();
        break;
      case "done":
        $(this).parent().attr("action", "/editDone").submit();
        break;
      case "newItem":
        $(this).parent().submit();
        break;
      case "listTitleInput":
        $(this).parent().submit();
        break;
      case "form-control myModalInput":
        $(this).parent().parent().submit();
        break;
    }
  });

  // On add new list modal show, focus on input
  $('#newListTitleModal').on('shown.bs.modal', function() {
    $('#newTitleInput').focus();
  })
});
