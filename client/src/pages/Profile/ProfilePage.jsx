import ProfileForm from "./ProfileForm";
import MyOrders from "./MyOrders";
import { Container } from "@mui/material";

const ProfilePage = () => {
  return (
    <Container maxWidth={false}>
      <ProfileForm />
      <MyOrders />
    </Container>
  );
};
export default ProfilePage;
