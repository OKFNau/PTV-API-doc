(function() {
  var figlist, figlist_href, init, max_youtube_video_width, one_columnn_width, resize_window, text, text_href, text_width, toc, toc_href, two_column_width, youtube_video_ratio;

  text_href = '#main-text';

  toc_href = '#table-of-contents';

  figlist_href = '#figure-list';

  two_column_width = 1200;

  one_columnn_width = 480;

  max_youtube_video_width = 500;

  youtube_video_ratio = 9 / 16;

  text = null;

  text_width = null;

  toc = null;

  figlist = null;

  resize_window = function() {
    var body_padding_left, body_padding_right, figlist_width, half_window_width, img_dom, img_elem, left, make_resize_fn, parent_width, resize_fn, window_width, _i, _len, _ref, _results;
    window_width = $(window).width();
    if (window_width <= one_columnn_width) {
      toc.css('display', 'none');
      figlist.css('display', 'none');
      supplescroll.set_left(text, 0);
      supplescroll.set_outer_width(text, window_width);
      $('.fig-in-text iframe[src*="youtube.com"]').each(function() {
        var height, iframe, parent_width;
        iframe = $(this);
        parent_width = iframe.parent().width();
        iframe.width(parent_width);
        height = parent_width * youtube_video_ratio;
        return iframe.height(height);
      });
    } else if (window_width <= two_column_width) {
      toc.css('display', 'none');
      figlist.css('display', 'block');
      half_window_width = Math.round(window_width / 2);
      supplescroll.set_left(text, 0);
      supplescroll.set_outer_width(text, half_window_width);
      figlist_width = window_width - half_window_width;
      supplescroll.set_left(figlist, half_window_width);
      supplescroll.set_outer_width(figlist, figlist_width);
    } else {
      toc.css('display', 'block');
      figlist.css('display', 'block');
      body_padding_left = parseInt($(document.body).css('padding-left'));
      body_padding_right = parseInt($(document.body).css('padding-right'));
      supplescroll.set_outer_width(text, text_width);
      supplescroll.set_left(toc, body_padding_left);
      left = supplescroll.get_right(toc);
      supplescroll.set_left(text, left);
      left = supplescroll.get_right(text);
      supplescroll.set_left(figlist, left);
      figlist_width = window_width - body_padding_left - body_padding_right - supplescroll.get_outer_width(toc) - supplescroll.get_outer_width(text);
      supplescroll.set_outer_width(figlist, figlist_width);
    }
    if (window_width >= one_columnn_width) {
      $('.fig-in-figlist iframe[src*="youtube.com"]').each(function() {
        var height, iframe, parent_width;
        iframe = $(this);
        parent_width = iframe.parent().width();
        if (parent_width < max_youtube_video_width) {
          iframe.css('width', '100%');
          height = parent_width * youtube_video_ratio;
        } else {
          iframe.css('width', max_youtube_video_width + 'px');
          height = max_youtube_video_width * youtube_video_ratio;
        }
        return iframe.css('height', height + 'px');
      });
      _ref = $('img');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        img_dom = _ref[_i];
        img_elem = $(img_dom);
        parent_width = figlist_width - supplescroll.get_spacing_width(img_elem.parent());
        make_resize_fn = function(img_dom, parent_width) {
          return function() {
            return supplescroll.resize_img_dom(img_dom, parent_width);
          };
        };
        resize_fn = make_resize_fn(img_dom, parent_width);
        if (init === true) {
          _results.push(img_elem.load(resize_fn));
        } else {
          _results.push(resize_fn(img_dom, parent_width));
        }
      }
      return _results;
    }
  };

  init = function() {
    text = $(text_href);
    toc = $(toc_href);
    figlist = $(figlist_href);
    text_width = supplescroll.get_outer_width(text);
    supplescroll.init_touchscroll();
    supplescroll.build_page(toc_href, text_href, figlist_href);
    $(window).resize(resize_window);
    return resize_window();
  };

  $(window).ready(init);

}).call(this);
