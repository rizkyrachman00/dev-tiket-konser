import ProfileMemberView from "@/components/views/member/Profile";
import userServices from "@/services/user";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { User } from "@/types/user.type";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProfileMemberPage = ({ setToaster }: PropTypes) => {
  return <ProfileMemberView setToaster={setToaster} />;
};

export default ProfileMemberPage;
