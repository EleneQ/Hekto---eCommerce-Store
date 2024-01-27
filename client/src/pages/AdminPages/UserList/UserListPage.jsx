import { Link } from "react-router-dom";
import { FaTrash, FaTimes, FaEdit, FaCheck } from "react-icons/fa";
import Container from "../../../components/styles/Container.styled";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../../slices/usersApiSlice";
import { toast } from "react-toastify";

const UserListPage = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (userId) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(userId);
        toast.success("User deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <section>
      <Container>
        <h1>Users</h1>

        {loadingDelete && <Loader />}

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
