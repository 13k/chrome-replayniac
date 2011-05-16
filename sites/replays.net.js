jQuery(document).ready(function($) {
  // Add "select all" checkbox
  $(".repitem:first").prepend("<input type='checkbox' id='replayniac-select_all' style='position:absolute'/>");
  // Add checkboxes to each replay
  $(".repitem:gt(0)").prepend("<input type='checkbox' class='replayniac-checkbox' style='position:absolute'/>");
  // Adds button to perform the batch downloading
  $(".video_div > span:last").append("<a href='#' id='replayniac-download' style='font-size: 16px; border: 1px solid #E2E2E2; background-color: #F4F4F4; color: #2e2e2e; padding: 3px; -webkit-border-radius: 2px; border-radius: 2px; float: left; margin-left: 10px'>&#x21E9;</a><div style='clear: left'></div>");
  // Event handler to toggle all checkboxes
  $("#replayniac-select_all").click(function(ev) {
    $(".replayniac-checkbox").attr('checked', $(this).is(':checked'));
  });
  // Event handler to perform batch downloading
  $("#replayniac-download").click(function(ev) {
    ev.preventDefault();
    alert("Fetching URLs from server, this may take a while ...");
    var links = $(".replayniac-checkbox:checked").parent().find('li:nth(1) > a');
    var urls = [];
    var done = 0;
    links.each(function(i, e) {
      console.log("doing", e.href);
      $.get(e.href, function(data, status, xhr) {
        var doc = $(data);
        var url = doc.find(".repinfo a.downloadlink:first")[0].href;
        urls.push(url);
      }).complete(function() {
        done++;
        console.log("done", done);
        if (done == links.length)
          chrome.extension.sendRequest({"method": 'batch', "urls": urls});
      });
    });
  });
});
