jQuery(document).ready(function($) {
  // Add "select all" checkbox
  $("#index_sort_form").append("<input type='checkbox' id='replayniac-select_all'/>");
  // Add checkboxes to each replay
  $(".replay_entry_link").append("<input type='checkbox' class='replayniac-checkbox' style='position: absolute; top:1px; right:1px; z-index: 1000'/>");
  // Adds button to perform the batch downloading
  $("#bottom .index_search").append("<a href='#' id='replayniac-download' style='font-size: 16px; margin-left: 10px; border: 1px solid #E2E2E2; background-color: #F4F4F4; color: #FF871E; padding: 3px; -webkit-border-radius: 2px; border-radius: 2px'>&#x21E9;</a>");
  // Event handler to toggle all checkboxes
  $("#replayniac-select_all").click(function(ev) {
    $(".replayniac-checkbox").attr('checked', $(this).is(':checked'));
  });
  // Event handler to perform batch downloading
  $("#replayniac-download").click(function(ev) {
    ev.preventDefault();
    var links = $(".replayniac-checkbox:checked").parent().prevAll("a.index_download");
    var map = $.map(links, function(e) { return e.href; });
    var urls = $.makeArray(map);
    chrome.extension.sendRequest({"method": 'batch', "urls": urls});
  });
});
