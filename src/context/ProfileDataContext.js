import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  const currentUser = useCurrentUser();

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/profiles/?ordering=-followers_count");
        if (isMounted) {
          setProfileData((prevState) => ({
            ...prevState,
            popularProfiles: data,
          }));
        }
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();

    return () => {
      isMounted = false; // Cleanup flag on unmount
    };
  }, [currentUser]); // Dependency array

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={setProfileData}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
