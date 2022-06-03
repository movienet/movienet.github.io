var finest_ncol = 2;
var min_to_boundary_margin = 50; // margin from grid ims to boundary
var min_to_text_margin = 100; // margin from grid ims to text
var grid_margin = 45;
var min_im_width = 150;
var max_im_width = 250;
var imlist = [];
for (var x = 0; x < 39; x++) {
  var imsrc = 'src/imgs/banner/poster' + String ('00' + x).slice (-2) + '.jpg';
  imlist.push (imsrc);
}
imlist = shuffle (imlist);

var height_ratio = 1.5;
var ori_width = -1000;
var refresh_step = 30;

function shuffle (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor (Math.random () * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function get_ncol (space) {
  var grid_w = space - min_to_boundary_margin - min_to_text_margin;
  var min_ncol = (grid_w + grid_margin) / (max_im_width + grid_margin);
  var max_ncol = (grid_w + grid_margin) / (min_im_width + grid_margin);
  console.log ('min, max', min_ncol, max_ncol, Math.ceil (min_ncol));

  min_ncol = Math.max (0, Math.ceil (min_ncol));
  max_ncol = Math.min (Math.floor (imlist.length / 4), Math.floor (max_ncol));
  console.log ('min, max', min_ncol, max_ncol);
  min_ncol = Math.min (min_ncol, max_ncol);
  var nearest_ncol = min_ncol;
  for (var i = min_ncol; i <= max_ncol; i++) {
    if (Math.abs (i - finest_ncol) < Math.abs (nearest_ncol - finest_ncol)) {
      nearest_ncol = i;
    }
  }
  if (nearest_ncol === 0) {
    return 0, null, null, null;
  }
  var grid_im_w = (grid_w - (nearest_ncol - 1) * grid_margin) / nearest_ncol;
  grid_im_w = Math.min (grid_im_w, max_im_width);
  grid_im_w = Math.max (grid_im_w, min_im_width);

  var margin_scale =
    (space - grid_im_w * nearest_ncol - (nearest_ncol - 1) * grid_margin) /
    (min_to_text_margin + min_to_boundary_margin);
  return [
    nearest_ncol,
    grid_im_w,
    min_to_boundary_margin * margin_scale,
    min_to_text_margin * margin_scale,
  ];
}

function respondToWindowWidth () {
  var window_width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (Math.abs (ori_width - window_width) < refresh_step) {
    return;
  } else {
    ori_width = window_width;
  }
  console.log (ori_width);

  var height = $ ('#banner').height ();
  var width = $ ('#banner').width ();
  // console.log('window-width', window_width);
  var banner_text_w = $ ('#banner-text').width ();
  var left_space = (window_width - banner_text_w) / 2;
  var ncol, grid_im_width, real_tb_margin, real_tt_margin;
  rst = get_ncol (left_space);

  // // arange imgs;
  var banner_ims = $ ('#banner-im-grid');
  banner_ims.html ('');
  console.log ('remove');
  if (rst[0] === 0) {
    return;
  }
  ncol = rst[0];
  grid_im_width = rst[1];
  real_tb_margin = rst[2];
  real_tt_margin = rst[3];
  console.log (ncol, grid_im_width, real_tb_margin, real_tt_margin);

  //   var banner_ims = $ ('<div>').attr ('id', '#banner-im-grid');
  for (var j = 0; j < ncol * 4; j++) {
    var this_im = $ ('<div>')
      .attr ('id', 'banner-im-' + j)
      .append (
        $ ('<img>')
          .attr ('src', imlist[j])
          .css ({width: grid_im_width, height: 'auto'})
          .addClass ('banner-im')
      );
    var grid_id = Math.floor (j / 4) + 1;
    var sign = 2 * (j % 2) - 1;
    console.log ('grid_id', grid_id);
    var im_x_center =
      width / 2 +
      sign *
        (banner_text_w / 2 +
          real_tt_margin +
          grid_im_width * (grid_id - 0.5) +
          (grid_id - 1) * grid_margin);
    var grid_margin_y_center = height * (0.4 + 0.2 * (grid_id % 2));
    var ysign = 2 * (Math.floor (j / 2) % 2) - 1;
    var im_y_center =
      grid_margin_y_center +
      ysign * (grid_margin + grid_im_width * height_ratio) / 2;
    console.log (im_x_center, im_y_center);
    this_im.css ({
      position: 'absolute',
      top: im_y_center,
      left: im_x_center,
      transform: 'translate(-50%, -50%)',
    });
    // this_im
    banner_ims.append (this_im);
  }
  $ ('#banner').append (banner_ims);
}
