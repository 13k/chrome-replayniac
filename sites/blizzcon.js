jQuery(document).ready(function($) {
  // Add "select all" checkbox
  $("table.match-list > thead > tr").append("<th style='width:30px'/>");
  $("table.match-list > thead > tr").first().find("th:last").append("<input type='checkbox' id='replayniac-all'/>");
  // Add checkboxes to each replay
  $("td.replay-download-col").parent().append("<td style='width:30px'><input type='checkbox' class='replayniac-checkbox'/></td>")
  // Add button to perform the batch downloading
  $(".lower-content-wide-bottom").append("<a href='#' id='replayniac-download' style='font-size: 14px; border: 1px solid #00AFFF; background-color: transparent; color: #00AFFF; padding: 2px; margin-right: 35px; margin-top: -20px; margin-bottom: 5px; -webkit-border-radius: 2px; border-radius: 2px; float: right;'>&#x21E9;</a><div style='clear: right'></div>");
  // Event handler to toggle all checkboxes
  $("#replayniac-all").click(function(ev) {
    $(".replayniac-checkbox").attr('checked', $(this).is(':checked'));
  });
  // Event handler to perform batch downloading
  $("#replayniac-download").click(function(ev) {
    ev.preventDefault();
    var links = $(".replayniac-checkbox:checked").parent().parent().find('td.replay-download-col > a');
    var map = $.map(links, function(e) { return e.href; });
    var urls = $.makeArray(map);
    chrome.extension.sendRequest({"method": 'batch', "urls": urls});
  });
});
