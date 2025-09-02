import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getFullInfo , getAddress} from "@/utils/apiHelper"
import { toast } from "react-hot-toast";
// import { useRouter } from "next/router";
//add mapp to use deliery cost based on city

export const useUserStore = create(
  persist(
    (set, get) => {
    //   const router = useRouter();

      return {
        // state
        user: {
          id: "",
          full_name: "",
          email: "",
          phone: "",
          profileImage: "",
          profile_image: "",
        },
        addresses: [],
        homeAddress: null,
        defaultBillingAddress: null,
        officeAddress: null,
        isloadingUserData: false,
        error: null,

        // setters
        setUser: (user) => set({ user }),
        setAddresses: (addresses) => set({ addresses }),
        setHomeAddress: (home) => set({ homeAddress: home }),
        setDefaultBillingAddress: (billing) => set({ defaultBillingAddress: billing }),
        setOfficeAddress: (office) => set({ officeAddress: office }),
        setIsloadingUserData: (loadingUserData) => set({ isloadingUserData: loadingUserData }),
        setError: (error) => set({ error }),

        // async fetch
        fetchUserData: async () => {
          set({ isloadingUserData: true, error: null });

          try {
            const result = await getFullInfo();
           
            console.log("response", result);

            if (result.success) {
              const {
                data: userData,
                
                homeAddress,
                
                officeAddress,
              } = result;

                const { allAddresses, defaultBillingAddress } =
                    await getAddress();

              set({
                user: {
                  id: userData.id || "",
                  full_name: userData.full_name || "",
                  email: userData.email || "",
                  phone: userData.phone || "",
                  profileImage: userData.image_full_url || "",
                  profile_image: userData.image_full_url || "",
                },
                addresses: allAddresses || [],
                homeAddress: homeAddress || null,
                defaultBillingAddress: defaultBillingAddress || null,
                officeAddress: officeAddress || null,
                isloadingUserData: false,
              });
            } else {
              toast.error("Failed to load user data");
            //   router.push("/dashboard");
              set({ isloadingUserData: false });
            }
          } catch (error) {
            toast.error("An error occurred while loadingUserData user data");
            // router.push("/account");
            set({ isloadingUserData: false, error: error.message });
          }
        },
      };
    },
    {
      name: "userStore",
      skipHydration: true, 
    }
  )
);
