import { getPaginationPageFromParam } from './utils/url';

let maxElementsPerPage = 10;

export function setPaginationMaxLimit(elements) {
  maxElementsPerPage = elements;
}

export function getPaginationLimit(params, total, returnStart) {
  const paginationPage = params > 0
    ? params
    : getPaginationPageFromParam(params);

  const start = paginationPage > 0
    ? paginationPage * maxElementsPerPage - maxElementsPerPage
    : 0;

  if (returnStart) {
    return start;
  }

  return `${start}, ${maxElementsPerPage}`;
}

export function getPagination(params, total, url) {
  const start = getPaginationLimit(params, total, true);

  if (total > maxElementsPerPage) {
    return _pagination(total, maxElementsPerPage, start, url);
  }

  return '';
}

export function _pagination(count, end, start, url, elementsPerPage) {
  const increment = 5;
  const limit = elementsPerPage || 10;

  let currentPage;
  let firstPage;
  let lastPage;
  let next;
  let pageNav = '';
  let pageNext = '';
  let pagePrevious = '';
  let pages;
  let rest;

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
        firstPage = currentPage - increment - (currentPage + increment - pages);
        lastPage = pages;
      }
    } else {
      firstPage = 0;
      lastPage = pages;
    }

    pageNav = _getPageNav(firstPage, lastPage, start, end, next, url, limit);
    currentPage = _getCurrentPage(start, end);
    pageNext = _getPageNext(currentPage, pages, url);
    pagePrevious = _getPagePrevious(start, currentPage, url);
  }

  return `<ul class="pagination">${pagePrevious} ${pageNav} ${pageNext}</ul>`;
}

export function _getPageNav(firstPage, lastPage, start, end, next, url, limit) {
  let j = 1;
  let pageNav = '';

  for (let i = firstPage; i < lastPage; i++) {
    const pge = i + 1;
    const next = i * end;

    pageNav += start === next
      ? `<li><a href="#" class="active">${pge}</a></li> `
      : `<li><a href="${url}${pge}/" title="${pge}">${pge}</a></li> `;

    if (j === limit) {
      j = 1;
    } else {
      j++;
    }
  }

  return pageNav;
}

export function _getCurrentPage(start, end) {
  return start === 0 ? 1 : start / end + 1;
}

export function _getPageNext(currentPage, pages, url) {
  return currentPage < pages
    ? `<li><a href="${url}${currentPage + 1}/"><i class="fa fa-chevron-right"></i></a></li>`
    : '';
}

export function _getPagePrevious(start, currentPage, url) {
  return start > 0
    ? `<li><a href="${url}${currentPage - 1}/"><i class="fa fa-chevron-left"></i></a></li>`
    : '';
}
