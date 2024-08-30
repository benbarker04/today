import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosRes, axiosReq } from "../api/axiosDefaults";

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

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post('/followers/', {
        followed: clickedProfile.id
      });

      setProfileData((prevState) => {
        const updatedPopularProfiles = prevState.popularProfiles.results.map((profile) => {
          if (profile.id === clickedProfile.id) {
            return {
              ...profile,
              followers_count: profile.followers_count + 1,
              following_id: data.id,
            };
          } else if (profile.is_owner) {
            return {
              ...profile,
              following_count: profile.following_count + 1,
            };
          } else {
            return profile;
          }
        });

        const updatedPageProfile = prevState.pageProfile.results.map((profile) => {
          if (profile.id === clickedProfile.id) {
            return {
              ...profile,
              followers_count: profile.followers_count + 1,
              following_id: data.id,
            };
          } else if (profile.is_owner) {
            return {
              ...profile,
              following_count: profile.following_count + 1,
            };
          } else {
            return profile;
          }
        });

        return {
          ...prevState,
          popularProfiles: {
            ...prevState.popularProfiles,
            results: updatedPopularProfiles
          },
          pageProfile: {
            ...prevState.pageProfile,
            results: updatedPageProfile
          }
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let isMounted = true;

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
      isMounted = false;
    };
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={{ setProfileData, handleFollow }}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
