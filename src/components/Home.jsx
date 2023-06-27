const Home = () => {
  return (
    <div style={{ marginTop: "30px" }}>
      <strong>Sử dụng API từ trang web https://reqres.in </strong>
      <p>email: eve.holt@reqres.in <br /> pass: everything</p>
      <p><strong>1. Login, Axios , Store tolocal storage </strong></p>
      <p><strong>2. Private routes. Check tokens </strong></p>
      <ul><strong>3. CRUD user: </strong></ul>
      <li>List users :</li>
      <li>Create user </li>
      <li>Edit a user </li>
      <li>Delete a user </li>
      <ul><strong>4. Customize list user </strong></ul>
      <li>Paginate list user </li>
      <li>Filter by id </li>
      <li>Sort by first name</li>
    </div>
  );
};

export default Home;
