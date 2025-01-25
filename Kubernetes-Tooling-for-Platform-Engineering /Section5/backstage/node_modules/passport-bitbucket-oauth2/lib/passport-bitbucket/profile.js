/**
 * Parse profile.
 *
 * @param {Object|String} json
 * @return {Object}
 * @api private
 */
exports.parse = function(json) {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }
  
  var profile = {};
  profile.id = json.uuid;
  profile.displayName = json.display_name;
  profile.username = json.username;
  profile.profileUrl = json.links.html.href;

  return profile;
};
