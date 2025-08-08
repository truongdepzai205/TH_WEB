// src/data/Data.js
export const initialContactsData = [
  { id: 1, name: "Nguyễn Văn An", phone: "0987654321", email: "nguyenvanan@gmail.com", avatar: "", favorite: true },
  { id: 2, name: "Trần Thị Bình", phone: "0912345678", email: "tranthibibinh@gmail.com", avatar: "", favorite: false },
  { id: 3, name: "Lê Hoàng Cường", phone: "0898765432", email: "lehoangcuong@gmail.com", avatar: "", favorite: true },
  { id: 4, name: "Phạm Thị Dung", phone: "0976543210", email: "phamthidung@gmail.com", avatar: "", favorite: false },
  { id: 5, name: "Hoàng Văn Em", phone: "0965432109", email: "hoangvanem@gmail.com", avatar: "", favorite: true }
];

export function fetchContactsData() {
  return new Promise(resolve => {
    setTimeout(() => resolve(initialContactsData), 800);
  });
}