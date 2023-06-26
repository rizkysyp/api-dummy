const express = require('express');

const app = express();
const port = 3000;

const data = [
  { id: 1,id_pelanggan: 1111, nama: "Rizky", status: 0 },
  { id: 2,id_pelanggan: 2222, nama: "Satria", status: 1 },
  { id: 3,id_pelanggan: 3333,nama: "Yaqin", status: 2 },
  { id: 4,id_pelanggan: 4444, nama: "Vira", status: 0 },
  { id: 5,id_pelanggan: 5555, nama: "Rizky S", status: 1 },
  // tambahkan data lain di sini
];

app.get('/', (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
