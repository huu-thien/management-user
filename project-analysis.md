Sử dụng API từ trang web https://reqres.in

1. Create git repos, setup git local -> OK
2. Login, Axios , Store to local storage
3. Private routes. Check tokens
4. CRUD user:
   - List users :
     - Tạo folder service, viết hàm call api ở đây ( userService -> dùng axios), ở TableUsers thì có 1 hàm để gọi hàm từ userService và useEffect sẽ gọi lại hàm đó,
   - Create user
   - Edit a user
   - Delete a user
5. Customize list user
   - Paginate list user
   - Filter by id
   - Sort by first name
6. Working with excel - Import csv - Export csv
   => High level: use Redux

<!-- Kĩ thuật customize axios -->
- Customize axios nhắm các mục đích: định nghĩa được baseURL của api back end, sau sửa thì chỉ sửa 1 chỗ -> create instance
- Kiểm soát được dữ liệu từ api trả về -> Interceptors
<!-- Pagination -->
- Dùng thw viện
