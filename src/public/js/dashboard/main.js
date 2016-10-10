/* eslint no-unused-vars:0 */
init();

function init() {
  loadCKEditor();
}

function slug(str) {
  str = str.replace(/^\s+|\s+$/g, '').toLowerCase();

  const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
  const to = 'aaaaaeeeeeiiiiooooouuuunc------';

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  return str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

function loadCKEditor() {
  CKEDITOR.plugins.addExternal('codemirror', '/js/vendors/ckeditor/plugins/codemirror/');

  const config = {
    width: '91%',
    toolbar: [
      { name:'group1', items: ['Bold','Italic','Underline','StrikeThrough','PasteFromWord'] },
      { name:'group2', items: ['Format'] },
      { name:'group3', items: ['Outdent','Indent','NumberedList','BulletedList','Blockquote','PageBreak'] },
      { name:'group4', items: ['Image','Link','Unlink','Source'] }
    ],
    removeButtons: 'Underline,Subscript,Superscript',
    format_tags: 'p;h1;h2;h3;pre',
    removeDialogTabs: 'image:advanced;link:advanced',
    extraPlugins: 'codemirror',
    skin: 'office,/js/vendors/ckeditor/skins/office/'
  };

  $('.editor').each(function() {
    const id = $(this).attr('id');

    if (id !== 'codes') {
      config.height = id === 'excerpt' ? '150px' : '400px';
      CKEDITOR.replace(id, config);
    }
  });
}
