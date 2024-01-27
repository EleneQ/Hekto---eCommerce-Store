import { Link } from "react-router-dom";
import { FaTrash, FaTimes, FaEdit, FaCheck } from "react-icons/fa";
import Container from "../../../components/styles/Container.styled";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { useGetUsersQuery } from "../../../slices/usersApiSlice";

const UserListPage = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const deleteHandler = (userId) => {};

  return (
    <section>
      <Container>
        <h1>Users</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>${user.totalPrice}</td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <Link to={`admin/user/${user._id}/edit`}>
                      <button>
                        <FaEdit />
                      </button>
                    </Link>
                    <button onClick={() => deleteHandler(user._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Container>
    </section>
  );
};
export default UserListPage;
