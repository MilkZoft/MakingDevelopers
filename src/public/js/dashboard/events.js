/* eslint no-alert: 0 */
// Events
(function() {
  init();

  function init() {
    blog().insertAd();
    blog().insertCode();
    blog().slug();
    dashboard().toggleReadActionCheckboxes();
    menu().fixOpenMenuOnResize();
    menu().toggleMenu();
  }

  function menu() {
    return {
      toggleMenu: () => {
        $('#openMenu').on('click', (e) => {
          if ($('#menu').hasClass('hidden')) {
            $('#openMenu').removeClass('closed');
            $('#openMenu').addClass('opened');
            $('#menu').removeClass('hidden');
          } else {
            $('#openMenu').removeClass('opened');
            $('#openMenu').addClass('closed');
            $('#menu').addClass('hidden');
          }
        });
      },
      fixOpenMenuOnResize: () => {
        $(window).resize(() => {
          if ($(window).width() > 755) {
            $('#openMenu').removeClass('opened');
            $('#openMenu').addClass('closed');
            $('#menu').addClass('hidden');
          }
        });
      }
    };
  }

  function blog() {
    return {
      slug: () => {
        // When user writes the post title, then we add a slug for friendlyUrl field
        $('#title').on('keyup', () => {
          $('#slug').val(slug($('#title').val()));
        });
      },
      insertAd: () => {
        // Insert Ad (Google Adsense)
        $('#insertAd').on('click', (e) => {
          e.preventDefault();

          window.CKEDITOR.instances.content.insertHtml('[Ad:336x280]');
        });
      },
      insertCode: () => {
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
      }
    };
  }

  function dashboard() {
    return {
      toggleReadActionCheckboxes: () => {
        $('.readAction .tableCheckboxAll').on('change', (e) => {
          if (!$(e.target).is(':checked')) {
            $('.readAction .table .tableCheckbox').prop('checked', false);
          } else {
            $('.readAction .table .tableCheckbox').prop('checked', true);
          }
        });
      }
    };
  }
}());
