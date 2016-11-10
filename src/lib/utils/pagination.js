import { getPaginationPageFromParam } from './url';

export function getPaginationStart() {
  const maxLimit = 10;
  const paginationPage = getPaginationPageFromParam(req.params);
  const start = paginationPage > 0 ? paginationPage * maxLimit - maxLimit : 0;

  return start;
}

export function pagination(count, end, start, url, elementsPerPage) {
  /* const increment = 5;
  const limit = elementsPerPage || 10;

  let pageNav;
  let rest;
  let pages;
  let currentPage;
  let firstPage;
  let lastPage;
  let j;
  let pge;
  let next;

  if (count > end) {
    rest = count % end;
    pages = rest === 0 ? count / end : (count - rest) / end + 1;

    if (pages > limit) {
      currentPage = start / end + 1;

      if (start === 0) {
        firstPage = 0;
        lastPage = limit;
      } else if (currentPage >= increment && currentPage <= pages - increment) {
        firstPage = currentPage - increment;
        lastPage = currentPage + increment;
      } else if (currentPage < increment) {
        firstPage = 0;
        lastPage = currentPage + increment + (increment - currentPage);
      } else {
        firstPage = currentPage - increment - currentPage + increment - pages;
        lastPage = pages;
      }
    } else {
      firstPage = 0;
      lastPage = pages;
    }

    j = 1;

    for (const i = firstPage; i < lastPage; i++) {
      pge = i + 1;
      next = i * end;

      pageNav += start === next
        ? `<span class="current">${pge}</span> `
        : `<span class="bold"><a href="${url}${pge}/" title="${pge}">${pge}</a></span> `;

      if (j === limit) {
        j = 1;
      } else {
        j++;
      }
    }

    currentPage = start === 0 ? 1 : start / end + 1;

    pageNext = $currentPage < $pages
      ? `<a href="${url}${currentPage + 1}/"><i class="fa fa-chevron-right"></i></a> `
      : '';
    pagePrevious = start > 0
      ? `<a href="${url}${currentPage - 1}/"><i class="fa fa-chevron-left"></i></a> `
      : '';
  }

  return `<div class="pagination">${pagePrevious} ${pageNav} ${pageNext}</div>`; */
}
