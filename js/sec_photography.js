/*----------------------------------------------------*/
/* Load json file, and sort
------------------------------------------------------ */
var G_j_photos = null;
var G_j_photos_filtered= null;
//Load json and sort json and generate pfo cards
$(function () {
    if (G_j_photos == null) {
        $.getJSON("sub_mod/obj_photos.json",
            function (json) {
                G_j_photos = json;
                if (G_j_photos != null) {
                    G_j_photos = sortResultsInInt(G_j_photos, "index", false);
                    G_j_photos_filtered = G_j_photos;
                }
            });
    }
});

$(document).on('click', '.gallery-class.card', function () {
    var img_src=$(this).children().children().children().attr('src');
    //source original photos
    loadImage(img_src);
    $('#image-modal').modal('show');
    htmlReplace(this.id);
});

$('.modal').on('show.bs.modal', function() {
    $(this).show();
    setModalMaxHeight(this);
});

$(window).resize(function() {
    if ($('#image-modal.modal.in').length !== 0) {
        setModalMaxHeight($('#image-modal.modal.in'));
    }
});


function loadImage(img_src){
    var $img_preview = $('#imagepreview');
    $img_preview.attr('src', img_src); // use low res first
    img_src= img_src.replace("/min/", "/");
    img_src= img_src.replace("_min.jpg", ".jpg");
    var newimg = new Image();
    newimg.src = img_src;
    newimg.onload = function() {
        $img_preview.attr('src', img_src); // here assign the image to the modal when the user click the enlarge link
    };
};

function setModalMaxHeight(element) {
    this.$element     = $(element);
    this.$content     = this.$element.find('.modal-content');
    var borderWidth   = this.$content.outerHeight() - this.$content.innerHeight();
    var dialogMargin  = $(window).width() < 768 ? 20 : 60;
    var contentHeight = $(window).height() - (dialogMargin + borderWidth);
    var headerHeight  = this.$element.find('.modal-header').outerHeight() || 0;
    var footerHeight  = this.$element.find('.modal-footer').outerHeight() || 0;
    var maxHeight     = contentHeight - (headerHeight + footerHeight);

    this.$content.css({
        'overflow': 'hidden'
    });

    this.$element
        .find('.modal-body').css({
        'max-height': maxHeight,
        'overflow-y': 'auto'
    });
};