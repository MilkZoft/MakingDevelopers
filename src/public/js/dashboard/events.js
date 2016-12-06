/* eslint no-alert: 0 */
// Events
(function() {
  init();

  function init() {
    blog().insertAd();
    blog().insertCode();
    blog().slug();
    dashboard().media();
    dashboard().insertMedia();
    dashboard().uploadFiles();
    dashboard().toggleReadActionCheckboxes();
    menu().fixOpenMenuOnResize();
    menu().toggleMenu();
  }

  function _insertIntoCKEditor(instance, content) {
    window.CKEDITOR.instances[instance].insertHtml(content);
  }

  function _getFileExtension(filename) {
    return filename.split('.').pop();
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

          _insertIntoCKEditor('content', '[Ad:336x280]');
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

            _insertIntoCKEditor('content', `<p>{{${filename}}}</p>`);
          }
        });
      }
    };
  }

  function dashboard() {
    return {
      media: () => {
        $('#insertMedia').on('click', (e) => {
          $('#media').removeClass('hidden');

          e.stopPropagation();
        });

        $('#media').on('click', 'a', (e) => {
          if (!$('#media').hasClass('hidden')) {
            $('#media').addClass('hidden');
          }

          e.stopPropagation();
        });

        $('#searchMedia').on('click', (e) => {
          e.stopPropagation();
        });

        $('#searchMedia').keyup((e) => {
          const term = e.target.value;

          if (term.trim() === '') {
            $('.file').show();
          } else {
            $('.file').hide();

            $(`.file[title^=${term}], .file[title$=${term}`).show();
          }
        });
      },
      insertMedia: () => {
        $('.files .file .insert').on('click', function(e) {
          const type = $(this).data('type');
          const filename = $(this).data('filename');
          const url = $(this).data('url');
          let html;

          if (type === 'image') {
            html = `
              <p>
                <img alt="${filename}" src="${url}" class="image" style="max-width:720px;" />
              </p>
            `;
          } else {
            html = `
              <p>
                <a href="${url}" target="_blank">${filename}</a>
              </p>
            `;
          }

          _insertIntoCKEditor('content', `${html}\n`);
        });
      },
      uploadFiles: () => {
        $('#mediaForm').on('submit', (e) => {
          e.preventDefault();

          const files = $('#files')[0].files;
          const formdata = new FormData();
          const action = $('#mediaForm').attr('action');
          const imageFormats = ['png', 'jpg', 'jpeg', 'gif'];
          const documentFormats = {
            'pdf': 'pdf',
            'docx': 'word',
            'js': 'code',
            'json': 'code',
            'mp4': 'video',
            'rar': 'zip',
            'sql': 'code',
            'zip': 'zip'
          };
          let isImage = false;

          for (let i = 0; i < files.length; i++) {
            formdata.append('files[]', files[i]);
          }

          $.ajax({
            url: action,
            type: 'post',
            contentType: false,
            data: formdata,
            processData: false,
            cache: false
          })
          .done(result => {
            const data = result;

            for (let i = 0; i < data.length; i++) {
              const file = data[i];
              const extension = _getFileExtension(file.name);
              let element;
              let icon;

              isImage = imageFormats.indexOf(extension) !== -1;

              if (isImage) {
                element = `
                  <div class="file" title="${file.name}" style="background-image: url(${file.url})">
                    <div class="options">
                      <a
                        data-type="${isImage ? 'image' : 'document'}"
                        data-filename="${file.name}"
                        data-url="${file.url}"
                        class="insert"
                      >
                        ${__.Dashboard.media.insert}
                      </a>
                      <a
                        target="_blank"
                        href="${file.url}"
                        class="download"
                      >
                        ${__.Dashboard.media.download}
                      </a>
                    </div>
                  </div>`;
              } else {
                if (documentFormats[extension]) {
                  icon = `fa-file-${documentFormats[extension]}-o`;
                } else {
                  icon = 'fa-file-text-o';
                }

                element = `
                  <div class="file" title="${file.name} - ${file.size}">
                    <i class="fa ${icon} ${documentFormats[extension]}"></i>

                    <p>
                      ${file.name}
                    </p>

                    <div class="options">
                      <a
                        data-type="${isImage ? 'image' : 'document'}"
                        data-filename="${file.name}"
                        data-url="${file.url}"
                        class="insert"
                      >
                        ${__.Dashboard.media.insert}
                      </a>
                      <a
                        target="_blank"
                        href="${file.url}"
                        class="download"
                      >
                        ${__.Dashboard.media.download}
                      </a>
                    </div>
                  </div>
                `;
              }

              $('.files').prepend(element);

              // Attaching events...
              dashboard().insertMedia();
            }
          });

          $('#mediaForm')[0].reset();
        });
      },
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
