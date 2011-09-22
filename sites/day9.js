jQuery(document).ready(function($) {
  // Add "select all" checkbox
  $("div.filters").prepend("<input type='checkbox' id='replayniac-all' style='float:left; margin-right:10px;'/>");
  // Add checkboxes to each replay
  $("table.vods-list tr").prepend("<td><input type='checkbox' class='replayniac-checkbox' style='margin-left:10px!important'/></td>");
  // Add button to perform the batch downloading
  $("table.vods-list").append("<tr style='pointer:default'><td colspan='6' style='text-align:left'><a href='#' id='replayniac-download' style='font-size:14px;border:1px solid #dedede;background-color:transparent;color:#fff;padding:2px;margin-left:10px;margin-right:10px;-webkit-border-radius:2px;border-radius:2px;'>&#x21E9;</a>Get Links</td></tr>");
  // Event handler to toggle all checkboxes
  $("#replayniac-all").click(function(ev) {
    $(".replayniac-checkbox").attr('checked', $(this).is(':checked'));
  });
  // Event handler to perform batch downloading
  $("#replayniac-download").click(function(ev) {
    ev.preventDefault();
    
    var urls = $(".replayniac-checkbox:checked")
      .parent().parent()
      .find("td.archive-title-video a")
      .map(function() { return this.href; }).get();

    if (urls.length < 1) {
      alert("No VoDs selected!");
      return;
    }

    var content = $("<textarea/>")
      .css("border", "none")
      .css("width", "400px")
      .css("height", "200px")
      .css("overflow", "auto")
      .css("font", "14px Arial sans-serif")
      .css("background-color", "#eceadf")
      .css("padding", "5px")
      .text(urls.join("\n"));

    $("<div/>")
      .attr('title', 'Replayniac')
      .append(content)
      .appendTo($("body"))
      .dialog({
        modal: true,
        width: 435,
        buttons: {
          Ok: function() {
            $(this).dialog("close").remove();
          }
        }
      });
  });
});
