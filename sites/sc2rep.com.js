jQuery(document).ready(function($) {
  // Add "select all" checkbox to table header
  $("#replist thead tr").append("<th><input type='checkbox' id='replayniac-select_all'/></th>");
  // Fetch rows that can be downloaded only (i.e. not VODs)
  var eligible_rows = $("#replist tbody tr a[class*='btn_download']").parent().parent();
  // Add checkboxes to each eligible table row
  eligible_rows.append("<td><input type='checkbox' class='replayniac-checkbox'/></td>");
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
  // Adds button on footer nav to perform the batch downloading
  $("#pager td:last").append("<a href='#' id='replayniac-download'>&#x21E9;</a>");
  // Event handler to toggle all checkboxes
  $("#replayniac-select_all").click(function(ev) {
    $(".replayniac-checkbox").attr('checked', $(this).is(':checked'));
  });
  // Event handler to perform batch downloading
  $("#replayniac-download").click(function(ev) {
    ev.preventDefault();
    var links = $(".replayniac-checkbox:checked").parent().prev().find("a");
    var map = $.map(links, function(e) { return e.href; });
    var urls = $.makeArray(map);
    chrome.extension.sendRequest({"method": 'batch', "urls": urls});
  });
});
