Drupal.behaviors.cap_profiles_fields = function (context) {
  $('#fields input', context).click(function () {
    var parent_path = $(this).attr('parent');
    var checked = $(this).attr('checked');
    // Parent field selected.
    if (checked && parent_path.length === 0) {
      var child_path = $(this).attr('value');
      child_set_checked_value(child_path, true, context);
    }
    // Child field selected.
    else if (checked) {
      parent_set_checked(parent_path, context);
    }
    else {
      var child_path = $(this).attr('value');
      child_set_checked_value(child_path, false, context);
    }
  });

  function parent_set_checked(parent_path, context) {
    var $parent = $('#fields input[value="' + parent_path + '"]', context);
    $parent.attr('checked', true);
    var parent_path = $parent.attr('parent');
    if (parent_path.length !== 0) {
      parent_set_checked(parent_path, context)
    }
  }

  function child_set_checked_value(path, value, context) {
    $('#fields input[parent="' + path + '"]', context).each(function (index, elem) {
      $(elem).attr('checked', value);
      child_set_checked_value($(elem).attr('value'), value, context);
    });
  }
};
