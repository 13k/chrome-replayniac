jQuery(document).ready(function($) {
  // Add "select all" checkbox
  $("table.multitable tr:first").append("<td><input type='checkbox' id='replayniac-select_all' /></td>");
  // Add checkboxes to each replay
  var eligible_rows = $("table.multitable tr:gt(0)");
  eligible_rows.append("<td><input type='checkbox' class='replayniac-checkbox' /></td>");
  // Hack to circumvent the onclick on table rows
  eligible_rows.each(function(i, e) {
    e['data-onclick'] = e.onclick;
    e.onclick = null;
  });
  eligible_rows.click(function(ev) {
    var checkbox = $(this).find(':checkbox:first')[0];
    var column = $(this).find('td:last')[0];
    // if the source of the click event was NOT the checkbox, fire the saved onclick event if any
    if ((ev.target != checkbox) && (ev.target != column) && (this['data-onclick']))
      this['data-onclick']();
  });
  // Adds button to perform the batch downloading
  $("table.wide_box > tbody > tr:nth(3) > td").append("<a href='#' id='replayniac-download' style='font-size: 14px; border: 1px solid #E2E2E2; background-color: #F4F4F4; color: #2e2e2e; padding: 2px; -webkit-border-radius: 2px; border-radius: 2px; float: right;'>&#x21E9;</a><div style='clear: right'></div>")
  // Event handler to toggle all checkboxes
  $("#replayniac-select_all").click(function(ev) {
    $(".replayniac-checkbox").attr('checked', $(this).is(':checked'));
  });
  // Event handler to perform batch downloading
  $("#replayniac-download").click(function(ev) {
    ev.preventDefault();
    var links = $(".replayniac-checkbox:checked").parent().parent().find('td:nth(6) > a');
    var map = $.map(links, function(e) { return e.href; });
    var urls = $.makeArray(map);
    chrome.extension.sendRequest({"method": 'batch', "urls": urls});
  });
});
