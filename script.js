(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r)
        }, p, p.exports, r, e, n, t)
      }
      return n[i].exports
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o
  }
  return r
})()({
  1: [function (require, module, exports) {
    "use strict";

    hljs.initHighlightingOnLoad();

    var HC_SETTINGS = {
      css: {
        activeClass: "is-active",
        hiddenClass: "is-hidden"
      }
    };

    var Utils = {
      isHomepage: function isHomepage() {
        return $("[data-home-page]").length > 0;
      }
    };

    $(function () {
      var $topbar = $("[data-topbar]");
      var $heroUnit = $("[data-hero-unit]");
      var $topSearchBar = $(".topbar__search-bar");
      var $topSearchBarQuery = $topSearchBar.find("#query");
      var $topSearchBarBtn = $(".topbar__btn-search");
      var $revealedSection = "";

      if (Utils.isHomepage() || $('[data-search-results]').length) {
        var $correctSearch = $('.correct-search');
        var $searchBox = $('[data-search-box]');

        $('#search-bar').hide();
        $('.container_nav_bar').hide();
        if ($correctSearch.length) {
          $searchBox.find('.search').html($correctSearch.html());
          $searchBox.find('#query').focus();
        }
        $topbar.addClass("topbar--large");
        $heroUnit.removeClass(HC_SETTINGS.css.hiddenClass);
        $("[data-footer-submit-ticket]").removeClass(HC_SETTINGS.css.hiddenClass);
      } else {
        $topbar.addClass("topbar--small");
      }

      $topbar.removeClass(HC_SETTINGS.css.hiddenClass);

      $("[data-toggle-menu]").click(function () {
        $(this).toggleClass(HC_SETTINGS.css.activeClass);
        $("[data-menu]").toggle();
        $(".topbar__nav").toggleClass("topbar__nav--filled");
      });

      // Social share popups
      $(".share a").click(function (e) {
        e.preventDefault();
        window.open(this.href, "", "height = 500, width = 500");
      });

      // Toggle the share dropdown in communities
      $(".share-label").on("click", function (e) {
        e.stopPropagation();
        var isSelected = this.getAttribute("aria-selected") === "true";
        this.setAttribute("aria-selected", !isSelected);
        $(".share-label").not(this).attr("aria-selected", "false");
      });

      $(document).on("click", function () {
        $(".share-label").attr("aria-selected", "false");
      });

      // Submit search on select change
      $("#request-status-select, #request-organization-select").on("change", function () {
        search();
      });

      // Submit search on input enter
      $("#quick-search").on("keypress", function (e) {
        if (e.which === 13) {
          search();
        }
      });

      function search() {
        window.location.search = $.param({
          query: $("#quick-search").val(),
          status: $("#request-status-select").val(),
          organization_id: $("#request-organization-select").val()
        });
      }
      $(".image-with-lightbox").magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: "mfp-with-zoom", // class to remove default margin from left and right side
        image: {
          verticalFit: true
        },
        zoom: {
          enabled: true,
          duration: 300 // don't foget to change the duration also in CSS
        }
      });

      $(".image-with-video-icon").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
      });

      $(".accordion__item-title").on("click", function () {
        var $title = $(this);
        $title.toggleClass("accordion__item-title--active");
        $title.parents(".accordion__item").find(".accordion__item-content").slideToggle();
      });

      $(".tabs-link").click(function (e) {
        e.preventDefault();
        var $link = $(this);
        var tabIndex = $link.index();
        var $tab = $link.parents(".tabs").find(".tab").eq(tabIndex);
        $link.addClass(HC_SETTINGS.css.activeClass).siblings().removeClass(HC_SETTINGS.css.activeClass);
        $tab.removeClass(HC_SETTINGS.css.hiddenClass).siblings(".tab").addClass(HC_SETTINGS.css.hiddenClass);
      });

      $topSearchBarBtn.click(function () {
        $(this).addClass(HC_SETTINGS.css.hiddenClass);
        $topSearchBar.removeClass(HC_SETTINGS.css.hiddenClass);
        $topSearchBarQuery.focus();
      });

      $(document).mouseup(function (e) {
        if (!$topSearchBarQuery.is(e.target)) {
          $topSearchBar.addClass(HC_SETTINGS.css.hiddenClass);
          $topSearchBarBtn.removeClass(HC_SETTINGS.css.hiddenClass);
        }
      });

      // Fix animated icons
      $(".fa-spin").empty();

      $("img.custom-block__image, [data-svg]").each(function () {
        var $img = $(this);
        var imgID = $img.attr("id");
        var imgClass = $img.attr("class");
        var imgURL = $img.attr("src") + "?reset";

        $.get(imgURL, function (data) {
          // Get the SVG tag, ignore the rest
          var $svg = $(data).find("svg");

          // Add replaced image's ID to the new SVG
          if (typeof imgID !== "undefined") {
            $svg = $svg.attr("id", imgID);
          }
          // Add replaced image's classes to the new SVG
          if (typeof imgClass !== "undefined") {
            $svg = $svg.attr("class", imgClass + " replaced-svg");
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr("xmlns:a");

          // Replace image with new SVG
          $img.replaceWith($svg);
        }, "xml");
      });

      $(window).on("scroll resize", function () {
        var scrolled = $(window).scrollTop();
        var $topbarNav = $(".topbar__nav");
        if (scrolled > $topbarNav.outerHeight()) {
          $topbarNav.addClass("topbar__nav--white");
        } else {
          $topbarNav.removeClass("topbar__nav--white");
        }
      });

      // Wesleys work here on out

      $(document).ready(function () {

        // Update the most recent buzz link
        $.get("https://applyguide.zendesk.com/api/v2/help_center/articles/search.json?section=360006081614&sort_by=created_at", function (data) {

          $("#apply_buzz_link").attr("href", data["results"][0]["html_url"])
        });
        $.get("https://applyguide.zendesk.com/api/v2/help_center/en-us/categories.json?sort_by=updated_at&sort_order=asc", function (data) {
          var targetCategories = [360002200674, 360002200694, 360001909753, 360002421414]

          var categories = data["categories"].filter(c => targetCategories.includes(c["id"]))
          var links = $(".global-markets-list a");
          var names = $(".global-markets-list a h2");
          var i = 0;
          categories.forEach((c) => {
            links.eq(i).attr("href", c["html_url"]);
            names.eq(i).html(c["name"]);
            i++;
          })
        });


        $.get("https://applyguide.zendesk.com/api/v2/help_center/articles/search.json?section=360009375814&sort_by=created_at", function (data) {
          var events = data["results"];
          var i;
          for (i = 0; i < ((events.length > 10) ? 10:events.length); i++) {
            $('#event-' + i).attr("onclick", `location.href='${events[i]["html_url"]}'`)
            $('#event-' + i).html(events[i]["title"])
            $('#event-' + i).css("display", "block")
          }
        });
      })
    });

  }, {}]
}, {}, [1]);