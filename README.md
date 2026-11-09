# Forum Diskusi (React + Redux)

Submission Dicoding: Membangun Aplikasi React dengan Redux.
API: https://forum-api.dicoding.dev/v1/

## Menjalankan

```bash
npm install
npm run dev      # development
npm run lint     # cek ESLint (Airbnb), harus 0 error
npm run build    # build produksi
```

## Struktur

- `src/api/`         pemanggilan REST API
- `src/states/`      Redux (store, slice, thunk)
- `src/components/`  komponen UI reusable
- `src/pages/`       halaman
- `src/hooks/`       custom hook

## Fitur

- Register, login, logout
- Daftar thread, detail thread + komentar, buat thread, buat komentar
- Vote thread dan komentar (optimistic update dengan rollback bila gagal)
- Filter thread berdasarkan kategori (murni di sisi front-end)
- Halaman leaderboard
- Loading indicator
