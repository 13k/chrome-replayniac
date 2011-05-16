jQuery(document).ready(function($) {
  // Add "select all" checkbox
  $(".listing-header .tablesorter-pager").append("<input type='checkbox' id='replayniac-select_all' style='position:absolute; right:12px'/>");
  // Add checkboxes to each replay
  $(".replay .likes").append("<input type='checkbox' class='replayniac-checkbox' style='position: absolute; top:1px; right:1px'/>");
  // Adds button to perform the batch downloading
  $(".listing-footer .tablesorter-pager").append("<a href='#' id='replayniac-download' style='position:absolute; right:15px; font-size: 16px;'>&#x21E9;</a>");
  // Event handler to toggle all checkboxes
  $("#replayniac-select_all").click(function(ev) {
    $(".replayniac-checkbox").attr('checked', $(this).is(':checked'));
  });
  // Event handler to perform batch downloading
  $("#replayniac-download").click(function(ev) {
    ev.preventDefault();
    /*
    alert("Fetching URLs from server, this may take a while ...");
    var links = $(".replayniac-checkbox:checked").prev("a");
    var urls = [];
    links.each(function(i, e) {
      var url = e.href + "/download";
      var xhr = new XMLHttpRequest();

    });
    */
    var links = $(".replayniac-checkbox:checked").prev("a");
    var map = $.map(links, function(e) { return e.href; });
    var urls = $.makeArray(map);
    chrome.extension.sendRequest({"method": 'batch', "urls": urls});
  });
});
