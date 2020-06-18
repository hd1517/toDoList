$(document).ready(function () {
    $(".newItem").focus();

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

  // Delete list on close icon click
  $(".deleteList").click(function () {
    let toDelete = $(this).siblings(".listID").val();
    let title = $(this).siblings(".titleOfList").text();
    $(".listToDelete").attr("value", toDelete);
    $("#titleToDelete").text(title);
    $("#confirmDelete").modal("show");
  });

  // On input change
  $("input").change(function () {
      let inputArea = $(this).attr("class");

      if (inputArea === "toDo") { 
          $(this).parent().attr("action", "/editToDo").submit();
      } else if (inputArea === "done") {
          $(this).parent().attr("action", "/editDone").submit();
      } else if (inputArea === "newItem") {
          $(this).parent().submit();
      } else if (inputArea === "listTitleInput") {
          $(this).parent().submit();
      }
  });



});
