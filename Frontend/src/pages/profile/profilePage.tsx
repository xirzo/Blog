import { useAuth } from "../../features/auth/model/useAuth";
import "./profilePage.scss";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      
      {user && (
        <div className="profile-card">
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p className="email">{user.email}</p>
            <p className="user-id">ID: {user.id.toString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
