import { getPaginationPageFromParam } from './url';

let maxElementsPerPage = 10;

export function setPaginationMaxLimit(elements) {
  maxElementsPerPage = elements;
}

export function getPaginationLimit(params, total, returnStart) {
  const paginationPage = getPaginationPageFromParam(params);
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
    return pagination(total, maxElementsPerPage, start, url);
  }

  return '';
}

export function pagination(count, end, start, url, elementsPerPage) {
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
        firstPage = currentPage - increment - currentPage + increment - pages;
        lastPage = pages;
      }
    } else {
      firstPage = 0;
      lastPage = pages;
    }

    pageNav = getPageNav(firstPage, lastPage, start, end, next, url, limit);
    currentPage = getCurrentPage(start, end);
    pageNext = getPageNext(currentPage, pages, url);
    pagePrevious = getPagePrevious(start, currentPage, url);
  }

  return `<div class="pagination">${pagePrevious} ${pageNav} ${pageNext}</div>`;
}

function getPageNav(firstPage, lastPage, start, end, next, url, limit) {
  let j = 1;
  let pageNav = '';

  for (let i = firstPage; i < lastPage; i++) {
    const pge = i + 1;
    const next = i * end;

    pageNav += start === next
      ? `<span class="current">${pge}</span> `
      : `<span class="bold"><a href="${url}${pge}/" title="${pge}">${pge}</a></span> `;

    if (j === limit) {
      j = 1;
    } else {
      j++;
    }
  }

  return pageNav;
}

function getCurrentPage(start, end) {
  return start === 0 ? 1 : start / end + 1;
}

function getPageNext(currentPage, pages, url) {
  return currentPage < pages
    ? `<a href="${url}${currentPage + 1}/"><i class="fa fa-chevron-right"></i></a> `
    : '';
}

function getPagePrevious(start, currentPage, url) {
  return start > 0
    ? `<a href="${url}${currentPage - 1}/"><i class="fa fa-chevron-left"></i></a> `
    : '';
}
