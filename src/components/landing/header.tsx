import { HeaderActions } from "@/components/landing/header-actions";
import { Profile } from "@/components/landing/profile";
import { ContentBox } from "@/components/layout/shell";

export const Header = () => {
  return (
    <ContentBox
      className="flex flex-col gap-0 px-6 py-6 sm:px-10 sm:py-8 md:flex-row md:items-end md:justify-between"
      position="middle"
      label="Intro"
    >
      <Profile />
      <HeaderActions />
    </ContentBox>
  );
};
