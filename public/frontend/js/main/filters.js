$(document).ready(function(){
$('.filter-records').on('keyup', function () {
    var content = jQuery(this).val();
    console.log(content);
    jQuery(this).parents('fieldset').siblings('fieldset').find('.wt-checkbox:contains(' + content + ')').show();
    jQuery(this).parents('fieldset').siblings('fieldset').find('.wt-checkbox:not(:contains(' + content + '))').hide();
  });
});
