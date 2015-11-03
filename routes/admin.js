/*
 * Administrative pages
 */

exports.getIndex = function (request, response) {
  response.render('admin_index', {
    title: 'Admin',
    subtitle: 'Subtitle of the page',
    content: 'Junk content'
  });
}
