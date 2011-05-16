jQuery(document).ready(function($) {
  // Add "select all" checkbox
  $("table.rep > tbody > tr:first").append("<th><input type='checkbox' id='replayniac-select_all' /></th>");
  // Add checkboxes to each replay
  $("table.rep > tbody > tr:gt(0)").append("<td><input type='checkbox' class='replayniac-checkbox' /></td>");
  // Adds button to perform the batch downloading
  $(".cbox_footer").append("<a href='#' id='replayniac-download' style='display:block; float:right; position:relative; left:-27px; top:-50px; font-size:16px; border: 1px solid #182D48; background-color: #000; color: #fff; padding: 1px; -webkit-border-radius: 2px; border-radius: 2px'>&#x21E9;</a>");
  // Event handler to toggle all checkboxes
  $("#replayniac-select_all").click(function(ev) {
    $(".replayniac-checkbox").attr('checked', $(this).is(':checked'));
  });
  // Event handler to perform batch downloading
  $("#replayniac-download").click(function(ev) {
    ev.preventDefault();
    var links = $(".replayniac-checkbox:checked").parent().parent().find("td:nth(1) a");
    var map = $.map(links, function(e) { return e.href + "/get"; });
    var urls = $.makeArray(map);
    chrome.extension.sendRequest({"method": 'batch', "urls": urls});
  });
});
