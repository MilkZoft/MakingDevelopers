/* eslint no-alert: 0 */
// Events
(function() {
  $('#openMenu').on('click', (e) => {
    if ($('#menu').hasClass('hidden')) {
      $('#menu').removeClass('hidden');
    } else {
      $('#menu').addClass('hidden');
    }
  });

  // When user writes the post title, then we add a slug for friendlyUrl field
  $('#title').on('keyup', () => {
    $('#slug').val(slug($('#title').val()));
  });

  // Insert Ad (Google Adsense)
  $('#insertAd').on('click', (e) => {
    e.preventDefault();

    window.CKEDITOR.instances.content.insertHtml('[Ad:336x280]');
  });

  // Insert Code
  $('#insertCode').on('click', (e) => {
    e.preventDefault();

    const filename = prompt('Enter the filename', 'script.js');
    const current = $('#codes').val();
    let code;

    if (filename) {
      const extension = filename.split('.').pop();

      code = `---${extension}:${filename}\n\n---\n\n`;

      $('#codes').val(current + code);

      window.CKEDITOR.instances.content.insertHtml(`<p>{{${filename}}}</p>`);
    }
  });
}());
