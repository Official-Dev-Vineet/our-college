(function ($) {
  "use strict";
  Drupal.behaviors.ACChangeEnterBehavior = {
    attach: function (context, settings) {
      $("input.form-autocomplete", context).once(
        "ac-change-enter-behavior",
        function () {
          $(this).keypress(function (e) {
            var ac = $("#autocomplete");
            if (e.keyCode == 13 && typeof ac[0] != "undefined") {
              e.preventDefault();
              ac.each(function () {
                if (this.owner.selected == false) {
                  this.owner.selectDown();
                }
                this.owner.hidePopup();
              });
              $(this).trigger("change");
            }
          });
        }
      );
    },
  };
})(jQuery);
/**
 * @file
 * Here we have the default Google CSE snippet and we will pass our google CSE ID here as a setting.
 */

(function ($) {
  Drupal.behaviors.googleCSE = {
    attach: function (context, settings) {
      // Getting setting variable.
      var cseID = settings.cseId;
      // cseID has the google cse id needed for the site search to work.
      var cx = cseID;
      var gcse = document.createElement("script");
      gcse.type = "text/javascript";
      gcse.async = true;
      gcse.src =
        (document.location.protocol == "https:" ? "https:" : "http:") +
        "//cse.google.com/cse.js?cx=" +
        cx;
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(gcse, s);

      var path = window.location.pathname;
      if (path == "/search/results") {
        var queries = {};
        $.each(document.location.search.substr(1).split("&"), function (c, q) {
          var i = q.split("=");
          if (typeof i[1] != "undefined") {
            queries[i[0].toString()] = i[1].toString();
            // If there is a "query" string in the URL, proceed.
            if (i[0] == "query") {
              var value_text = i[1].split("+").join(" ");
              // Get all input tags.
              var input = document.getElementsByTagName("input");
              for (var j = 0; j < input.length; j++) {
                var classname = input[j].getAttribute("class");
                if (
                  classname == "nav-search-input" ||
                  classname == "search-page-input"
                ) {
                  // Set the value text.
                  input[j].value = value_text;
                }
              }
            }
          }
        });
      }
    },
  };
})(jQuery);
