function formatDate(isoString) {
  return new Date(isoString).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

// Body thread dari API berupa string HTML; untuk potongan di daftar
// kita ambil teksnya saja lalu dipotong.
function createSnippet(html, maxLength = 150) {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}

// Konten thread/komentar dari API berupa HTML buatan pengguna.
// Diubah menjadi teks biasa (DOMParser tidak menjalankan script) agar
// aman ditampilkan tanpa dangerouslySetInnerHTML.
function htmlToText(html) {
  const withBreaks = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n');
  const doc = new DOMParser().parseFromString(withBreaks, 'text/html');
  return doc.body.textContent.trim();
}

export { formatDate, createSnippet, htmlToText };
