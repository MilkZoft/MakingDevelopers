(function() {
  init();

  function init() {
    loadCKEditor();
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

      config.height = id === 'excerpt' ? '150px' : '400px';

      CKEDITOR.replace(id, config);
    });
  }
}());
