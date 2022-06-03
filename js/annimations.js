// document.addEventListener('load', function () {
//   var scale = 1 / (window.devicePixelRatio || 1);
//   var content = 'width=device-width, initial-scale=' + scale;

//   document.querySelector('meta[name="viewport"]').setAttribute('content', content)
// }, false)

function scrollTo(to, duration) {
  var scroll_top = window.pageYOffset;
  if (scroll_top == to) return;
  // console.log('scrolltop', document.body.scrollTop);
  // console.log('scrolltop', $("html, body").scrollTop());

  var diff = to - scroll_top;
  var scrollStep = Math.PI / (duration / 10);
  var count = 0;
  var max_count = duration / 10;
  start = window.pageYOffset; //element.scrollTop;
  // console.log('start', start);
  scrollInterval = setInterval(function () {
    if (window.pageYOffset != to && count < max_count) {
      count = count + 1;
      currPos = start + diff * (0.5 - 0.5 * Math.cos(count * scrollStep));
      // console.log(currPos);
      // document.body.scrollTop = currPos;
      $('html, body').scrollTop(currPos);
      // window.pageYOffset = currPos;
    } else {
      clearInterval(scrollInterval);
    }
  }, 10);
}

function slideTo(elID, navbar_h = 56) {
  var dest = document.getElementById(elID);
  var height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  var page_height = document.body.scrollHeight;
  var dest_pos = Math.min(dest.offsetTop - navbar_h, page_height - height);
  // console.log('dest', dest_pos);

  scrollTo(dest_pos, 500);
}

// function respondToWindowWidth() {
//   var window_width =
//     window.innerWidth ||
//     document.documentElement.clientWidth ||
//     document.body.clientWidth;
//   // console.log('window-width', window_width);
//   var base_size = 10;
//   var banner_im = 'src/imgs/banner.png';
//   if (window_width >= 2000) {
//     base_size = 16;
//   } else if (window_width >= 1500 && window_width < 2000) {
//     base_size = 13;
//   } else if (window_width >= 576 && window_width < 1500) {
//     if (window_width < 960) {
//       banner_im = 'src/imgs/banner.png';
//     }
//   } else if (window_width < 576) {
//     banner_im = 'src/imgs/banner.png';
//     $('#banner-text').removeClass('flying-text').addClass('flying-text-sm');
//     $('#banner-text-sub').removeClass('md-font').addClass('sm-font');
//     $('#banner-text-main').removeClass('xl-font').addClass('lg-font');
//   }

//   // console.log('font-size', base_size);
//   $('body').css('font-size', base_size + 'px');
//   $('#banner-im').attr('src', banner_im);
// }

function event_bind() {
  $('#more-pub').on('show.bs.collapse', function () {
    $('#caret').removeClass('fa-caret-right').addClass('fa-caret-down');
  });

  $('#more-pub').on('hide.bs.collapse', function () {
    $('#caret').removeClass('fa-caret-down').addClass('fa-caret-right');
  });
}

function bind_bib_factory(paper) {
  var parent_ele = $('#project');
  var bib = $('#bib-' + paper);
  $('#btn-bib-' + paper).popover({
    container: 'body',
    content: bib,
    placement: 'top',
    trigger: 'hover',
    html: true,
    boundary: parent_ele,
  });
}

function popover_bind() {
  bind_bib_factory('eccv20movienet');
  bind_bib_factory('eccv20shot');
  bind_bib_factory('eccv20captionface');
  bind_bib_factory('eccv20onlineperson');
  bind_bib_factory('cvpr20sceneseg');
  bind_bib_factory('iccv19moviesyn');
  bind_bib_factory('cvpr18unifying');
  bind_bib_factory('eccv18person');
  bind_bib_factory('arxiv18trailer');
}

function copied_btn(btn, text, cls) {
  btn.html(text);
  btn.addClass(cls);
}

function recover_btn_copy(btn, text, cls) {
  btn.html(text);
  btn.removeClass(cls);
}

function copyBib(event, elID) {
  return copyText(event, elID, 'Copy BibTex to Clipboard', 'Copied BibTex to Clipboard', 'disabled');
}

function copyWgetCN(event, elID) {
  return copyText(event, elID, 'Copy wget-cmd (China)', 'Copid wget-cmd (China)', 'badge-disabled')
}
function copyWgetGB(event, elID) {
  return copyText(event, elID, 'Copy wget-cmd (Global)', 'Copid wget-cmd (Global)', 'badge-disabled')
}

function copyText(event, elID, btn_copy_text, btn_copied_text, disable_cls) {
  event.preventDefault();
  var btn = $(event.target);
  var dest = $('#' + elID).html();
  var $temp = $('<textarea>');
  $('body').append($temp);
  $temp.val(dest).select();
  document.execCommand('copy');
  $temp.remove();

  copied_btn(btn, btn_copied_text, disable_cls);
  setTimeout(function () {
    recover_btn_copy(btn, btn_copy_text, disable_cls);
  }, 2000);
}
